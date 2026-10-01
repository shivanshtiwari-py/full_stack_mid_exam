import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRightIcon } from "@/components/ui/icons";

const INDUSTRIES = [
  {
    name: "Real Estate",
    slug: "REAL_ESTATE",
    oneLiner: "Architectural property showcases, interactive virtual tours, and high-converting lead funnels.",
    badge: "High Growth",
  },
  {
    name: "Cafe & Restaurant",
    slug: "CAFE",
    oneLiner: "Immersive culinary brand sites, interactive digital menus, and instant reservation booking.",
    badge: "Hospitality",
  },
  {
    name: "Clothing & Fashion",
    slug: "CLOTHING",
    oneLiner: "Editorial lookbook showcases, high-fashion typography, and seamless product catalog browsing.",
    badge: "Apparel",
  },
  {
    name: "Healthcare & Clinics",
    slug: "HEALTHCARE",
    oneLiner: "Patient-first clinical appointment portals, doctor profiles, and trust-focused digital UX.",
    badge: "Medical",
  },
  {
    name: "Enterprise CRM",
    slug: "CRM",
    oneLiner: "Custom operational dashboards, role-based security access, and real-time data visualization.",
    badge: "SaaS",
  },
  {
    name: "E-Commerce",
    slug: "ECOMMERCE",
    oneLiner: "Headless shopping experiences engineered for ultra-low latency, conversion, and global scale.",
    badge: "Retail",
  },
  {
    name: "Other Specialized Products",
    slug: "OTHER",
    oneLiner: "Tailored web applications, client portals, and bespoke digital platforms crafted to exact specs.",
    badge: "Custom",
  },
];

export function IndustriesSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#1A1614]/40 relative overflow-hidden border-b border-white/5">
      <Container>
        <Reveal direction="up">
          <SectionHeading
            kicker="Sectors We Serve"
            title="Tailored Engineering For"
            titleGradient="Diverse Industries."
            subtitle="We bring deep domain expertise to design and build industry-specific web products that solve real business problems."
            align="center"
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {INDUSTRIES.map((industry, index) => (
            <Reveal key={industry.slug} direction="up" delay={index * 0.06}>
              <Link href={`/work?industry=${industry.slug}`}>
                <Card
                  hoverEffect
                  glowOnHover
                  variant="glass"
                  className="h-full flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="live">{industry.badge}</Badge>
                      <ArrowUpRightIcon className="w-5 h-5 text-[#A8A29E] group-hover:text-[#F2660A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <h3 className="text-xl font-extrabold text-[#F5F5F4] mb-2 font-heading group-hover:text-[#F2660A] transition-colors">
                      {industry.name}
                    </h3>
                    <p className="text-sm text-[#A8A29E] leading-relaxed">
                      {industry.oneLiner}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#F2660A] font-semibold">
                    <span>View Industry Projects</span>
                    <span>→</span>
                  </div>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
