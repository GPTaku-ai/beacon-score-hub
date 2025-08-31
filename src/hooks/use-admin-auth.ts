import { useState, useEffect } from "react";
import { CONFIG } from "@/lib/config";

// SHA-256 hash function
async function sha256(text: string): Promise<string> {
  const buffer = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

// Session management
function setSession(hours: number) {
  const until = Date.now() + hours * 60 * 60 * 1000;
  localStorage.setItem("mc_admin_token", Math.random().toString(36).slice(2));
  localStorage.setItem("mc_admin_until", String(until));
}

function hasValidSession(): boolean {
  const until = Number(localStorage.getItem("mc_admin_until") || 0);
  return until && Date.now() < until;
}

function clearSession() {
  localStorage.removeItem("mc_admin_token");
  localStorage.removeItem("mc_admin_until");
}

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsAuthenticated(hasValidSession());
    setLoading(false);
  }, []);

  const login = async (password: string): Promise<boolean> => {
    try {
      const hash = await sha256(password);
      if (hash === CONFIG.ADMIN_HASH) {
        setSession(CONFIG.SESSION_HOURS);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    clearSession();
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    loading,
    login,
    logout
  };
}