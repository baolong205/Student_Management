// frontend/src/components/users/UserSearch.jsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const UserSearch = ({ searchTerm, onSearchChange }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Tìm kiếm người dùng</CardTitle>
        <CardDescription>
          Tìm kiếm theo tên đăng nhập
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Nhập tên đăng nhập..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserSearch;