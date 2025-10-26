import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import type { User } from "../model/User";

function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("https://dummyjson.com/users")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data.users || []);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur lors du chargement des utilisateurs</p>;

    return (
        <div className="app-container">
            <div className="header">
                <h1>Liste des utilisateurs</h1>
            </div>
            <div className="user-grid">
                {users.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
}

export default UserList;