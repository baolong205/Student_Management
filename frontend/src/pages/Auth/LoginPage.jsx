// src/pages/Auth/LoginPage.jsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, LogIn, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore"; // Zustand store

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Zustand: lấy hàm login và trạng thái loading
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      
      await login(username, password);
      navigate("/"); // Thành công → vào dashboard
    } catch (err) {
      setError(err.message || "Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:to-black px-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="space-y-6 pb-8">
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center text-primary-foreground text-4xl font-black shadow-lg">
              QLSV
            </div>
          </div>
          <div className="text-center">
            <CardTitle className="text-3xl font-bold">Chào mừng quay lại</CardTitle>
            <CardDescription className="text-base mt-2">
              Hệ thống quản lý sinh viên - Đồ án cuối kỳ
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-base">
                Tên đăng nhập
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="admin"
                defaultValue="admin"
                className="h-12 text-base"
                required
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-base">
                Mật khẩu
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  defaultValue="123456"
                  className="h-12 text-base pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground transition"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Hiển thị lỗi */}
            {error && (
              <p className="text-sm text-destructive text-center font-medium">
                {error}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full h-12 text-lg font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Đang đăng nhập...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  Đăng nhập ngay
                </>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3 pb-8 text-center">
          <p className="text-sm text-muted-foreground">
            Demo: <span className="font-medium">admin</span> /{" "}
            <span className="font-medium">123456</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Đồ án cuối kỳ • Nhóm ...
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}