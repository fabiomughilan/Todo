
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 
                 transition-all duration-200 ease-in-out transform hover:scale-105"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-500 transition-transform duration-200" />
      ) : (
        <Moon className="h-5 w-5 text-gray-600 transition-transform duration-200" />
      )}
    </button>
  );
};

export default ThemeToggle;
