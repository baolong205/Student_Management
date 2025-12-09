
import React, { useState, useEffect } from 'react'
import { useEnrollmentsStore } from '../../store/enrollmentStore'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function EnrollmentDialog({ open, onClose, enrollment }) {
  const { createEnrollment, updateEnrollment, isLoading } = useEnrollmentsStore()
  const [formData, setFormData] = useState({
    studentId: '',
    subjectId: '',
    midtermScore: 0,
    finalScore: 0,
  })

  useEffect(() => {
    if (enrollment) {
      setFormData({
        studentId: enrollment.studentId,
        subjectId: enrollment.subjectId,
        midtermScore: enrollment.midtermScore,
        finalScore: enrollment.finalScore,
      })
    } else {
      setFormData({
        studentId: '',
        subjectId: '',
        midtermScore: 0,
        finalScore: 0,
      })
    }
  }, [enrollment])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (enrollment) {
        // Cập nhật
        await updateEnrollment(enrollment.id, formData)
        toast({
          title: "Thành công",
          description: "Đã cập nhật điểm thành công",
          variant: "default",
        })
      } else {
        // Tạo mới
        await createEnrollment(formData)
        toast({
          title: "Thành công",
          description: "Đã thêm điểm mới thành công",
          variant: "default",
        })
      }
      onClose()
    } catch (error) {
      toast({
        title: "Lỗi",
        description: error.message || "Có lỗi xảy ra",
        variant: "destructive",
      })
    }
  }

  const calculateTotal = () => {
    const midterm = parseFloat(formData.midtermScore) || 0
    const final = parseFloat(formData.finalScore) || 0
    return (midterm * 0.4 + final * 0.6).toFixed(1)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {enrollment ? 'Sửa điểm' : 'Thêm điểm mới'}
          </DialogTitle>
          <DialogDescription>
            Nhập thông tin điểm cho sinh viên
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="studentId">Mã sinh viên</Label>
            <Input
              id="studentId"
              value={formData.studentId}
              onChange={(e) => setFormData({...formData, studentId: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subjectId">Mã môn học</Label>
            <Input
              id="subjectId"
              value={formData.subjectId}
              onChange={(e) => setFormData({...formData, subjectId: e.target.value})}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="midtermScore">Điểm giữa kỳ (40%)</Label>
              <Input
                id="midtermScore"
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={formData.midtermScore}
                onChange={(e) => setFormData({...formData, midtermScore: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="finalScore">Điểm cuối kỳ (60%)</Label>
              <Input
                id="finalScore"
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={formData.finalScore}
                onChange={(e) => setFormData({...formData, finalScore: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div className="p-3 bg-muted rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Tổng điểm:</span>
              <span className="text-lg font-bold">{calculateTotal()}</span>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {enrollment ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}