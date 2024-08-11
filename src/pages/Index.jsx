import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const AnimatedText = ({ children }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((v) => !v);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      {children}
    </span>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-pink-500 p-4 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-bold text-center mb-6 text-pink-600">
          <AnimatedText>Ana & Kristian's Wedding</AnimatedText>
        </h1>
        <h2 className="text-2xl font-semibold text-center mb-4 text-blue-500">
          October 26, 2024
        </h2>

        <Separator className="my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-pink-600">About Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Ana and Kristian met in 2018 and have been inseparable ever since. They love traveling, cooking, and spending time with their dog, Max.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-pink-600">Wedding Program</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                <li>2:00 PM - Ceremony</li>
                <li>3:00 PM - Cocktail Hour</li>
                <li>5:00 PM - Dinner</li>
                <li>7:00 PM - Dancing</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-6" />

        <Card>
          <CardHeader>
            <CardTitle className="text-pink-600">Registry</CardTitle>
          </CardHeader>
          <CardContent>
            <p>We're registered at the following stores:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Bed Bath & Beyond</li>
              <li>Amazon</li>
              <li>Crate & Barrel</li>
            </ul>
            <p className="mt-2">Your presence is the greatest gift, but if you'd like to contribute to our honeymoon fund, we'd be grateful!</p>
          </CardContent>
        </Card>

        <footer className="mt-8 text-center text-sm text-gray-500">
          <AnimatedText>💖 We can't wait to celebrate with you! 💖</AnimatedText>
        </footer>
      </div>
    </div>
  );
};

export default Index;
