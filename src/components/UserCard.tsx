import { Link } from "react-router-dom";
import type { User } from "../model/User";

type Props = {
    user: User;
};

function UserCard({ user }: Props) {
    return (
        <>
            <div>
                <img src={user.image} alt={user.firstName} />
            </div>
            <h2>
                {user.firstName} {user.lastName}
            </h2>
            <p> {user.email} </p>

            <div>
                <Link to={`/user/${user.id}`}>
                    Voir détails
                </Link>
            </div>
        </>
    );
}

export default UserCard;