import supabase from "../utils/supabase";

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) console.log("Error signing out:", error.message);
}
