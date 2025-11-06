import { useState } from "react";
import CButton from "../../../components/CButton";
import { useThemedStyles } from "../../../hooks/useThemedStyles";
import { useNavigate } from "react-router-dom";
import LogoButton from "../../../components/LogoButton";
import './css/register.css';
import { TiArrowLeftThick } from "react-icons/ti";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { authService } from "../../../service/auth";

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const themedStyles = useThemedStyles();
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            authService.register(email, password, username)
            navigate('/login')
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
        <div className={`${themedStyles.backgroundClass} ${themedStyles.textClass} pt-3`}>
            <div className="container p-4 text-center">
                <div className="header-container">
                    <div></div>
                    <a href="/connect" className="back-link text-decoration-none">
                        <TiArrowLeftThick />
                    </a>
                    <LogoButton />
                    <div></div>
                    <div></div>
                </div>
                <div className="form-container mx-auto">
                    <div className="mb-4">
                        <h2 className="fw-bold fs-5">Saisissez votre adresse e-mail et un mot de passe</h2>
                        <span className="text-secondary small">Cela vous permet de vous connecter sur n'importe quel appareil</span>
                    </div>
                    <form onSubmit={handleRegister} className="text-center">
                        <div className="input-group mb-3">
                            <span className="input-group-text input-icon-container">
                                <FaUser className="input-icon" />
                                <input
                                    type="text"
                                    className="form-control form-control-sm text-light border-0 input"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </span>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text input-icon-container">
                                <FaEnvelope className="input-icon" />
                                <input
                                    type="email"
                                    className="form-control form-control-sm text-light border-0 input"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </span>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text input-icon-container">
                                <FaLock className="input-icon" />
                                <input
                                    type="password"
                                    className="form-control form-control-sm text-light border-0 input"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </span>
                        </div>
                        {error && (
                            <div className="alert alert-danger py-1 small">{error}</div>
                        )}
                        <div className="d-flex justify-content-center">
                            <CButton type="submit" text={loading ? 'Chargement...' : 'S\'inscrire'} disabled={loading}></CButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;