// components/StudentDetail/StudentInfoCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Phone, 
  Calendar, 
  GraduationCap,
  MapPin,
  User,
  Shield
} from "lucide-react";

export default function StudentInfoCard({ student }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getGenderText = (gender) => {
    const genderMap = {
      'male': 'Nam',
      'female': 'Nữ',
      'other': 'Khác'
    };
    return genderMap[gender] || gender;
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
          <User className="h-5 w-5" />
          Thông tin cá nhân
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Avatar & Basic Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <Avatar className="h-20 w-20 md:h-24 md:w-24">
            <AvatarImage src={student.avatar} alt={student.name} />
            <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
              {student.name?.charAt(0) || 'S'}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl md:text-2xl font-bold">{student.name}</h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
              <Badge variant="outline" className="w-fit mx-auto sm:mx-0">
                {student.studentCode || 'Chưa có mã'}
              </Badge>
              <Badge className={`w-fit mx-auto sm:mx-0 ${
                student.gender === 'male' 
                  ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' 
                  : student.gender === 'female'
                  ? 'bg-pink-100 text-pink-800 hover:bg-pink-100'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
              }`}>
                {getGenderText(student.gender)}
              </Badge>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 pt-4 border-t">
          <InfoItem 
            icon={<Mail className="h-4 w-4" />}
            label="Email"
            value={student.email}
          />
          
          {student.phone && (
            <InfoItem 
              icon={<Phone className="h-4 w-4" />}
              label="Số điện thoại"
              value={student.phone}
            />
          )}
          
          <InfoItem 
            icon={<Calendar className="h-4 w-4" />}
            label="Ngày sinh"
            value={formatDate(student.dob)}
          />
          
          <InfoItem 
            icon={<GraduationCap className="h-4 w-4" />}
            label="Lớp"
            value={student.class?.name || 'Chưa phân lớp'}
            badge={student.class?.code}
          />
          
          {student.address && (
            <InfoItem 
              icon={<MapPin className="h-4 w-4" />}
              label="Địa chỉ"
              value={student.address}
            />
          )}
          
          <InfoItem 
            icon={<Shield className="h-4 w-4" />}
            label="Trạng thái"
            value="Đang học"
            badge={<Badge variant="success">Active</Badge>}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function InfoItem({ icon, label, value, badge }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-gray-500 mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-600">{label}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <p className="font-medium truncate">{value}</p>
          {badge && (
            typeof badge === 'string' 
              ? <Badge variant="outline" className="text-xs">{badge}</Badge>
              : badge
          )}
        </div>
      </div>
    </div>
  );
}