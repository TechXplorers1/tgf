import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  ShieldCheck,
  BarChart3,
  CheckCircle2,
  BadgeCheck,
} from "lucide-react";

export default function TransparencySection() {
  const reports = [
    {
      icon: FileText,
      title: "Annual Report 2024",
      desc: "Complete overview of our programs and financial statements.",
      href: "#", // replace with your PDF link
    },
    {
      icon: ShieldCheck,
      title: "Financial Audit 2024",
      desc: "Third-party audited financial statements.",
      href: "#",
    },
    {
      icon: BarChart3,
      title: "Impact Report 2024",
      desc: "Detailed metrics on beneficiaries and outcomes.",
      href: "#",
    },
  ];

  const badges = [
    { icon: CheckCircle2, label: "FCRA Certified" },
    { icon: BadgeCheck, label: "Guidestar Transparency" },
    { icon: ShieldCheck, label: "ISO 9001:2015" },
    { icon: CheckCircle2, label: "80G Tax Exemption" },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/40">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3">
            Transparency &amp; Reports
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-5" />
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
            We believe in complete transparency and accountability to our donors
            and stakeholders.
          </p>
        </div>

        {/* Report cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {reports.map((report, idx) => {
            const Icon = report.icon;
            return (
              <Card
                key={idx}
                className="shadow-sm hover:shadow-md transition-shadow rounded-2xl"
              >
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-1">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl">
                    {report.title}
                  </h3>
                  <p className="font-sans text-muted-foreground">
                    {report.desc}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-2 font-sans font-medium"
                    asChild
                  >
                    <a href={report.href} target="_blank" rel="noreferrer">
                      <FileText className="w-4 h-4 mr-2" />
                      Download PDF
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Trust badges */}
        <div className="text-center mb-8">
          <h3 className="font-heading font-semibold text-xl mb-2">
            Our Certifications &amp; Trust Badges
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center gap-3 bg-background rounded-2xl shadow-sm px-5 py-6"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <p className="font-sans text-sm font-medium text-muted-foreground">
                  {badge.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
