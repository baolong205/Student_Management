import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, UserCheck, Calendar } from "lucide-react";

export default function SubjectStatsGrid({ credits, teacherCount, studentCount, semester }) {
  const stats = [
    { label: "Số tín chỉ", value: credits, icon: BookOpen, color: "text-blue-600" },
    { label: "Giáo viên", value: teacherCount, icon: Users, color: "text-green-600" },
    { label: "Học sinh", value: studentCount, icon: UserCheck, color: "text-purple-600" },
    { label: "Học kỳ", value: semester || "N/A", icon: Calendar, color: "text-orange-600" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <stat.icon className={`mr-2 h-5 w-5 ${stat.color}`} />
              <div className="text-2xl font-bold">{stat.value}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}