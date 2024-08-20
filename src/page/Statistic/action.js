import { getInvitationList } from "../Home/action";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

export async function getAdditionalList() {
  const supabase = createClient(
    "https://jweftjgelrutfoerznmb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3ZWZ0amdlbHJ1dGZvZXJ6bm1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0MjYyMjMsImV4cCI6MjAyOTAwMjIyM30.PGKnIzXI1T4YQVfNqxuOnL7cASslx40XOZJc0UHtDZo"
  );
  try {
    let query = supabase.from("guestlist").select("*").eq("tambahan", true);
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

export const GetTotalGuest = () => {
  const [invitationList, setInvitationList] = useState([]);

  const fetchData = async () => {
    try {
      const data = await getInvitationList();

      setInvitationList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return invitationList;
};

export const GetAlreadyIn = (data) => {
  const filteredResponse = data.filter((item) => item.isCheckIn === true);
  return filteredResponse.length;
};

export const GetDidnotIn = (data) => {
  const filteredResponse = data.filter((item) => item.isCheckIn === false);
  return filteredResponse.length;
};

export const getTotalPax = (data) => {
  const totalPax = data.reduce((sum, guest) => {
    return sum + guest.pax;
  }, 0);
  return totalPax;
};
