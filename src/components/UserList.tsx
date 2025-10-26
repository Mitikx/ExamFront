import { useState, useEffect, useMemo } from "react";
import UserCard from "./UserCard";
import type { User } from "../model/User";

function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | false>(false);

    const usersPerPage = 10;

    const fetchUsers = async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await fetch("https://dummyjson.com/users?limit=0");
            if (!response.ok) throw new Error("Erreur réseau");
            const data = await response.json();
            setUsers(data.users || []);
        } catch (err: any) {
            setError(err?.message || String(err));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filtered = useMemo(() => {
        const s = search.trim().toLowerCase();
        if (!s) return users;
        return users.filter((user) =>
            `${user.firstName} ${user.lastName} ${user.email}`.toLowerCase().includes(s)
        );
    }, [users, search]);

    const sorted = useMemo(() => {
        const copy = [...filtered];
        if (sortBy === "name") return copy.sort((a, b) => (a.lastName).localeCompare(b.lastName));
        if (sortBy === "age") return copy.sort((a, b) => (a.age) - (b.age));
        return copy;
    }, [filtered, sortBy]);

    const lastIndex = page * usersPerPage;
    const firstIndex = lastIndex - usersPerPage;
    const currentUsers = sorted.slice(firstIndex, lastIndex);
    const totalPages = Math.max(1, Math.ceil(sorted.length / usersPerPage));

    if (loading) {
        // show spinner and a few skeleton cards
        return (
            <div className="container">
                <div className="header">
                    <h1>Liste des utilisateurs</h1>
                </div>
                <div className="user-grid">
                    {[1,2,3,4].map(i => (
                        <div key={i} className="user-card skeleton-card">
                            <img alt="skeleton" className="skeleton skeleton-avatar" />
                            <h2 className="skeleton skeleton-line-sm"></h2>
                            <p className="skeleton skeleton-line-xs"></p>
                        </div>
                    ))}
                </div>
                <div className="loader"></div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="container">
                <div className="error-box">
                    <p>Erreur lors du chargement des utilisateurs : {String(error)}</p>
                    <button className="retry-btn" onClick={() => fetchUsers()}>Réessayer</button>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="header">
                <h1>Liste des utilisateurs</h1>
                <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Rechercher..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select className="select-sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="">Trier par</option>
                        <option value="name">Nom</option>
                        <option value="age">Âge</option>
                    </select>
                </div>
            </div>
            <div className="user-grid">
                {currentUsers.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
            <div className="pagination">
                <button className="page-btn" onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
                    Précédent
                </button>
                <span className="text-muted">
                    Page {page} sur {totalPages}
                </span>
                <button className="page-btn" onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
                    Suivant
                </button>
            </div>
        </div>
    );
}
export default UserList;