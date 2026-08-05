import { motion } from "framer-motion";
import { Binoculars } from "lucide-react";
import { useEffect, useState } from "react";

export function SafariLoader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch on first render
  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1F2C23]"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
        }}
        className="flex flex-col items-center justify-center text-[#F9F6F0]"
      >
        <motion.div
          animate={{ 
            y: [0, -12, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-6 rounded-full border border-[#F9F6F0]/10 bg-[#F9F6F0]/5 p-6 backdrop-blur-md"
        >
          <Binoculars className="h-12 w-12 text-[#C45E45]" />
        </motion.div>
        
        <motion.div 
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="font-serif text-3xl tracking-wide"
        >
          Udawalawe Wild
        </motion.div>
        
        <div className="mt-4 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
              className="h-1.5 w-1.5 rounded-full bg-[#C45E45]"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
