import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from "../api/axios";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch {
      setError('Failed to delete task');
    }
  };

  useEffect(() => {
    api.get('/tasks')
      .then(res => setTasks(res.data))
      .catch(() => setError("Failed to load tasks"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>{error}</p>;
  if (tasks.length === 0) return <p>No tasks available</p>;

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.id.toString().includes(searchTerm)
  );

  const groupedTasks = filteredTasks.reduce((acc, task) => {
    acc[task.id] = acc[task.id] || [];
    acc[task.id].push(task);
    return acc;
  }, {});

  return (
    <div>
      <h2>Tasks by User</h2>
      <input
        type="text"
        placeholder="Search by title or ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {Object.entries(groupedTasks).map(([id, userTasks]) => (
        <div key={id} style={{ marginBottom: '1rem' }}>
          <h3>User {id}</h3>

          <ul>
            {userTasks.map(task => (
              <li key={task.id}>
                <Link to={`/task-detail/${task.id}`}>View</Link> | {task.title} {task.isDone ? '✅' : '❌'}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default TaskList;