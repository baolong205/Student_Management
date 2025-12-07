import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
// import DashboardPage from "./pages/DashboardPage";
// import StudentList from "./pages/StudentList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<DashboardPage />} /> */}
          {/* <Route path="students" element={<StudentList />} /> */}
          {/* Các route khác */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
