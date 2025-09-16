import { ChatWidget } from "@/components/ChatWidget";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import {
  Award,
  Calculator,
  FileText,
  Mail,
  MapPin,
  Phone,
  TrendingUp,
  User,
} from "lucide-react";
import Image from "next/image";

export default async function Home() {
  const [rows] = await db.query(
    "SELECT id, sender, message_text FROM ai_agent_chats1 ORDER BY id DESC LIMIT 10"
  );

  return (
    // <div className="min-h-screen bg-background">
    //   <main className="container mx-auto px-4 py-8">
    //     <h1 className="text-4xl font-bold text-center mb-8">
    //       Welcome to Our Website
    //     </h1>
    //     <p className="text-center text-muted-foreground mb-8">
    //       Click the chat widget in the bottom right corner to start a
    //       conversation!
    //     </p>
    //   </main>
    //   <ChatWidget rows={rows} />
    // </div>
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 to-accent/5 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                Eric Thompson, CPA
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-pretty">
                Empowering Financial Decisions with 15+ Years of Expertise in
                Tax Planning, Investment Advisory, and Strategic Business
                Consulting
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Schedule Consultation
                </Button>
                <Button size="lg" variant="outline">
                  Download Tax Guide
                </Button>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative">
                <Image
                  src="/professional-cpa-advisor-eric-in-business-suit.jpg"
                  alt="Eric Thompson, CPA"
                  fill
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground p-4 rounded-lg shadow-lg">
                  <div className="text-2xl font-bold">15+</div>
                  <div className="text-sm">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Areas of Expertise
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive financial services tailored to your unique needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calculator className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Tax Planning & Preparation</CardTitle>
                <CardDescription>
                  Strategic tax planning to minimize liability and maximize
                  savings for individuals and businesses
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Investment Advisory</CardTitle>
                <CardDescription>
                  Portfolio management and investment strategies aligned with
                  your financial goals and risk tolerance
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Business Consulting</CardTitle>
                <CardDescription>
                  Financial analysis, budgeting, and strategic planning to drive
                  business growth and profitability
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <User className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Estate Planning</CardTitle>
                <CardDescription>
                  Comprehensive estate planning strategies to protect and
                  transfer wealth efficiently
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Audit & Assurance</CardTitle>
                <CardDescription>
                  Independent financial statement audits and assurance services
                  for businesses and organizations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calculator className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Bookkeeping Services</CardTitle>
                <CardDescription>
                  Accurate financial record keeping and monthly reporting to
                  keep your business on track
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Professional Journey
            </h2>
            <p className="text-xl text-muted-foreground">
              A track record of excellence in financial advisory services
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>
                        Senior Partner - Thompson & Associates CPA
                      </CardTitle>
                      <CardDescription className="text-lg">
                        2018 - Present
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">Current</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Leading a team of 12 professionals, managing over $50M in
                    client assets, specializing in high-net-worth individuals
                    and mid-market businesses.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>
                        Tax Manager - BigFour Accounting Firm
                      </CardTitle>
                      <CardDescription className="text-lg">
                        2015 - 2018
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Managed complex tax engagements for Fortune 500 companies,
                    developed tax strategies saving clients over $2M annually.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>
                        Senior Tax Associate - Regional CPA Firm
                      </CardTitle>
                      <CardDescription className="text-lg">
                        2009 - 2015
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Specialized in individual and small business tax
                    preparation, built expertise in estate planning and
                    succession strategies.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials & Certifications */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Credentials & Certifications
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Award className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">CPA License</h3>
                <p className="text-sm text-muted-foreground">
                  State of California
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Award className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">CFP Certification</h3>
                <p className="text-sm text-muted-foreground">
                  Certified Financial Planner
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Award className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">MBA Finance</h3>
                <p className="text-sm text-muted-foreground">
                  Stanford University
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Award className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">CFA Charter</h3>
                <p className="text-sm text-muted-foreground">
                  Chartered Financial Analyst
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              What Clients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4 italic">
                  Erics strategic tax planning saved our company over $200K last
                  year. His expertise and attention to detail are unmatched.
                </p>
                <div className="font-semibold">Sarah Johnson</div>
                <div className="text-sm text-muted-foreground">
                  CEO, TechStart Inc.
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4 italic">
                  Professional, knowledgeable, and always available when we need
                  guidance. Eric has been instrumental in our financial success.
                </p>
                <div className="font-semibold">Michael Chen</div>
                <div className="text-sm text-muted-foreground">
                  Founder, Chen Enterprises
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4 italic">
                  Eric helped us navigate complex estate planning with ease. His
                  comprehensive approach gave us complete peace of mind.
                </p>
                <div className="font-semibold">Robert & Linda Davis</div>
                <div className="text-sm text-muted-foreground">
                  Private Clients
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Schedule a consultation today and discover how strategic financial
              planning can transform your financial future.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div className="flex flex-col items-center">
              <Phone className="h-12 w-12 mb-4 opacity-90" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="opacity-90">(555) 123-4567</p>
            </div>

            <div className="flex flex-col items-center">
              <Mail className="h-12 w-12 mb-4 opacity-90" />
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="opacity-90">eric@thompsoncpa.com</p>
            </div>

            <div className="flex flex-col items-center">
              <MapPin className="h-12 w-12 mb-4 opacity-90" />
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="opacity-90">
                123 Financial District
                <br />
                San Francisco, CA 94111
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="secondary"
              className="bg-accent hover:bg-accent/90"
            >
              Schedule Free Consultation
            </Button>
          </div>
        </div>
      </section>

      <ChatWidget rows={rows} />
    </div>
  );
}
