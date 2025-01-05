'use client';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function HeroBanner() {
  return (
    <div className="w-full">
      <Carousel 
        autoPlay 
        infiniteLoop 
        showStatus={false} 
        showThumbs={false}
        interval={5000}
      >
        <div className="h-[500px]">
          <img 
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop" 
            alt="Fashion Shopping"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="h-[500px]">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop" 
            alt="Electronics"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="h-[500px]">
          <img 
            src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1971&auto=format&fit=crop" 
            alt="Home Decor"
            className="object-cover w-full h-full"
          />
        </div>
      </Carousel>
    </div>
  );
}
