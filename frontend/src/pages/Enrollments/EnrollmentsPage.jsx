// components/EnrollmentsPage.jsx
import React, { useEffect } from 'react'
import { useEnrollmentsStore } from '../../store/enrollmentStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Loader2, Plus, Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner' 
import EnrollmentDialog from './EnrollmentDialog'

export default function EnrollmentsPage() {
  const {
    enrollments,
    isLoading,
    fetchEnrollments,
    deleteEnrollment,
    openDialog,
    closeDialog,
    isDialogOpen,
    selectedEnrollment
  } = useEnrollmentsStore()

  useEffect(() => {
    fetchEnrollments()
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteEnrollment(id)
      toast({
        title: "Thành công",
        description: "Đã xóa bản ghi điểm thành công",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Lỗi",
        description: error.message || "Không thể xóa bản ghi",
        variant: "destructive",
      })
    }
  }

  const getScoreColor = (score) => {
    if (score >= 8) return "bg-green-100 text-green-800"
    if (score >= 6.5) return "bg-blue-100 text-blue-800"
    if (score >= 5) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Quản lý Điểm</CardTitle>
            <CardDescription>
              Danh sách điểm của sinh viên
            </CardDescription>
          </div>
          <Button onClick={() => openDialog()}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm điểm mới
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Đang tải dữ liệu...</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sinh viên</TableHead>
                  <TableHead>Môn học</TableHead>
                  <TableHead>Điểm giữa kỳ</TableHead>
                  <TableHead>Điểm cuối kỳ</TableHead>
                  <TableHead>Tổng điểm</TableHead>
                  <TableHead>Ngày đăng ký</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enrollments.map((enrollment) => (
                  <TableRow key={enrollment.id}>
                    <TableCell className="font-medium">
                      {enrollment.student?.name || `SV-${enrollment.studentId}`}
                    </TableCell>
                    <TableCell>
                      {enrollment.subject?.name || `MH-${enrollment.subjectId}`}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{enrollment.midtermScore.toFixed(1)}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{enrollment.finalScore.toFixed(1)}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getScoreColor(enrollment.totalScore)}>
                        {enrollment.totalScore.toFixed(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(enrollment.enrolledAt).toLocaleDateString('vi-VN')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDialog(enrollment)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(enrollment.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <EnrollmentDialog
        open={isDialogOpen}
        onClose={closeDialog}
        enrollment={selectedEnrollment}
      />
    </div>
  )
}