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
import SubjectTable from './SubjectTable';
import SubjectCard from './SubjectCard';

// Hook
import { useSubjects } from './hooks/useSubjects';

const SubjectsPage = () => {
  const {
    subjects,
    loading,
    isFormOpen,
    editingSubject,
    searchTerm,
    setSearchTerm,
    handleOpenCreateForm,
    handleOpenEditForm,
    handleCloseForm,
    handleSubmit,
    handleDelete,
    fetchSubjects,
  } = useSubjects();
  const [viewMode, setViewMode] = useState('table');
  // Load data khi component mount
  useEffect(() => {
    fetchSubjects();
  }, []);

  // Tính tổng tín chỉ
  const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0);

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
              <div className="text-2xl font-bold">{subjects.length}</div>
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
                {subjects.length > 0 ? (totalCredits / subjects.length).toFixed(1) : 0}
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
                placeholder="Tìm kiếm môn học..."
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
                {subjects.filter(s => s.credits >= 4).length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="low-credit">
              Tín chỉ thấp
              <Badge variant="secondary" className="ml-2">
                {subjects.filter(s => s.credits <= 2).length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Nội dung chính */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Danh sách môn học</CardTitle>
                <CardDescription>
                  {viewMode === 'table' ? 'Dạng bảng' : 'Dạng thẻ'} • {subjects.length} môn học
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
                subjects={subjects}
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
                ) : subjects.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                      <Search className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">Không tìm thấy môn học</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {searchTerm ? 'Thử tìm kiếm với từ khóa khác' : 'Hãy thêm môn học đầu tiên'}
                    </p>
                  </div>
                ) : (
                  subjects.map((subject) => (
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

        {/* Form Modal */}
        <SubjectForm
          open={isFormOpen}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
          editingSubject={editingSubject}
        />
      </div>
    </div>
  );
};

export default SubjectsPage;