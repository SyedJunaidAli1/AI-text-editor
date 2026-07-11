import DragTerminal from "@/app/components/dragComponents/DragTerminal";
import Terminal from "@/app/components/Terminal";

export default function HeroSection() {
  return (
    <>
      <section className="max-lg:hidden">
        <DragTerminal />
      </section>
      <section className="lg:hidden">
        <Terminal />
      </section>
    </>
  );
}
