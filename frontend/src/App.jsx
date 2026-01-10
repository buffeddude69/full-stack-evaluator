import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import CreateTask from "./Components/CreateTask";
import EditTask from "./Components/EditTask";
import TaskDetail from "./Components/TaskDetail";
import TaskList from "./Components/TaskList";
import { Home } from "./Components/Home";

const App = () => {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/edit-task/:id" element={<EditTask />} />
        <Route path="/task-detail/:id" element={<TaskDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
