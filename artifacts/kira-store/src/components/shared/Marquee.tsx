import { motion } from "framer-motion";

export function Marquee() {
  const items = [
    "NEW ARRIVALS",
    "THE SILENCE BEFORE A RUNWAY SHOW",
    "ARCHIVE SALE",
    "UNCOMPROMISING QUALITY",
    "READY TO WEAR",
    "UNAPOLOGETIC STYLE",
  ];

  return (
    <div className="bg-primary text-primary-foreground py-4 overflow-hidden flex whitespace-nowrap">
      <motion.div
        className="flex gap-8 items-center"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20,
        }}
      >
        {items.concat(items).map((item, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="text-sm font-bold uppercase tracking-widest">{item}</span>
            <span className="text-primary-foreground/30 text-xs">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
