// src/pages/subjects/index.jsx
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Plus, Grid, List, Download, Filter } from "lucide-react";

// Components
import SubjectForm from './SubjectForm';
import SubjectEditForm from './SubjectEditForm'; // Form edit riêng
import SubjectTable from './SubjectTable';
import SubjectCard from './SubjectCard';

// Hook
import { useSubjects } from './hooks/useSubjects';

const SubjectsPage = () => {
  const [viewMode, setViewMode] = useState('table');
  const [formMode, setFormMode] = useState('create'); // 'create' hoặc 'edit'
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Sử dụng hook subjects
  const {
    subjects,
    loading,
    fetchSubjects,
    handleCreateSubject,
    handleUpdateSubject,
    handleDeleteSubject,
  } = useSubjects();

  // Load data khi component mount
  useEffect(() => {
    fetchSubjects();
  }, []);

  // Lọc subjects theo search term
  const filteredSubjects = subjects.filter(subject => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    return (
      subject.name?.toLowerCase().includes(searchLower) ||
      subject.subjectCode?.toLowerCase().includes(searchLower) ||
      subject.description?.toLowerCase().includes(searchLower)
    );
  });

  // Tính tổng tín chỉ
  const totalCredits = filteredSubjects.reduce((sum, subject) => sum + subject.credits, 0);

  // Xử lý mở form tạo mới
  const handleOpenCreateForm = () => {
    setFormMode('create');
    setSelectedSubject(null);
    setIsFormOpen(true);
  };

  // Xử lý mở form chỉnh sửa
  const handleOpenEditForm = (subject) => {
    setFormMode('edit');
    setSelectedSubject(subject);
    setIsFormOpen(true);
  };

  // Xử lý đóng form
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedSubject(null);
  };

  // Xử lý submit form
  const handleSubmit = async (formData) => {
    try {
      if (formMode === 'create') {
        await handleCreateSubject(formData);
      } else {
        await handleUpdateSubject(selectedSubject.id, formData);
      }
      handleCloseForm();
      fetchSubjects(); // Refresh danh sách
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Xử lý xóa subject
  const handleDelete = async (subjectId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa môn học này?')) {
      try {
        await handleDeleteSubject(subjectId);
        fetchSubjects(); // Refresh danh sách
      } catch (error) {
        console.error('Error deleting subject:', error);
      }
    }
  };

  // Thống kê
  const highCreditSubjects = filteredSubjects.filter(s => s.credits >= 4).length;
  const lowCreditSubjects = filteredSubjects.filter(s => s.credits <= 2).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Quản lý Môn học</h1>
            <p className="text-muted-foreground mt-1">
              Quản lý danh sách môn học, tín chỉ và thông tin liên quan
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Xuất file
            </Button>
            <Button onClick={handleOpenCreateForm}>
              <Plus className="mr-2 h-4 w-4" />
              Thêm môn học
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Tổng số môn học
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredSubjects.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Tổng số tín chỉ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCredits}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Trung bình tín chỉ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredSubjects.length > 0 ? (totalCredits / filteredSubjects.length).toFixed(1) : 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search và Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Tìm kiếm theo tên, mã môn học..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>

            <div className="flex items-center space-x-1 border rounded-md p-1">
              <Button
                variant={viewMode === 'table' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('table')}
                className="h-9 w-9"
              >
                <List className="h-4 w-4" />
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Button
                variant={viewMode === 'card' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('card')}
                className="h-9 w-9"
              >
                <Grid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="high-credit">
              Tín chỉ cao
              <Badge variant="secondary" className="ml-2">
                {highCreditSubjects}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="low-credit">
              Tín chỉ thấp
              <Badge variant="secondary" className="ml-2">
                {lowCreditSubjects}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            {/* Content for all subjects */}
          </TabsContent>

          <TabsContent value="high-credit" className="mt-4">
            {/* Content for high credit subjects */}
          </TabsContent>

          <TabsContent value="low-credit" className="mt-4">
            {/* Content for low credit subjects */}
          </TabsContent>
        </Tabs>

        {/* Nội dung chính */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Danh sách môn học</CardTitle>
                <CardDescription>
                  {viewMode === 'table' ? 'Dạng bảng' : 'Dạng thẻ'} • {filteredSubjects.length} môn học
                </CardDescription>
              </div>
              <Badge variant="outline">
                {totalCredits} tổng tín chỉ
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {viewMode === 'table' ? (
              <SubjectTable
                subjects={filteredSubjects}
                loading={loading}
                onEdit={handleOpenEditForm}
                onDelete={handleDelete}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                  // Skeleton loading cho card view
                  Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i}>
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          <div className="h-4 bg-muted rounded w-3/4"></div>
                          <div className="h-3 bg-muted rounded w-1/2"></div>
                          <div className="h-8 bg-muted rounded w-1/4"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : filteredSubjects.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                      <Search className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">Không tìm thấy môn học</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {searchTerm ? 'Thử tìm kiếm với từ khóa khác' : 'Hãy thêm môn học đầu tiên'}
                    </p>
                    {!searchTerm && (
                      <Button onClick={handleOpenCreateForm} className="mt-4">
                        <Plus className="mr-2 h-4 w-4" />
                        Thêm môn học đầu tiên
                      </Button>
                    )}
                  </div>
                ) : (
                  filteredSubjects.map((subject) => (
                    <SubjectCard
                      key={subject.id}
                      subject={subject}
                      onEdit={handleOpenEditForm}
                      onDelete={handleDelete}
                    />
                  ))
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Form Modals */}
        <SubjectForm
          open={isFormOpen}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
          editingSubject={selectedSubject}
          isLoading={loading}
        />
      </div>
    </div>
  );
};

export default SubjectsPage;