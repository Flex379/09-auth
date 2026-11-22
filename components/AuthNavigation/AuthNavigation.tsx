"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";
import css from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const router = useRouter();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  const handleLogout = async () => {
    try {
      await logout();
      clearIsAuthenticated();
      router.push("/sign-in");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav>
      {isAuthenticated ? (
        <div className={css.navigationItem}>
          <span className={css.userEmail}>{user?.email}</span>

          <Link href="/profile" className={css.navigationLink}>
            Profile
          </Link>

          <button
            type="button"
            className={css.logoutButton}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className={css.navigationItem}>
          <Link href="/sign-up" className={css.navigationLink}>
            Register
          </Link>

          <Link href="/sign-in" className={css.navigationLink}>
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
