// src/components/header.tsx
'use client'; // Required for state, Sheet, and DropdownMenu

import { useState } from 'react';
import Link from 'next/link';
import { Rocket, Sparkles, Compass, Mail, Settings, Scale, Users, User, Menu, X, FlaskConical, Building, ShoppingCart, ChevronDown } from 'lucide-react'; // Added ShoppingCart, ChevronDown
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Import DropdownMenu components
import { cn } from '@/lib/utils';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Define primary navigation links (always visible on desktop)
  const primaryNavLinks = [
    { href: "/explore", label: "Explore Rockets", icon: Compass },
    { href: "/agencies", label: "Agencies", icon: Building },
  ];

  // Define links to be placed in the "More" dropdown on desktop
  const dropdownNavLinks = [
    { href: "/rocket-science", label: "Rocket Science", icon: FlaskConical },
    { href: "/merch", label: "Merch", icon: ShoppingCart },
    { href: "/ai-expert", label: "AI Expert", icon: Sparkles },
    { href: "/forum", label: "Community Forum", icon: Users },
  ];

  // Combine all links for mobile menu usage
  const allNavLinks = [...primaryNavLinks, ...dropdownNavLinks];

  // Icon links remain the same
  const iconLinks = [
     { href: "/explore/compare", label: "Compare Rockets", icon: Scale },
     { href: "/contact", label: "Contact", icon: Mail },
     { href: "/profile", label: "Profile", icon: User },
     { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* Left Side: Logo */}
        <Link href="/" className="ml-2 mr-6 flex items-center space-x-2 flex-shrink-0">
          <Rocket className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block">
            Rocketpedia
          </span>
        </Link>

        {/* Desktop Navigation (Hidden on small screens) */}
        <nav className="hidden md:flex flex-1 items-center space-x-1"> {/* Reduced base spacing */}
          {/* Primary Links */}
          {primaryNavLinks.map((link) => (
             <Link key={link.href} href={link.href} passHref>
                <Button variant="ghost" className="text-sm font-medium px-3"> {/* Standard padding */}
                   <link.icon className="mr-1.5 h-4 w-4" />
                   {link.label}
                </Button>
             </Link>
          ))}

           {/* More Dropdown */}
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium px-3">
                    More
                    <ChevronDown className="ml-1.5 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                {dropdownNavLinks.map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                        <Link href={link.href} className="flex items-center w-full cursor-pointer">
                           <link.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                           {link.label}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
           </DropdownMenu>
        </nav>

        {/* Desktop Icons (Hidden on small screens) */}
        <div className="hidden md:flex items-center space-x-1 ml-auto flex-shrink-0">
          <TooltipProvider delayDuration={0}>
            {iconLinks.map((link) => (
               <Tooltip key={link.href}>
                 <TooltipTrigger asChild>
                   <Link href={link.href} passHref>
                     <Button variant="ghost" size="icon" className="h-9 w-9" aria-label={link.label}>
                       <link.icon className="h-5 w-5" />
                     </Button>
                   </Link>
                 </TooltipTrigger>
                 <TooltipContent>
                   <p>{link.label}</p>
                 </TooltipContent>
               </Tooltip>
            ))}
            <ModeToggle />
          </TooltipProvider>
        </div>

        {/* Mobile Menu Trigger (Visible only on small screens) */}
        <div className="flex items-center md:hidden ml-auto">
          <ModeToggle /> {/* Keep ModeToggle accessible */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm p-0">
              <SheetHeader className="flex flex-row justify-between items-center space-y-0 p-6 pb-0">
                 <SheetTitle className="flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-primary"/>
                    Rocketpedia
                 </SheetTitle>
                 <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close Menu</span>
                    </Button>
                 </SheetClose>
              </SheetHeader>
              <Separator className="my-4" />
              <ScrollArea className="h-[calc(100%-4rem-1px)] px-6 pb-6">
                 {/* Use allNavLinks for the mobile menu */}
                 <nav className="flex flex-col space-y-2">
                    {allNavLinks.map((link) => (
                    <SheetClose key={`mobile-${link.href}`} asChild>
                        <Link href={link.href} passHref>
                            <Button variant="ghost" className="justify-start text-base py-3 h-auto">
                            <link.icon className="mr-3 h-5 w-5 text-muted-foreground" />
                            {link.label}
                            </Button>
                        </Link>
                    </SheetClose>
                    ))}
                    <Separator className="my-4" />
                    {iconLinks.map((link) => (
                    <SheetClose key={`mobile-icon-${link.href}`} asChild>
                        <Link href={link.href} passHref>
                            <Button variant="ghost" className="justify-start text-base py-3 h-auto">
                                <link.icon className="mr-3 h-5 w-5 text-muted-foreground" />
                                {link.label}
                            </Button>
                        </Link>
                    </SheetClose>
                    ))}
                 </nav>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
