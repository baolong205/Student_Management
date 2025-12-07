import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Moon, Sun } from "lucide-react";

const tempUser = {
  name: "Nguyễn Văn Admin",
  email: "admin@qlsv.edu.vn",
  avatar: null,
};

export default function Header() {
  const [theme, setTheme] = React.useState("light");

  const handleLogout = () => {
    if (confirm("Đăng xuất khỏi hệ thống?")) {
      window.location.href = "/login";
    }
  };

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6">

        {/* Logo / Title */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
            <span className="text-primary-foreground font-bold text-lg">QL</span>
          </div>
          <h1 className="text-xl font-semibold tracking-tight">
            Quản Lý Sinh Viên
          </h1>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">

          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full transition-transform hover:rotate-45"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full hover:ring-2 hover:ring-primary/60 hover:ring-offset-2 transition-all"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={tempUser.avatar} alt={tempUser.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-base">
                    {tempUser.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-64"
              align="end"
              sideOffset={8}
            >
              <DropdownMenuLabel className="font-normal p-3">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold">{tempUser.name}</p>
                  <p className="text-xs text-muted-foreground">{tempUser.email}</p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Thông tin cá nhân
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-destructive hover:bg-destructive/10"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
    </header>
  );
}
