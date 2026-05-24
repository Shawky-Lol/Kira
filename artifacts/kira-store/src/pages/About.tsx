import { PageLayout } from "@/components/layout/PageLayout";
import { motion } from "framer-motion";

export default function About() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/kira-about-hero/1920/1080" 
            alt="Kira Atelier" 
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm"></div>
        </div>

        <div className="relative z-10 text-center flex flex-col items-center px-4 max-w-4xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-primary text-xs font-bold uppercase tracking-widest mb-6"
          >
            Maison Kira
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-8"
          >
            The Architecture <br/><span className="italic text-muted-foreground">of Elegance</span>
          </motion.h1>
        </div>
      </section>

      {/* Story Text */}
      <section className="py-32 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-10">
          <p className="text-xl md:text-2xl leading-relaxed text-foreground font-light">
            Founded in 2024, Kira was born from a desire to strip away the excess and focus on the fundamental geometry of clothing. We believe luxury is not loud. Luxury is precise.
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
            Our atelier operates on a philosophy of uncompromising reductionism. We source the heaviest silks, the most structured wools, and the softest leathers to create silhouettes that command a room simply by existing within it.
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
            A Kira garment is not designed for a season. It is engineered for a lifetime.
          </p>
        </div>
      </section>

      {/* Full Width Image */}
      <section className="w-full h-[70vh]">
        <img 
          src="https://picsum.photos/seed/kira-about-mid/1920/1080" 
          alt="Kira Craftsmanship" 
          className="w-full h-full object-cover"
        />
      </section>

      {/* Values Grid */}
      <section className="py-32 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            <div className="flex flex-col items-center text-center">
              <span className="font-serif text-6xl text-primary mb-6">01</span>
              <h3 className="text-lg font-bold uppercase tracking-widest mb-4">Material Obsession</h3>
              <p className="text-muted-foreground leading-relaxed">Every textile is chosen not just for how it looks, but how it falls, how it wears, and how it withstands time. We partner exclusively with heritage mills in Italy and Japan.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="font-serif text-6xl text-primary mb-6">02</span>
              <h3 className="text-lg font-bold uppercase tracking-widest mb-4">Architectural Cut</h3>
              <p className="text-muted-foreground leading-relaxed">Our pattern making process treats the body as a landscape. We sculpt garments that enhance natural lines through rigorous, mathematical precision.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="font-serif text-6xl text-primary mb-6">03</span>
              <h3 className="text-lg font-bold uppercase tracking-widest mb-4">Ethical Restraint</h3>
              <p className="text-muted-foreground leading-relaxed">We produce in highly limited runs. No overproduction. No fast cycles. Each piece is crafted by artisans who are paid fairly for their mastery.</p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
