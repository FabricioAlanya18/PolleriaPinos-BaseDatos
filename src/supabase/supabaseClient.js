// Supabase client usando variables de entorno de Vite
// NUNCA uses la service_role en el frontend.

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validación por si falta algo
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[Supabase] Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en tu archivo .env"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
