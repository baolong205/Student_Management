import { NavLink } from "react-router-dom";
import { Home, GraduationCap, School, BookOpen, BarChart3, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: Home, label: "Dashboard" },
  { to: "/users", icon: Users, label: "Quản lý người dùng" },
  { to: "/students", icon: GraduationCap, label: "Sinh viên" },
  { to: "/classes", icon: School, label: "Lớp học" },
  { to: "/subjects", icon: BookOpen, label: "Môn học" },
  { to: "/teachers", icon: BarChart3, label: "Giảng viên" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-background h-screen sticky top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b">
        <h2 className="text-3xl font-bold text-primary">UDA_ST</h2>

      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all mb-1",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}