import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, ChevronDown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WinnerCard from '../awards/WinnerCard';
import { usePastWinners, usePastWinnerYears } from '@/hooks/useApi';
import { usePageContent } from '@/hooks/usePageContent';
import { ContentRenderer, extractContent } from '@/lib/contentUtils';

const PastWinnersSection = () => {
  const [selectedYear, setSelectedYear] = useState<string>("");
  const { data: content, isLoading: contentLoading } = usePageContent('homepage', 'past_winners');
  const { data: yearsResponse, isLoading: yearsLoading } = usePastWinnerYears();
  const { data: winnersResponse, isLoading: winnersLoading, error: winnersError } = usePastWinners(
    selectedYear ? { year: parseInt(selectedYear) } : undefined
  );
  
  const contentData = content?.data?.content || {};
  const availableYears = yearsResponse?.data || [];
  const pastWinners = winnersResponse?.data || [];

  // Extract content
  const title = extractContent(contentData, 'title', 'Past Winners');
  const subtitle = extractContent(contentData, 'subtitle', 'Celebrating Excellence Through the Years');
  const description = extractContent(contentData, 'content', 'Celebrating the remarkable individuals...');
  const emptyMessage = extractContent(contentData, 'empty_state_message', 'Past winners will be featured here after our first awards ceremony.');
  const buttonText = extractContent(contentData, 'button_text', 'View All Past Winners');

  // Set default year when years are loaded
  useEffect(() => {
    if (availableYears.length > 0 && !selectedYear) {
      // Sort years in descending order and select the latest
      const sortedYears = [...availableYears].sort((a, b) => b - a);
      setSelectedYear(sortedYears[0].toString());
    }
  }, [availableYears, selectedYear]);



  if (contentLoading || yearsLoading) {
    return (
      <section className="section-padding bg-face-sky-blue/5" id="past-winners">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block mb-3">
              <img 
                src="/lovable-uploads/345fadbd-8107-48e8-81b7-5e9b634511d3.png" 
                alt="FACE Awards Logo" 
                className="h-10 w-auto"
              />
            </div>
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
            </div>
          </div>
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-face-sky-blue" />
          </div>
        </div>
      </section>
    );
  }
  // Loading state
  if (yearsLoading) {
    return (
      <section className="section-padding bg-face-sky-blue/5" id="past-winners">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block mb-3">
              <img 
                src="/lovable-uploads/345fadbd-8107-48e8-81b7-5e9b634511d3.png" 
                alt="FACE Awards Logo" 
                className="h-10 w-auto"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-clash font-bold mb-4 text-face-grey">Past Winners</h2>
            <p className="text-lg text-face-grey/80 font-manrope">Loading past winners...</p>
          </div>
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-face-sky-blue" />
          </div>
        </div>
      </section>
    );
  }

  // No years available
  
  if (availableYears.length === 0) {
    return (
      <section className="section-padding bg-face-sky-blue/5" id="past-winners">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block mb-3">
              <img 
                src="/lovable-uploads/345fadbd-8107-48e8-81b7-5e9b634511d3.png" 
                alt="FACE Awards Logo" 
                className="h-10 w-auto"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-clash font-bold mb-4 text-face-grey">{title}</h2>
            <p className="text-lg text-face-grey/80 font-manrope">{emptyMessage}</p>
          </div>
        </div>
      </section>
    );
  }

  // Sort years in descending order for display
  const sortedYears = [...availableYears].sort((a, b) => b - a).map(year => year.toString());

  return (
    <section className="section-padding bg-face-sky-blue/5" id="past-winners">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-block mb-3">
            <img 
              src="/lovable-uploads/345fadbd-8107-48e8-81b7-5e9b634511d3.png" 
              alt="FACE Awards Logo" 
              className="h-10 w-auto"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-clash font-bold mb-4 text-face-grey">{title}</h2>
          <p className="text-lg text-face-grey/80 font-manrope">{description}</p>
        </div>


        <div className="mb-8">
          {/* Year selector - For mobile */}
          <div className="md:hidden">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-full border-face-sky-blue">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {sortedYears.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year} Winners
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Year tabs - For desktop */}
          <div className="hidden md:block">
            <Tabs value={selectedYear} onValueChange={setSelectedYear}>
              <div className="flex justify-center mb-8">
                <TabsList className="bg-face-white border border-face-sky-blue/20">
                  {sortedYears.map((year) => (
                    <TabsTrigger 
                      key={year} 
                      value={year} 
                      className="px-8 data-[state=active]:bg-face-sky-blue data-[state=active]:text-face-white font-manrope"
                    >
                      {year}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {sortedYears.map((year) => (
                <TabsContent key={year} value={year} className="mt-0">
                  {winnersLoading ? (
                    <div className="flex justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-face-sky-blue" />
                    </div>
                  ) : winnersError ? (
                    <div className="text-center py-12">
                      <p className="text-red-600 font-manrope">Failed to load winners for {year}</p>
                    </div>
                  ) : pastWinners.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-face-grey/60 font-manrope">No winners available for {year}</p>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {pastWinners.map((winner) => (
                        <WinnerCard 
                          key={winner.id} 
                          winner={{
                            id: winner.id,
                            name: winner.name,
                            category: winner.category,
                            achievement: winner.achievement,
                            imageUrl: winner.image_url,
                            organization: winner.organization,
                            year: winner.year
                          }} 
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Mobile content display */}
          <div className="md:hidden mt-6">
            {winnersLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-face-sky-blue" />
              </div>
            ) : winnersError ? (
              <div className="text-center py-12">
                <p className="text-red-600 font-manrope">Failed to load winners</p>
              </div>
            ) : pastWinners.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-face-grey/60 font-manrope">No winners available for {selectedYear}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {pastWinners.map((winner) => (
                  <WinnerCard 
                    key={winner.id} 
                    winner={{
                      id: winner.id,
                      name: winner.name,
                      category: winner.category,
                      achievement: winner.achievement,
                      imageUrl: winner.image_url,
                      organization: winner.organization,
                      year: winner.year
                    }} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Show total count and link to full page */}
        <div className="text-center mt-10">
          {pastWinners.length > 0 && (
            <p className="text-sm text-face-grey/60 mb-4 font-manrope">
              Showing {pastWinners.length} winner{pastWinners.length !== 1 ? 's' : ''} from {selectedYear}
            </p>
          )}
          <Button 
            asChild 
            variant="outline" 
            className="border-face-sky-blue text-face-sky-blue hover:bg-face-sky-blue hover:text-face-white font-manrope"
          >
            <Link to="/past-winners" className="flex items-center gap-2">
              View All Past Winners
              <ChevronDown className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PastWinnersSection;