"use client";

import { useState } from "react";
import { PennyIntro } from "@/components/PennyIntro";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { VideoPlaceholder } from "@/components/VideoPlaceholder";
import { FeatureGrid } from "@/components/FeatureGrid";
import { UseCases } from "@/components/UseCases";
import { HowItWorks } from "@/components/HowItWorks";
import { TryPenny } from "@/components/TryPenny";
import { SecurityTrust } from "@/components/SecurityTrust";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      <PennyIntro onComplete={() => setIntroComplete(true)} />

      {introComplete && (
        <div className="flex-1 flex flex-col">
          <Nav />
          <main>
            <Hero />
            <SocialProof />
            <VideoPlaceholder
              title="See Penny in action at a real facility"
              description="A short walkthrough showing how Penny handles a storage enquiry - from the first ring to the booked tour."
            />
            <FeatureGrid />
            <UseCases />
            <HowItWorks />
            <TryPenny />
            <VideoPlaceholder
              title="Watch a live demo"
              description="See Penny handle a storage waitlist call in real time."
            />
            <SecurityTrust />
            <FAQ />
            <FinalCTA />
            <ContactForm />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
