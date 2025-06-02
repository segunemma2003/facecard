// Using API Testimonial interface
interface Testimonial {
  id: number;
  name: string;
  role: string;
  organization: string;
  content: string;
  image_url: string | null;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  if (testimonials.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-face-grey/60 font-manrope">No testimonials available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="bg-face-white rounded-lg border border-face-sky-blue/20 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="p-6">
            <div className="flex items-start space-x-4">
              {testimonial.image_url ? (
                <div className="flex-shrink-0">
                  <img 
                    src={`${testimonial.image_url}?w=100&h=100&fit=crop`} 
                    alt={testimonial.name}
                    className="h-14 w-14 rounded-full object-cover border-2 border-face-sky-blue"
                    onError={(e) => {
                      // Hide broken image and show initials instead
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="h-14 w-14 rounded-full bg-face-sky-blue/10 flex items-center justify-center border-2 border-face-sky-blue/20">
                            <span class="text-face-sky-blue font-clash text-xl font-bold">${testimonial.name[0]}</span>
                          </div>
                        `;
                      }
                    }}
                  />
                </div>
              ) : (
                <div className="flex-shrink-0 h-14 w-14 rounded-full bg-face-sky-blue/10 flex items-center justify-center border-2 border-face-sky-blue/20">
                  <span className="text-face-sky-blue font-clash text-xl font-bold">{testimonial.name[0]}</span>
                </div>
              )}
              
              <div className="flex-1">
                <div className="mb-4">
                  {/* Quote icon */}
                  <div className="text-face-sky-blue/30 text-4xl font-serif leading-none mb-2">"</div>
                  <p className="text-face-grey italic leading-relaxed font-manrope">
                    {testimonial.content}
                  </p>
                  <div className="text-face-sky-blue/30 text-4xl font-serif leading-none text-right">
                    "
                  </div>
                </div>
                
                <div className="border-t border-face-sky-blue/10 pt-3">
                  <p className="font-bold text-face-grey font-clash">{testimonial.name}</p>
                  <p className="text-sm text-face-sky-blue font-medium font-manrope">
                    {testimonial.role}
                  </p>
                  <p className="text-sm text-face-grey/60 font-manrope">
                    {testimonial.organization}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestimonialsSection;