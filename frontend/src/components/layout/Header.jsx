// frontend/src/components/Header.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { LogOut, User, Shield } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export default function Header() {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout, initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, []);

  const handleLogout = () => {
    if (confirm("Đăng xuất khỏi hệ thống?")) {
      logout();
      navigate('/login');
    }
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  if (!isLoggedIn || !user) {
    return (
      <header className="border-b bg-background sticky top-0 z-50 shadow-sm">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">QL</span>
            </div>
            <h1 className="text-xl font-semibold tracking-tight">
              Quản Lý Sinh Viên
            </h1>
          </div>
          <Button variant="outline" onClick={() => navigate('/login')}>
            Đăng nhập
          </Button>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b bg-background sticky top-0 z-50 shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">QL</span>
          </div>
          <h1 className="text-xl font-semibold tracking-tight">
            Quản Lý Sinh Viên
          </h1>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground hidden sm:block">
            Xin chào, <span className="font-medium">{user.username}</span>
          </span>

          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                    {user.username?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="font-medium">{user.username}</p>
                  <p className="text-sm text-muted-foreground">
                    {user.username}@qlsv.edu.vn
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Shield className="h-3 w-3" />
                    <span className="text-xs">
                      {user.role === 'admin' ? 'Quản trị viên' : 'Người xem'}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />


              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
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