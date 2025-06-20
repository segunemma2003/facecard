// lib/contentUtils.ts - Fixed version for TypeScript JSX issues

import React, { useMemo } from 'react';

// HTML parsing utilities
export const stripHtml = (html: string): string => {
  if (!html) return '';
  
  if (typeof window !== 'undefined') {
    // Client-side: use DOM - safer and more accurate
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  } else {
    // Server-side: use regex (basic but functional)
    return html
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces
      .replace(/&amp;/g, '&') // Replace HTML entities
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();
  }
};

export const truncateText = (text: string, maxLength: number = 150): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  // Try to truncate at word boundary
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > maxLength * 0.8) {
    return truncated.substring(0, lastSpace).trim() + '...';
  }
  
  return truncated.trim() + '...';
};

export const parseContent = (content: any, type: string) => {
  if (content === null || content === undefined) return '';
  
  switch (type) {
    case 'html':
      return String(content); // Ensure it's a string
    case 'text':
      return String(content);
    case 'json':
      try {
        if (typeof content === 'string') {
          return JSON.parse(content);
        }
        return content;
      } catch (error) {
        console.warn('Failed to parse JSON content:', error);
        return content;
      }
    case 'image':
      return String(content); // URL string
    case 'url':
      return String(content);
    default:
      return String(content);
  }
};

export const getPlainText = (content: any, type: string): string => {
  if (content === null || content === undefined) return '';
  
  const parsed = parseContent(content, type);
  
  switch (type) {
    case 'html':
      return stripHtml(parsed);
    case 'json':
      try {
        return JSON.stringify(parsed, null, 2);
      } catch {
        return String(parsed);
      }
    case 'text':
    case 'image':
    case 'url':
    default:
      return String(parsed || '');
  }
};

export const formatContentForDisplay = (content: any, type: string, options: {
  stripHtml?: boolean;
  truncate?: number;
  preview?: boolean;
} = {}) => {
  const { stripHtml: shouldStripHtml = false, truncate, preview = false } = options;
  
  if (content === null || content === undefined) return '';
  
  let displayContent = parseContent(content, type);
  
  if (type === 'html' && shouldStripHtml) {
    displayContent = stripHtml(displayContent);
  }
  
  if (type === 'json' && preview) {
    // Show a preview of JSON structure
    const parsed = parseContent(content, type);
    if (Array.isArray(parsed)) {
      return `Array with ${parsed.length} items`;
    } else if (typeof parsed === 'object' && parsed !== null) {
      const keys = Object.keys(parsed);
      return `Object with keys: ${keys.slice(0, 3).join(', ')}${keys.length > 3 ? '...' : ''}`;
    }
    return 'JSON data';
  }
  
  const textContent = getPlainText(displayContent, type);
  
  if (truncate && textContent.length > truncate) {
    return truncateText(textContent, truncate);
  }
  
  return displayContent;
};

// Content comparison utilities
export interface ContentComparison {
  id: string;
  page: string;
  section: string;
  key: string;
  type: string;
  content: any;
  plainText: string;
  preview: string;
  lastUpdated: string;
  isActive: boolean;
  sortOrder?: number;
}

export const compareContent = (content1: ContentComparison, content2: ContentComparison) => {
  return {
    same: content1.plainText === content2.plainText,
    differences: {
      content: content1.content !== content2.content,
      type: content1.type !== content2.type,
      isActive: content1.isActive !== content2.isActive,
    },
    lengthDiff: content1.plainText.length - content2.plainText.length,
    similarity: calculateSimilarity(content1.plainText, content2.plainText),
  };
};

// Helper function to calculate text similarity
const calculateSimilarity = (text1: string, text2: string): number => {
  if (text1 === text2) return 100;
  if (!text1 || !text2) return 0;
  
  const longer = text1.length > text2.length ? text1 : text2;
  const shorter = text1.length > text2.length ? text2 : text1;
  
  if (longer.length === 0) return 100;
  
  const distance = levenshteinDistance(longer, shorter);
  return Math.round(((longer.length - distance) / longer.length) * 100);
};

// Simple Levenshtein distance calculation
const levenshteinDistance = (str1: string, str2: string): number => {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
};

export const groupContentByPage = (contentItems: any[]) => {
  return contentItems.reduce((acc, item) => {
    const pageKey = item.page || 'unknown';
    if (!acc[pageKey]) {
      acc[pageKey] = {};
    }
    
    const sectionKey = item.section || 'unknown';
    if (!acc[pageKey][sectionKey]) {
      acc[pageKey][sectionKey] = [];
    }
    
    acc[pageKey][sectionKey].push({
      id: item.id || `${item.page}-${item.section}-${item.key}`,
      page: item.page,
      section: item.section,
      key: item.key,
      type: item.type,
      content: item.content,
      plainText: getPlainText(item.content, item.type),
      preview: formatContentForDisplay(item.content, item.type, { preview: true, truncate: 100 }),
      lastUpdated: item.updated_at || item.created_at || new Date().toISOString(),
      isActive: item.is_active !== false,
      sortOrder: item.sort_order || 0,
    });
    
    return acc;
  }, {});
};

