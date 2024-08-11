import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const AnimatedText = ({ children }) => {
  const words = children.split(' ');
  return (
    <motion.div>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

const FloatingElement = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-10, 10] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
};

const HeartRain = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prevHearts) => [
        ...prevHearts,
        {
          id: Date.now(),
          x: Math.random() * window.innerWidth,
          size: Math.random() * 20 + 10,
        },
      ]);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-500"
          initial={{ y: -20, x: heart.x }}
          animate={{ y: '100vh' }}
          transition={{ duration: 5, ease: 'linear' }}
          onAnimationComplete={() => setHearts((prevHearts) => prevHearts.filter((h) => h.id !== heart.id))}
          style={{ fontSize: heart.size }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

const Index = () => {
  const [touchHearts, setTouchHearts] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleTouch = useCallback((e) => {
    const touch = e.touches[0];
    const newHearts = Array.from({ length: 10 }, (_, index) => ({
      id: Date.now() + index,
      x: touch.clientX + (Math.random() - 0.5) * 50,
      y: touch.clientY,
      size: Math.random() * 20 + 10,
      angle: Math.random() * 360,
    }));
    setTouchHearts((prevHearts) => [...prevHearts, ...newHearts]);
  }, []);

  useEffect(() => {
    document.addEventListener('touchstart', handleTouch);
    return () => document.removeEventListener('touchstart', handleTouch);
  }, [handleTouch]);

  const toggleConfetti = () => {
    setShowConfetti((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-pink-100 p-4 font-sans relative overflow-hidden" onTouchStart={handleTouch}>
      {showConfetti && <Confetti />}
      <HeartRain />
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <motion.h1
          className="text-5xl font-bold text-center mb-6 text-pink-600"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <AnimatedText>Ana & Kristian's Wedding</AnimatedText>
        </motion.h1>
        <FloatingElement>
          <motion.h2
            className="text-3xl font-semibold text-center mb-4 text-pink-500"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            October 26, 2024
          </motion.h2>
        </FloatingElement>
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Button onClick={toggleConfetti} className="bg-pink-500 hover:bg-pink-600 text-white">
            Celebrate with Us!
          </Button>
        </motion.div>

        <Separator className="my-6" />

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnimatedCard title="Our Love Story" delay={0}>
            <p>Ana and Kristian's love story is one for the ages. From the moment they met in 2018, their hearts knew they had found their soulmate. Their love has only grown stronger with each passing day, filled with adventures, laughter, and unwavering support for each other. They can't imagine life without one another and are thrilled to begin this new chapter together.</p>
          </AnimatedCard>

          <AnimatedCard title="Wedding Program" delay={0.2}>
            <ul className="list-disc list-inside">
              <li>2:00 PM - Ceremony of Love</li>
              <li>3:00 PM - Celebration Cocktails</li>
              <li>5:00 PM - Romantic Dinner</li>
              <li>7:00 PM - Dancing the Night Away</li>
            </ul>
          </AnimatedCard>
        </motion.div>

        <Separator className="my-6" />

        <Card className="bg-pink-50">
          <CardHeader>
            <CardTitle className="text-pink-600">Black Tie Dress Code</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">We kindly request our guests to dress in black tie attire. Let's make this night as glamorous as our love!</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-200 w-full h-48 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Men's Black Tie</span>
              </div>
              <div className="bg-gray-200 w-full h-48 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Women's Black Tie</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-6" />

        <Card className="bg-pink-50">
          <CardHeader>
            <CardTitle className="text-pink-600">Registry</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Your presence is the greatest gift, but if you'd like to contribute to our new life together:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Bed Bath & Beyond</li>
              <li>Amazon</li>
              <li>Crate & Barrel</li>
            </ul>
            <p className="mt-2">We've also set up a honeymoon fund for our dream trip to Bali!</p>
          </CardContent>
        </Card>

        <Separator className="my-6" />

        <Card className="bg-pink-50">
          <CardHeader>
            <CardTitle className="text-pink-600">Ana & Kristian's First Dance</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Picture Ana and Kristian in their first dance as a married couple:</p>
            <p>Ana, with her long dark hair and warm smile, wearing a beautiful white wedding gown, her eyes sparkling with joy.</p>
            <p>Kristian, with his wavy blonde hair and gentle expression, dressed in a sharp black tuxedo, looking lovingly at his bride.</p>
            <p>They twirl gracefully across the dance floor, lost in each other's eyes, their love radiating to all their guests.</p>
          </CardContent>
        </Card>

        <footer className="mt-8 text-center text-lg text-pink-600">
          <AnimatedText>💖 We can't wait to share our love with you! 💖</AnimatedText>
        </footer>
      </div>
      {touchHearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="fixed text-pink-500 pointer-events-none"
          initial={{ opacity: 1, scale: 0, x: heart.x, y: heart.y, rotate: heart.angle }}
          animate={{ 
            opacity: 0, 
            scale: 1, 
            y: heart.y - 200, 
            x: heart.x + (Math.random() - 0.5) * 100 
          }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{ fontSize: heart.size }}
          onAnimationComplete={() => setTouchHearts((prevHearts) => prevHearts.filter((h) => h.id !== heart.id))}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

const AnimatedCard = ({ title, children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="bg-pink-50 h-full">
        <CardHeader>
          <CardTitle className="text-pink-600">{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </motion.div>
  );
};

const Confetti = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {Array.from({ length: 100 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-2 h-2 bg-pink-500 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -10,
            opacity: 1,
          }}
          animate={{
            y: window.innerHeight + 10,
            opacity: 0,
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

export default Index;
