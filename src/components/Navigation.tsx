import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ThemeSwitcher from '@/components/ThemeSwitcher';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      
      // Update active section based on scroll position
      const sections = ['about', 'skills', 'projects', 'experience', 'education', 'extracurricular', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(current || '');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const downloadResume = () => {
    window.open('/resume.pdf', '_blank');
  };

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'extracurricular', label: 'Extra' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'glass-nav py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="font-poppins font-bold text-xl text-foreground group cursor-pointer">
            <span className="group-hover:text-brand transition-colors duration-300">Yusuf</span>
            <span className="text-brand ml-1">Ali</span>
          </div>
          
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-inter font-medium text-sm transition-all duration-300 relative group ${
                  activeSection === item.id 
                    ? 'text-brand' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand transition-all duration-300 ${
                  activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
            ))}
            
            <ThemeSwitcher />
            <Button 
              onClick={downloadResume}
              className="hover-lift font-medium bg-brand hover:bg-brand/90 text-brand-foreground px-5"
            >
              Resume
            </Button>
          </div>
          
          {/* Mobile actions */}
          <div className="lg:hidden flex items-center gap-3">
            <ThemeSwitcher />
            <Button 
              onClick={downloadResume}
              size="sm"
              className="hover-lift bg-brand hover:bg-brand/90 text-brand-foreground"
            >
              Resume
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;