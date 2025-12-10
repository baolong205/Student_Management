// frontend/src/components/users/UserTable.jsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Shield, Eye, Trash2, MoreVertical } from 'lucide-react';

const UserTable = ({ users, onRoleChange, onDeleteClick }) => {
  const getRoleBadge = (role) => {
    const variants = {
      admin: 'bg-red-100 text-red-800 hover:bg-red-100',
      viewer: 'bg-blue-100 text-blue-800 hover:bg-blue-100'
    };
    
    return (
      <Badge className={variants[role]}>
        {role === 'admin' ? (
          <>
            <Shield className="h-3 w-3 mr-1" />
            Quản trị viên
          </>
        ) : (
          <>
            <Eye className="h-3 w-3 mr-1" />
            Người xem
          </>
        )}
      </Badge>
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tên đăng nhập</TableHead>
          <TableHead>Vai trò</TableHead>
          <TableHead>Ngày tạo</TableHead>
          <TableHead className="text-right">Hành động</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                {user.username}
              </div>
            </TableCell>
            <TableCell>
              {getRoleBadge(user.role)}
            </TableCell>
            <TableCell>
              {new Date(user.createdAt).toLocaleDateString('vi-VN')}
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {user.role === 'viewer' && (
                    <DropdownMenuItem
                      onClick={() => onRoleChange(user.id, 'admin')}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Chuyển thành Admin
                    </DropdownMenuItem>
                  )}
                  {user.role === 'admin' && (
                    <DropdownMenuItem
                      onClick={() => onRoleChange(user.id, 'viewer')}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Chuyển thành Người xem
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => onDeleteClick(user)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Xóa người dùng
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;