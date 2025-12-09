// src/pages/subjects/components/SubjectCard.jsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookOpen, MoreVertical, Pencil, Trash2, Eye, Users } from "lucide-react";
import { Link } from "react-router-dom";
const SubjectCard = ({ subject, onEdit, onDelete, onView }) => {
  // Xác định màu badge dựa trên số tín chỉ
  const getCreditVariant = (credits) => {
    if (credits >= 4) return "destructive";
    if (credits >= 3) return "warning";
    return "default";
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{subject.name}</CardTitle>
              {subject.subjectCode && (
                <CardDescription className="mt-1">
                  Mã: {subject.subjectCode}
                </CardDescription>
              )}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView && onView(subject)}>
                <Eye className="mr-2 h-4 w-4" />
                Xem chi tiết
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(subject)}>
                <Pencil className="mr-2 h-4 w-4" />
                Chỉnh sửa
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDelete(subject.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Xóa môn học
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Tín chỉ */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant={getCreditVariant(subject.credits)}>
                {subject.credits} tín chỉ
              </Badge>
              <span className="text-sm text-muted-foreground">
                • {subject.credits * 15} tiết học
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(subject)}
              className="h-8 w-8"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>

          <Separator />

          {/* Thông tin thêm */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Số SV: {subject.enrollmentCount || 0}</span>
            </div>
            <Link to={`/subjects/${subject.id}`}>
              <Button variant="outline" size="sm">
                Chi tiết
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectCard;