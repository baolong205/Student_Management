// src/components/Classes/AddClassDialog.jsx
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Save, X } from "lucide-react";

export default function AddClassDialog({
  onSuccess,
  editingClass = null,
  open,
  onOpenChange,
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (open) {
      if (editingClass) {
        setValue("name", editingClass.name);
        setValue("major", editingClass.major);
        setValue("enrollmentYear", editingClass.enrollmentYear);
        setValue("currentYear", editingClass.currentYear);
        setValue("maxStudents", editingClass.maxStudents);
      } else {
        reset();
      }
    }
  }, [open, editingClass, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        id: editingClass?.id,
        name: data.name.trim(),
        major: data.major.trim(),
        enrollmentYear: Number(data.enrollmentYear),
        currentYear: Number(data.currentYear || 1),
        maxStudents: Number(data.maxStudents),
      };

      await onSuccess(payload);
      onOpenChange(false);
      reset();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {editingClass ? "Chỉnh sửa lớp học" : "Thêm lớp học mới"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-2 gap-2 gap-4">
            <div>
              <Label>Tên lớp <span className="text-red-500">*</span></Label>
              <Input
                {...register("name", { required: "Bắt buộc nhập tên lớp" })}
                placeholder="VD: DHCNTT20A"
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <Label>Ngành học <span className="text-red-500">*</span></Label>
              <Input
                {...register("major", { required: "Bắt buộc chọn ngành" })}
                placeholder="VD: Công nghệ thông tin"
              />
              {errors.major && <p className="text-sm text-red-500 mt-1">{errors.major.message}</p>}
            </div>

            <div>
              <Label>Năm nhập học <span className="text-red-500">*</span></Label>
              <Input
                type="number"
                {...register("enrollmentYear", {
                  required: "Bắt buộc",
                  min: { value: 2000, message: "Năm ≥ 2000" },
                  max: { value: new Date().getFullYear() + 5, message: "Năm không hợp lệ" },
                })}
                placeholder="2024"
              />
              {errors.enrollmentYear && <p className="text-sm text-red-500 mt-1">{errors.enrollmentYear.message}</p>}
            </div>

            <div>
              <Label>Năm học hiện tại</Label>
              <Input
                type="number"
                min="1"
                max="6"
                defaultValue={1}
                {...register("currentYear")}
                placeholder="1"
              />
            </div>

            <div>
              <Label>Sĩ số tối đa <span className="text-red-500">*</span></Label>
              <Input
                type="number"
                {...register("maxStudents", {
                  required: "Bắt buộc",
                  min: { value: 20, message: "Tối thiểu 20" },
                  max: { value: 200, message: "Tối đa 200" },
                })}
                placeholder="60"
              />
              {errors.maxStudents && <p className="text-sm text-red-500 mt-1">{errors.maxStudents.message}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              <X className="mr-2 h-4 w-4" /> Hủy
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              {editingClass ? "Cập nhật" : "Thêm lớp"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}