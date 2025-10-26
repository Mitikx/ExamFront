import { Link } from "react-router-dom";
import type { User } from "../model/User";

type Props = {
    user: User;
};

function UserCard({ user }: Props) {
    return (
        <article className="user-card">
            <div>
                <img src={user.image ?? ""} alt={user.firstName ?? "user"} />
            </div>
            <h2>
                {user.firstName ?? ""} {user.lastName ?? ""}
            </h2>
            <p> {user.email ?? ""} </p>

            <div>
                <Link className="link" to={`/user/${user.id}`}>
                    Voir détails
                </Link>
            </div>
        </article>
    );
}

export default UserCard;