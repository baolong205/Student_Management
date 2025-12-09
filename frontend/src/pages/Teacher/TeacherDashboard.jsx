// src/components/teachers/TeacherDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTeacherStore } from "@/store/teacherStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import TeacherStats from "./TeacherStats";
import TeacherSearch from "./TeacherSearch";
import TeacherTable from "./TeacherTable";
import TeacherForm from "./TeacherForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { teachers, loading, fetchTeachers, searchTeachers, deleteTeacher } = useTeacherStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      await searchTeachers(searchTerm);
    } else {
      await fetchTeachers();
    }
  };

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteTeacher(id);
  };

  const handleView = (id) => {
    navigate(`/teachers/${id}`);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingTeacher(null);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý Giáo viên</h1>
          <p className="text-muted-foreground">
            Quản lý thông tin giáo viên, phân công giảng dạy
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Thêm giáo viên
        </Button>
      </div>

      {/* Stats */}
      <TeacherStats teachers={teachers} loading={loading} />

      {/* Search and Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách giáo viên</CardTitle>
          <CardDescription>
            Tìm kiếm và quản lý thông tin giáo viên trong hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <TeacherSearch
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onSearch={handleSearch}
              onRefresh={fetchTeachers}
              loading={loading}
            />
          </div>

          <TeacherTable
            teachers={teachers}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        </CardContent>
      </Card>

      {/* Teacher Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={handleFormClose}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingTeacher ? "Chỉnh sửa giáo viên" : "Thêm giáo viên mới"}
            </DialogTitle>
            <DialogDescription>
              {editingTeacher
                ? "Cập nhật thông tin giáo viên và phân công giảng dạy"
                : "Nhập đầy đủ thông tin giáo viên và phân công giảng dạy"}
            </DialogDescription>
          </DialogHeader>
          <TeacherForm
            teacher={editingTeacher}
            onClose={handleFormClose}
            mode={editingTeacher ? "edit" : "create"}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherDashboard;