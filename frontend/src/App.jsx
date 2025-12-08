import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/Auth/LoginPage";
import ClassesPage from "./pages/Classes/ClassesPage";
import StudentPage from "./pages/Students/StudentPage";
import SubjectsPage from "./pages/Subjects/SubjectPage";
// import DashboardPage from "./pages/DashboardPage";
// import StudentList from "./pages/StudentList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          <Route path="classes" element={<ClassesPage />} />
          <Route path="students" element={<StudentPage />} />
          <Route path="/subjects" element={<SubjectsPage />} />
          {/* <Route path="students" element={<StudentList />} /> */}
          {/* Các route khác */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
