// src/components/teachers/TeacherDetail.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTeacherStore } from "@/store/teacherStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
// Sửa import này - có thể có 2 trường hợp:
// Trường hợp 1: Nếu file TeacherEditForm nằm trong cùng thư mục
import TeacherEditForm from "./TeacherEditForm";
// Trường hợp 2: Nếu file nằm ở pages
// import TeacherEditForm from "@/pages/Teacher/TeacherEditForm";
import {
  Mail,
  Phone,
  Calendar,
  MapPin,
  BookOpen,
  Users,
  Award,
  Briefcase,
  ArrowLeft,
} from "lucide-react";

const TeacherDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentTeacher, fetchTeacherDetail, loading, updateTeacher } = useTeacherStore();
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (id) {
      fetchTeacherDetail(id);
    }
  }, [id]);

  const handleEditSuccess = async (formData) => {
    try {
      if (id) {
        await updateTeacher(id, formData);
        // Refresh teacher data
        await fetchTeacherDetail(id);
      }
      setShowEditModal(false);
    } catch (error) {
      // Error đã được xử lý trong store
    }
  };

  if (loading) {
    return <TeacherDetailSkeleton />;
  }

  if (!currentTeacher) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold">Không tìm thấy giáo viên</h3>
        <Button onClick={() => navigate("/teachers")} className="mt-4">
          Quay lại danh sách
        </Button>
      </div>
    );
  }

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const formatDate = (date) => {
    if (!date) return "Chưa có";
    return new Date(date).toLocaleDateString("vi-VN");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={() => navigate("/teachers")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {currentTeacher.firstName} {currentTeacher.lastName}
            </h1>
            <p className="text-muted-foreground">Thông tin chi tiết giáo viên</p>
          </div>
        </div>
        <Button onClick={() => setShowEditModal(true)}>
          Chỉnh sửa
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={`/avatars/${currentTeacher.id}.jpg`} />
                  <AvatarFallback className="text-2xl">
                    {getInitials(currentTeacher.firstName, currentTeacher.lastName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-2xl font-bold">
                    {currentTeacher.firstName} {currentTeacher.lastName}
                  </h3>
                  <p className="text-muted-foreground">
                    {currentTeacher.qualification || "Giáo viên"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thông tin liên hệ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{currentTeacher.email}</span>
              </div>
              {currentTeacher.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{currentTeacher.phone}</span>
                </div>
              )}
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Ngày sinh: {formatDate(currentTeacher.dateOfBirth)}</span>
              </div>
              {currentTeacher.address && (
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="flex-1">{currentTeacher.address}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Professional Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thông tin chuyên môn</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Chuyên môn
                  </p>
                  <p>{currentTeacher.specialization || "Chưa có"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Kinh nghiệm
                  </p>
                  <div className="flex items-center">
                    <Briefcase className="mr-2 h-4 w-4" />
                    <span>{currentTeacher.yearsOfExperience || 0} năm</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Bằng cấp
                  </p>
                  <div className="flex items-center">
                    <Award className="mr-2 h-4 w-4" />
                    <span>{currentTeacher.qualification || "Chưa có"}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Giới tính
                  </p>
                  <Badge variant="outline">
                    {currentTeacher.gender === "male"
                      ? "Nam"
                      : currentTeacher.gender === "female"
                      ? "Nữ"
                      : "Khác"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subjects */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Môn học được phân công
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentTeacher.subjects?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {currentTeacher.subjects.map((subject) => (
                    <Badge key={subject.id} variant="secondary" className="text-sm py-2">
                      {subject.name}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Chưa được phân công môn học</p>
              )}
            </CardContent>
          </Card>

          {/* Classes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Lớp học được phân công
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentTeacher.classes?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {currentTeacher.classes.map((cls) => (
                    <Badge key={cls.id} variant="outline" className="text-sm py-2">
                      {cls.name}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Chưa được phân công lớp học</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Modal */}
      <TeacherEditForm
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        teacherId={currentTeacher.id}
        onSubmit={handleEditSuccess}
        isLoading={loading}
      />
    </div>
  );
};

// Skeleton for loading state
const TeacherDetailSkeleton = () => (
  <div className="container mx-auto p-6 space-y-6">
    <div className="flex items-center space-x-4">
      <Skeleton className="h-10 w-10" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Skeleton className="h-32 w-32 rounded-full" />
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-8 w-16" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

export default TeacherDetail;