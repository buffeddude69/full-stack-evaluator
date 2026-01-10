import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Updateuser = () => {
    const { id } = useParams();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/api/User/${id}`)
            .then(res => {
                setEmail(res.data.email);
            })
            .catch(() => setError('Failed to load user'))
            .finally(() => setLoading(false));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await api.put(`/User/${id}`, { email });
            navigate('/tasks');
        } catch (err) {
            setError('Failed to update user');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading user...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Update User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update User'}
                </button>
            </form>
        </div>
    );
};

export default Updateuser;