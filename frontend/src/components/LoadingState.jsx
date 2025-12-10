
import { Loader2 } from "lucide-react";

export default function LoadingState({ message = "Đang tải..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  );
}