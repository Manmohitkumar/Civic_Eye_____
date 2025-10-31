
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ValueTestimonialProps {
  quote: string;
  name: string;
  title: string;
  avatarSrc: string;
  verified?: boolean;
  rating?: number;
}

const ValueTestimonial = ({ 
  quote, 
  name, 
  title, 
  avatarSrc, 
  verified = false,
  rating
}: ValueTestimonialProps) => {
  return (
    <div className="mt-12 bg-indigo-50 rounded-xl p-8 shadow-lg border border-indigo-200 relative hover:shadow-lg transition-shadow duration-300">
      <div className="absolute top-6 left-6 text-indigo-300">
        <Quote size={48} strokeWidth={1.5} />
      </div>
      <div className="relative z-10 pt-4">
        <p className="text-xl italic text-gray-700 mb-6 px-4">
          {quote}
        </p>
        
        {/* Display rating if provided */}
        {rating && (
          <div className="flex mb-4 px-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < rating ? "currentColor" : "none"}
                className={cn(
                  i < rating 
                    ? "text-indigo-500" 
                    : "text-gray-300"
                )}
              />
            ))}
          </div>
        )}
        
        <div className="flex items-center">
          <Avatar className="h-12 w-12 mr-4 border-2 border-white shadow-sm">
            <AvatarImage 
              src={avatarSrc} 
              alt={`${name} testimonial`} 
            />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold theme-primary-text">{name}</p>
              {verified && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                  Verified Owner
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-500">{title}</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 right-6 text-indigo-300">
        <Quote size={48} strokeWidth={1.5} />
      </div>
    </div>
  );
};

export default ValueTestimonial;
