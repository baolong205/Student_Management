// src/pages/Classes/ClassesPage.jsx
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useClassesStore } from "@/store/classesStore";
import { Loader2, Plus, Trash2, Edit, Save, X } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ClassesPage() {
  const { classes, loading, fetchClasses, createClass, updateClass, deleteClass } = useClassesStore();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); //
  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  // Thêm lớp mới
  const onSubmit = async (data) => {
    try {
      if (editingId) {
        await updateClass(editingId, {
          name: data.name,
          year: data.year,
          maxStudents: Number(data.maxStudents),
        });
        toast.success("Cập nhật lớp thành công!");
        setEditingId(null);
      } else {
        await createClass({
          name: data.name,
          year: data.year,
          maxStudents: Number(data.maxStudents),
        });
        toast.success("Thêm lớp thành công!");
      }
      reset();
      setOpen(false);
    } catch (err) {
      console.log("Loi",err)
      toast.error("Thao tác thất bại!");
    }
  };

  // Mở form sửa
  const handleEdit = (cls) => {
    setEditingId(cls.id);
    setValue("name", cls.name);
    setValue("year", cls.year);
    setValue("maxStudents", cls.maxStudents);
    setOpen(true);
  };

  // Xóa lớp
  const handleDelete = async (id) => {
    if (confirm("Bạn có chắc muốn xóa lớp này?")) {
      try {
        await deleteClass(id);
        toast.success("Xóa lớp thành công!");
      } catch (err) {
        toast.error("Xóa thất bại!");
      }
    }
  };

  // Đóng form → reset trạng thái
  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    reset();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Quản lý Lớp học</h1>

        <Dialog open={open} onOpenChange={handleClose}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Thêm lớp mới
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Chỉnh sửa lớp học" : "Thêm lớp học mới"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label>Tên lớp</Label>
                <Input {...register("name", { required: true })} placeholder="CNTT2023.1" />
              </div>
              <div>
                <Label>Năm học</Label>
                <Input {...register("year", { required: true })} placeholder="2023-2024" />
              </div>
              <div>
                <Label>Sĩ số tối đa</Label>
                <Input type="number" {...register("maxStudents", { required: true })} placeholder="60" />
              </div>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={handleClose}>
                  <X className="mr-2 h-4 w-4" /> Hủy
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  {editingId ? "Cập nhật" : "Thêm lớp"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : classes.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          Chưa có lớp học nào. Hãy thêm lớp đầu tiên!
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>STT</TableHead>
              <TableHead>Tên lớp</TableHead>
              <TableHead>Năm học</TableHead>
              <TableHead>Sĩ số tối đa</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classes.map((cls, index) => (
              <TableRow key={cls.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{cls.name}</TableCell>
                <TableCell>{cls.year}</TableCell>
                <TableCell>{cls.maxStudents}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(cls)}>
                    <Edit className="h-4 w-4 text-blue-600" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(cls.id)}>
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}