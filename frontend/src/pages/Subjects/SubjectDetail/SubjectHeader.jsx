import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SubjectHeader({ subject, onBack }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{subject.name}</h1>
          <p className="text-muted-foreground">
            {subject.code} • {subject.description || "Không có mô tả"}
          </p>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button variant="outline" onClick={() => navigate(`/subjects/edit/${subject.id}`)}>
          <Edit className="mr-2 h-4 w-4" /> Chỉnh sửa
        </Button>
        <Button variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" /> Xóa
        </Button>
      </div>
    </div>
  );
}