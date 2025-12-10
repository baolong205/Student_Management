// src/components/dashboard/AdminDashboard.jsx
import React, { useEffect } from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Users,
  BookOpen,
  GraduationCap,
  UserCog,
  Eye,
  Library,
  School,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const AdminDashboard = () => {
  const {
    dashboardData,
    loading,
    fetchDashboardData,
    refreshDashboard
  } = useDashboardStore();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const statsCards = [
    {
      title: "Tổng sinh viên",
      value: dashboardData?.totalStudents || 0,
      icon: <Users className="h-4 w-4" />,
      color: "bg-blue-500",
      description: "Sinh viên đang học",
    },
    {
      title: "Tổng lớp học",
      value: dashboardData?.totalClasses || 0,
      icon: <School className="h-4 w-4" />,
      color: "bg-green-500",
      description: "Lớp học đang hoạt động",
    },
    {
      title: "Tổng môn học",
      value: dashboardData?.totalSubjects || 0,
      icon: <BookOpen className="h-4 w-4" />,
      color: "bg-purple-500",
      description: "Môn học được giảng dạy",
    },
    {
      title: "Tổng giáo viên",
      value: dashboardData?.totalTeachers || 0,
      icon: <GraduationCap className="h-4 w-4" />,
      color: "bg-amber-500",
      description: "Giáo viên đang giảng dạy",
    },
    {
      title: "Tổng đăng ký",
      value: dashboardData?.totalEnrollments || 0,
      icon: <Calendar className="h-4 w-4" />,
      color: "bg-pink-500",
      description: "Lượt đăng ký môn học",
    },
    {
      title: "Quản trị viên",
      value: dashboardData?.totalAdmins || 0,
      icon: <UserCog className="h-4 w-4" />,
      color: "bg-red-500",
      description: "Tài khoản admin",
    },
    {
      title: "Người xem",
      value: dashboardData?.totalViewers || 0,
      icon: <Eye className="h-4 w-4" />,
      color: "bg-indigo-500",
      description: "Tài khoản viewer",
    },
    {
      title: "Tổng người dùng",
      value: (dashboardData?.totalAdmins || 0) + (dashboardData?.totalViewers || 0),
      icon: <Library className="h-4 w-4" />,
      color: "bg-cyan-500",
      description: "Tổng tài khoản hệ thống",
    },
  ];

  const StatCard = ({ title, value, icon, color, description }) => (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`p-2 rounded-full ${color} text-white`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground mt-1">
          {description}
        </p>
      </CardContent>
    </Card>
  );

  const LoadingSkeleton = () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-3 w-24" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Quản trị</h1>
          <p className="text-muted-foreground">
            Tổng quan hệ thống quản lý giáo dục
          </p>
        </div>

        <Button
          onClick={refreshDashboard}
          variant="outline"
          size="sm"
          className="gap-2"
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Đang tải...' : 'Làm mới'}
        </Button>
      </div>

      {/* Thống kê chính */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Thống kê tổng quan</h2>
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statsCards.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        )}
      </div>

      {/* Phân tích và biểu đồ */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Biểu đồ phân phối người dùng */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Phân phối người dùng</CardTitle>
            <CardDescription>
              Tỷ lệ Admin và Viewer trong hệ thống
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : dashboardData ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm">Quản trị viên</span>
                  </div>
                  <span className="font-medium">
                    {dashboardData.totalAdmins} ({((dashboardData.totalAdmins / ((dashboardData.totalAdmins + dashboardData.totalViewers) || 1)) * 100).toFixed(1)}%)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                    <span className="text-sm">Người xem</span>
                  </div>
                  <span className="font-medium">
                    {dashboardData.totalViewers} ({((dashboardData.totalViewers / ((dashboardData.totalAdmins + dashboardData.totalViewers) || 1)) * 100).toFixed(1)}%)
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-red-500 h-2.5 rounded-full"
                    style={{
                      width: `${((dashboardData.totalAdmins / ((dashboardData.totalAdmins + dashboardData.totalViewers) || 1)) * 100).toFixed(1)}%`
                    }}
                  ></div>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* Thống kê đăng ký */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Tỷ lệ đăng ký</CardTitle>
            <CardDescription>
              Số lượng đăng ký trên mỗi sinh viên
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : dashboardData ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Số sinh viên</span>
                  <span className="font-medium">{dashboardData.totalStudents}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tổng đăng ký</span>
                  <span className="font-medium">{dashboardData.totalEnrollments}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Đăng ký trung bình</span>
                  <span className="font-medium">
                    {(dashboardData.totalEnrollments / (dashboardData.totalStudents || 1)).toFixed(1)}
                  </span>
                </div>

                {/* Đánh giá */}
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    Mỗi sinh viên đăng ký trung bình {(dashboardData.totalEnrollments / (dashboardData.totalStudents || 1)).toFixed(1)} môn học
                  </p>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>

      {/* Tóm tắt */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Tóm tắt hệ thống</CardTitle>
          <CardDescription>
            Tổng quan hiệu suất và hoạt động
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : dashboardData ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {(dashboardData.totalEnrollments / (dashboardData.totalStudents || 1)).toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">ĐK/Sinh viên</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {(dashboardData.totalStudents / (dashboardData.totalTeachers || 1)).toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">SV/Giáo viên</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {(dashboardData.totalSubjects / (dashboardData.totalClasses || 1)).toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">Môn/Lớp</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-amber-600">
                  {Math.round((dashboardData.totalEnrollments / (dashboardData.totalSubjects || 1)))}
                </div>
                <div className="text-sm text-muted-foreground">ĐK/Môn</div>
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;