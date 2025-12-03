import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("signin"); // signin | signup
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  useEffect(() => {
    let isMounted = true;

    async function loadSession() {
      const { data, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.warn("[Auth] Error cargando sesión:", sessionError);
      }
      if (!isMounted) return;
      setUser(data?.session?.user ?? null);
      setLoading(false);
    }

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      setUser(session?.user ?? null);
    });

    loadSession();

    return () => {
      isMounted = false;
      listener?.subscription.unsubscribe();
    };
  }, []);

  const openAuthModal = (modeToOpen = "signin") => {
    setMode(modeToOpen);
    setModalOpen(true);
    setError("");
  };

  const closeAuthModal = () => {
    setModalOpen(false);
    setError("");
  };

  async function signIn(email, password) {
    setError("");
    const { data, error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) {
      setError(err.message);
      return false;
    }
    if (data?.user) {
      await upsertPerfil(data.user, form.name);
    }
    closeAuthModal();
    return true;
  }

  async function signUp({ email, password, name }) {
    setError("");
    const { data, error: err } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
    if (err) {
      setError(err.message);
      return false;
    }
    // Si hay sesión inmediata (proyectos sin confirmación de correo), insertamos perfil
    if (data?.user && data?.session) {
      await upsertPerfil(data.user, name);
    }
    closeAuthModal();
    return true;
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function upsertPerfil(userObj, name) {
    if (!userObj?.id) return;
    // Se apoya en la RLS (auth.uid = id); requiere sesión activa
    const { email, user_metadata } = userObj;
    const nombreFinal = name || user_metadata?.full_name || user_metadata?.name || "";
    await supabase.from("perfiles").upsert(
      {
        id: userObj.id,
        email: email?.toLowerCase(),
        nombre: nombreFinal,
        rol: "cliente",
      },
      { onConflict: "id" }
    );
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    openAuthModal,
    closeAuthModal,
    setMode,
    mode,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}

      {modalOpen && (
        <div className="modal-overlay" onClick={closeAuthModal}>
          <div
            className="modal-card auth-modal"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="auth-modal__header">
              <h3 className="modal-title auth-heading">
                {mode === "signin" ? "Iniciar sesión" : "Crear cuenta"}
              </h3>
              <button className="btn-outline auth-modal__close" onClick={closeAuthModal}>
                ✕
              </button>
            </div>

            <p className="modal-text">
              Usa tu correo y contraseña. Tu perfil se guardará automáticamente en Supabase.
            </p>

            <div className="auth-form">
              {mode === "signup" && (
                <label className="auth-field">
                  <span>Nombre</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Tu nombre"
                  />
                </label>
              )}
              <label className="auth-field">
                <span>Correo</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="tu@email.com"
                />
              </label>
              <label className="auth-field">
                <span>Contraseña</span>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                />
              </label>

              {error && <div className="auth-error">{error}</div>}

              <div className="modal-actions auth-actions">
                <button
                  className="btn-outline"
                  onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                >
                  {mode === "signin" ? "Crear cuenta" : "Ya tengo cuenta"}
                </button>
                <button
                  className="btn-primary"
                  onClick={() =>
                    mode === "signin"
                      ? signIn(form.email, form.password)
                      : signUp({ email: form.email, password: form.password, name: form.name })
                  }
                >
                  {mode === "signin" ? "Iniciar sesión" : "Registrarme"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return ctx;
}
