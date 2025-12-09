// src/components/Students/AddEditStudentDialog.jsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { useStudentStore } from "@/store/studentStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Save, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; // Thêm Popover

export default function AddEditStudentDialog({
  open,
  onOpenChange,
  editingStudent = null,
  classes = [],
  onSuccess,
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [birthDate, setBirthDate] = useState(editingStudent?.dob ? new Date(editingStudent.dob) : new Date());
  const [openCalendar, setOpenCalendar] = useState(false); 

  useEffect(() => {
    if (open) {
      if (editingStudent) {
        setValue("name", editingStudent.name);
        setValue("email", editingStudent.email);
        setValue("phone", editingStudent.phone || "");
        setValue("gender", editingStudent.gender || "male");
        setValue("classId", editingStudent.class?.id || "");
        setBirthDate(new Date(editingStudent.dob));
      } else {
        reset();
        setBirthDate(new Date());
      }
    }
  }, [open, editingStudent, setValue, reset]);

  const onSubmit = async (data) => {
    const { students } = useStudentStore.getState();
    if (!editingStudent && students.some((s) => s.email === data.email)) {
      toast.error("Email đã tồn tại");
      return;
    }

    try {
      const formattedDate = format(birthDate, 'yyyy-MM-dd');
      const studentData = {
        id: editingStudent?.id,
        ...data,
        dob: formattedDate,
        classId: data.classId === "none" || data.classId === "" ? null : data.classId,
      };
      await onSuccess(studentData);
      onOpenChange(false);
      reset();
    } catch (error) {
      console.error(error);
      const message = error?.response?.data?.message || error?.message || "Thao tác thất bại";
      toast.error(message);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {editingStudent ? "Chỉnh sửa sinh viên" : "Thêm sinh viên mới"}
          </DialogTitle>
          <DialogDescription>
            {editingStudent ? "Cập nhật thông tin sinh viên." : "Nhập thông tin sinh viên mới."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Họ tên <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register("name", { required: "Họ tên không được để trống" })}
                placeholder="Nguyễn Văn A"
                className={errors.name && "border-red-500"}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                type="email"
                {...register("email", {
                  required: "Email không được để trống",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email không hợp lệ",
                  },
                })}
                placeholder="student@example.com"
                className={errors.email && "border-red-500"}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">
                Số điện thoại
              </Label>
              <Input
                type="tel"
                {...register("phone", {
                  pattern: {
                    value: /^[0-9\-\+]{9,15}$/,
                    message: "Số điện thoại không hợp lệ",
                  },
                })}
                placeholder="0912345678"
                className={errors.phone && "border-red-500"}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Giới tính</Label>
              <Select
                onValueChange={(value) => setValue("gender", value)}
                defaultValue={editingStudent?.gender || "male"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn giới tính" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Nam</SelectItem>
                  <SelectItem value="female">Nữ</SelectItem>
                  <SelectItem value="other">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="classId">Lớp học</Label>
              <Select
                onValueChange={(value) => setValue("classId", value)}
                defaultValue={editingStudent?.class?.id || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn lớp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Chưa xếp lớp</SelectItem>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Ngày sinh</Label>
            <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !birthDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {birthDate ? format(birthDate, "dd/MM/yyyy") : "Chọn ngày"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={birthDate}
                  onSelect={(date) => {
                    setBirthDate(date);
                    setOpenCalendar(false);
                  }}
                  initialFocus
                  disabled={(date) => date > new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              <X className="mr-2 h-4 w-4" /> Hủy
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              {editingStudent ? "Cập nhật" : "Thêm sinh viên"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}