// src/components/teachers/TeacherTable.jsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, BookOpen, Users, MoreHorizontal } from "lucide-react";
import TeacherActions from "./TeacherActions";

const TeacherTable = ({
  teachers = [],
  loading = false,
  onEdit,
  onDelete,
  onView,
}) => {
  // Skeleton loading state
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-3 w-[150px]" />
            </div>
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (teachers.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <Users className="h-12 w-12 mx-auto text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">Không tìm thấy giáo viên</h3>
        <p className="text-muted-foreground mt-1">
          Thử thay đổi từ khóa tìm kiếm hoặc thêm giáo viên mới
        </p>
      </div>
    );
  }

  // Helper function for avatar initials
  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  // Format experience
  const formatExperience = (years) => {
    if (!years) return "Mới";
    if (years < 5) return `${years} năm`;
    return `${years}+ năm`;
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Giáo viên</TableHead>
            <TableHead>Liên hệ</TableHead>
            <TableHead>Chuyên môn</TableHead>
            <TableHead>Môn học</TableHead>
            <TableHead>Kinh nghiệm</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teachers.map((teacher) => (
            <TableRow 
              key={teacher.id} 
              className="hover:bg-muted/50 cursor-pointer"
              onClick={() => onView(teacher.id)}
            >
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage 
                      src={teacher.avatar || `/api/placeholder/32/32`} 
                      alt={teacher.firstName}
                    />
                    <AvatarFallback>
                      {getInitials(teacher.firstName, teacher.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">
                      {teacher.firstName} {teacher.lastName}
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      {teacher.email}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <Mail className="mr-2 h-3 w-3" />
                    <span className="truncate">{teacher.email}</span>
                  </div>
                  {teacher.phone && (
                    <div className="flex items-center text-sm">
                      <Phone className="mr-2 h-3 w-3" />
                      <span>{teacher.phone}</span>
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {teacher.specialization ? (
                  <Badge variant="outline" className="truncate max-w-[120px]">
                    {teacher.specialization}
                  </Badge>
                ) : (
                  <span className="text-muted-foreground text-sm">Chưa có</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {teacher.subjects?.slice(0, 2).map((subject) => (
                    <Badge 
                      key={subject.id || subject} 
                      variant="secondary" 
                      className="text-xs"
                    >
                      {subject.name || subject}
                    </Badge>
                  ))}
                  {teacher.subjects?.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{teacher.subjects.length - 2}
                    </Badge>
                  )}
                  {(!teacher.subjects || teacher.subjects.length === 0) && (
                    <span className="text-muted-foreground text-sm">Chưa phân công</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium">
                  {formatExperience(teacher.yearsOfExperience)}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <TeacherActions
                  teacher={teacher}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onView={onView}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TeacherTable;