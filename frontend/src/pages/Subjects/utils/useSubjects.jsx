// src/pages/subjects/hooks/useSubjects.jsx
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";

export const useSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Mock API - thay bằng API thực tế
  const mockApi = {
    getSubjects: async () => {
      // Giả lập API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: '1',
              name: 'Toán Cao Cấp',
              credits: 3,
              subjectCode: 'MATH101',
              description: 'Môn toán cơ bản',
              semester: 1,
              status: 'active',
            },
            // ... thêm dữ liệu mẫu
          ]);
        }, 500);
      });
    },
    
    createSubject: async (data) => {
      // Giả lập API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ ...data, id: Date.now().toString() });
        }, 500);
      });
    },
    
    updateSubject: async (id, data) => {
      // Giả lập API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ ...data, id });
        }, 500);
      });
    },
    
    deleteSubject: async (id) => {
      // Giả lập API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true });
        }, 500);
      });
    },
  };

  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const data = await mockApi.getSubjects();
      setSubjects(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Không thể tải danh sách môn học",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSubject = async (data) => {
    setLoading(true);
    try {
      const newSubject = await mockApi.createSubject(data);
      setSubjects(prev => [...prev, newSubject]);
      toast({
        title: "Thành công",
        description: "Đã thêm môn học mới",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Không thể thêm môn học",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSubject = async (id, data) => {
    setLoading(true);
    try {
      const updatedSubject = await mockApi.updateSubject(id, data);
      setSubjects(prev => prev.map(subject => 
        subject.id === id ? updatedSubject : subject
      ));
      toast({
        title: "Thành công",
        description: "Đã cập nhật môn học",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Không thể cập nhật môn học",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubject = async (id) => {
    setLoading(true);
    try {
      await mockApi.deleteSubject(id);
      setSubjects(prev => prev.filter(subject => subject.id !== id));
      toast({
        title: "Thành công",
        description: "Đã xóa môn học",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Không thể xóa môn học",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    subjects,
    loading,
    fetchSubjects,
    handleCreateSubject,
    handleUpdateSubject,
    handleDeleteSubject,
  };
};