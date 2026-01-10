

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const EditTask = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [isDone, setIsDone] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/tasks/${id}`)
            .then(res => {
                setTitle(res.data.title);
                setIsDone(res.data.isDone);
            })
            .catch(() => setError('Failed to load task'))
            .finally(() => setLoading(false));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await api.put(`/tasks/${id}`, { title, isDone });
            navigate('/tasks');
        } catch (err) {
            setError('Failed to update task');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading task...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Edit Task</h2>
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
                    {loading ? 'Updating...' : 'Update Task'}
                </button>
            </form>
        </div>
    );
};

export default EditTask;