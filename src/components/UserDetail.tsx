import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import type { User } from "../model/User";
import NotFound from "./NotFound";

function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | false>(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
      const fetchUser = async () => {
          try {
              const response = await fetch(`https://dummyjson.com/users/${id}`);
              if (response.status === 404) {
                  setNotFound(true);
                  return;
              }
              if (!response.ok) throw new Error("Utilisateur non trouvé");
              const data = await response.json();
              setUser(data);
          } catch (err: unknown) {
              const msg = err instanceof Error ? err.message : String(err);
              setError(msg);
          } finally {
              setLoading(false);
          }
      };
      fetchUser();
  }, [id]);

  if (loading) return <div className="container"><div className="loader"></div></div>;
  if (notFound) return <NotFound />;
  if (error || !user) return <div className="container"><div className="error-box">Erreur lors du chargement du détail de l'utilisateur</div></div>;

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
    <div className="container">
      <div className="user-detail">
        <img src={user.image} alt={user.firstName} />
        <h2>{name} {lastName}</h2>
        <p className="text-muted">{email}</p>

        <div className="mt-4">
          <p><strong>Téléphone :</strong> {phone}</p>
          <p><strong>Age :</strong> {age} ans</p>
          <p><strong>Ville :</strong> {city}</p>
          <p><strong>Adresse :</strong> {fullAddress}</p>
          <p><strong>Société :</strong> {companyName}</p>
          <p><strong>Poste :</strong> {companyTitle}</p>
          <p><strong>Département :</strong> {companyDept}</p>
        </div>

        <div>
          <Link className="back-btn" to={`/`}>Retour à la liste des utilisateurs</Link>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;