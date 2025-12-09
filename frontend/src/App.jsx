import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/Auth/LoginPage";
import ClassesPage from "./pages/Classes/ClassesPage";
import StudentPage from "./pages/Students/Student/StudentPage";
import SubjectsPage from "./pages/Subjects/SubjectPage";
import StudentDetail from "./pages/Students/StudentDetail/StudentDetail";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import TeacherDetail from "./pages/Teacher/TeacherDetail";
import TeacherForm from "./pages/Teacher/TeacherForm"; // Thêm import này
import SubjectForm from "./pages/Subjects/SubjectForm";
import SubjectDetail from "./pages/Subjects/SubjectDetail/SubjectDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          <Route path="classes" element={<ClassesPage />} />
          <Route path="students" element={<StudentPage />} />
          <Route path="students/:id" element={<StudentDetail />} />
          <Route path="subjects" element={<SubjectsPage />} />

          {/* Teacher Routes */}
          <Route path="teachers" element={<TeacherDashboard />} />
          <Route path="teachers/new" element={<TeacherForm />} /> {/* Thêm route này */}
          <Route path="teachers/:id" element={<TeacherDetail />} />
          <Route path="teachers/edit/:id" element={<TeacherForm />} /> {/* Sửa lại */}
          <Route path="subjects/:id" element={<SubjectDetail />} />
          <Route path="subjects/edit/:id" element={<SubjectForm editMode />} />
          {/* Các route khác */}
          {/* <Route path="dashboard" element={<DashboardPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;