import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, Mail } from "lucide-react";

export default function SubjectQuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hành động nhanh</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button variant="outline" className="w-full justify-start">
          <Users className="mr-2 h-4 w-4" />
          Phân công giáo viên
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <UserCheck className="mr-2 h-4 w-4" />
          Thêm học sinh vào môn
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <Mail className="mr-2 h-4 w-4" />
          Gửi thông báo cho học sinh
        </Button>
      </CardContent>
    </Card>
  );
}