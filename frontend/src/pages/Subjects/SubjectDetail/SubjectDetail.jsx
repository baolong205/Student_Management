// src/pages/Subjects/SubjectDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSubjectStore } from "@/store/subjectStore";
import { useTeacherStore } from "@/store/teacherStore";
import { useStudentStore } from "@/store/studentStore";

import SubjectHeader from "./SubjectHeader";
import SubjectStatsGrid from "./SubjectStatsGrid";
import SubjectInfoCard from "./SubjectInfoCard";
import SubjectTeachersCard from "./SubjectTeachersCard";
import SubjectStudentsCard from "./SubjectStudentsCard";
import SubjectEnrollmentStats from "./SubjectEnrollmentStats";
import SubjectQuickActions from "./SubjectQuickActions";
import SubjectDetailSkeleton from "./SubjectDetailSkeleton";

const SubjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { 
    currentSubject, 
    fetchSubjectDetail, 
    fetchSubjectStudents,
    loading: subjectLoading 
  } = useSubjectStore();
  const { teachers: allTeachers, fetchTeachers } = useTeacherStore();
  const { students: allStudents, fetchStudents } = useStudentStore();

  const [subjectTeachers, setSubjectTeachers] = useState([]);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchSubjectDetail(id),
          fetchTeachers(),
          fetchStudents()
        ]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) loadData();
  }, [id]);

  // Lọc giáo viên dạy môn này
  useEffect(() => {
    if (currentSubject && allTeachers.length > 0) {
      const teachers = allTeachers.filter(t =>
        t.subjects?.some(s => s.id === currentSubject.id)
      );
      setSubjectTeachers(teachers);
    }
  }, [currentSubject, allTeachers]);

  // Lọc sinh viên đăng ký môn này
  useEffect(() => {
    if (currentSubject && allStudents.length > 0) {
      const loadSubjectStudents = async () => {
        try {
          const students = await fetchSubjectStudents(currentSubject.id);
          setEnrolledStudents(students || []);
        } catch (error) {
          // Fallback: lọc thủ công nếu API lỗi
          filterStudentsManually();
        }
      };
      
      const filterStudentsManually = () => {
        const students = allStudents.filter(s => {
          // Kiểm tra qua enrollments
          if (s.enrollments?.some(e => 
            e.subjectId === currentSubject.id || 
            e.subject?.id === currentSubject.id
          )) {
            return true;
          }
          
          // Kiểm qua subjects trực tiếp
          if (s.subjects?.some(sub => sub.id === currentSubject.id)) {
            return true;
          }
          
          return false;
        });
        
        setEnrolledStudents(students);
      };
      
      loadSubjectStudents();
    } else if (currentSubject && allStudents.length === 0) {
      setEnrolledStudents([]);
    }
  }, [currentSubject, allStudents, fetchSubjectStudents]);

  if (loading || subjectLoading) {
    return <SubjectDetailSkeleton />;
  }
  
  if (!currentSubject) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Không tìm thấy môn học</h2>
        <button 
          onClick={() => navigate("/subjects")} 
          className="text-primary hover:underline"
        >
          ← Quay lại danh sách
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <SubjectHeader 
        subject={currentSubject} 
        onBack={() => navigate("/subjects")} 
      />

      <SubjectStatsGrid
        credits={currentSubject.credits}
        teacherCount={subjectTeachers.length}
        studentCount={enrolledStudents.length}
        semester={currentSubject.semester}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cột trái */}
        <div className="space-y-6">
          <SubjectInfoCard subject={currentSubject} />
          <SubjectTeachersCard teachers={subjectTeachers} />
        </div>

        {/* Cột phải */}
        <div className="space-y-6">
          <SubjectStudentsCard students={enrolledStudents} />
          <SubjectEnrollmentStats
            enrolledCount={enrolledStudents.length}
            totalStudents={allStudents.length}
          />
          <SubjectQuickActions subjectId={id} />
        </div>
      </div>
    </div>
  );
};

export default SubjectDetail;