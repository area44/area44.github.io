import logoUrl from '@/assets/logo.svg';

export default function LandingPage() {
  const year = new Date().getFullYear();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header
        className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-white/60"
        role="banner"
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center space-x-3">
            <div className="flex size-12 items-center justify-center rounded-lg bg-primary">
              <img
                src={logoUrl}
                alt="AREA44 logo"
                className="max-h-8 w-auto object-contain"
              />
            </div>
            <span className="text-lg font-semibold tracking-tight">AREA44</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1" role="main">
        <section className="relative isolate overflow-hidden py-24 sm:py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              {/* Left Column: Text */}
              <div className="space-y-6">
                <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight">
                  Welcome to AREA44
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl">
                  <strong>AREA44</strong> is the creative playground of 
                  <a href="https://x.com/torn4dom4n" target="_blank" rel="noopener noreferrer" className="text-primary underline ml-1">
                    @torn4dom4n
                  </a> - 
                  a space where ideas come alive through code, design, and boundless imagination.
                </p>
                <div>
                  <a
                    href="#contact"
                    aria-label="Contact AREA44"
                    className="inline-block rounded-md bg-primary px-6 py-3 text-white font-medium shadow hover:bg-primary/90 transition"
                  >
                    Contact Us
                  </a>
                </div>
              </div>

              {/* Right Column: Illustration or Visual */}
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl pointer-events-none"
                  aria-hidden="true"
                />
                <div className="relative aspect-square w-full max-w-md mx-auto rounded-xl bg-muted/30 shadow-inner border border-muted/40">
                  {/* Replace below div with an image or SVG if desired */}
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    {/* Optional placeholder content */}
                    <span className="text-xl font-medium">Creative Space</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-muted/40 py-10 mt-auto" role="contentinfo">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground border-t pt-6">
          <p>&copy; {year} AREA44. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
