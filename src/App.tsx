import logoUrl from '@/assets/logo.svg'; 

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-white/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <img src={logoUrl} alt="Logo" />
            </div>
            <span className="text-xl font-bold">AREA44</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-linear-to-br from-primary/5 via-white to-secondary/5">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  AREA44
                </h1>
                <p className="text-xl text-muted-foreground max-w-[600px]">
                  AREA44, created by @torn4dom4n, is an innovative collective that thrives on building intriguing and captivating projects.
                </p>
              </div>

            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-muted/50 py-16">
          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} AREA44. All rights reserved.</p>
          </div>
      </footer>
    </div>
  )
}
