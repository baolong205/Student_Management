import { useState } from "react";
import { useStudentStore } from "@/store/studentStore";
import { useSubjectStore } from "@/store/subjectStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Edit, 
  Trash2, 
  ChevronDown, 
  ChevronUp,
  Calendar,
  Book,
  Hash
} from "lucide-react";
import EditScoreDialog from "./EditScoreDialog";

export default function EnrollmentItem({ enrollment }) {
  const [expanded, setExpanded] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const { deleteEnrollment } = useStudentStore();
  const { subjects } = useSubjectStore();
  
  // Lấy thông tin môn học từ subjectStore dựa trên subjectId
  const subject = subjects.find(s => s.id === enrollment.subjectId);

  const getGradeColor = (score) => {
    if (score >= 8.5) return "bg-green-100 text-green-800 border-green-300";
    if (score >= 6.5) return "bg-blue-100 text-blue-800 border-blue-300";
    if (score >= 5.0) return "bg-yellow-100 text-yellow-800 border-yellow-300";
    return "bg-red-100 text-red-800 border-red-300";
  };

  const getGradeLabel = (score) => {
    if (score >= 8.5) return "Xuất sắc";
    if (score >= 6.5) return "Khá";
    if (score >= 5.0) return "Trung bình";
    return "Yếu";
  };

  const handleDelete = async () => {
    if (!confirm("Bạn có chắc muốn hủy đăng ký môn học này?")) return;
    await deleteEnrollment(enrollment.id);
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Subject Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Book className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <h4 className="font-semibold text-lg truncate">
                  {subject?.name || 'Môn học'}
                </h4>
                <Badge variant="outline" className="hidden sm:inline-flex">
                  {subject?.code || 'N/A'}
                </Badge>
              </div>
              
              {/* Score Summary */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Chuyên cần:</span>
                  <span className="font-medium">{enrollment.attendanceScore !== null ? enrollment.attendanceScore : 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Thường xuyên:</span>
                  <span className="font-medium">{enrollment.regularScore !== null ? enrollment.regularScore : 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Giữa kỳ:</span>
                  <span className="font-medium">{enrollment.midtermScore !== null ? enrollment.midtermScore : 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Cuối kỳ:</span>
                  <span className="font-medium">{enrollment.finalScore !== null ? enrollment.finalScore : 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Tổng kết:</span>
                  <Badge className={`${getGradeColor(enrollment.totalScore)}`}>
                    {enrollment.totalScore !== null ? enrollment.totalScore.toFixed(2) : 'N/A'}
                  </Badge>
                </div>
                {enrollment.totalScore !== null && (
                  <Badge variant="secondary" className="hidden sm:inline-flex">
                    {getGradeLabel(enrollment.totalScore)}
                  </Badge>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-end sm:self-center">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setOpenEditDialog(true)}
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:ml-2">Sửa điểm</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleDelete}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:ml-2">Xóa</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setExpanded(!expanded)}
                className="hidden sm:flex"
              >
                {expanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Expanded Details */}
          {expanded && (
            <div className="mt-4 pt-4 border-t space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InfoDetail 
                  icon={<Calendar className="h-4 w-4" />}
                  label="Ngày đăng ký"
                  value={new Date(enrollment.enrolledAt).toLocaleDateString('vi-VN')}
                />
                <InfoDetail 
                  icon={<Hash className="h-4 w-4" />}
                  label="Mã đăng ký"
                  value={enrollment.id.substring(0, 8)}
                />
                <InfoDetail 
                  icon={<Book className="h-4 w-4" />}
                  label="Tín chỉ"
                  value={subject?.credits || 'N/A'}
                />
              </div>
              
              {/* Score Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600">Chuyên cần</p>
                  <p className="font-semibold text-lg">{enrollment.attendanceScore !== null ? enrollment.attendanceScore : '-'}</p>
                  <p className="text-xs text-gray-500">10%</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600">Thường xuyên</p>
                  <p className="font-semibold text-lg">{enrollment.regularScore !== null ? enrollment.regularScore : '-'}</p>
                  <p className="text-xs text-gray-500">25%</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600">Giữa kỳ</p>
                  <p className="font-semibold text-lg">{enrollment.midtermScore !== null ? enrollment.midtermScore : '-'}</p>
                  <p className="text-xs text-gray-500">15%</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600">Cuối kỳ</p>
                  <p className="font-semibold text-lg">{enrollment.finalScore !== null ? enrollment.finalScore : '-'}</p>
                  <p className="text-xs text-gray-500">50%</p>
                </div>
              </div>
            </div>
          )}

          {/* Mobile expand button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full mt-4 sm:hidden"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                <ChevronUp className="mr-2 h-4 w-4" />
                Thu gọn
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-4 w-4" />
                Xem chi tiết
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Edit Dialog */}
      <EditScoreDialog
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
        enrollment={enrollment}
      />
    </>
  );
}

function InfoDetail({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-gray-500">{icon}</div>
      <div>
        <p className="text-xs text-gray-600">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}