// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/Auth/LoginPage";
import ClassesPage from "./pages/Classes/ClassesPage";
import StudentPage from "./pages/Students/Student/StudentPage";
import SubjectsPage from "./pages/Subjects/SubjectPage";
import StudentDetail from "./pages/Students/StudentDetail/StudentDetail";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard"; // Dashboard dùng modal
import TeacherDetail from "./pages/Teacher/TeacherDetail";
import SubjectDetail from "./pages/Subjects/SubjectDetail/SubjectDetail";
import UserPage from "./pages/User/UserPage";
import DashboardPage from "./pages/Dashboard/AdminDashboard";
// XÓA các import TeacherForm, SubjectForm không dùng route

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
          <Route path="" element={<DashboardPage />} />

          <Route path="teachers" element={<TeacherDashboard />} />
          <Route path="teachers/:id" element={<TeacherDetail />} />


          <Route path="subjects/:id" element={<SubjectDetail />} />

          <Route path="/users" element={<UserPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;