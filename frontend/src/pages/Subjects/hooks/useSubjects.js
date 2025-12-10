
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

  const handleOpenCreateForm = () => {
    setEditingSubject(null);
    setIsFormOpen(true);
    return true; 
  };
  const handleOpenEditForm = (subject) => {
    setEditingSubject(subject);
    setIsFormOpen(true);
    return true;
  };
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingSubject(null);
  };
  const handleCreateSubject = async (data) => {
    try {
      const result = await createSubject(data);
      toast.success('Thêm môn học thành công!');
      return result;
    } catch (error) {
      toast.error('Lỗi khi thêm môn học');
      throw error;
    }
  };
  const handleUpdateSubject = async (id, data) => {
    try {
      const result = await updateSubject(id, data);
      toast.success('Cập nhật môn học thành công!');
      return result;
    } catch (error) {
      toast.error('Lỗi khi cập nhật môn học');
      throw error;
    }
  };
  const handleDeleteSubject = async (id) => {
    try {
      const result = await deleteSubject(id);
      toast.success('Xóa môn học thành công!');
      return result;
    } catch (error) {
      toast.error('Lỗi khi xóa môn học');
      throw error;
    }
  };
  return {
    subjects,
    loading,
    isFormOpen,
    editingSubject,
    searchTerm,
    setSearchTerm,
    fetchSubjects,
    handleCreateSubject,
    handleUpdateSubject,
    handleDeleteSubject,
    handleOpenCreateForm,
    handleOpenEditForm,
    handleCloseForm,
  };
};