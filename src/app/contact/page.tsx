import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, ExternalLink } from 'lucide-react';

// Simple SVG for Twitter (X), Instagram, and GitHub
const TwitterIcon = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current">
    <title>X</title>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const InstagramIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current"><title>Instagram</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.053 1.17-.249 1.805-.413 2.227-.217.562-.477.96-.896 1.381-.42.419-.819.679-1.381.896-.422.164-1.057.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.585-.015-4.85-.074c-1.17-.053-1.805-.249-2.227-.413-.562-.217-.96-.477-1.381-.896-.419-.42-.679-.819-.896-1.381-.165-.423-.36-1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.015-3.585.071-4.85c.055-1.17.249-1.805.415-2.227.217-.562.477.96.896-1.382.42-.419.819-.679 1.381-.896.423-.165 1.057-.36 2.227-.415C8.415 2.176 8.797 2.16 12 2.16zm0 5.458c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.015-4.5-4.5-4.5zm0 7.162c-1.468 0-2.662-1.194-2.662-2.662s1.194-2.662 2.662-2.662 2.662 1.194 2.662 2.662-1.194 2.662-2.662 2.662zm5.338-9.87a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z"/></svg>
);

const GithubIcon = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current">
    <title>GitHub</title>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);


export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-lg mx-auto animate-launch">
        <CardHeader className="text-center">
          <Mail className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-3xl font-bold">Contact Us</CardTitle>
          <CardDescription>
            Get in touch or follow us on social media.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Social Links */}
          <div className="space-y-3">
             <h3 className="text-lg font-semibold text-center mb-3">Follow Us</h3>
             <div className="flex flex-wrap justify-center gap-4"> {/* Added flex-wrap and gap-4 */}
                 <Button variant="outline" size="lg" asChild className="group">
                    <a href="https://x.com/Sathyamsarthak" target="_blank" rel="noopener noreferrer">
                        <TwitterIcon />
                        <span className="ml-2">Twitter / X</span>
                        <ExternalLink className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                </Button>
                 <Button variant="outline" size="lg" asChild className="group">
                    <a href="https://www.instagram.com/srishikharji/" target="_blank" rel="noopener noreferrer">
                        <InstagramIcon />
                        <span className="ml-2">Instagram</span>
                        <ExternalLink className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                </Button>
                <Button variant="outline" size="lg" asChild className="group">
                    <a href="https://github.com/astromanreal" target="_blank" rel="noopener noreferrer">
                        <GithubIcon />
                        <span className="ml-2">GitHub</span>
                        <ExternalLink className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                </Button>
             </div>
          </div>

          {/* Contact Details */}
           <div className="space-y-3 pt-4 border-t">
             <h3 className="text-lg font-semibold text-center mb-3">Direct Contact</h3>
             <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary" />
                <span>+91 8102116569</span>
            </div>
             <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary" />
                <span>Astroman6569@gmail.com</span>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
