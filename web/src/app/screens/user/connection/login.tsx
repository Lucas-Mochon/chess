import React, { useState } from 'react';
import { apiService } from '../../../service/api';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import LogoButton from '../../../components/LogoButton';
import CButton from '../../../components/CButton';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const themedStyles = useThemedStyles();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await apiService.post('/api/users/login', {
                email,
                password,
            });
            navigate('/dashboard')
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                'Une erreur est survenue lors de la connexion'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`d-flex justify-content-center align-items-center vh-100 ${themedStyles.backgroundClass} ${themedStyles.textClass}`}
            style={{
                backgroundColor: '#1e1e1e',
                backgroundImage:
                    'linear-gradient(135deg, #222 25%, transparent 25%), linear-gradient(225deg, #222 25%, transparent 25%), linear-gradient(45deg, #222 25%, transparent 25%), linear-gradient(315deg, #222 25%, #1e1e1e 25%)',
                backgroundPosition: '20px 0, 20px 0, 0 0, 0 0',
                backgroundSize: '40px 40px',
                backgroundRepeat: 'repeat',
            }}
        >
            <div
                className="p-4 rounded-3 shadow-lg text-center"
                style={{
                    backgroundColor: '#111',
                    width: '100%',
                    maxWidth: '380px',
                }}
            >
                <div className="mb-4">
                    <LogoButton />
                </div>

                <form onSubmit={handleLogin}>
                    <div className="form-group mb-3 text-start">
                        <input
                            type="text"
                            className="form-control bg-dark text-light border-0"
                            placeholder="Username, Phone, or Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3 text-start">
                        <input
                            type="password"
                            className="form-control bg-dark text-light border-0"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-4 text-secondary small">
                        <div>
                            <input
                                type="checkbox"
                                className="form-check-input me-1"
                                id="rememberMe"
                                style={{ cursor: 'pointer' }}
                            />
                            <label
                                htmlFor="rememberMe"
                                style={{ cursor: 'pointer' }}
                            >
                                Remember me
                            </label>
                        </div>
                        <a
                            href="/forgot-password"
                            className="text-decoration-none text-light"
                        >
                            Forgot Password?
                        </a>
                    </div>

                    {error && (
                        <div className="alert alert-danger py-2">{error}</div>
                    )}

                    <CButton type="submit" text={loading ? 'Loading...' : 'Log In'} disabled={loading}></CButton>


                </form>

                <hr className="border-secondary my-3 opacity-25" />
                <p className="text-secondary small mb-3">OR</p>

                <div className="d-flex flex-column gap-2 mb-3">
                    <CButton link="/" text="Log in with Apple" icon="apple" color="black" />
                    <CButton link="/" text="Log in with Google" icon="google" color="black" />
                    <CButton link="/" text="Log in with Facebook" icon="facebook" color="black" />
                </div>

                <div className="mt-3 text-secondary small">
                    New?{' '}
                    <a href="/register" className="text-light text-decoration-none fw-bold">
                        Sign up
                    </a>{' '}
                    and start playing chess!
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
