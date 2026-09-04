import { useEffect, useState } from "react";
import type { IProfile } from "../types/profile.type";
import axios from "axios";

const API_URL = "https://localhost:7016/api/account/profile";

export default function Profile() {
  const [account, setAccount] = useState<IProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("Користувач не авторизований");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await axios.get<IProfile>(
                `${API_URL}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setAccount(response.data);

        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 401) {
                    setError(
                        "Сесія закінчилася. Увійдіть у систему повторно."
                    );

                    // Видаляємо недійсний токен
                    localStorage.removeItem("token");

                } else {
                    setError(
                        err.response?.data?.message ||
                        "Не вдалося отримати дані користувача"
                    );
                }
            } else {
                setError("Сталася невідома помилка");
            }
        } finally {
            setLoading(false);
        }
    };

    fetchUser();
}, []);

  if (loading) {
  return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500" />
          <p className="text-sm text-slate-400">
          Завантаження профілю...
          </p>
      </div>
      </div>
  );
  }

  if (error) {
  return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
          <svg
              className="h-6 w-6 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
          >
              <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M12 3a9 9 0 100 18 9 9 0 000 18z"
              />
          </svg>
          </div>

          <h2 className="text-lg font-semibold text-white">
          Помилка
          </h2>

          <p className="mt-2 text-sm text-red-300">
          {error}
          </p>
      </div>
      </div>
  );
  }

  if (!account) {
  return null;
  }

  const fullName = `${account.firstName} ${account.lastName}`;


  return (
<main className="auth-container">
  <div className="auth-card">
    {/* Header */}
    <div className="mb-6 text-center">
      <h1 className="auth-title">Профіль</h1>

      <p className="mt-2 text-sm text-slate-400">
        Перегляд інформації про ваш обліковий запис.
      </p>
    </div>

    {/* Avatar */}
    <div className="mb-6 flex justify-center">
      {account.image ? (
        <img
          src={account.image}
          alt={fullName}
          className="h-24 w-24 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-800 text-2xl font-bold text-blue-400">
          {account.firstName?.charAt(0)}
          {account.lastName?.charAt(0)}
        </div>
      )}
    </div>

    {/* User information */}
    <div className="space-y-4">
      <div className="auth-group">
        <label>Ім'я</label>
        <div className="auth-input flex items-center">
          {account.firstName || 'Не вказано'}
        </div>
      </div>

      <div className="auth-group">
        <label>Прізвище</label>
        <div className="auth-input flex items-center">
          {account.lastName || 'Не вказано'}
        </div>
      </div>

      <div className="auth-group">
        <label>Email</label>
        <div className="auth-input flex items-center">
          {account.email}
        </div>
      </div>

      <div className="auth-group">
        <label>Ролі</label>

        <div className="auth-input min-h-[42px] !h-auto flex flex-wrap items-center gap-2 py-2">
          {account.roles?.length > 0 ? (
            account.roles.map((role) => (
              <span
                key={role}
                className="rounded-md bg-blue-500/10 px-2.5 py-1 text-sm text-blue-400"
              >
                {role}
              </span>
            ))
          ) : (
            <span className="text-sm text-slate-500">
              Ролі відсутні
            </span>
          )}
        </div>
      </div>
    </div>

  </div>
</main>

  );
}
