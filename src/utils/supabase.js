import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jweftjgelrutfoerznmb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3ZWZ0amdlbHJ1dGZvZXJ6bm1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0MjYyMjMsImV4cCI6MjAyOTAwMjIyM30.PGKnIzXI1T4YQVfNqxuOnL7cASslx40XOZJc0UHtDZo";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
