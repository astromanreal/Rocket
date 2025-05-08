

'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Settings as SettingsIcon, Sun, Moon, Palette, ALargeSmall } from 'lucide-react'; // Changed TextFontSize to ALargeSmall
import { cn } from '@/lib/utils';

// Define available primary colors (HSL format string for direct CSS variable setting)
const colorOptions = [
  { label: 'Vivid Orange', value: '24 95% 53%' }, // Default
  { label: 'Electric Blue', value: '195 100% 50%' },
  { label: 'Emerald Green', value: '145 63% 42%' },
  { label: 'Ruby Red', value: '0 72% 51%' },
  { label: 'Royal Purple', value: '262 52% 47%' },
  { label: 'Golden Yellow', value: '45 90% 55%' }, // Existing secondary
];

// Define font size options
const fontSizeOptions = [
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' }, // Default
  { label: 'Large', value: 'lg' },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [primaryColor, setPrimaryColor] = useState<string>(colorOptions[0].value); // Default HSL
  const [fontSize, setFontSize] = useState<string>(fontSizeOptions[1].value); // Default 'md'

  // Effect to ensure component is mounted before rendering theme-dependent UI
  // Also load settings from localStorage
  useEffect(() => {
    setMounted(true);
    const storedColor = localStorage.getItem('primaryColor');
    const storedFontSize = localStorage.getItem('fontSize');

    if (storedColor && colorOptions.some(c => c.value === storedColor)) {
      setPrimaryColor(storedColor);
      document.documentElement.style.setProperty('--primary', storedColor);
    } else {
      // Set default if nothing stored or invalid
       document.documentElement.style.setProperty('--primary', colorOptions[0].value);
    }

    if (storedFontSize && fontSizeOptions.some(f => f.value === storedFontSize)) {
      setFontSize(storedFontSize);
      document.documentElement.classList.remove('font-size-sm', 'font-size-md', 'font-size-lg');
      document.documentElement.classList.add(`font-size-${storedFontSize}`);
    } else {
      // Set default if nothing stored or invalid
      document.documentElement.classList.add(`font-size-${fontSizeOptions[1].value}`);
    }

  }, []);

  // Effect to save settings to localStorage and apply them
   useEffect(() => {
        if (!mounted) return; // Don't run on initial server render

        // Save and apply color
        localStorage.setItem('primaryColor', primaryColor);
        document.documentElement.style.setProperty('--primary', primaryColor);

        // Save and apply font size
        localStorage.setItem('fontSize', fontSize);
        document.documentElement.classList.remove('font-size-sm', 'font-size-md', 'font-size-lg');
        document.documentElement.classList.add(`font-size-${fontSize}`);

    }, [primaryColor, fontSize, mounted]);


  if (!mounted) {
    // Render a placeholder or skeleton while waiting for mount
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
            Manage your application preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Theme Setting */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold flex items-center gap-2"><Sun className="h-5 w-5" />/<Moon className="h-5 w-5" /> Theme</Label>
            <RadioGroup
                defaultValue={theme}
                onValueChange={setTheme}
                className="flex space-x-4"
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

          {/* Primary Color Setting */}
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

          {/* Font Size Setting */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold flex items-center gap-2"><ALargeSmall className="h-5 w-5" /> Font Size</Label> {/* Changed icon */}
            <RadioGroup
                value={fontSize}
                onValueChange={setFontSize}
                className="flex space-x-4"
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

           {/* Example Button to see color change */}
          {/* <div className="pt-4 border-t">
             <Button>Example Button</Button>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}

