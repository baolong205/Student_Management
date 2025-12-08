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

  // Fill dữ liệu khi sửa
  useEffect(() => {
    if (open) {
      if (editingClass) {
        setValue("name", editingClass.name);
        setValue("year", editingClass.year);
        setValue("maxStudents", editingClass.maxStudents);
      } else {
        reset();
      }
    }
  }, [open, editingClass, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      await onSuccess({
        id: editingClass?.id,
        ...data,
        maxStudents: Number(data.maxStudents),
      });
      onOpenChange(false);
      reset();
    } catch (error) {
      console.error(error);
      throw error; // Re-throw để parent component xử lý
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editingClass ? "Chỉnh sửa lớp học" : "Thêm lớp học mới"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Tên lớp <span className="text-red-500">*</span></Label>
            <Input
              {...register("name", { required: "Tên lớp không được để trống" })}
              placeholder="VD: CNTT2023.1"
              className={errors.name && "border-red-500"}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          {/* Year */}
          <div className="space-y-2">
            <Label htmlFor="year">Năm học <span className="text-red-500">*</span></Label>
            <Input
              {...register("year", {
                required: "Năm học không được để trống",
                pattern: {
                  value: /^\d{4}-\d{4}$/,
                  message: "Định dạng năm học: YYYY-YYYY (VD: 2023-2024)",
                },
              })}
              placeholder="2023-2024"
              className={errors.year && "border-red-500"}
            />
            {errors.year && <p className="text-sm text-red-500">{errors.year.message}</p>}
          </div>

          {/* Max students */}
          <div className="space-y-2">
            <Label htmlFor="maxStudents">Sĩ số tối đa <span className="text-red-500">*</span></Label>
            <Input
              type="number"
              {...register("maxStudents", {
                required: "Sĩ số không được để trống",
                min: { value: 1, message: "Sĩ số phải lớn hơn 0" },
                max: { value: 200, message: "Không vượt quá 200" },
              })}
              placeholder="60"
              className={errors.maxStudents && "border-red-500"}
            />
            {errors.maxStudents && <p className="text-sm text-red-500">{errors.maxStudents.message}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
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