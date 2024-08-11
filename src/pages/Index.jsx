import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Palmtree, Sun, Wine, Music, Heart } from 'lucide-react';

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
          rotation: Math.random() * 360,
          color: Math.random() > 0.5 ? '#FF69B4' : '#FF1493',
        },
      ]);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          initial={{ y: -20, x: heart.x, rotate: heart.rotation }}
          animate={{ y: '100vh', rotate: heart.rotation + 360 }}
          transition={{ duration: 5, ease: 'linear' }}
          onAnimationComplete={() => setHearts((prevHearts) => prevHearts.filter((h) => h.id !== heart.id))}
          style={{ fontSize: heart.size, color: heart.color }}
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
    <div className="min-h-screen bg-[#FFF0F5] p-4 font-serif relative overflow-hidden" onTouchStart={handleTouch}>
      {showConfetti && <Confetti />}
      <HeartRain />
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <motion.h1
          className="text-6xl font-bold text-center mb-6 text-[#FF1493]"
          animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <AnimatedText>Ana & Kristian</AnimatedText>
        </motion.h1>
        <FloatingElement>
          <motion.h2
            className="text-3xl font-semibold text-center mb-4 text-[#FF69B4]"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="block">26 de Octubre, 2024 • Barcelona, España</span>
            <span className="block text-2xl mt-2">October 26, 2024 • Barcelona, Spain</span>
          </motion.h2>
        </FloatingElement>
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Button onClick={toggleConfetti} className="bg-[#FF1493] hover:bg-[#FF69B4] text-white">
            ¡Celebra con nosotros! / Celebrate with us!
          </Button>
        </motion.div>

        <Separator className="my-6" />

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnimatedCard title="Nuestra Historia de Amor / Our Love Story" delay={0}>
            <p className="mb-2">El amor de Ana y Kristian es una historia para recordar. Desde que se conocieron en 2018, sus corazones supieron que habían encontrado a su alma gemela. Su amor ha crecido cada día, lleno de aventuras, risas y apoyo incondicional. No pueden imaginar la vida el uno sin el otro y están emocionados de comenzar este nuevo capítulo juntos.</p>
            <p>Ana and Kristian's love is a story to remember. Since they met in 2018, their hearts knew they had found their soulmate. Their love has grown every day, filled with adventures, laughter, and unconditional support. They can't imagine life without each other and are excited to begin this new chapter together.</p>
          </AnimatedCard>

          <AnimatedCard title="Programa de la Boda / Wedding Schedule" delay={0.2}>
            <ul className="list-none mt-2">
              <li className="flex items-center mb-2"><Sun className="mr-2 text-[#FF1493]" size={16} /> 14:00 - Ceremonia de Amor / Love Ceremony</li>
              <li className="flex items-center mb-2"><Wine className="mr-2 text-[#FF1493]" size={16} /> 15:00 - Cóctel de Celebración / Celebration Cocktail</li>
              <li className="flex items-center mb-2"><Palmtree className="mr-2 text-[#FF1493]" size={16} /> 17:00 - Cena Romántica / Romantic Dinner</li>
              <li className="flex items-center"><Music className="mr-2 text-[#FF1493]" size={16} /> 19:00 - Baile hasta el Amanecer / Dancing till Dawn</li>
            </ul>
          </AnimatedCard>
        </motion.div>

        <Separator className="my-6" />

        <Card className="bg-[#FFF0F5]">
          <CardHeader>
            <CardTitle className="text-[#FF1493]">Código de Vestimenta: Elegante / Dress Code: Elegant</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Solicitamos amablemente a nuestros invitados que vistan de manera elegante. ¡Hagamos que esta noche sea tan glamurosa como nuestro amor!</p>
            <p className="mb-4">We kindly request our guests to dress elegantly. Let's make this night as glamorous as our love!</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white w-full h-48 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-[#FF1493]">Traje Oscuro / Dark Suit</span>
              </div>
              <div className="bg-white w-full h-48 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-[#FF1493]">Vestido de Cóctel / Cocktail Dress</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-6" />

        <Card className="bg-[#FFF0F5]">
          <CardHeader>
            <CardTitle className="text-[#FF1493]">Lista de Regalos / Gift Registry</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Tu presencia es el mejor regalo, pero si deseas contribuir a nuestra nueva vida juntos:</p>
            <p>Your presence is the best gift, but if you wish to contribute to our new life together:</p>
            <ul className="list-disc list-inside mt-2">
              <li>El Corte Inglés</li>
              <li>Amazon</li>
              <li>Zara Home</li>
            </ul>
            <p className="mt-2">¡También hemos creado un fondo para nuestra luna de miel en las Islas Baleares!</p>
            <p className="mt-2">We have also created a fund for our honeymoon in the Balearic Islands!</p>
          </CardContent>
        </Card>

        <Separator className="my-6" />

        <Card className="bg-[#FFF0F5]">
          <CardHeader>
            <CardTitle className="text-[#FF1493]">El Primer Baile / The First Dance</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Imagina a Ana y Kristian en su primer baile como marido y mujer:</p>
            <p>Imagine Ana and Kristian in their first dance as husband and wife:</p>
            <p>Ana, con su largo cabello oscuro y cálida sonrisa, vistiendo un hermoso vestido de novia blanco, sus ojos brillando de alegría.</p>
            <p>Ana, with her long dark hair and warm smile, wearing a beautiful white wedding dress, her eyes shining with joy.</p>
            <p>Kristian, con su cabello rubio ondulado y expresión gentil, vestido con un elegante esmoquin negro, mirando amorosamente a su novia.</p>
            <p>Kristian, with his wavy blonde hair and gentle expression, dressed in an elegant black tuxedo, looking lovingly at his bride.</p>
            <p>Giran con gracia por la pista de baile, perdidos en los ojos del otro, su amor irradiando a todos los invitados.</p>
            <p>They gracefully twirl across the dance floor, lost in each other's eyes, their love radiating to all the guests.</p>
          </CardContent>
        </Card>

        <footer className="mt-8 text-center text-lg text-[#FF1493]">
          <AnimatedText>
            <span className="block">💃 ¡No podemos esperar para compartir nuestro amor con ustedes! 🕺</span>
            <span className="block">💃 We can't wait to share our love with you! 🕺</span>
          </AnimatedText>
        </footer>
      </div>
      {touchHearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="fixed text-[#D2691E] pointer-events-none"
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
      <Card className="bg-[#FFF0F5] h-full shadow-md">
        <CardHeader>
          <CardTitle className="text-[#FF1493] flex items-center">
            <Heart className="mr-2 text-[#FF1493]" size={20} />
            {title}
            <Heart className="ml-2 text-[#FF1493]" size={20} />
          </CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </motion.div>
  );
};

const Confetti = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {Array.from({ length: 150 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute"
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
        >
          {Math.random() > 0.5 ? (
            <Heart className="text-[#FF1493]" size={12} />
          ) : (
            <div className="w-2 h-2 bg-[#FF69B4] rounded-full" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default Index;
