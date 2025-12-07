import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // CHỈ FRONTEND → click là vào luôn, không check gì cả
    navigate("/");
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
              Hệ thống quản lý sinh viên
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@qlsv.edu.vn"
                defaultValue="admin@qlsv.edu.vn"
                className="h-12 text-base"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-base">Mật khẩu</Label>
              <div className="relative">
                <Input
                  id="password"
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
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full h-12 text-lg font-semibold">
              <LogIn className="mr-2 h-5 w-5" />
              Đăng nhập ngay
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3 pb-8">
          <p className="text-sm text-muted-foreground text-center">
            Demo: <span className="font-medium">admin@qlsv.edu.vn</span> /{" "}
            <span className="font-medium">123456</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Đồ án cuối kỳ - Nhóm ...
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}