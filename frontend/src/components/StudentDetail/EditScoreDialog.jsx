import { useState, useEffect } from "react";
import { useStudentStore } from "@/store/studentStore";
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
import { Loader2 } from "lucide-react";

export default function EditScoreDialog({ open, onOpenChange, enrollment }) {
  const { updateEnrollment, loading } = useStudentStore();
  const [attendanceScore, setAttendanceScore] = useState("");
  const [regularScore, setRegularScore] = useState("");
  const [midtermScore, setMidtermScore] = useState("");
  const [finalScore, setFinalScore] = useState("");

  // Khởi tạo giá trị từ enrollment khi dialog mở
  useEffect(() => {
    if (enrollment && open) {
      setAttendanceScore(enrollment.attendanceScore?.toString() || "");
      setRegularScore(enrollment.regularScore?.toString() || "");
      setMidtermScore(enrollment.midtermScore?.toString() || "");
      setFinalScore(enrollment.finalScore?.toString() || "");
    }
  }, [enrollment, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!enrollment) return;

    try {
      await updateEnrollment(enrollment.id, {
        attendanceScore: attendanceScore ? parseFloat(attendanceScore) : null,
        regularScore: regularScore ? parseFloat(regularScore) : null,
        midtermScore: midtermScore ? parseFloat(midtermScore) : null,
        finalScore: finalScore ? parseFloat(finalScore) : null
      });
      onOpenChange(false);
    } catch (error) {
      // Error handled in store
    }
  };

  
  const calculateTotalScore = () => {
    const attendance = parseFloat(attendanceScore) || 0;
    const regular = parseFloat(regularScore) || 0;
    const midterm = parseFloat(midtermScore) || 0;
    const final = parseFloat(finalScore) || 0;
    
    return (attendance * 0.1) + (regular * 0.25) + (midterm * 0.15) + (final * 0.5);
  };

  const totalScore = calculateTotalScore();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Cập nhật điểm</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">{enrollment?.subject?.name || 'Môn học'}</h3>
            <p className="text-sm text-gray-600">Mã môn: {enrollment?.subject?.subjectCode || 'N/A'}</p>
          </div>

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

          {/* Preview */}
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-blue-700 font-medium">Điểm tổng kết:</span>
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

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}