
'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Settings as SettingsIcon, Sun, Moon, Palette, ALargeSmall, Sparkles, Eye, Baseline } from 'lucide-react';
import { cn } from '@/lib/utils';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';
const settingsPageUrl = `${siteUrl}/settings`;


const colorOptions = [
  { label: 'Vivid Orange', value: '24 95% 53%' }, 
  { label: 'Electric Blue', value: '195 100% 50%' },
  { label: 'Emerald Green', value: '145 63% 42%' },
  { label: 'Ruby Red', value: '0 72% 51%' },
  { label: 'Royal Purple', value: '262 52% 47%' },
  { label: 'Golden Yellow', value: '45 90% 55%' }, 
];

const fontSizeOptions = [
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' }, 
  { label: 'Large', value: 'lg' },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [primaryColor, setPrimaryColor] = useState<string>(colorOptions[0].value);
  const [fontSize, setFontSize] = useState<string>(fontSizeOptions[1].value);
  const [starfieldEnabled, setStarfieldEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [enhancedReadability, setEnhancedReadability] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.title = 'Application Settings | Rocketpedia';

    // Add canonical link tag
    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', settingsPageUrl);

    // Add OpenGraph and Twitter meta tags
    const setMetaTag = (type: 'property' | 'name', key: string, content: string) => {
        let element = document.querySelector(`meta[${type}='${key}']`) as HTMLMetaElement;
        if (!element) {
            element = document.createElement('meta');
            element.setAttribute(type, key);
            document.head.appendChild(element);
        }
        element.setAttribute('content', content);
    };

    setMetaTag('property', 'og:title', 'Application Settings | Rocketpedia');
    setMetaTag('property', 'og:description', 'Customize your Rocketpedia experience. Adjust theme, colors, font size, and other visual preferences.');
    setMetaTag('property', 'og:url', settingsPageUrl);
    setMetaTag('name', 'robots', 'noindex, nofollow'); // Settings pages are typically not indexed

    // Load stored preferences
    const storedColor = localStorage.getItem('primaryColor');
    const storedFontSize = localStorage.getItem('fontSize');
    const storedStarfield = localStorage.getItem('starfieldEnabled');
    const storedAnimations = localStorage.getItem('animationsEnabled');
    const storedReadability = localStorage.getItem('enhancedReadability');

    if (storedColor && colorOptions.some(c => c.value === storedColor)) {
      setPrimaryColor(storedColor);
      document.documentElement.style.setProperty('--primary', storedColor);
    } else {
       document.documentElement.style.setProperty('--primary', colorOptions[0].value);
    }

    if (storedFontSize && fontSizeOptions.some(f => f.value === storedFontSize)) {
      setFontSize(storedFontSize);
    } else {
      setFontSize(fontSizeOptions[1].value); // Default to medium
    }

    if (storedStarfield) {
      const parsedStarfield = JSON.parse(storedStarfield);
      setStarfieldEnabled(parsedStarfield);
    }

    if (storedAnimations) {
      const parsedAnimations = JSON.parse(storedAnimations);
      setAnimationsEnabled(parsedAnimations);
    }

    if (storedReadability) {
      const parsedReadability = JSON.parse(storedReadability);
      setEnhancedReadability(parsedReadability);
    }
  }, []);

   useEffect(() => {
        if (!mounted) return;

        localStorage.setItem('primaryColor', primaryColor);
        document.documentElement.style.setProperty('--primary', primaryColor);

        localStorage.setItem('fontSize', fontSize);
        document.documentElement.classList.remove('font-size-sm', 'font-size-md', 'font-size-lg');
        document.documentElement.classList.add(`font-size-${fontSize}`);

        localStorage.setItem('starfieldEnabled', JSON.stringify(starfieldEnabled));
        if (starfieldEnabled) {
          document.documentElement.classList.remove('no-starfield');
        } else {
          document.documentElement.classList.add('no-starfield');
        }

        localStorage.setItem('animationsEnabled', JSON.stringify(animationsEnabled));
        if (animationsEnabled) {
            document.documentElement.classList.remove('no-animations');
        } else {
            document.documentElement.classList.add('no-animations');
        }

        localStorage.setItem('enhancedReadability', JSON.stringify(enhancedReadability));
        if (enhancedReadability) {
            document.documentElement.classList.add('enhanced-readability-mode');
        } else {
            document.documentElement.classList.remove('enhanced-readability-mode');
        }

    }, [primaryColor, fontSize, starfieldEnabled, animationsEnabled, enhancedReadability, mounted]);


  if (!mounted) {
     return (
       <div className="container mx-auto px-4 py-12">
           <Card className="max-w-lg mx-auto animate-pulse">
                <CardHeader className="text-center">
                    <SettingsIcon className="mx-auto h-12 w-12 text-muted mb-4" />
                    <div className="h-8 bg-muted rounded w-3/4 mx-auto mb-2"></div>
                    <div className="h-5 bg-muted rounded w-1/2 mx-auto"></div>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="h-10 bg-muted rounded w-full"></div>
                    <div className="h-10 bg-muted rounded w-full"></div>
                    <div className="h-10 bg-muted rounded w-full"></div>
                    <div className="h-10 bg-muted rounded w-full"></div>
                    <div className="h-10 bg-muted rounded w-full"></div>
                    <div className="h-10 bg-muted rounded w-full"></div>
                </CardContent>
           </Card>
       </div>
     );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-lg mx-auto animate-launch">
        <CardHeader className="text-center">
          <SettingsIcon className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-3xl font-bold">Settings</CardTitle>
          <CardDescription>
            Customize your Rocketpedia experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-3">
            <Label className="text-lg font-semibold flex items-center gap-2"><Sun className="h-5 w-5" />/<Moon className="h-5 w-5" /> Theme</Label>
            <RadioGroup
                value={theme} // Ensure Radigroup is controlled by theme state
                onValueChange={setTheme}
                className="flex flex-wrap gap-x-4 gap-y-2"
            >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="theme-light" />
                    <Label htmlFor="theme-light">Light</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="theme-dark" />
                    <Label htmlFor="theme-dark">Dark</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="theme-system" />
                    <Label htmlFor="theme-system">System</Label>
                </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label htmlFor="primary-color-select" className="text-lg font-semibold flex items-center gap-2"><Palette className="h-5 w-5" /> Primary Color</Label>
            <Select value={primaryColor} onValueChange={setPrimaryColor}>
              <SelectTrigger id="primary-color-select">
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                     <div className="flex items-center gap-2">
                        <span className="inline-block w-4 h-4 rounded-full border" style={{ backgroundColor: `hsl(${color.value})` }}></span>
                        {color.label}
                     </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
             <p className="text-xs text-muted-foreground">Changes affect buttons, links, and highlights.</p>
          </div>

          <div className="space-y-3">
            <Label className="text-lg font-semibold flex items-center gap-2"><ALargeSmall className="h-5 w-5" /> Font Size</Label>
            <RadioGroup
                value={fontSize}
                onValueChange={setFontSize}
                className="flex flex-wrap gap-x-4 gap-y-2"
            >
              {fontSizeOptions.map((option) => (
                 <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={`font-${option.value}`} />
                    <Label htmlFor={`font-${option.value}`}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
             <p className="text-xs text-muted-foreground">Adjust the overall text size across the site.</p>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="starfield-toggle" className="text-lg font-semibold flex items-center gap-2">
              <Sparkles className="h-5 w-5" /> Starfield Background
            </Label>
            <Switch
              id="starfield-toggle"
              checked={starfieldEnabled}
              onCheckedChange={setStarfieldEnabled}
              aria-label="Toggle starfield background"
            />
          </div>

           <div className="flex items-center justify-between">
            <Label htmlFor="animations-toggle" className="text-lg font-semibold flex items-center gap-2">
              <Eye className="h-5 w-5" /> UI Animations
            </Label>
            <Switch
              id="animations-toggle"
              checked={animationsEnabled}
              onCheckedChange={setAnimationsEnabled}
              aria-label="Toggle UI animations"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="readability-toggle" className="text-lg font-semibold flex items-center gap-2">
              <Baseline className="h-5 w-5" /> Enhanced Readability Mode
            </Label>
            <Switch
              id="readability-toggle"
              checked={enhancedReadability}
              onCheckedChange={setEnhancedReadability}
              aria-label="Toggle enhanced readability mode"
            />
          </div>
          <p className="text-xs text-muted-foreground -mt-6">Increases line height and letter spacing for text.</p>

        </CardContent>
      </Card>
    </div>
  );
}
