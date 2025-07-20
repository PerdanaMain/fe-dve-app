import { Moon, Sun } from "lucide-react";

import { useState } from "react";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  const handleClick = () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);
    setTheme(nextIsDark ? "dark" : "light");
  };
  return (
    <>
      {isDark ? (
        <Button variant="outline" size="icon" onClick={handleClick}>
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </Button>
      ) : (
        <Button variant="outline" size="icon" onClick={handleClick}>
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        </Button>
      )}
    </>
  );
}
