import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen } from "lucide-react";

export default function SubjectInfoCard({ subject }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="mr-2 h-5 w-5" />
          Thông tin môn học
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Mã môn học</p>
            <p className="font-semibold">{subject.code}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Số tín chỉ</p>
            <Badge variant="outline">{subject.credits} tín chỉ</Badge>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Học kỳ</p>
            <p>{subject.semester || "Không xác định"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Loại môn học</p>
            <p>{subject.type || "Không xác định"}</p>
          </div>
        </div>

        {subject.description && (
          <>
            <Separator />
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Mô tả</p>
              <p className="text-sm">{subject.description}</p>
            </div>
          </>
        )}

        {subject.prerequisites && subject.prerequisites.length > 0 && (
          <>
            <Separator />
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Điều kiện tiên quyết</p>
              <div className="flex flex-wrap gap-2">
                {subject.prerequisites.map((prereq, index) => (
                  <Badge key={index} variant="secondary">{prereq}</Badge>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}