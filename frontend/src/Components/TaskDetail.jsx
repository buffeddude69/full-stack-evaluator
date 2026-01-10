

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

const TaskDetail = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/tasks/${id}`)
            .then(res => setTask(res.data))
            .catch(() => setError('Failed to load task'))
            .finally(() => setLoading(false));
    }, [id]);

    const handleDelete = async () => {
        try {
            await api.delete(`/tasks/${id}`);
            navigate('/tasks');
        } catch {
            setError('Failed to delete task');
        }
    };

    if (loading) return <p>Loading task...</p>;
    if (error) return <p>{error}</p>;
    if (!task) return <p>Task not found</p>;

    return (
        <div>
            <h2>Task Detail</h2>
            <p><strong>Title:</strong> {task.title}</p>
            <p><strong>Status:</strong> {task.isDone ? 'Done ✅' : 'Not Done ❌'}</p>
            <Link to={`/edit-task/${task.id}`}>Edit</Link>
            <button onClick={handleDelete}>Delete</button>
            <button type="button" onClick={() => navigate(-1)}>
                    ← Back
                </button>
        </div>
    );
};

export default TaskDetail;