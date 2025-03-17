import { Hero } from "@/components/Hero";
import TechSkills from "@/components/TechSkills";
import YouTubeSection from "@/components/YouTubeSection";
import { BackToTop } from "@/components/ui/back-to-top";

export default function Home() {
  return (
    <>
      <Hero />
      <TechSkills />
      <YouTubeSection />
      <BackToTop />
    </>
  );
}
