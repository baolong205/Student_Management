// src/pages/ClassesPage.jsx
import { useState, useEffect } from "react";
import AddClassDialog from "../Classes/AddClassDialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2, Loader2, Users } from "lucide-react";
import { useClassesStore } from "@/store/classesStore";
import toast from "react-hot-toast";

export default function ClassesPage() {
  const { classes, loading, fetchClasses, createClass, updateClass, deleteClass } = useClassesStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [editingClass, setEditingClass] = useState(null);

  // Lấy danh sách lớp khi component mount
  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const handleAddClick = () => {
    setEditingClass(null);
    setOpenDialog(true);
  };

  const handleEdit = (cls) => {
    setEditingClass(cls);
    setOpenDialog(true);
  };

  const handleClassSubmit = async (classData) => {
    try {
      if (classData.id) {
        // Update existing class
        await updateClass(classData.id, {
          name: classData.name,
          year: classData.year,
          maxStudents: classData.maxStudents,
        });
        toast.success("Cập nhật lớp thành công!");
      } else {
        // Create new class
        await createClass({
          name: classData.name,
          year: classData.year,
          maxStudents: classData.maxStudents,
        });
        toast.success("Thêm lớp thành công!");
      }
      setOpenDialog(false);
    } catch (error) {
      toast.error("Thao tác thất bại!");
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Bạn có chắc muốn xóa lớp này? Hành động này không thể hoàn tác.")) {
      try {
        await deleteClass(id);
        toast.success("Xóa lớp thành công!");
      } catch (error) {
        toast.error("Xóa lớp thất bại!");
        console.error("Error:", error);
      }
    }
  };

  // Tổng số sinh viên có thể chứa
  const totalCapacity = classes.reduce((sum, cls) => sum + cls.maxStudents, 0);

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Quản lý lớp học</h1>
          <p className="text-muted-foreground mt-2">
            Tổng số lớp: {classes.length} | Sức chứa tối đa: {totalCapacity} sinh viên
          </p>
        </div>

        <Button onClick={handleAddClick}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm lớp mới
        </Button>
      </div>

      {/* LOADING STATE */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin mx-auto text-blue-600" />
            <p className="mt-4 text-muted-foreground">Đang tải danh sách lớp...</p>
          </div>
        </div>
      ) : classes.length === 0 ? (
        /* EMPTY STATE */
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Chưa có lớp học nào</h3>
          <p className="text-muted-foreground mb-6">
            Bắt đầu bằng cách thêm lớp học đầu tiên của bạn
          </p>
          <Button onClick={handleAddClick} size="lg">
            <Plus className="mr-2 h-4 w-4" />
            Thêm lớp đầu tiên
          </Button>
        </div>
      ) : (
        /* CLASSES TABLE */
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-semibold">STT</TableHead>
                <TableHead className="font-semibold">Tên lớp</TableHead>
                <TableHead className="font-semibold">Năm học</TableHead>
                <TableHead className="font-semibold">Sĩ số tối đa</TableHead>
                <TableHead className="font-semibold text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((cls, index) => (
                <TableRow key={cls.id} className="hover:bg-slate-50">
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-semibold text-blue-600">{cls.name}</div>

                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                      {cls.year}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-32 bg-slate-200 rounded-full h-2 mr-3">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${Math.min(100, (cls.maxStudents / 100) * 100)}%` }}
                        ></div>
                      </div>
                      <span className="font-semibold">{cls.maxStudents}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(cls)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Sửa
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(cls.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Xóa
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <AddClassDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        editingClass={editingClass}
        onSuccess={handleClassSubmit}
      />

    </div>

  );
}