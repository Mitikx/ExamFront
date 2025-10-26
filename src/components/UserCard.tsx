import { Link } from "react-router-dom";
import type { User } from "../model/User";
import { useContext, useMemo } from "react";
import { ThemeContext } from "../context/ThemeContext.tsx";

type Props = {
    user: User;
};

function UserCard({ user }: Props) {
    const ctx = useContext(ThemeContext);
    const isFav = useMemo(() => ctx.favorites.includes(user.id), [ctx.favorites, user.id]);

    return (
        <article className="user-card">
            <button
                aria-label="favoris"
                className={`favorite-icon ${isFav ? "favorite" : ""}`}
                onClick={() => ctx.toggleFavorite(user.id)}
            >★
            </button>

            <img src={user.image} alt={`${user.firstName} ${user.lastName}`} />

            <h2>
                {user.firstName} {user.lastName}
            </h2>
            <p>{user.email}</p>

            <div className="card-actions">
                <Link className="back-btn" to={`/user/${user.id}`}>
                    Voir détails
                </Link>
            </div>
        </article>
    );
}

export default UserCard;