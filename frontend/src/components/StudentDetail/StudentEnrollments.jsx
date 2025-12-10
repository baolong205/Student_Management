// components/StudentDetail/StudentEnrollments.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, BookOpen, Loader2 } from "lucide-react";
import EnrollmentItem from "./EnrollmentItem";

export default function StudentEnrollments({ 
  enrollments, 
  loading, 
  onOpenAddDialog 
}) {
  const EmptyState = () => (
    <div className="text-center py-8 md:py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
        <BookOpen className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium mb-2">Chưa đăng ký môn học nào</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Sinh viên này chưa đăng ký môn học nào. Hãy thêm môn học để bắt đầu.
      </p>
      <Button onClick={onOpenAddDialog}>
        <Plus className="mr-2 h-4 w-4" />
        Đăng ký môn học đầu tiên
      </Button>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            <span>Môn học đã đăng ký</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline">
              {enrollments.length} môn học
            </Badge>
            <Button 
              size="sm" 
              onClick={onOpenAddDialog}
              className="hidden sm:inline-flex"
            >
              <Plus className="mr-2 h-4 w-4" />
              Thêm môn học
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : enrollments.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-3">
            {enrollments.map((enrollment) => (
              <EnrollmentItem 
                key={enrollment.id} 
                enrollment={enrollment}
              />
            ))}
          </div>
        )}
        
        {/* Mobile Add Button */}
        {enrollments.length > 0 && (
          <div className="mt-6 sm:hidden">
            <Button 
              className="w-full" 
              onClick={onOpenAddDialog}
            >
              <Plus className="mr-2 h-4 w-4" />
              Thêm môn học mới
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}