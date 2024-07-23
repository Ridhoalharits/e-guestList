import React from "react";
import { createClient } from "@supabase/supabase-js";
import { Link } from "react-router-dom";
const VerticalNavigation = () => {
  const supabase = createClient(
    "https://jweftjgelrutfoerznmb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3ZWZ0amdlbHJ1dGZvZXJ6bm1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0MjYyMjMsImV4cCI6MjAyOTAwMjIyM30.PGKnIzXI1T4YQVfNqxuOnL7cASslx40XOZJc0UHtDZo"
  );

  const navLink = [
    {
      name: "Check In",
      icon: "http://www.w3.org/2000/svg",
      link: "/",
    },

    {
      name: "Daftar Tamu",
      icon: "http://www.w3.org/2000/svg",
      link: "/daftartamu",
    },
    // {
    //   name: "Statistik",
    //   icon: "http://www.w3.org/2000/svg",
    //   link: "/loclog",
    // },
    {
      name: "Input Guest Data",
      icon: "http://www.w3.org/2000/svg",
      link: "/newguest",
    },
  ];

  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }

  return (
    <div class="relative flex h-screen w-full max-w-[20rem] flex-col bg-white bg-clip-border p-4 text-gray-700 shadow-lg shadow-blue-gray-900/5">
      <div class="p-4 mb-2">
        <h5 class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          E-Guest List
        </h5>
      </div>
      <nav class="flex min-w-[240px] flex-col gap-1 font-sans text-base font-normal text-blue-gray-700">
        {navLink.map((item) => (
          <Link key={item.name} to={item.link}>
            <div className="mt-3 flex p-3 rounded-md items-center hover:bg-slate-400 ease-in duration-100">
              <svg
                xmlns={item.icon}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                class="w-5 h-5 mr-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <h3 className="mr-2">{item.name}</h3>
            </div>
          </Link>
        ))}

        <div
          onClick={signOut}
          role="button"
          class="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
        >
          <div class="grid mr-4 place-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              class="w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          Log Out
        </div>
      </nav>
    </div>
  );
};

export default VerticalNavigation;
