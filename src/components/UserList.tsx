import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import type { User } from "../model/User";

function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const usersPerPage = 10;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("https://dummyjson.com/users?limit=0");
                if (!response.ok) throw new Error("Erreur réseau");
                const data = await response.json();
                setUsers(data.users || []);
            }catch (error) {
                setError(error.message);
            }
            finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const UserFiltrer = users.filter((user) =>
        `${user.firstName} ${user.lastName} ${user.email}`.toLowerCase().includes(search.toLowerCase())
    );

    const UserTirer = [...UserFiltrer].sort((a, b) => {
        if (sortBy === "name") return a.lastName.localeCompare(b.lastName);
        if (sortBy === "age") return a.age - b.age;
        return 0;
    });

    const lastIndex = page * usersPerPage;
    const firstIndex = lastIndex - usersPerPage;
    const currentUsers = UserTirer.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(UserTirer.length / usersPerPage);

    if (loading) {
        return <p>Chargement...</p>;
    }
    if (error) {
        return <p>Erreur lors du chargement des utilisateurs: {error}</p>;
    }

    return (
        <div className="app-container">
            <div className="header">
                <h1>Liste des utilisateurs</h1>
                <input
                    type="text"
                    placeholder="Rechercher..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="">Trier par</option>
                    <option value="name">Nom</option>
                    <option value="age">Âge</option>
                </select>
            </div>
            <div className="user-grid">
                {currentUsers.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
            <div className="pagination">
                <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
                    Précédent
                </button>
                <span>
                    Page {page} sur {totalPages}
                </span>
                <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
                    Suivant
                </button>
            </div>
        </div>
    );
}
export default UserList;