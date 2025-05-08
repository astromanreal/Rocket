
// src/components/merch-card.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Heart, Info, Package, Ruler, ShoppingCart, FileText } from 'lucide-react'; // Added FileText for Technical Poster
import type { MerchItem, MerchType } from '@/data/merch-data';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast'; // Import useToast
import { ScrollArea } from '@/components/ui/scroll-area'; // Import ScrollArea

interface MerchCardProps {
  item: MerchItem;
}

// Helper to format price from cents to USD string
const formatPrice = (priceInCents: number): string => {
  return `$${(priceInCents / 100).toFixed(2)}`;
};

// Helper to get icon based on type
const getTypeIcon = (type: MerchType) => {
    switch (type) {
        case 'Poster': return <Package className="h-4 w-4" />;
        // case 'Sticker': return <Package className="h-4 w-4" />; // Sticker type removed
        case 'Model': return <Package className="h-4 w-4" />;
        case 'Blueprint': return <Ruler className="h-4 w-4" />;
        case 'Apparel': return <Package className="h-4 w-4" />;
        case 'Technical Poster': return <FileText className="h-4 w-4" />; // Icon for Technical Poster
        default: return <Package className="h-4 w-4" />;
    }
}

export function MerchCard({ item }: MerchCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false); // Simple state for favorite toggle
  const { toast } = useToast(); // Initialize toast

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening modal when clicking heart
    setIsFavorite(!isFavorite);
    toast({
        title: isFavorite ? "Removed from Favorites" : "Added to Favorites",
        description: `${item.name} has been ${isFavorite ? 'removed from' : 'added to'} your favorites.`,
        variant: isFavorite ? 'default' : 'default', // Can customize variant
    });
    // TODO: Add logic to save favorite state (e.g., localStorage or user profile)
  };

  const handleBuyNowClick = () => {
    const recipientEmail = "Astroman6569@gmail.com"; // Target email address
    // Use pre-defined or dynamically generate subject/body
    const subject = `Rocket Merch Purchase Request: ${item.name}`;
    const body = `Hello, I am interested in purchasing the following product from your Rocket Merch store:\n\nProduct Name: ${item.name}\nType: ${item.type}\nPrice: ${formatPrice(item.price)}\n\nPlease let me know the next steps for purchase and delivery.\n\nThank you!`;

    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Show toast notification
    toast({
        title: "Redirecting...",
        description: "Opening your email application.",
    });

    // Redirect to mail client
    // Use timeout to allow toast to display briefly
    setTimeout(() => {
         window.location.href = mailtoLink;
    }, 500); // 0.5 second delay

  };


  return (
    // Apply perspective and transition styles for hover effect
    <div className="group [perspective:1000px]">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}> {/* Move Dialog to wrap Card */}
        <Card
          className="flex flex-col h-full overflow-hidden transition-all duration-300 ease-out group-hover:shadow-xl group-hover:shadow-primary/20 group-hover:scale-[1.03] group-hover:[transform:rotateY(3deg)] animate-launch relative border-border/50 hover:border-primary/50"
        >
          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute top-2 right-2 z-20 h-8 w-8 rounded-full bg-background/70 hover:bg-background/90",
              isFavorite ? 'text-red-500' : 'text-muted-foreground' // Use red for favorite
            )}
            onClick={handleFavoriteToggle}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
          </Button>

          <CardHeader className="p-0 relative">
             {/* Trigger 1: Image */}
            <DialogTrigger asChild>
              <div className="relative aspect-square w-full overflow-hidden cursor-pointer">
                  <Image
                      src={item.image}
                      alt={`Image of ${item.name}`}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-110"
                      data-ai-hint={`${item.type.toLowerCase()} ${item.name}`}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                   {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </DialogTrigger>
          </CardHeader>

          {/* Adjusted padding and text size for small screens */}
          <CardContent className="flex-grow p-3 sm:p-4 space-y-1">
             {/* Trigger 2: Title */}
             <DialogTrigger asChild>
                 <CardTitle className="text-base sm:text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors cursor-pointer">{item.name}</CardTitle>
             </DialogTrigger>
            <CardDescription className="text-xs text-muted-foreground flex items-center gap-1.5">
               {getTypeIcon(item.type)} {item.type}
            </CardDescription>
             {/* Adjusted text size and padding for small screens */}
             <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 pt-1">{item.description}</p>
          </CardContent>

          {/* Adjusted padding for small screens */}
          <CardFooter className="p-3 sm:p-4 pt-2 flex items-center justify-between">
            <span className="text-lg sm:text-xl font-bold text-primary">{formatPrice(item.price)}</span>
             {/* Trigger 3: Details Button */}
            <DialogTrigger asChild>
               <Button variant="outline" size="sm">Details</Button>
            </DialogTrigger>
          </CardFooter>
        </Card>

         {/* --- Modal Content --- */}
         {/* Adjusted padding, added max-height and overflow for small screens */}
        <DialogContent className="max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-0 p-0 max-h-[85vh] overflow-y-auto">
            {/* Modal Image - Adjusted for small screens */}
            <div className="relative aspect-video md:aspect-auto md:h-full overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-tr-none md:sticky md:top-0">
               <Image
                  src={item.image}
                  alt={`Image of ${item.name}`}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={`${item.type.toLowerCase()} ${item.name} detail`}
                />
            </div>
            {/* Modal Details - Scrollable independently if needed, but parent scroll should handle */}
            <div className="p-4 sm:p-6 flex flex-col">
              <DialogHeader className="mb-4">
                <DialogTitle className="text-xl sm:text-2xl mb-1">{item.name}</DialogTitle>
                <DialogDescription className="flex items-center gap-2 text-sm">
                   {getTypeIcon(item.type)} {item.type}
                </DialogDescription>
              </DialogHeader>
              {/* ScrollArea could be used here if only this part needs scrolling */}
              {/* <ScrollArea className="flex-grow mb-6 pr-2"> */}
              <div className="flex-grow space-y-3 text-sm mb-6">
                 <p className="text-muted-foreground">{item.description}</p>
                 {item.techDetails && (
                     <div className="flex items-start gap-2 text-muted-foreground">
                        <Info className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                        <span>{item.techDetails}</span>
                    </div>
                 )}
              </div>
               {/* </ScrollArea> */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
                <span className="text-xl sm:text-2xl font-bold text-primary">{formatPrice(item.price)}</span>
                 {/* Updated Buy Now Button */}
                 <Button size="lg" onClick={handleBuyNowClick} className="group/buy w-full sm:w-auto">
                    <ShoppingCart className="mr-2 h-5 w-5 transition-transform duration-200 group-hover/buy:scale-110" /> Buy Now
                 </Button>
              </div>
            </div>
        </DialogContent>
        {/* --- End Modal Content --- */}
      </Dialog> {/* Close Dialog wrapper */}
    </div>
  );
}

