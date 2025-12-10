
import { useEffect, useState } from "react";
import { useStudentStore } from "@/store/studentStore";
import { useClassesStore } from "@/store/classesStore";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Download, Upload } from "lucide-react";
import toast from "react-hot-toast";


import StudentCard from "../../components/Student/StudentCard";
import StudentFilters from "../../components/Student/StudentFilters";
import AddEditStudentDialog from "../../components/Student/AddEditStudentDialog";
import DeleteStudentDialog from "../../components/Student/DeleteStudentDialog";
import { Link } from "react-router-dom";
export default function StudentPage() {
  const { students, loading, fetchStudents, createStudent, updateStudent, deleteStudent } = useStudentStore();
  const { classes, fetchClasses } = useClassesStore();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClassId, setSelectedClassId] = useState("all");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [deletingStudent, setDeletingStudent] = useState(null);

  useEffect(() => {
    fetchClasses();
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(s => 
    (selectedClassId === "all"|| s.class?.id === selectedClassId) &&
    (searchTerm === "" || 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.studentCode && s.studentCode.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const handleAddStudent = async (data) => {
    try {
      await createStudent(data);
      toast.success("Thêm sinh viên thành công!");
    } catch (error) {
      toast.error("Thêm sinh viên thất bại!");
      throw error;
    }
  };

  const handleUpdateStudent = async (data) => {
    try {
      await updateStudent(data.id, data);
      toast.success("Cập nhật sinh viên thành công!");
    } catch (error) {
      toast.error("Cập nhật sinh viên thất bại!");
      throw error;
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingStudent) return;
    
    try {
      await deleteStudent(deletingStudent.id);
      toast.success("Xóa sinh viên thành công!");
      setOpenDeleteDialog(false);
      setDeletingStudent(null);
    } catch (error) {
      toast.error("Xóa sinh viên thất bại!");
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setOpenAddDialog(true);
  };

  const handleDelete = (student) => {
    setDeletingStudent(student);
    setOpenDeleteDialog(true);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Quản lý Sinh viên</h1>
          <p className="text-muted-foreground mt-2">
            Tổng số sinh viên: {students.length}
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => {
            setEditingStudent(null);
            setOpenAddDialog(true);
          }}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm sinh viên
          </Button>
        </div>
      </div>

      {/* Filters */}
      <StudentFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedClass={selectedClassId}
        onClassChange={setSelectedClassId}
        classes={classes}
        totalStudents={filteredStudents.length}
      />

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-600" />
            <p className="mt-4 text-muted-foreground">Đang tải danh sách sinh viên...</p>
          </div>
        </div>
      ) : filteredStudents.length === 0 ? (
        /* Empty state */
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
            <Plus className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">
            {searchTerm || selectedClassId 
              ? "Không tìm thấy sinh viên phù hợp" 
              : "Chưa có sinh viên nào"}
          </h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm || selectedClassId 
              ? "Hãy thử thay đổi điều kiện tìm kiếm" 
              : "Bắt đầu bằng cách thêm sinh viên đầu tiên"}
          </p>
          <Button onClick={() => setOpenAddDialog(true)} size="lg">
            <Plus className="mr-2 h-4 w-4" />
            Thêm sinh viên đầu tiên
          </Button>
        </div>
      ) : (
        /* Student cards grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Dialogs */}
      <AddEditStudentDialog
        open={openAddDialog}
        onOpenChange={setOpenAddDialog}
        editingStudent={editingStudent}
        classes={classes}
        onSuccess={editingStudent ? handleUpdateStudent : handleAddStudent}
      />

      <DeleteStudentDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        studentName={deletingStudent?.name}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}