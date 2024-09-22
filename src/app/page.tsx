import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Github, Star, GitPullRequest, Tags } from "lucide-react"
import Link from "next/link"
import SignInButton from "./components/SignInButton"
import { ApiDemo } from "./components/ApiDemo"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="px-4 lg:px-6 h-16 flex items-center backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="#">
          <Github className="h-6 w-6 mr-2" />
          <span className="font-bold">Dandi Github Analyzer</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-4 ml-4">
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboards">Dashboards</Link>
          </Button>
          <SignInButton />
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                  Unlock GitHub Insights with Dandi
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Get powerful insights, summaries, and analytics for open source GitHub repositories. Discover trends, track important updates, and stay ahead of the curve.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">Get Started</Button>
                <Button variant="outline" size="lg" className="border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-800">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Key Features</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <Star className="w-8 h-8 mb-2" />
                  <CardTitle>Repository Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Get comprehensive summaries and analytics for any GitHub repository.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <GitPullRequest className="w-8 h-8 mb-2" />
                  <CardTitle>Important PRs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Track and analyze the most impactful pull requests in real-time.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Tags className="w-8 h-8 mb-2" />
                  <CardTitle>Version Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Stay informed about the latest version releases and changelogs.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Try It Out</h2>
            <ApiDemo />
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Pricing Plans</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle>Free</CardTitle>
                  <CardDescription>For individual developers</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">$0</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">per month</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <Check className="w-5 h-5 mr-2 text-green-500" />
                      Basic repository insights
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 mr-2 text-green-500" />
                      Limited to 200 requests
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 mr-2 text-green-500" />
                      Daily updates
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
              <Card className="relative">
              <Badge className="absolute top-4 right-4" variant="secondary">Coming Soon</Badge>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>For professional developers</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">$19</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">per month</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <Check className="w-5 h-5 mr-2 text-green-500" />
                      Advanced repository insights
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 mr-2 text-green-500" />
                      Unlimited repositories
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 mr-2 text-green-500" />
                      Real-time updates
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                <Button className="w-full" disabled>Coming Soon</Button>
                </CardFooter>
              </Card>
              <Card className="relative">
              <Badge className="absolute top-4 right-4" variant="secondary">Coming Soon</Badge>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>For large teams and organizations</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">Custom</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">contact for pricing</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <Check className="w-5 h-5 mr-2 text-green-500" />
                      Custom integrations
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 mr-2 text-green-500" />
                      Dedicated support
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 mr-2 text-green-500" />
                      Advanced analytics
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                <Button className="w-full" disabled>Coming Soon</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Dandi Github Analyzer. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="/privacy-policy">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="/terms-of-service">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}