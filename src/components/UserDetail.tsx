import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import type { User } from "../model/User";

function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`https://dummyjson.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data || null);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error || !user) return <p>Erreur lors du chargement du détail de l'utilisateur</p>;

  const email = user.email;
  const phone = user.phone;
  const age = user.age;
  const name = user.firstName;
  const lastName = user.lastName;
  const city = user.address?.city;
  const fullAddress = user.address?.address;
  const companyName = user.company?.name;
  const companyTitle = user.company?.title;
  const companyDept = user.company?.department;

  return (
    <div className="app-container">
      <div className="user-detail">
        <div className={"user-header"}>
          <img src={user.image} alt={user.firstName} />
          <div>
            <h2>{name} {lastName}</h2>
            <p className="muted">{email}</p>
          </div>
        </div>

        <div className="user-meta">
          <p><strong>Téléphone :</strong> {phone}</p>
          <p><strong>Age :</strong> {age} ans</p>
          <p><strong>Ville :</strong> {city}</p>
          <p><strong>Adresse :</strong> {fullAddress}</p>
          <p><strong>Société :</strong> {companyName}</p>
          <p><strong>Poste :</strong> {companyTitle}</p>
          <p><strong>Département :</strong> {companyDept}</p>
        </div>

        <div>
          <Link className="back-link" to={`/`}>Retour à la liste des utilisateurs</Link>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;