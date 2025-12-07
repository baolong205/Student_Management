
import { useEffect, useState } from "react";
import { useStudentStore } from "@/store/studentStore";
import { useClassesStore } from "@/store/classesStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Search, Edit, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function StudentPage() {
  const { students, loading, fetchStudents, deleteStudent } = useStudentStore();
  const { classes, selectedClassId, setSelectedClass, fetchClasses } = useClassesStore();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchClasses();
    fetchStudents();
  }, []);

  // Lọc sinh viên theo lớp được chọn + tìm kiếm
  const filteredStudents = students
    .filter(s => selectedClassId ? s.class?.id === selectedClassId : true)
    .filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const selectedClassName = classes.find(c => c.id === selectedClassId)?.name || "Tất cả lớp";

  return (
    <div className="flex h-screen">
      {/* TRÁI: Danh sách lớp */}
      <div className="w-80 border-r bg-muted/20 p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Danh sách lớp học</h2>
        <button
          onClick={() => setSelectedClass(null)}
          className={`w-full text-left p-4 rounded-lg mb-3 transition ${!selectedClassId ? "bg-primary text-white" : "hover:bg-muted"}`}
        >
          Tất cả sinh viên
        </button>
        {classes.map(cls => (
          <button
            key={cls.id}
            onClick={() => setSelectedClass(cls.id)}
            className={`w-full text-left p-4 rounded-lg mb-3 transition ${selectedClassId === cls.id ? "bg-primary text-white" : "hover:bg-muted"}`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{cls.name}</p>
                <p className="text-sm opacity-75">{cls.year}</p>
              </div>
              <Badge>{cls.students?.length || 0}</Badge>
            </div>
          </button>
        ))}
      </div>

      {/* PHẢI: Danh sách sinh viên */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Sinh viên - {selectedClassName}</h1>
            <p className="text-muted-foreground">Tổng: {filteredStudents.length} sinh viên</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm tên, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Thêm sinh viên
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin" />
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            {selectedClassId ? "Lớp này chưa có sinh viên" : "Chưa có sinh viên nào"}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map(student => (
              <div key={student.id} className="border rounded-lg p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">{student.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-red-600" onClick={() => deleteStudent(student.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p>Lớp: <Badge>{student.class?.name || "Chưa xếp lớp"}</Badge></p>
                  <p>Giới tính: {student.gender === "male" ? "Nam" : student.gender === "female" ? "Nữ" : "Khác"}</p>
                  <p>Ngày sinh: {new Date(student.dob).toLocaleDateString("vi-VN")}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}