// src/components/layout/Footer.jsx
export default function Footer() {
  return (
    <footer className="border-t bg-background mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">


         <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-2xl font-bold text-primary mb-2">QLSV</h3>
            <p className="text-muted-foreground">
              Hệ thống Quản lý Sinh viên
            </p>
            <p className="text-xs text-muted-foreground mt-3 opacity-75">
              Đồ án cuối kỳ 2025
            </p>
          </div>

         
          <div className="flex flex-col items-center text-center">
            <h4 className="font-semibold text-foreground mb-3">Thông tin đồ án</h4>
            <div className="space-y-1 text-muted-foreground">
              <p>Môn: <span className="font-medium">Lập trình Mã nguồn mở 2</span></p>
              <p>Giảng viên: <span className="font-medium">ThS.Nguyễn Văn Khương</span></p>
              <p>Lớp: <span className="font-medium">ST23A</span></p>
            </div>
          </div>

        
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <h4 className="font-semibold text-foreground mb-3">Nhóm thực hiện</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li className="font-medium">Trần Ngọc Hoàng - Nhóm trưởng</li>
              <li>Nguyễn Việt Anh</li>
              <li>Hoàng Ngọc Bảo Long</li>
              <li>Cristiano Lieo MecSi</li>
            </ul>
          </div>
        </div>

       
        <div className="mt-8 pt-6 border-t border-border/50 text-center text-xs text-muted-foreground">
          <p>
            © 2025 Hệ thống Quản lý Sinh viên • 
            Xây dựng bằng <span className="font-medium">React + Vite + Tailwind CSS v4 + shadcn/ui</span>
          </p>
        </div>
      </div>
    </footer>
  );
}