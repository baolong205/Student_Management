// src/components/ui/mode-toggle.jsx   ← Đặt đúng chỗ này để import @/components/ui/mode-toggle
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const [theme, setTheme] = useState("light");

  // Lấy theme từ localStorage khi load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Khi theme thay đổi → áp dụng + lưu
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative rounded-full hover:bg-accent hover:text-accent-foreground transition-all duration-300"
      aria-label="Toggle dark mode"
    >
      {/* Sun icon (light mode) */}
      <Sun
        className={`h-5 w-5 absolute transition-all duration-500 ${
          theme === "light"
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-0 opacity-0"
        }`}
      />

      {/* Moon icon (dark mode) */}
      <Moon
        className={`h-5 w-5 absolute transition-all duration-500 ${
          theme === "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        }`}
      />

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}