// src/components/image-slider.tsx
'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

const sliderImages = [
  { src: 'https://cdn.pixabay.com/photo/2012/11/28/11/28/rocket-launch-67723_1280.jpg', alt: 'Rocket launching into space', hint: 'rocket launch' },
  { src: 'https://cdn.pixabay.com/photo/2012/01/09/11/42/rocket-11653_1280.jpg', alt: 'Rocket in space with Earth background', hint: 'rocket space earth' },
  { src: 'https://cdn.pixabay.com/photo/2015/03/26/18/45/rocket-motors-693265_1280.jpg', alt: 'Close-up of rocket engines', hint: 'rocket engines' },
];

export function ImageSlider() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-4xl mx-auto"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {sliderImages.map((image, index) => (
          <CarouselItem key={index}>
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="flex aspect-[2/1] items-center justify-center p-0 relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 ease-in-out group-hover:scale-105"
                  data-ai-hint={image.hint}
                  priority={index === 0} // Prioritize loading the first image
                />
                 {/* Optional: Add a subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 bg-background/50 hover:bg-background/80 text-foreground" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 bg-background/50 hover:bg-background/80 text-foreground" />
    </Carousel>
  );
}

