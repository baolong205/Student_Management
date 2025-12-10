import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { GraduationCap, UserCheck } from "lucide-react";

export default function SubjectStudentsCard({ students }) {
  if (!students || students.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <GraduationCap className="mr-2 h-5 w-5" />
            Học sinh đang học
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-10">
          <UserCheck className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">Chưa có học sinh nào đăng ký</p>
        </CardContent>
      </Card>
    );
  }

  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <GraduationCap className="mr-2 h-5 w-5" />
          Học sinh đang học
          <Badge variant="secondary" className="ml-2">{students.length}</Badge>
        </CardTitle>
        <CardDescription>Danh sách học sinh đã đăng ký môn học</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {students.map((student) => (
          <div 
            key={student.id} 
            className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
          >
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback className="bg-primary/10 text-primary">
                  {getInitials(student.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <Link 
                  to={`/students/${student.id}`} 
                  className="font-medium hover:text-primary hover:underline"
                >
                  {student.name || "Không có tên"}
                </Link>
                <p className="text-sm text-muted-foreground">
                  Email: {student.email || "N/A"}
                </p>
              </div>
            </div>
            <Badge variant="outline">
              {student.class?.name || "Chưa có lớp"}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}