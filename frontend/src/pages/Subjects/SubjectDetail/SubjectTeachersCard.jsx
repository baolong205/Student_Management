
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";

export default function SubjectTeachersCard({ teachers }) {
  if (teachers.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Giáo viên giảng dạy
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-10">
          <Users className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">Chưa có giáo viên nào được phân công</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="mr-2 h-5 w-5" />
          Giáo viên giảng dạy
          <Badge variant="secondary" className="ml-2">{teachers.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={teacher.avatar} />
                <AvatarFallback>{teacher.firstName?.[0]}{teacher.lastName?.[0]}</AvatarFallback>
              </Avatar>
              <div>
                <Link to={`/teachers/${teacher.id}`} className="font-medium hover:text-primary">
                  {teacher.firstName} {teacher.lastName}
                </Link>
                <div className="text-sm text-muted-foreground">{teacher.email}</div>
              </div>
            </div>
            <Badge variant="outline">{teacher.yearsOfExperience || 0} năm kinh nghiệm</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}