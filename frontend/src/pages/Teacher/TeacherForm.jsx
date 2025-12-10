// src/components/teachers/TeacherForm.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useClassesStore } from "@/store/classesStore";
import { useSubjectStore } from "@/store/subjectStore";
import { Badge } from "@/components/ui/badge";

// Validation schema
const teacherSchema = z.object({
  firstName: z.string().min(1, "Họ là bắt buộc").min(2, "Họ phải có ít nhất 2 ký tự"),
  lastName: z.string().min(1, "Tên là bắt buộc").min(2, "Tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().optional(),
  dateOfBirth: z.date().optional().nullable(),
  gender: z.string().optional(),
  address: z.string().optional(),
  specialization: z.string().optional(),
  yearsOfExperience: z.string().optional(),
  qualification: z.string().optional(),
  subjectIds: z.array(z.string()).default([]),
  classIds: z.array(z.string()).default([]),
});

const TeacherForm = ({ mode = "create", teacher, onClose, onSubmit, isLoading = false }) => {
  const { classes = [], fetchClasses } = useClassesStore();
  const { subjects = [], fetchSubjects } = useSubjectStore();
  const [isDataLoading, setIsDataLoading] = useState(true);

  // Bằng cấp options
  const qualificationOptions = [
    { value: "bachelor", label: "Cử nhân" },
    { value: "master", label: "Thạc sĩ" },
    { value: "doctorate", label: "Tiến sĩ" },
    { value: "associate_professor", label: "Phó Giáo sư" },
    { value: "professor", label: "Giáo sư" },
  ];

  // Giới tính options
  const genderOptions = [
    { value: "male", label: "Nam" },
    { value: "female", label: "Nữ" },
    { value: "other", label: "Khác" },
  ];

  const form = useForm({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: null,
      gender: "",
      address: "",
      specialization: "",
      yearsOfExperience: "",
      qualification: "",
      subjectIds: [],
      classIds: [],
    },
  });

  // Load classes và subjects
  useEffect(() => {
    const loadData = async () => {
      setIsDataLoading(true);
      try {
        await Promise.all([fetchClasses(), fetchSubjects()]);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsDataLoading(false);
      }
    };
    loadData();
  }, []);

  // TỰ ĐỘNG ĐIỀN DỮ LIỆU KHI EDIT
  useEffect(() => {
    if (mode === "edit" && teacher) {
      form.reset({
        firstName: teacher.firstName || "",
        lastName: teacher.lastName || "",
        email: teacher.email || "",
        phone: teacher.phone || "",
        dateOfBirth: teacher.dateOfBirth ? new Date(teacher.dateOfBirth) : null,
        gender: teacher.gender || "",
        address: teacher.address || "",
        specialization: teacher.specialization || "",
        yearsOfExperience: teacher.yearsOfExperience?.toString() || "",
        qualification: teacher.qualification || "",
        subjectIds: teacher.subjects?.map(s => s.id) || [],
        classIds: teacher.classes?.map(c => c.id) || [],
      });
    }
  }, [mode, teacher, form]);

  const handleFormSubmit = async (data) => {
    try {
      // Convert yearsOfExperience to number
      const formattedData = {
        ...data,
        yearsOfExperience: data.yearsOfExperience ? parseInt(data.yearsOfExperience) : 0,
        // Format date to ISO string
        dateOfBirth: data.dateOfBirth 
          ? format(data.dateOfBirth, 'yyyy-MM-dd')
          : null,
      };
      await onSubmit(formattedData);
    } catch (error) {
      // Error đã được xử lý ở parent
      console.error("Form submission error:", error);
    }
  };

  if (isDataLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Đang tải dữ liệu...</span>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Họ *</FormLabel>
                <FormControl>
                  <Input placeholder="Nguyễn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên *</FormLabel>
                <FormControl>
                  <Input placeholder="Văn A" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Email và Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="teacher@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số điện thoại</FormLabel>
                <FormControl>
                  <Input placeholder="0987654321" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Ngày sinh và Giới tính */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Ngày sinh</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(new Date(field.value), "dd/MM/yyyy")
                        ) : (
                          <span>Chọn ngày</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giới tính</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn giới tính" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {genderOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Chuyên môn và Kinh nghiệm */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="specialization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chuyên môn</FormLabel>
                <FormControl>
                  <Input placeholder="Toán học, Vật lý..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="yearsOfExperience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số năm kinh nghiệm</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    max="50"
                    placeholder="0"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? "" : value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Bằng cấp - DROPDOWN */}
        <FormField
          control={form.control}
          name="qualification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bằng cấp</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn bằng cấp" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {qualificationOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Địa chỉ */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa chỉ</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Số nhà, đường, phường, quận..." 
                  rows={3}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phân công môn học */}
        <FormField
          control={form.control}
          name="subjectIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Môn học giảng dạy</FormLabel>
              <Select 
                onValueChange={(value) => {
                  if (!field.value.includes(value)) {
                    field.onChange([...field.value, value]);
                  }
                }}
                value=""
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Thêm môn học">
                      <span className="text-muted-foreground">Thêm môn học</span>
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name} {subject.subjectCode && `(${subject.subjectCode})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Hiển thị các môn đã chọn */}
              {field.value.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {field.value.map(subjectId => {
                    const subject = subjects.find(s => s.id === subjectId);
                    if (!subject) return null;
                    
                    return (
                      <Badge key={subjectId} variant="secondary" className="pl-3 pr-1 py-1">
                        {subject.name}
                        <button
                          type="button"
                          onClick={() => {
                            field.onChange(field.value.filter(id => id !== subjectId));
                          }}
                          className="ml-2 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    );
                  })}
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phân công lớp học */}
        <FormField
          control={form.control}
          name="classIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lớp học phụ trách</FormLabel>
              <Select 
                onValueChange={(value) => {
                  if (!field.value.includes(value)) {
                    field.onChange([...field.value, value]);
                  }
                }}
                value=""
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Thêm lớp học">
                      <span className="text-muted-foreground">Thêm lớp học</span>
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name} {cls.grade && `(${cls.grade})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Hiển thị các lớp đã chọn */}
              {field.value.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {field.value.map(classId => {
                    const cls = classes.find(c => c.id === classId);
                    if (!cls) return null;
                    
                    return (
                      <Badge key={classId} variant="secondary" className="pl-3 pr-1 py-1">
                        {cls.name}
                        <button
                          type="button"
                          onClick={() => {
                            field.onChange(field.value.filter(id => id !== classId));
                          }}
                          className="ml-2 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    );
                  })}
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Form Actions */}
        <div className="flex justify-end space-x-2 pt-6 border-t">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            disabled={isLoading}
          >
            Hủy
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === "edit" ? "Cập nhật" : "Tạo mới"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TeacherForm;