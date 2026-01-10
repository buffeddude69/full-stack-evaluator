import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./Components/NavBar";
import CreateTask from "./Components/CreateTask";
import EditTask from "./Components/EditTask";
import TaskDetail from "./Components/TaskDetail";
import TaskList from "./Components/TaskList";
import Userlogin from "./Components/Userlogin";
import Createuser from "./Components/Createuser";
import Updateuser from "./Components/Updateuser";
import Deleteuser from "./Components/Deleteuser";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <NavBar />

        <Routes>
          <Route path="/login" element={<Userlogin />} />
          <Route path="/create-user" element={<Createuser />} />
          <Route path="/" element={<ProtectedRoute><TaskList /></ProtectedRoute>} />
          <Route path="/tasks" element={<ProtectedRoute><TaskList /></ProtectedRoute>} />
          <Route path="/create-task" element={<ProtectedRoute><CreateTask /></ProtectedRoute>} />
          <Route path="/edit-task/:id" element={<ProtectedRoute><EditTask /></ProtectedRoute>} />
          <Route path="/task-detail/:id" element={<ProtectedRoute><TaskDetail /></ProtectedRoute>} />
          <Route path="/update-user/:id" element={<ProtectedRoute><Updateuser /></ProtectedRoute>} />
          <Route path="/delete-user/:id" element={<ProtectedRoute><Deleteuser /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
