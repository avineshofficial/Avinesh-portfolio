import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import TimelineSection from "@/components/TimelineSection";
import AchievementsSection from "@/components/AchievementsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SectionDivider />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <TimelineSection />
        <AchievementsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
