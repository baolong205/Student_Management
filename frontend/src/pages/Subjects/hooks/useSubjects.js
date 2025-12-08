// src/pages/subjects/hooks/useSubjects.js
import { useState } from 'react';
import { useSubjectStore } from '@/store/subjectStore';
import toast from 'react-hot-toast';

export const useSubjects = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { 
    subjects, 
    loading, 
    fetchSubjects, 
    createSubject, 
    updateSubject, 
    deleteSubject 
  } = useSubjectStore();

  // Mở form tạo mới
  const handleOpenCreateForm = () => {
    setEditingSubject(null);
    setIsFormOpen(true);
  };

  // Mở form chỉnh sửa
  const handleOpenEditForm = (subject) => {
    setEditingSubject(subject);
    setIsFormOpen(true);
  };

  // Đóng form
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingSubject(null);
  };

  // Xử lý tạo/cập nhật
  const handleSubmit = async (data) => {
    try {
      if (editingSubject) {
        await updateSubject(editingSubject.id, data);
        toast.success('Cập nhật môn học thành công!');
      } else {
        await createSubject(data);
        toast.success('Thêm môn học thành công!');
      }
      handleCloseForm();
    } catch (error) {
      console.error(error);
    }
  };

  // Xử lý xóa
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa môn học này?')) {
      await deleteSubject(id);
    }
  };

  // Lọc môn học theo từ khóa
  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    // State
    subjects: filteredSubjects,
    loading,
    isFormOpen,
    editingSubject,
    searchTerm,
    
    // Actions
    setSearchTerm,
    handleOpenCreateForm,
    handleOpenEditForm,
    handleCloseForm,
    handleSubmit,
    handleDelete,
    fetchSubjects,
  };
};