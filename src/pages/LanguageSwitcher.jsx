import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const LanguageSwitcher = ({ language, setLanguage }) => {
  return (
    <motion.div
      className="fixed top-4 right-4 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Button
        onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
        className="bg-[#FF1493] hover:bg-[#FF69B4] text-white"
      >
        {language === 'en' ? 'Español' : 'English'}
      </Button>
    </motion.div>
  );
};

export default LanguageSwitcher;
