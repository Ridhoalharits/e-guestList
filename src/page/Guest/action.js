import { createClient } from "@supabase/supabase-js";
export async function newguest(inputdata) {
  const supabase = createClient(
    "https://jweftjgelrutfoerznmb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3ZWZ0amdlbHJ1dGZvZXJ6bm1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0MjYyMjMsImV4cCI6MjAyOTAwMjIyM30.PGKnIzXI1T4YQVfNqxuOnL7cASslx40XOZJc0UHtDZo"
  );
  try {
    const { data, error } = await supabase
      .from("guestlist")
      .insert([inputdata])
      .select();

    if (data) {
      console.log("Successfully delete data");
    }

    if (error) console.log("Failed delete data");
  } catch (error) {
    console.error("Error: ", error);
  }
}
