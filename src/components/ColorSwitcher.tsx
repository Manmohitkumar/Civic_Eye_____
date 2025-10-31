
import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";

type ColorTheme = {
  id: string;
  name: string;
  primary: string;
  accent: string;
  background: string;
};

const colorThemes: ColorTheme[] = [
  {
    id: "purple-teal",
    name: "Purple & Teal",
    primary: "#4A23AD", // Updated purple
    accent: "#4ECDC4",  // Teal
    background: "#FFFFFF", // White background
  },
  {
    id: "purple-coral",
    name: "Purple & Coral",
    primary: "#4A23AD", // Updated purple
    accent: "#FF5A6F",  // Coral
    background: "#FFFFFF", // White background
  },
  {
    id: "purple-coral-mustard",
    name: "Purple & Coral (Mustard)",
    primary: "#4A23AD", // Updated purple
    accent: "#FF5A6F",  // Coral
    background: "#FEF7CD", // Soft Mustard background
  }
];

const ColorSwitcher = () => {
  const [activeTheme, setActiveTheme] = useState<string>("purple-coral"); // Default to purple-coral

  const applyTheme = (theme: ColorTheme) => {
    const root = document.documentElement;
    
    // Set the CSS variables
    root.style.setProperty('--theme-primary', theme.primary);
    root.style.setProperty('--theme-accent', theme.accent);
    root.style.setProperty('--theme-background', theme.background);
    
    setActiveTheme(theme.id);
  };

  // Apply the default theme on initial render
  useEffect(() => {
    applyTheme(colorThemes.find(theme => theme.id === "purple-coral") || colorThemes[0]);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-gray-200 z-50">
      <div className="flex gap-2">
        {colorThemes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => applyTheme(theme)}
            className="relative w-10 h-10 rounded-full transition-transform hover:scale-110 focus:outline-none shadow-sm"
            style={{ background: theme.primary }}
            title={theme.name}
            aria-label={`Apply ${theme.name} theme`}
          >
            <span 
              className="absolute inset-0 rounded-full border-2"
              style={{ 
                borderColor: theme.accent,
                clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 0 100%, 0 50%, 50% 50%)'
              }}
            ></span>
            {activeTheme === theme.id && (
              <CheckCircle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-5 h-5" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorSwitcher;
