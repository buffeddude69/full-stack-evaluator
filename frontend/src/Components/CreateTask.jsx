

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const CreateTask = () => {
    const [title, setTitle] = useState('');
    const [isDone, setIsDone] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await api.post('/tasks', { title, isDone });
            navigate('/tasks');
        } catch (err) {
            setError('Failed to create task');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Create New Task</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="isDone">
                        <input
                            type="checkbox"
                            id="isDone"
                            checked={isDone}
                            onChange={(e) => setIsDone(e.target.checked)}
                        />
                        Done
                    </label>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Task'}
                </button>
            </form>
        </div>
    );
};

export default CreateTask;