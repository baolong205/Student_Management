// src/pages/Students/Student/StudentCard.jsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Mail, Calendar, GraduationCap, Eye } from "lucide-react";
import { Link } from "react-router-dom";

export default function StudentCard({
  student,
  onEdit,
  onDelete,
}) {
  return (
    <div className="border rounded-lg p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-200 bg-white group">
      {/* Header với tiêu đề là link */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Link 
              to={`/students/${student.id}`}
              className="font-bold text-lg hover:text-blue-600 hover:underline transition-colors"
            >
              {student.name}
            </Link>
            <Badge
              className={
                student.gender === "male"
                  ? "bg-blue-100 text-blue-800"
                  : student.gender === "female"
                  ? "bg-pink-100 text-pink-800"
                  : "bg-gray-100 text-gray-800"
              }
            >
              {student.gender === "male" ? "Nam" : student.gender === "female" ? "Nữ" : "Khác"}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Mail className="h-3 w-3" />
            {student.email}
          </div>
        </div>
        <div className="flex gap-2">
          {/* Button Xem chi tiết */}
          <Button
            size="icon"
            variant="ghost"
            asChild
            className="hover:bg-blue-50"
            title="Xem chi tiết"
          >
            <Link to={`/students/${student.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onEdit(student)}
            className="hover:bg-blue-50"
            title="Sửa"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onDelete(student)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            title="Xóa"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Thông tin sinh viên */}
      <div className="space-y-3 text-sm">
        {student.class?.name && (
          <div className="flex items-center gap-2">
            <GraduationCap className="h-3 w-3 text-blue-600" />
            <span className="font-medium">Lớp:</span>
            <Badge variant="outline" className="ml-2">
              {student.class.name}
            </Badge>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <Calendar className="h-3 w-3 text-green-600" />
          <span className="font-medium">Ngày sinh:</span>
          <span className="ml-2">
            {new Date(student.dob).toLocaleDateString("vi-VN")}
          </span>
        </div>
        
        {student.phone && (
          <div className="flex items-center gap-2">
            <span className="font-medium">Điện thoại:</span>
            <span className="ml-2">{student.phone}</span>
          </div>
        )}
      </div>

      {/* Footer với button Xem chi tiết lớn hơn */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
          asChild
        >
          <Link to={`/students/${student.id}`} className="flex items-center justify-center">
            <Eye className="mr-2 h-4 w-4" />
            Xem chi tiết và điểm số
          </Link>
        </Button>
      </div>
    </div>
  );
}