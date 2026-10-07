"use client";

import React from "react";
import { ServicesGridProps } from "./service";
import { SERVICES_DATA } from "./services";
import { ServiceCard } from "./servicecard";
import { SectionHeader } from "./sectionsheader";

export const ServicesGrid: React.FC<ServicesGridProps> = ({
    services = SERVICES_DATA,
    title = "End-to-End Digital Services",
    subtitle =
    "From idea to deployment and beyond — we handle every layer of the stack so your team can focus on what matters.",
}) => {
    return (
        <section
            className="relative bg-slate-950 py-14 sm:py-20 lg:py-32 overflow-hidden"
            aria-labelledby="services-heading"
        >
            <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
                    backgroundSize: "32px 32px",
                    maskImage:
                        "radial-gradient(ellipse 80% 60% at 50% 30%, black, transparent)",
                }}
            />
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] sm:w-[700px] sm:h-[400px] rounded-full bg-blue-600/[0.08] blur-[100px] sm:blur-[140px] pointer-events-none"
                aria-hidden="true"
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader title={title} subtitle={subtitle} />

                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5"
                    role="list"
                    aria-label="Our services"
                >
                    {services.map((service, index) => (
                        <div key={service.id} role="listitem">
                            <ServiceCard service={service} index={index} />
                        </div>
                    ))}
                </div>
                <div className="mt-12 sm:mt-16 lg:mt-20 pt-8 sm:pt-10 border-t border-slate-800/80 text-center px-4 sm:px-0">
                    <p className="text-slate-400 text-sm sm:text-[15px]">
                        Need something not listed above?{" "}
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-1 font-semibold text-white underline decoration-slate-600 underline-offset-4 transition-colors hover:decoration-white"
                        >
                            Let&apos;s talk about your project
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
};
export default ServicesGrid;