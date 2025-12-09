import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock } from "lucide-react";

export default function SubjectEnrollmentStats({ enrolledCount, totalStudents }) {
  const enrollmentRate = totalStudents > 0 ? Math.round((enrolledCount / totalStudents) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          Thống kê đăng ký
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold">{enrolledCount}</div>
            <p className="text-sm text-muted-foreground">Tổng số học sinh</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold">{enrollmentRate}%</div>
            <p className="text-sm text-muted-foreground">Tỷ lệ đăng ký</p>
          </div>
        </div>
        <Separator />
        <p className="text-sm text-muted-foreground">
          Môn học được đăng ký bởi học sinh từ nhiều lớp khác nhau.
        </p>
      </CardContent>
    </Card>
  );
}