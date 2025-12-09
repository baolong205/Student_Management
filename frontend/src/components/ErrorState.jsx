
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function ErrorState({
  title = "Đã xảy ra lỗi",
  message = "Không thể tải dữ liệu",
  action
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
        <AlertCircle className="h-8 w-8 text-red-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">{message}</p>
      {action && action}
    </div>
  );
}