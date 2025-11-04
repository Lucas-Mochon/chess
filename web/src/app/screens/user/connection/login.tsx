import React, { useState } from 'react';
import { apiService } from '../../../service/api';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        console.log("📌 handleLogin called"); // debug pour vérifier que la fonction est appelée
        setError(null);
        setLoading(true);

        try {
            const data = await apiService.post('/api/users/login', {
                email,
                password
            });
            console.log("✅ Login réussi :", data); // debug réponse backend
        } catch (err: any) {
            console.error("❌ Erreur login :", err);
            setError(err.response?.data?.message || 'Une erreur est survenue lors de la connexion');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Connexion</h2>
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
            >
                {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>

            <p>
                Pas encore de compte ? <a href="/register">S'inscrire</a>
            </p>
        </div>
    );
};

export default LoginPage;
