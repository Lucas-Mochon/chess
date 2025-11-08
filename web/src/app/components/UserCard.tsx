import { useState, useEffect } from "react";
import { apiService } from "../service/api";

interface User {
    Id: number;
    Username: string;
    Email: string;
    Picture?: string;
    PictureLink?: string;
    Country: string;
}

const UserCard: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const userId = localStorage.getItem("user");

    useEffect(() => {
        if (!userId) {
            setError("Aucun utilisateur trouvé dans le stockage local");
            return;
        }

        const getUser = async () => {
            try {
                const response: any = await apiService.get(`/api/users/${userId}`);
                const data = response.data?.user || response.user || response.data;

                if (!data) throw new Error("Utilisateur introuvable dans la réponse");

                if (data.Picture) {
                    const imageUrl = `data:image/jpeg;base64,${data.Picture}`;
                    data.PictureLink = imageUrl;
                }

                setUser(data);
            } catch (err) {
                setError("Une erreur est survenue lors du chargement de l'utilisateur");
            }
        };

        getUser();
    }, [userId]);

    if (error)
        return (
            <div className="alert alert-danger text-center mt-3" role="alert">
                {error}
            </div>
        );

    if (!user)
        return (
            <div className="text-center mt-3">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Chargement...</span>
                </div>
            </div>
        );

    return (
        <div className="d-flex align-items-center gap-2 mt-3">
            <img
                src={user.PictureLink || "/default-avatar.png"}
                alt={user.Username}
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
            />
            <div className="d-flex align-items-center gap-2">
                <strong className="fw-bold">{user.Username}</strong>
                <span className="fs-5">🇫🇷</span>
            </div>
        </div>
    );
};

export default UserCard;
