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
import { Plus, Edit2, Trash2, Users, Loader2 } from "lucide-react";
import { useClassesStore } from "@/store/classesStore";
import toast from "react-hot-toast";

export default function ClassesPage() {
  const { classes, loading, fetchClasses, createClass, updateClass, deleteClass } = useClassesStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [editingClass, setEditingClass] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleSuccess = async (data) => {
    if (data.id) {
      await updateClass(data.id, data);
      toast.success("Cập nhật lớp thành công!");
    } else {
      await createClass(data);
      toast.success("Thêm lớp thành công!");
    }
    setOpenDialog(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Xóa lớp này? Sinh viên trong lớp sẽ bị ảnh hưởng!")) return;
    try {
      await deleteClass(id);
      toast.success("Xóa thành công");
    } catch {
      toast.error("Xóa thất bại");
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Quản lý lớp học</h1>
            <p className="text-gray-600 mt-2">
              Tổng <strong>{classes.length}</strong> lớp • 
              Đang hoạt động <strong>{classes.filter(c => (c.currentStudents || 0) > 0).length}</strong> lớp • 
              Tổng sức chứa <strong>{classes.reduce((a, c) => a + c.maxStudents, 0)}</strong> sinh viên
            </p>
          </div>
          <Button size="lg" onClick={() => { setEditingClass(null); setOpenDialog(true); }}>
            <Plus className="w-5 h-5 mr-2" /> Thêm lớp mới
          </Button>
        </div>

        {/* Loading & Empty State */}
        {loading ? (
          <div className="flex flex-col items-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
            <p className="mt-4 text-gray-500">Đang tải danh sách lớp...</p>
          </div>
        ) : classes.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed rounded-xl">
            <Users className="w-20 h-20 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Chưa có lớp học nào</h3>
            <Button size="lg" onClick={() => setOpenDialog(true)}>
              <Plus className="w-5 h-5 mr-2" /> Thêm lớp đầu tiên
            </Button>
          </div>
        ) : (
          /* Table */
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-16">STT</TableHead>
                  <TableHead>Lớp</TableHead>
                  <TableHead>Ngành</TableHead>
                  <TableHead>Khóa</TableHead>
                  <TableHead>Năm thứ</TableHead>
                  <TableHead className="text-center">Sĩ số</TableHead>
                  <TableHead className="text-right w-32">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map((cls, i) => {
                  const filled = cls.currentStudents || 0;
                  const percent = cls.maxStudents ? Math.round((filled / cls.maxStudents) * 100) : 0;
                  const isFull = percent >= 100;

                  return (
                    <TableRow key={cls.id} className="hover:bg-gray-50">
                      <TableCell>{i + 1}</TableCell>
                      <TableCell className="font-bold text-blue-700">{cls.name}</TableCell>
                      <TableCell className="text-gray-700">{cls.major}</TableCell>
                      <TableCell>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                          K{cls.enrollmentYear.toString().slice(-2)}
                        </span>
                      </TableCell>
                      <TableCell className="text-center font-bold text-lg">
                        {cls.currentYear}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-gray-200 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full transition-all ${
                                isFull ? 'bg-red-500' : percent >= 80 ? 'bg-orange-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${Math.min(100, percent)}%` }}
                            />
                          </div>
                          <span className={`font-bold ${isFull ? 'text-red-600' : ''}`}>
                            {filled} / {cls.maxStudents}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingClass(cls);
                            setOpenDialog(true);
                          }}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600"
                          onClick={() => handleDelete(cls.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}

        <AddClassDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          editingClass={editingClass}
          onSuccess={handleSuccess}
        />
      </div>
    </div>
  );
}