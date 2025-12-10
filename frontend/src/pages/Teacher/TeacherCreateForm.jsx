// src/pages/Teacher/TeacherCreateForm.jsx
import React from "react";
import TeacherForm from "./TeacherForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const TeacherCreateForm = ({ open, onClose, onSubmit, isLoading = false }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Thêm giáo viên mới</DialogTitle>
          <DialogDescription>
            Nhập đầy đủ thông tin giáo viên và phân công giảng dạy
          </DialogDescription>
        </DialogHeader>
        <TeacherForm
          mode="create"
          onClose={onClose}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TeacherCreateForm;