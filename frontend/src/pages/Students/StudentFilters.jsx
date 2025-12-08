// src/components/Students/StudentFilters.jsx
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

export default function StudentFilters({
  searchTerm,
  onSearchChange,
  selectedClass,
  onClassChange,
  classes = [],
  totalStudents,
}) {
  
  const validClasses = classes.filter(
    (cls) => cls.id && cls.id !== "" && cls.id !== null && cls.id !== undefined
  );

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 bg-slate-50 rounded-lg mb-6">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm theo tên, email, mã số..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 w-full sm:w-80"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedClass || ""} onValueChange={onClassChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Tất cả lớp" />
            </SelectTrigger>
            <SelectContent>
              {/* Dùng "all" thay vì chuỗi rỗng */}
              <SelectItem value="all">Tất cả lớp</SelectItem>
              {validClasses.map((cls) => (
                <SelectItem key={cls.id} value={String(cls.id)}>
                  {cls.name} ({cls.students?.length || 0})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="text-sm text-muted-foreground hidden sm:block">
          Tổng: <span className="font-semibold">{totalStudents}</span> sinh viên
        </div>
      </div>
    </div>
  );
}