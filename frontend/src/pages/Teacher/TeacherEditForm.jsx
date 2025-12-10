// src/pages/Teacher/TeacherEditForm.jsx
import React, { useEffect, useState } from "react";
import TeacherForm from "./TeacherForm";
import { useTeacherStore } from "@/store/teacherStore";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const TeacherEditForm = ({
  open,
  onClose,
  teacherId,
  onSubmit,
  isLoading: externalLoading = false
}) => {
  const { fetchTeacherDetail, loading } = useTeacherStore();
  const [teacherData, setTeacherData] = useState(null);

  // Fetch teacher data khi mở form
  useEffect(() => {
    console.log("TeacherEditForm: open =", open);
    console.log("TeacherEditForm: teacherId =", teacherId);
    console.log("TeacherEditForm: teacherData =", teacherData);
    console.log("TeacherEditForm: loading =", loading);
    const loadTeacherData = async () => {
      if (open && teacherId) {
        try {
          const data = await fetchTeacherDetail(teacherId);
          setTeacherData(data);
        } catch (error) {
          console.error("Error loading teacher data:", error);
          setTeacherData(null);
        }
      }
    };

    loadTeacherData();
  }, [open, teacherId, fetchTeacherDetail]);

  // Reset data khi đóng form
  useEffect(() => {
    if (!open) {
      setTeacherData(null);
    }
  }, [open]);

  const handleSubmit = async (formData) => {
    try {
      await onSubmit(formData);
    } catch (error) {
      throw error;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa giáo viên</DialogTitle>
          <DialogDescription>
            Cập nhật thông tin giáo viên và phân công giảng dạy
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-3">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="text-sm text-muted-foreground">
              Đang tải thông tin giáo viên...
            </span>
          </div>
        ) : teacherData ? (
          <TeacherForm
            mode="edit"
            teacher={teacherData}
            onClose={onClose}
            onSubmit={handleSubmit}
            isLoading={externalLoading}
          />
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Loader2 className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Không tìm thấy giáo viên</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Không thể tải thông tin giáo viên
            </p>
            <Button onClick={onClose} className="mt-4">
              Đóng
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TeacherEditForm;