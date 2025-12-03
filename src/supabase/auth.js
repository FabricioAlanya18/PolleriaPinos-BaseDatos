// src/supabase/auth.js
import { supabase } from "./supabaseClient";

// -------------------------------
// Obtener usuario actual (si hay sesión)
// -------------------------------
export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

// -------------------------------
// Iniciar sesión
// -------------------------------
export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("[Auth] Error al iniciar sesión:", error);
    throw error;
  }

  return data.user;
}

// -------------------------------
// Registrar usuario
// -------------------------------
export async function register(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("[Auth] Error al registrar usuario:", error);
    throw error;
  }

  return data.user;
}

// -------------------------------
// Cerrar sesión
// -------------------------------
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("[Auth] Error al cerrar sesión:", error);
    throw error;
  }
}
