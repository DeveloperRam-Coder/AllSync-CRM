
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Moon, Sun, Palette, Check } from 'lucide-react';

const ThemeSwitcher: React.FC = () => {
  const { theme, isDarkMode, setTheme, toggleDarkMode } = useTheme();

  const themeOptions = [
    { id: 'default', name: 'Professional Blue' },
    { id: 'wellness', name: 'Wellness Green' },
    { id: 'modern', name: 'Modern Purple' },
    { id: 'warm', name: 'Warm Orange' },
  ] as const;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuItem onClick={toggleDarkMode} className="flex items-center justify-between">
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          {isDarkMode ? <Sun className="h-4 w-4 ml-2" /> : <Moon className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Color Theme</DropdownMenuLabel>
        
        {themeOptions.map((option) => (
          <DropdownMenuItem 
            key={option.id} 
            onClick={() => setTheme(option.id)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center">
              <Palette className="h-4 w-4 mr-2" />
              {option.name}
            </div>
            {theme === option.id && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
