// src/components/Students/StudentCard.jsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Mail, Calendar, GraduationCap } from "lucide-react";

export default function StudentCard({
  student,
  onEdit,
  onDelete,
}) {
  return (
    <div className="border rounded-lg p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-200 bg-white">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-bold text-lg">{student.name}</h3>
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
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onEdit(student)}
            className="hover:bg-blue-50"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onDelete(student)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
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
    </div>
  );
}