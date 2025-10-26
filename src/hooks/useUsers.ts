import { useCallback, useEffect, useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { User } from "../model/User";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

type UseUsersReturn = {
  users: User[];
  loading: boolean;
  error: string | false;
  search: string;
  setSearch: (s: string) => void;
  toggleFavorite: (id: number) => void;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  usersPerPage: number;
  total: number;
  reload: () => void;
  sortBy: string;
  setSort: (s: string) => void;
};

const API_BASE = "https://dummyjson.com";
const CACHE_KEY = "users_cache";

export default function useUsers(initialPerPage = 10): UseUsersReturn {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | false>(false);
  const [search, setSearchState] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [usersPerPage] = useState(initialPerPage);
  const [total, setTotal] = useState(0);

  const { favorites, toggleFavorite: ctxToggleFavorite } = useContext(ThemeContext);

  const sortedUsers = useMemo(() => {
    const copy = [...users];
    if (sortBy === "name") return copy.sort((a, b) => (a.lastName || "").localeCompare(b.lastName || ""));
    if (sortBy === "age") return copy.sort((a, b) => (a.age || 0) - (b.age || 0));
    return copy;
  }, [users, sortBy]);

  const buildUrl = (p: number, perPage: number, q?: string) => {
    const skip = (p - 1) * perPage;
    if (q && q.trim()) {
      return `${API_BASE}/users/search?q=${encodeURIComponent(q.trim())}&limit=${perPage}&skip=${skip}`;
    }
    return `${API_BASE}/users?limit=${perPage}&skip=${skip}`;
  };

  const fetchUsers = useCallback(
    async (p = page, q = search) => {
      setLoading(true);
      setError(false);
      const url = buildUrl(p, usersPerPage, q);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Erreur réseau (${res.status})`);
        const data = await res.json();
        const list: User[] = data.users || [];
        setUsers(list);
        setTotal(typeof data.total === "number" ? data.total : list.length);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(list));
        } catch (e) {
          console.warn("Cannot persist users cache", e);
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg);
        // Offline fallback: display favorites from cached users
        try {
          const raw = localStorage.getItem(CACHE_KEY);
          if (raw) {
            const cached: User[] = JSON.parse(raw);
            const favs = cached.filter((u) => favorites.includes(u.id));
            if (favs.length > 0) {
              setUsers(favs);
              setTotal(favs.length);
            } else {
              setUsers([]);
            }
          } else {
            setUsers([]);
          }
        } catch (e) {
          console.warn("Cannot read users cache", e);
          setUsers([]);
        }
      } finally {
        setLoading(false);
      }
    },
    [page, search, usersPerPage, favorites]
  );

  useEffect(() => {
    fetchUsers(page, search);
  }, [fetchUsers, page, search]);

  const setSearch = useCallback(
    (s: string) => {
      setSearchState(s);
      setPage(1);
    },
    [setPage]
  );

  const toggleFavorite = useCallback(
    (id: number) => {
      ctxToggleFavorite(id);
    },
    [ctxToggleFavorite]
  );

  const reload = useCallback(() => fetchUsers(page, search), [fetchUsers, page, search]);

  return useMemo(
    () => ({ users: sortedUsers, loading, error, search, setSearch, toggleFavorite, page, setPage, usersPerPage, total, reload, sortBy, setSort: setSortBy }),
    [sortedUsers, loading, error, search, setSearch, toggleFavorite, page, setPage, usersPerPage, total, reload, sortBy, setSortBy]
  );
}
