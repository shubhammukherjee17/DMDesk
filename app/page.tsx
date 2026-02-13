import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BarChart3, Package, Users, ShieldCheck, Check, Menu, Twitter, Instagram, Linkedin, Github } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { SubscriptionButton } from "@/components/subscription-button"


export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2" href="#">
          <Package className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">DMDesk</span>
        </Link>
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4 flex items-center" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4 flex items-center" href="#pricing">
            Pricing
          </Link>
          <Link href="/login">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Get Started</Button>
          </Link>
        </nav>
        <div className="ml-auto md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col gap-4 mt-4">
                <Link className="text-lg font-medium hover:underline underline-offset-4" href="#features">
                  Features
                </Link>
                <Link className="text-lg font-medium hover:underline underline-offset-4" href="#pricing">
                  Pricing
                </Link>
                <div className="flex flex-col gap-2 mt-2">
                  <Link href="/login">
                    <Button variant="ghost" className="w-full justify-start">Login</Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                  The CRM for Instagram Sellers
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 text-lg md:text-xl dark:text-gray-400">
                  Manage your orders, track customers, and simplify shipping.
                  DMDesk turns your DMs into a professional business dashboard.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
                <Link href="/signup" className="w-full sm:w-auto">
                  <Button size="lg" className="h-12 px-8 text-lg w-full sm:w-auto">
                    Start for Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#demo" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="h-12 px-8 text-lg w-full sm:w-auto">
                    View Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Everything you need to scale</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Stop using spreadsheets and notebooks. Professionalize your operations with tools designed for social commerce.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
              <div className="flex flex-col items-center space-y-4 p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900/20">
                  <Package className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold">Order Management</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Track orders from "Pending Payment" to "Delivered" with a simple drag-and-drop interface.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 bg-green-100 rounded-full dark:bg-green-900/20">
                  <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold">Customer CRM</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Know your best customers. Track spending history and save shipping details automatically.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 bg-purple-100 rounded-full dark:bg-purple-900/20">
                  <BarChart3 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold">Revenue Analytics</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  See your monthly growth at a glance. Visual charts for revenue, orders, and products.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Pricing</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple, Transparent Pricing</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Choose the plan that's right for your business. No hidden fees.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 max-w-5xl mx-auto">
              {/* Starter Plan */}
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl">Starter</CardTitle>
                  <CardDescription>Perfect for new sellers</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">Free</span>
                    <span className="text-muted-foreground ml-1">/ forever</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" /> <span>Up to 50 orders/mo</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" /> <span>Basic CRM</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" /> <span>Address collection</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/signup" className="w-full">
                    <Button className="w-full" variant="outline">Get Started</Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Pro Plan */}
              <Card className="flex flex-col border-primary relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-bl-lg">
                  Popular
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">Pro</CardTitle>
                  <CardDescription>For growing businesses</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$29</span>
                    <span className="text-muted-foreground ml-1">/ month</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" /> <span>Unlimited orders</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" /> <span>Advanced Analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" /> <span>Export to CSV</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" /> <span>Priority Support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <SubscriptionButton
                    planType="pro"
                    amount={29}
                    text="Upgrade to Pro"
                    className="w-full"
                  />
                </CardFooter>
              </Card>

              {/* Business Plan */}
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl">Business</CardTitle>
                  <CardDescription>For volume sellers</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$99</span>
                    <span className="text-muted-foreground ml-1">/ month</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" /> <span>Everything in Pro</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" /> <span>Custom Branding</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" /> <span>Multi-user access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" /> <span>Dedicated Account Manager</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="mailto:sales@dmdesk.com" className="w-full">
                    <Button className="w-full" variant="outline">Contact Sales</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-blue-600 px-3 py-1 text-sm text-white">Security</div>
                <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Enterprise-grade security for your small business
                </h2>
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  href="#"
                >
                  Learn more
                </Link>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                  Built on top of Supabase, DMDesk ensures your customer data is encrypted and secure.
                  We handle the technical complexity so you can focus on selling.
                </p>
                <div className="grid gap-4 min-[400px]:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Bank-level encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Daily backups</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container px-4 md:px-6 py-12 md:py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-2 lg:col-span-2">
              <Link className="flex items-center gap-2 mb-4" href="#">
                <Package className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl">DMDesk</span>
              </Link>
              <p className="text-muted-foreground text-sm max-w-xs mb-6">
                The all-in-one CRM for social commerce. Turn your DMs into sales and streamline your operations.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Integrations</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Changelog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>© 2026 DMDesk Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
