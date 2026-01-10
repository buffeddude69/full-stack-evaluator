import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Deleteuser = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/api/User/${id}`)
            .then(res => setUser(res.data))
            .catch(() => setError('Failed to load user'))
            .finally(() => setLoading(false));
    }, [id]);

    const handleDelete = async () => {
        try {
            await api.delete(`/User/${id}`);
            navigate('/tasks');
        } catch {
            setError('Failed to delete user');
        }
    };

    if (loading) return <p>Loading user...</p>;
    if (error) return <p>{error}</p>;
    if (!user) return <p>User not found</p>;

    return (
        <div>
            <h2>Delete User</h2>
            <p>Are you sure you want to delete user: {user.email}?</p>
            <button onClick={handleDelete}>Yes, Delete</button>
            <button onClick={() => navigate('/tasks')}>Cancel</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Deleteuser;