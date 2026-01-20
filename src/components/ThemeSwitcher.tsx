import { useEffect, useState } from 'react';
import { Palette, Moon, Sun, Waves, TreePine, Flame, Sparkles } from 'lucide-react';

type Theme = 'dark' | 'light' | 'neon' | 'ocean' | 'sunset' | 'forest';

const themes: { id: Theme; label: string; icon: React.ElementType; preview: string }[] = [
  { id: 'dark', label: 'Midnight', icon: Moon, preview: 'bg-zinc-900' },
  { id: 'light', label: 'Clean', icon: Sun, preview: 'bg-white border border-zinc-200' },
  { id: 'neon', label: 'Neon', icon: Sparkles, preview: 'bg-violet-950' },
  { id: 'ocean', label: 'Ocean', icon: Waves, preview: 'bg-cyan-900' },
  { id: 'sunset', label: 'Sunset', icon: Flame, preview: 'bg-orange-600' },
  { id: 'forest', label: 'Forest', icon: TreePine, preview: 'bg-emerald-900' },
];

const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('dark');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('portfolio-theme') as Theme | null;
    if (stored && themes.find(t => t.id === stored)) {
      setCurrentTheme(stored);
      applyTheme(stored);
    }
  }, []);

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    // Remove all theme classes
    themes.forEach(t => root.classList.remove(t.id));
    // Add new theme class
    root.classList.add(theme);
    localStorage.setItem('portfolio-theme', theme);
  };

  const selectTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    applyTheme(theme);
    setIsOpen(false);
  };

  const CurrentIcon = themes.find(t => t.id === currentTheme)?.icon || Palette;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change theme"
        className="glass-panel p-2 hover-glow transition-all duration-300 group"
      >
        <Palette size={16} className="text-brand group-hover:rotate-12 transition-transform" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Theme Panel */}
          <div className="absolute right-0 top-full mt-2 z-50 glass-panel p-3 min-w-[200px] animate-in fade-in slide-in-from-top-2 duration-200">
            <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">Choose Theme</p>
            <div className="grid grid-cols-2 gap-2">
              {themes.map((theme) => {
                const Icon = theme.icon;
                const isActive = currentTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => selectTheme(theme.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-left ${
                      isActive 
                        ? 'bg-brand/20 border border-brand text-brand' 
                        : 'hover:bg-muted/50 border border-transparent'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full ${theme.preview} shrink-0`} />
                    <span className="text-xs font-medium">{theme.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeSwitcher;
