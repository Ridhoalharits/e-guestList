import { createClient } from "@supabase/supabase-js";
export async function getInvitationList() {
  const supabase = createClient(
    "https://jweftjgelrutfoerznmb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3ZWZ0amdlbHJ1dGZvZXJ6bm1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0MjYyMjMsImV4cCI6MjAyOTAwMjIyM30.PGKnIzXI1T4YQVfNqxuOnL7cASslx40XOZJc0UHtDZo"
  );
  try {
    let query = supabase.from("invitation").select("*");
    const { data, error } = await query;
    if (error) {
      throw error;
    }
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error fetching UoM: ", error);
    throw error;
  }
}

export async function UpdateCheckIn(row, person) {
  console.log(person);
  const toUpdate = { person };
  const supabase = createClient(
    "https://jweftjgelrutfoerznmb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3ZWZ0amdlbHJ1dGZvZXJ6bm1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0MjYyMjMsImV4cCI6MjAyOTAwMjIyM30.PGKnIzXI1T4YQVfNqxuOnL7cASslx40XOZJc0UHtDZo"
  );
  try {
    const { data, error } = await supabase
      .from("invitation")
      .update({ isCheckIn: true, GuestQty: person })
      .eq("guestID", row.guestID);

    if (data) {
      console.log("Successfully delete data");
    }

    if (error) console.log("Failed delete data");
  } catch (error) {
    console.error("Error: ", error);
  }
}

export async function findGuest(name) {
  const supabase = createClient(
    "https://jweftjgelrutfoerznmb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3ZWZ0amdlbHJ1dGZvZXJ6bm1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0MjYyMjMsImV4cCI6MjAyOTAwMjIyM30.PGKnIzXI1T4YQVfNqxuOnL7cASslx40XOZJc0UHtDZo"
  );
  try {
    const { data, error } = await supabase
      .from("invitation")
      .select("*")
      .ilike("Name", `%${name}%`);

    if (data) {
      console.log("Successfully delete data");
    }

    if (error) console.log("Failed delete data");
    return data;
  } catch (error) {
    console.error("Error: ", error);
  }
}
