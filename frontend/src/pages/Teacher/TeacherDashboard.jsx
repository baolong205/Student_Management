// src/components/teachers/TeacherDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTeacherStore } from "@/store/teacherStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlusCircle, RefreshCw, Search } from "lucide-react";
import TeacherTable from "./TeacherTable";
import TeacherCreateForm from "./TeacherCreateForm";
import TeacherEditForm from "./TeacherEditForm";
import { Toaster, toast } from "sonner";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const {
    teachers,
    loading,
    fetchTeachers,
    deleteTeacher,
    createTeacher,
    updateTeacher,
    searchTeachers
  } = useTeacherStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editingTeacherId, setEditingTeacherId] = useState(null);

  // Load teachers khi component mount
  useEffect(() => {
    loadTeachers();
  }, []);

  // Filter teachers khi search term hoặc teachers thay đổi
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredTeachers(teachers);
    } else {
      const searchLower = searchTerm.toLowerCase();
      const filtered = teachers.filter(teacher =>
        teacher.firstName?.toLowerCase().includes(searchLower) ||
        teacher.lastName?.toLowerCase().includes(searchLower) ||
        teacher.email?.toLowerCase().includes(searchLower) ||
        teacher.phone?.toLowerCase().includes(searchLower) ||
        teacher.specialization?.toLowerCase().includes(searchLower) ||
        `${teacher.firstName || ''} ${teacher.lastName || ''}`.toLowerCase().includes(searchLower)
      );
      setFilteredTeachers(filtered);
    }
  }, [searchTerm, teachers]);

  const loadTeachers = async () => {
    try {
      await fetchTeachers();
    } catch (error) {
      toast.error("Không thể tải danh sách giáo viên");
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      try {
        await searchTeachers(searchTerm);
      } catch (error) {
        toast.error("Không thể tìm kiếm giáo viên");
      }
    } else {
      await loadTeachers();
    }
  };

  const handleRefresh = () => {
    setSearchTerm("");
    loadTeachers();
  };

  const handleCreate = () => {
    setIsCreateFormOpen(true);
  };

  const handleEdit = (teacher) => {
    setEditingTeacherId(teacher.id);
    setIsEditFormOpen(true);
  };

  const handleDelete = async (id) => {
    const teacherToDelete = teachers.find(t => t.id === id);
    if (!teacherToDelete) return;

    toast.custom((t) => (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border max-w-md">
        <div className="flex items-start">
          <div className="flex-1">
            <h4 className="font-semibold">Xác nhận xóa giáo viên</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Bạn có chắc chắn muốn xóa giáo viên <strong>{teacherToDelete.firstName} {teacherToDelete.lastName}</strong>?
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Hành động này không thể hoàn tác
            </p>
            <div className="flex gap-2 mt-4">
              <Button
                size="sm"
                variant="destructive"
                onClick={async () => {
                  try {
                    await deleteTeacher(id);
                    toast.success("Đã xóa giáo viên thành công");
                    loadTeachers();
                    toast.dismiss(t);
                  } catch (error) {
                    toast.error("Không thể xóa giáo viên");
                  }
                }}
              >
                Xóa
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => toast.dismiss(t)}
              >
                Hủy
              </Button>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const handleView = (id) => {
    navigate(`/teachers/${id}`);
  };

  const handleCreateSubmit = async (data) => {
    try {
      await createTeacher(data);
      setIsCreateFormOpen(false);
      await loadTeachers();
      // Toast đã được xử lý trong store
    } catch (error) {
      // Toast đã được xử lý trong store
      throw error;
    }
  };

  const handleEditSubmit = async (data) => {
    try {
      if (!editingTeacherId) return;

      await updateTeacher(editingTeacherId, data);
      setIsEditFormOpen(false);
      setEditingTeacherId(null);
      await loadTeachers();
      // Toast đã được xử lý trong store
    } catch (error) {
      // Toast đã được xử lý trong store
      throw error;
    }
  };

  const handleFormClose = () => {
    setIsCreateFormOpen(false);
    setIsEditFormOpen(false);
    setEditingTeacherId(null);
  };

  // Tính toán thống kê
  const totalTeachers = teachers.length;
  const maleTeachers = teachers.filter(t => t.gender === 'male').length;
  const femaleTeachers = teachers.filter(t => t.gender === 'female').length;
  const avgExperience = teachers.length > 0
    ? (teachers.reduce((sum, t) => sum + (t.yearsOfExperience || 0), 0) / teachers.length).toFixed(1)
    : 0;

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      {/* Sonner Toaster */}
      <Toaster
        position="top-right"
        expand={false}
        richColors
        closeButton
        duration={3000}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý Giáo viên</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý thông tin giáo viên, phân công giảng dạy và theo dõi hiệu quả
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Làm mới
          </Button>
          <Button onClick={handleCreate} disabled={loading}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Thêm giáo viên
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tổng số giáo viên
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTeachers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Đang hoạt động trong hệ thống
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Giáo viên nam
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{maleTeachers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {totalTeachers > 0 ? Math.round((maleTeachers / totalTeachers) * 100) : 0}% tổng số
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Giáo viên nữ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{femaleTeachers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {totalTeachers > 0 ? Math.round((femaleTeachers / totalTeachers) * 100) : 0}% tổng số
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Kinh nghiệm TB
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgExperience} năm</div>
            <p className="text-xs text-muted-foreground mt-1">
              Trung bình số năm kinh nghiệm
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Danh sách giáo viên</CardTitle>
              <CardDescription>
                Quản lý thông tin giáo viên trong hệ thống
              </CardDescription>
            </div>
            <div className="text-sm text-muted-foreground">
              Hiển thị {filteredTeachers.length} trong tổng số {teachers.length} giáo viên
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Component */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm theo tên, email, chuyên môn..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSearch}
                disabled={loading}
              >
                Tìm kiếm
              </Button>
              {searchTerm && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    loadTeachers();
                  }}
                >
                  Xóa
                </Button>
              )}
            </div>
          </div>

          {/* Teacher Table */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-2 text-muted-foreground">Đang tải dữ liệu...</p>
            </div>
          ) : filteredTeachers.length === 0 ? (
            <div className="text-center py-12 border rounded-lg">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">
                {searchTerm ? 'Không tìm thấy giáo viên' : 'Chưa có giáo viên nào'}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {searchTerm
                  ? 'Thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc'
                  : 'Hãy thêm giáo viên đầu tiên'}
              </p>
              {!searchTerm && (
                <Button onClick={handleCreate} className="mt-4">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Thêm giáo viên đầu tiên
                </Button>
              )}
            </div>
          ) : (
            <TeacherTable
              teachers={filteredTeachers}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          )}
        </CardContent>
      </Card>

      {/* Teacher Create Form */}
      {isCreateFormOpen && (
        <TeacherCreateForm
          open={isCreateFormOpen}
          onClose={handleFormClose}
          onSubmit={handleCreateSubmit}
          isLoading={loading}
        />
      )}

      {/* Teacher Edit Form */}
      {isEditFormOpen && (
        <TeacherEditForm
          open={isEditFormOpen}
          onClose={handleFormClose}
          teacherId={editingTeacherId}
          onSubmit={handleEditSubmit}
          isLoading={loading}
        />)}
    </div>
  );
};

export default TeacherDashboard;