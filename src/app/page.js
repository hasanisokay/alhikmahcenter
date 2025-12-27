'use client'
import Home from "@/components/Home";
import { motion, AnimatePresence } from "framer-motion";

const homePage = () => {
  return <div>
   <AnimatePresence mode="wait">
      <motion.div
        initial="initialState"
        animate="animateState"
        exit="exitState"
        variants={{
          initialState: {
            opacity: 0,
            y: 20,
          },
          animateState: {
            opacity: 1,
            y: 0,
          },
          exitState: {
            opacity: 0,
            y: -20,
          },
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        <Home />
      </motion.div>
    </AnimatePresence>
  </div>;
};

export default homePage;
