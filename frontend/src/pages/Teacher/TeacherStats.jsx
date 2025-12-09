// src/components/teachers/TeacherStats.jsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, BookOpen, GraduationCap, Clock } from "lucide-react";

const TeacherStats = ({ teachers = [], loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Tính toán thống kê
  const totalTeachers = teachers.length;
  
  const totalSubjects = new Set(
    teachers.flatMap((t) => t.subjects?.map((s) => s.id) || [])
  ).size;
  
  const totalClasses = new Set(
    teachers.flatMap((t) => t.classes?.map((c) => c.id) || [])
  ).size;
  
  const avgExperience = teachers.length > 0
    ? Math.round(
        teachers.reduce((sum, t) => sum + (t.yearsOfExperience || 0), 0) /
        teachers.length
      )
    : 0;

  const stats = [
    {
      title: "Tổng giáo viên",
      value: totalTeachers,
      icon: Users,
      description: "Số lượng giáo viên",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Môn học",
      value: totalSubjects,
      icon: BookOpen,
      description: "Số môn được phân công",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Lớp học",
      value: totalClasses,
      icon: GraduationCap,
      description: "Số lớp được phân công",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Kinh nghiệm TB",
      value: `${avgExperience} năm`,
      icon: Clock,
      description: "Trung bình kinh nghiệm",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TeacherStats;