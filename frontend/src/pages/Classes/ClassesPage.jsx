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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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

  // Tính toán thống kê
  const activeClasses = classes.filter(c => (c.currentStudents || 0) > 0).length;
  const totalCapacity = classes.reduce((a, c) => a + c.maxStudents, 0);

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Quản lý lớp học</h1>
            <p className="text-muted-foreground mt-2">
              Tổng <strong>{classes.length}</strong> lớp • 
              Đang hoạt động <strong>{activeClasses}</strong> lớp • 
              Tổng sức chứa <strong>{totalCapacity}</strong> sinh viên
            </p>
          </div>
          <Button onClick={() => { setEditingClass(null); setOpenDialog(true); }}>
            <Plus className="w-5 h-5 mr-2" /> Thêm lớp mới
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{classes.length}</div>
              <p className="text-sm text-muted-foreground">Tổng số lớp</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{activeClasses}</div>
              <p className="text-sm text-muted-foreground">Lớp đang hoạt động</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{totalCapacity}</div>
              <p className="text-sm text-muted-foreground">Tổng sức chứa</p>
            </CardContent>
          </Card>
        </div>

        {/* Loading & Empty State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">Đang tải danh sách lớp...</p>
          </div>
        ) : classes.length === 0 ? (
          <Card className="text-center py-12 border-dashed">
            <CardContent>
              <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Chưa có lớp học nào</h3>
              <p className="text-muted-foreground mb-6">Bắt đầu bằng cách thêm lớp học đầu tiên</p>
              <Button onClick={() => setOpenDialog(true)}>
                <Plus className="w-5 h-5 mr-2" /> Thêm lớp đầu tiên
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Table */
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">STT</TableHead>
                    <TableHead>Lớp</TableHead>
                    <TableHead>Ngành</TableHead>
                    <TableHead>Khóa</TableHead>
                    <TableHead className="text-center">Năm thứ</TableHead>
                    <TableHead className="text-center">Sĩ số</TableHead>
                    <TableHead className="text-right w-32">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classes.map((cls, i) => {
                    const filled = cls.currentStudents || 0;
                    const percent = cls.maxStudents ? Math.round((filled / cls.maxStudents) * 100) : 0;
                    const isFull = percent >= 100;
                    const isHigh = percent >= 80;

                    // Màu cho progress bar theo theme
                    const getProgressColor = () => {
                      if (isFull) return "bg-destructive";
                      if (isHigh) return "bg-orange-500";
                      return "bg-primary";
                    };

                    return (
                      <TableRow key={cls.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{i + 1}</TableCell>
                        <TableCell>
                          <div className="font-bold text-primary">{cls.name}</div>
                          {cls.description && (
                            <div className="text-sm text-muted-foreground">{cls.description}</div>
                          )}
                        </TableCell>
                        <TableCell className="text-foreground">{cls.major}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="font-medium">
                            K{cls.enrollmentYear.toString().slice(-2)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="text-xl font-bold">{cls.currentYear}</div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Sĩ số</span>
                              <span className={`font-bold ${isFull ? 'text-destructive' : 'text-foreground'}`}>
                                {filled} / {cls.maxStudents}
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all ${getProgressColor()}`}
                                style={{ width: `${Math.min(100, percent)}%` }}
                              />
                            </div>
                            <div className="text-xs text-muted-foreground text-right">
                              {percent}% đã đầy
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setEditingClass(cls);
                                setOpenDialog(true);
                              }}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDelete(cls.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </Card>
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