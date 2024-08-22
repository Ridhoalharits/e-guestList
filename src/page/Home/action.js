import { createClient } from "@supabase/supabase-js";
import { format } from "date-fns";
export async function getInvitationList() {
  const supabase = createClient(
    "https://jweftjgelrutfoerznmb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3ZWZ0amdlbHJ1dGZvZXJ6bm1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0MjYyMjMsImV4cCI6MjAyOTAwMjIyM30.PGKnIzXI1T4YQVfNqxuOnL7cASslx40XOZJc0UHtDZo"
  );
  try {
    let query = supabase.from("guestlist").select("*");
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
    const timestamp = new Date();
    const { data, error } = await supabase
      .from("guestlist")
      .update({ isCheckIn: true, pax: person, checkInTime: timestamp })
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
      .from("guestlist")
      .select("*")
      .ilike("nama", `%${name}%`);

    if (data) {
      console.log("Successfully delete data");
    }

    if (error) console.log("Failed delete data");
    return data;
  } catch (error) {
    console.error("Error: ", error);
  }
}

export async function findGuestQR(id) {
  const supabase = createClient(
    "https://jweftjgelrutfoerznmb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3ZWZ0amdlbHJ1dGZvZXJ6bm1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0MjYyMjMsImV4cCI6MjAyOTAwMjIyM30.PGKnIzXI1T4YQVfNqxuOnL7cASslx40XOZJc0UHtDZo"
  );
  try {
    const { data, error } = await supabase
      .from("guestlist")
      .select("*")
      .eq("guestID", id);

    if (error) {
      console.log("Failed to fetch data:", error);
      return null;
    }

    console.log("Successfully fetched data");
    return data[0]; // Assuming you expect a single guest object
  } catch (error) {
    console.error("Error: ", error);
  }
}

export const sortTableByName = (data) => {};

export function formatedTime(data) {
  const date = new Date(data);

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleDateString("en-US", options);
}
