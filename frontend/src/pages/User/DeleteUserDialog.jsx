// frontend/src/components/users/DeleteUserDialog.jsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

const DeleteUserDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  user,
  isLoading 
}) => {
  if (!user) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            Xác nhận xóa người dùng
          </AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn muốn xóa người dùng 
            <span className="font-semibold text-foreground"> {user.username}</span>?
            <br />
            <span className="text-red-500 mt-2 block">
              Hành động này không thể hoàn tác.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Hủy</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={() => onConfirm(user.id)}
            disabled={isLoading}
          >
            {isLoading ? 'Đang xử lý...' : 'Xác nhận xóa'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUserDialog;