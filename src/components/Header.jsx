import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { navItems } from '../nav-items';

const Header = () => {
  return (
    <header className="bg-[#FFF0F5] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center"
        >
          <div className="text-center">
            <motion.h1
              className="text-4xl font-bold text-[#FF1493]"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Ana & Kristian
            </motion.h1>
            <motion.p
              className="text-lg text-[#FF69B4] mt-2"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              October 26, 2024 • Barcelona, Spain
            </motion.p>
          </div>
          <nav>
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <motion.li
                  key={item.to}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.to}
                    className="text-[#FF1493] hover:text-[#FF69B4] transition-colors duration-200 flex items-center"
                  >
                    {item.icon}
                    <span className="ml-2">{item.title}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
