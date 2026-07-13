import DragTerminal from "@/app/components/dragComponents/DragTerminal";
import Terminal from "@/app/components/Terminal";
import FeatureSection from "@/app/components/FeatureSection";

export default function HeroSection() {
  return (
    <>
      <section className="max-lg:hidden">
        <DragTerminal />
      </section>
      <section className="lg:hidden">
        <Terminal />
      </section>
      <FeatureSection />
    </>
  );
}