// Enhanced content validation
export const validateContent = (content: any, type: string): { isValid: boolean; error?: string } => {
  if (content === null || content === undefined) {
    return { isValid: false, error: 'Content is required' };
  }
  
  switch (type) {
    case 'json':
      try {
        if (typeof content === 'string') {
          JSON.parse(content);
        }
        return { isValid: true };
      } catch (error) {
        return { isValid: false, error: 'Invalid JSON format' };
      }
    
    case 'url':
    case 'image':
      const urlPattern = /^https?:\/\/.+/;
      if (!urlPattern.test(String(content))) {
        return { isValid: false, error: 'Invalid URL format' };
      }
      return { isValid: true };
    
    case 'html':
      // Basic HTML validation
      const htmlContent = String(content);
      const openTags = (htmlContent.match(/</g) || []).length;
      const closeTags = (htmlContent.match(/>/g) || []).length;
      if (openTags !== closeTags) {
        return { isValid: false, error: 'Malformed HTML - unmatched tags' };
      }
      return { isValid: true };
    
    case 'text':
    default:
      return { isValid: true };
  }
};

// React component for rendering content safely
interface ContentRendererProps {
  content: any;
  type: string;
  className?: string;
  fallback?: string;
  stripHtml?: boolean;
  truncate?: number;
  showValidationError?: boolean;
}

export const ContentRenderer: React.FC<ContentRendererProps> = ({
  content,
  type,
  className = '',
  fallback = '',
  stripHtml = false,
  truncate,
  showValidationError = false
}) => {
  // Validate content
  const validation = validateContent(content, type);
  
  if (!validation.isValid && showValidationError) {
    return React.createElement('div', {
      className: `text-red-500 text-sm ${className}`
    }, `Error: ${validation.error}`);
  }
  
  if (!content && !fallback) return null;
  
  const displayContent = content || fallback;
  const formattedContent = formatContentForDisplay(displayContent, type, { stripHtml, truncate });
  
  try {
    switch (type) {
      case 'html':
        if (stripHtml) {
          return React.createElement('span', { className }, formattedContent);
        }
        return React.createElement('div', {
          className,
          dangerouslySetInnerHTML: { __html: formattedContent }
        });
        
      case 'json':
        if (Array.isArray(formattedContent)) {
          return React.createElement('div', { className },
            formattedContent.map((item: any, index: number) =>
              React.createElement('div', { key: index, className: 'mb-2' },
                typeof item === 'object' 
                  ? React.createElement('pre', { className: 'text-xs' }, JSON.stringify(item, null, 2))
                  : String(item)
              )
            )
          );
        }
        
        if (typeof formattedContent === 'object') {
          return React.createElement('pre', {
            className: `${className} whitespace-pre-wrap text-xs`
          }, JSON.stringify(formattedContent, null, 2));
        }
        
        return React.createElement('span', { className }, String(formattedContent));
        
      case 'image':
        return React.createElement('img', {
          src: formattedContent,
          alt: 'Content',
          className,
          onError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const target = e.currentTarget;
            target.style.display = 'none';
            // Optionally show fallback
            if (fallback && target.parentElement) {
              target.parentElement.insertAdjacentHTML(
                'beforeend', 
                `<span class="text-gray-500 text-sm">Image failed to load</span>`
              );
            }
          }
        });
        
      case 'url':
        return React.createElement('a', {
          href: formattedContent,
          target: '_blank',
          rel: 'noopener noreferrer',
          className: `text-blue-600 hover:text-blue-800 underline ${className}`
        }, truncate ? truncateText(formattedContent, truncate) : formattedContent);
        
      default:
        return React.createElement('span', { className }, formattedContent);
    }
  } catch (error) {
    console.error('ContentRenderer error:', error);
    return React.createElement('span', {
      className: `text-red-500 ${className}`
    }, showValidationError ? `Render error: ${error}` : fallback || 'Content error');
  }
};

// Utility for extracting content safely with fallbacks
export const extractContent = (
  contentData: any, 
  key: string, 
  fallback: string = '',
  options: { stripHtml?: boolean; truncate?: number } = {}
): string => {
  try {
    if (!contentData || !contentData[key]) return fallback;
    
    const item = contentData[key];
    const content = item.content;
    const type = item.type || 'text';
    
    if (options.stripHtml && type === 'html') {
      return getPlainText(content, type);
    }
    
    const text = getPlainText(content, type);
    
    if (options.truncate) {
      return truncateText(text, options.truncate);
    }
    
    return text || fallback;
  } catch (error) {
    console.warn(`Failed to extract content for key: ${key}`, error);
    return fallback;
  }
};

// Hook for content with automatic error handling
export const useProcessedContent = (rawContent: any) => {
  return useMemo(() => {
    if (!rawContent) return null;
    
    try {
      const processed: Record<string, any> = {};
      
      Object.entries(rawContent).forEach(([key, item]: [string, any]) => {
        processed[key] = {
          raw: item.content,
          type: item.type,
          plain: getPlainText(item.content, item.type),
          preview: formatContentForDisplay(item.content, item.type, { 
            preview: true, 
            truncate: 100 
          }),
          isValid: validateContent(item.content, item.type).isValid,
        };
      });
      
      return processed;
    } catch (error) {
      console.error('Failed to process content:', error);
      return null;
    }
  }, [rawContent]);
};