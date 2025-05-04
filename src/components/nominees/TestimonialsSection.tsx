
import { NomineeTestimonial } from '@/models/nomineeData';
import { Card, CardContent } from '@/components/ui/card';

interface TestimonialsSectionProps {
  testimonials: NomineeTestimonial[];
}

const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.id} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              {testimonial.imageUrl ? (
                <div className="flex-shrink-0">
                  <img 
                    src={`${testimonial.imageUrl}?w=100&h=100&fit=crop`} 
                    alt={testimonial.name}
                    className="h-14 w-14 rounded-full object-cover border-2 border-face-gold"
                  />
                </div>
              ) : (
                <div className="flex-shrink-0 h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 font-serif text-xl">{testimonial.name[0]}</span>
                </div>
              )}
              
              <div className="flex-1">
                <p className="text-gray-700 italic mb-4">"{testimonial.content}"</p>
                
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.organization}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TestimonialsSection;
