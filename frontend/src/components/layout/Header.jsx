import React from 'react';
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
import { ModeToggle } from "@/components/ui/mode-toggle";
import { LogOut, User } from "lucide-react";

const tempUser = {
  name: "Nguyễn Văn Admin",
  email: "admin@qlsv.edu.vn",
  avatar: null,
};

export default function Header() {
  const handleLogout = () => {
    if (confirm("Đăng xuất khỏi hệ thống?")) {
      window.location.href = "/login";
    }
  };

  return (
    <header className="border-b bg-background sticky top-0 z-50 shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">
        
        {/* Logo / Title */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">QL</span>
          </div>
          <h1 className="text-xl font-semibold tracking-tight">
            Quản Lý Sinh Viên
          </h1>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">

          {/* Theme Toggle */}
          <ModeToggle />

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={tempUser.avatar} alt={tempUser.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-base">
                    {tempUser.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-64" align="end" sideOffset={8}>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{tempUser.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {tempUser.email}
                  </p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Thông tin cá nhân</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Đăng xuất</span>
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
    </header>
  );
}