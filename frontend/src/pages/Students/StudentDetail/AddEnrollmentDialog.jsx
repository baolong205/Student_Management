// components/StudentDetail/AddEnrollmentDialog.jsx
import { useState } from "react";
import { useStudentStore } from "@/store/studentStore";
import { useSubjectStore } from "@/store/subjectStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Search } from "lucide-react";

export default function AddEnrollmentDialog({
  open,
  onOpenChange,
  studentId
}) {
  const { createEnrollment, loading } = useStudentStore();
  const { subjects } = useSubjectStore();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [attendanceScore, setAttendanceScore] = useState("");
  const [regularScore, setRegularScore] = useState("");
  const [midtermScore, setMidtermScore] = useState("");
  const [finalScore, setFinalScore] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSubject) return;

    try {
      await createEnrollment(studentId, selectedSubject, {
        attendanceScore: attendanceScore ? parseFloat(attendanceScore) : null,
        regularScore: regularScore ? parseFloat(regularScore) : null,
        midtermScore: midtermScore ? parseFloat(midtermScore) : null,
        finalScore: finalScore ? parseFloat(finalScore) : null
      });
      onOpenChange(false);
      resetForm();
    } catch (error) {
      // Error handled in store
    }
  };

  const resetForm = () => {
    setSelectedSubject("");
    setAttendanceScore("");
    setRegularScore("");
    setMidtermScore("");
    setFinalScore("");
    setSearchTerm("");
  };

  const selectedSubjectData = subjects.find(s => s.id === selectedSubject);

  // Tính điểm tổng kết theo công thức: 10% chuyên cần + 25% thường xuyên + 15% giữa kỳ + 50% cuối kỳ
  const calculateTotalScore = () => {
    const attendance = parseFloat(attendanceScore) || 0;
    const regular = parseFloat(regularScore) || 0;
    const midterm = parseFloat(midtermScore) || 0;
    const final = parseFloat(finalScore) || 0;

    return (attendance * 0.1) + (regular * 0.25) + (midterm * 0.15) + (final * 0.5);
  };

  const totalScore = calculateTotalScore();
  const hasAnyScore = attendanceScore || regularScore || midtermScore || finalScore;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Đăng ký môn học mới</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Subject Selection */}
          <div className="space-y-3">
            <Label htmlFor="search-subject">Tìm kiếm môn học</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="search-subject"
                placeholder="Tìm theo tên hoặc mã môn học..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Chọn môn học *</Label>
              <Select
                value={selectedSubject}
                onValueChange={setSelectedSubject}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn môn học" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {filteredSubjects.length === 0 ? (
                    <div className="py-6 text-center text-gray-500">
                      Không tìm thấy môn học
                    </div>
                  ) : (
                    filteredSubjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        <div className="flex items-center justify-between">
                          <span>{subject.name}</span>
                          <Badge variant="outline" className="ml-2 text-xs">
                            {subject.subjectCode}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Subject Info */}
            {selectedSubjectData && (
              <div className="p-3 bg-gray-50 rounded-lg text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-gray-600">Mã môn:</span>
                    <span className="font-medium ml-2">{selectedSubjectData.subjectCode}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Số tín chỉ:</span>
                    <span className="font-medium ml-2">{selectedSubjectData.credits || 'N/A'}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-600">Mô tả:</span>
                    <p className="text-gray-800 mt-1 line-clamp-2">
                      {selectedSubjectData.description || 'Không có mô tả'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Scores Input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="attendanceScore">Điểm chuyên cần (10%)</Label>
              <Input
                id="attendanceScore"
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={attendanceScore}
                onChange={(e) => setAttendanceScore(e.target.value)}
                placeholder="0 - 10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="regularScore">Điểm thường xuyên (25%)</Label>
              <Input
                id="regularScore"
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={regularScore}
                onChange={(e) => setRegularScore(e.target.value)}
                placeholder="0 - 10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="midtermScore">Điểm giữa kỳ (15%)</Label>
              <Input
                id="midtermScore"
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={midtermScore}
                onChange={(e) => setMidtermScore(e.target.value)}
                placeholder="0 - 10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="finalScore">Điểm cuối kỳ (50%)</Label>
              <Input
                id="finalScore"
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={finalScore}
                onChange={(e) => setFinalScore(e.target.value)}
                placeholder="0 - 10"
              />
            </div>
          </div>

          {/* Preview Total Score */}
          {hasAnyScore && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-blue-700 font-medium">Điểm tổng kết dự kiến:</span>
                <span className="text-lg font-bold text-blue-800">
                  {totalScore.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-blue-600 mt-1">
                Công thức: (10% chuyên cần + 25% thường xuyên + 15% giữa kỳ + 50% cuối kỳ)
              </p>
              <div className="mt-2 text-xs text-blue-500 grid grid-cols-4 gap-2">
                <div>CC: {(parseFloat(attendanceScore) || 0).toFixed(1)} × 0.1 = {((parseFloat(attendanceScore) || 0) * 0.1).toFixed(2)}</div>
                <div>TX: {(parseFloat(regularScore) || 0).toFixed(1)} × 0.25 = {((parseFloat(regularScore) || 0) * 0.25).toFixed(2)}</div>
                <div>GK: {(parseFloat(midtermScore) || 0).toFixed(1)} × 0.15 = {((parseFloat(midtermScore) || 0) * 0.15).toFixed(2)}</div>
                <div>CK: {(parseFloat(finalScore) || 0).toFixed(1)} × 0.5 = {((parseFloat(finalScore) || 0) * 0.5).toFixed(2)}</div>
              </div>
            </div>
          )}

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                resetForm();
              }}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={loading || !selectedSubject}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Đăng ký
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Helper Badge component
function Badge({ variant = "default", className = "", children }) {
  const variantClasses = {
    default: "bg-gray-100 text-gray-800",
    outline: "border border-gray-300 bg-transparent",
    success: "bg-green-100 text-green-800"
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}