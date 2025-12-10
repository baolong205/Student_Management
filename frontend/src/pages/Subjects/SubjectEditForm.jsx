
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const SubjectEditForm = ({
  open,
  onClose,
  onSubmit,
  subject, // Nhận subject cần edit
  isLoading = false
}) => {
  const [formData, setFormData] = useState({
    name: '',
    credits: 3,
    subjectCode: '',
    description: '',
  });
  const [errors, setErrors] = useState({});

  // TỰ ĐỘNG ĐIỀN THÔNG TIN khi có subject và mở form
  useEffect(() => {
    if (subject && open) {
      setFormData({
        name: subject.name || '',
        credits: subject.credits || 3,
        subjectCode: subject.subjectCode || '',
        description: subject.description || '',
      });
    }
    setErrors({});
  }, [subject, open]); // Chỉ chạy khi subject hoặc open thay đổi

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'credits' ? Number(value) : value
    }));

    // Clear error khi người dùng nhập
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Tên môn học là bắt buộc';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Tên môn học phải có ít nhất 3 ký tự';
    }

    if (!formData.credits || formData.credits < 1 || formData.credits > 10) {
      newErrors.credits = 'Số tín chỉ phải từ 1 đến 10';
    }

    if (formData.subjectCode && !/^[A-Z0-9]{0,10}$/.test(formData.subjectCode)) {
      newErrors.subjectCode = 'Mã môn học chỉ được chứa chữ in hoa và số (tối đa 10 ký tự)';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData, subject?.id); // Truyền cả id để biết đang edit cái nào
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              Chỉnh sửa môn học
            </DialogTitle>
            <DialogDescription>
              Cập nhật thông tin môn học
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Tên môn học */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Tên môn học *
              </Label>
              <div className="col-span-3">
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ví dụ: Toán Cao Cấp A1"
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-destructive mt-1">{errors.name}</p>
                )}
              </div>
            </div>

            {/* Số tín chỉ */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="credits" className="text-right">
                Số tín chỉ *
              </Label>
              <div className="col-span-3">
                <div className="flex items-center gap-2">
                  <Input
                    id="credits"
                    name="credits"
                    type="number"
                    min="1"
                    max="10"
                    value={formData.credits}
                    onChange={handleChange}
                    className={errors.credits ? "border-destructive" : ""}
                  />
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    (1-10 tín chỉ)
                  </span>
                </div>
                {errors.credits && (
                  <p className="text-sm text-destructive mt-1">{errors.credits}</p>
                )}
              </div>
            </div>

            {/* Mã môn học */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subjectCode" className="text-right">
                Mã môn học
              </Label>
              <div className="col-span-3">
                <Input
                  id="subjectCode"
                  name="subjectCode"
                  value={formData.subjectCode}
                  onChange={handleChange}
                  placeholder="Ví dụ: MATH101"
                  className={errors.subjectCode ? "border-destructive" : ""}
                  maxLength={10}
                />
                {errors.subjectCode ? (
                  <p className="text-sm text-destructive mt-1">{errors.subjectCode}</p>
                ) : (
                  <p className="text-sm text-muted-foreground mt-1">
                    Tối đa 10 ký tự in hoa và số
                  </p>
                )}
              </div>
            </div>

            {/* Mô tả */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Mô tả
              </Label>
              <div className="col-span-3">
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Mô tả ngắn về môn học..."
                  rows={3}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Mô tả về nội dung môn học
                </p>
              </div>
            </div>

            {/* Thông tin tín chỉ */}
            <Alert className="bg-muted">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                1 tín chỉ ≈ 15 tiết học lý thuyết (45 phút/tiết)
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent mr-2" />
                  Đang lưu...
                </>
              ) : (
                'Cập nhật'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SubjectEditForm;