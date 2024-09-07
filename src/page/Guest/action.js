import supabase from "../../utils/supabase";
export async function newguest(inputdata) {
  try {
    const { data, error } = await supabase
      .from("guestlist")
      .insert([inputdata])
      .select();

    if (data) {
      console.log("Successfully Create New data");
    }

    if (error) console.log("Failed delete data");
  } catch (error) {
    console.error("Error: ", error);
  }
}
