
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStudentStore } from "@/store/studentStore";
import { useSubjectStore } from "@/store/subjectStore";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Plus } from "lucide-react";
import { Link } from "react-router-dom";


import StudentInfoCard from "../../components/StudentDetail/StudentInfoCard";
import StudentEnrollments from "../../components/StudentDetail/StudentEnrollments";
import StudentStats from "../../components/StudentDetail/StudentStats";
import AddEnrollmentDialog from "../../components/StudentDetail/AddEnrollmentDialog";
import LoadingState from "../../components/LoadingState";
import ErrorState from "../../components/ErrorState";

export default function StudentDetail() {
  const { id } = useParams();
  const { 
    currentStudent, 
    loading, 
    error,
    fetchStudentDetail, 
    fetchStudentEnrollments,
    resetCurrentStudent 
  } = useStudentStore();
  
  const { fetchSubjects } = useSubjectStore();
  const [openAddEnrollment, setOpenAddEnrollment] = useState(false);

  useEffect(() => {
    if (id) {
      fetchStudentDetail(id);
      fetchStudentEnrollments(id);
      fetchSubjects();
    }
    
    return () => {
      resetCurrentStudent();
    };
  }, [id]);

  if (loading && !currentStudent) {
    return <LoadingState message="Đang tải thông tin sinh viên..." />;
  }

  if (error) {
    return <ErrorState 
      title="Không tải được thông tin" 
      message={error}
      action={
        <Button asChild>
          <Link to="/students">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại danh sách
          </Link>
        </Button>
      }
    />;
  }

  if (!currentStudent) {
    return (
      <ErrorState
        title="Không tìm thấy sinh viên"
        message="Sinh viên bạn tìm kiếm không tồn tại hoặc đã bị xóa"
        action={
          <Button asChild>
            <Link to="/students">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại danh sách
            </Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 md:mb-8">
        <div className="flex items-center gap-3 md:gap-4">
          <Button variant="outline" size="icon" asChild className="flex-shrink-0">
            <Link to="/students">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Thông tin sinh viên</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Chi tiết sinh viên và điểm số
            </p>
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none">
            <Edit className="mr-2 h-4 w-4" />
            Sửa thông tin
          </Button>
          <Button 
            onClick={() => setOpenAddEnrollment(true)}
            className="flex-1 md:flex-none"
          >
            <Plus className="mr-2 h-4 w-4" />
            Đăng ký môn học
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-4 md:space-y-6">
          <StudentInfoCard student={currentStudent} />
          <StudentStats enrollments={currentStudent.enrollments || []} />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2">
          <StudentEnrollments 
            enrollments={currentStudent.enrollments || []}
            loading={loading}
            onOpenAddDialog={() => setOpenAddEnrollment(true)}
          />
        </div>
      </div>

      {/* Dialogs */}
      <AddEnrollmentDialog
        open={openAddEnrollment}
        onOpenChange={setOpenAddEnrollment}
        studentId={id}
      />
    </div>
  );
}