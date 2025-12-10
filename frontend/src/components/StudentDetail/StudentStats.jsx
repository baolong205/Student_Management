// components/StudentDetail/StudentStats.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Award, 
  TrendingUp, 
  BarChart3,
  Target
} from "lucide-react";

export default function StudentStats({ enrollments }) {
  const calculateStats = () => {
    const total = enrollments.length;
    if (total === 0) {
      return {
        gpa: 0,
        average: 0,
        passed: 0,
        failed: 0,
        passingRate: 0
      };
    }

    const totalScore = enrollments.reduce((sum, e) => sum + e.totalScore, 0);
    const passed = enrollments.filter(e => e.totalScore >= 5).length;
    const failed = total - passed;
    const gpa = totalScore / total;
    const passingRate = (passed / total) * 100;

    return {
      gpa: gpa.toFixed(2),
      average: (totalScore / total).toFixed(2),
      passed,
      failed,
      passingRate: passingRate.toFixed(1)
    };
  };

  const stats = calculateStats();
  const statItems = [
    {
      icon: <Award className="h-5 w-5" />,
      label: "Điểm TB",
      value: stats.gpa,
      color: "bg-blue-50 text-blue-700",
      border: "border-blue-200"
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      label: "Tỷ lệ đạt",
      value: `${stats.passingRate}%`,
      color: "bg-green-50 text-green-700",
      border: "border-green-200"
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      label: "Đã đạt",
      value: stats.passed,
      color: "bg-emerald-50 text-emerald-700",
      border: "border-emerald-200"
    },
    {
      icon: <Target className="h-5 w-5" />,
      label: "Chưa đạt",
      value: stats.failed,
      color: "bg-amber-50 text-amber-700",
      border: "border-amber-200"
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Thống kê học tập
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {statItems.map((item, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border ${item.border} ${item.color}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="opacity-80">{item.icon}</div>
                <span className="text-2xl font-bold">{item.value}</span>
              </div>
              <p className="text-sm opacity-90">{item.label}</p>
            </div>
          ))}
        </div>
        
        {/* Progress Bar for Passing Rate */}
        <div className="mt-6 pt-4 border-t">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Tiến độ đạt môn</span>
            <span className="text-sm font-bold">{stats.passingRate}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${stats.passingRate}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>{stats.passed} môn đạt</span>
            <span>{stats.failed} môn chưa đạt</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}