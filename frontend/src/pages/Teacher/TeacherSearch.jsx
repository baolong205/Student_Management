// src/components/teachers/TeacherSearch.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, RefreshCw } from "lucide-react";

const TeacherSearch = ({
  searchTerm = "",
  onSearchChange,
  onSearch,
  onRefresh,
  onFilterChange,
  filterBy = "all",
  loading = false,
}) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Tìm kiếm giáo viên theo tên, email, chuyên môn..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
      </div>

      {/* Filter Dropdown */}
      <Select value={filterBy} onValueChange={onFilterChange}>
        <SelectTrigger className="w-[180px]">
          <Filter className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Lọc theo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả</SelectItem>
          <SelectItem value="with-classes">Có phân công lớp</SelectItem>
          <SelectItem value="no-classes">Chưa phân công lớp</SelectItem>
          <SelectItem value="with-subjects">Có phân công môn</SelectItem>
          <SelectItem value="no-subjects">Chưa phân công môn</SelectItem>
          <SelectItem value="experienced">Trên 5 năm kinh nghiệm</SelectItem>
          <SelectItem value="new">Dưới 2 năm kinh nghiệm</SelectItem>
        </SelectContent>
      </Select>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          onClick={onSearch}
          variant="secondary"
          className="flex-1 sm:flex-none"
          disabled={loading}
        >
          <Search className="mr-2 h-4 w-4" />
          Tìm kiếm
        </Button>
        <Button
          onClick={onRefresh}
          variant="outline"
          className="flex-1 sm:flex-none"
          disabled={loading}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Làm mới
        </Button>
      </div>
    </div>
  );
};

export default TeacherSearch;