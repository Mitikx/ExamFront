import UserCard from "./UserCard";
import useUsers from "../hooks/useUsers";

function UserList() {
    const { users, loading, error, search, setSearch, page, setPage, usersPerPage, total, reload, sortBy, setSort } = useUsers(10);

    const totalPages = Math.max(1, Math.ceil(total / usersPerPage));

    if (loading) {
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
                    <button className="retry-btn" onClick={() => reload()}>Réessayer</button>
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

                    <select className="select-sort" value={sortBy} onChange={(e) => setSort(e.target.value)}>
                        <option value="">Trier</option>
                        <option value="name">Nom</option>
                        <option value="age">Âge</option>
                    </select>
                 </div>
             </div>
            <div className="user-grid">
                {users.map((user) => (
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