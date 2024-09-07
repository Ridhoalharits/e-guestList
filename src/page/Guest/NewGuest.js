import React from "react";
import VerticalNavigation from "../../navigation/VerticalNavigation";
import { useState } from "react";
import { newguest } from "./action";

import { useNavigate } from "react-router-dom";

const NewGuest = () => {
  const [Name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [Origin, setOrigin] = useState("");
  const [relation, setRelation] = useState("");

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "address") setAddress(value);
    if (name === "origin") setOrigin(value);
    if (name === "relation") setRelation(value);

    console.log(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!Name) newErrors.name = "Nama Undangan is required";
    if (!address) newErrors.address = "Alamat is required";
    if (!Origin) newErrors.origin = "Asal is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const newGuest = {
      nama: Name,
      alamat: address,
      instansiKeluarga: Origin,
      relasi: relation,
      tambahan: true,
    };
    console.log("New Guest:", newGuest);
    newguest(newGuest);
    setSuccessMessage("Data successfully added!");
    // setTimeout(() => {
    //   setSuccessMessage("");
    //   navigate("/"); // Redirect to home page after 3 seconds
    // }, 500);
    // Call your function to submit the form data
    // submitForm(newGuest);
  };
  return (
    <div className="flex flex-row">
      <VerticalNavigation />
      <div className="p-8 ml-8">
        {/* {successMessage && (
          <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 px-4 py-2 bg-green-500 text-white rounded">
            {successMessage}
          </div>
        )} */}
        <div className="mb-8">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Informasi Tamu
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Masukan Informasi Tamu
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Nama Undangan
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="name"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Masukan Nama Tamu Undangan"
                  onChange={handleInputChange}
                  className="block w-[400px] rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-2">{errors.name}</p>
                )}
              </div>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Alamat
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="address"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Masukan Alamat Tamu Undangan"
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.address && (
                  <p className="text-red-600 text-sm mt-2">{errors.address}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Instansi / Keluarga
              </label>
              <div className="mt-2">
                <input
                  id="origin"
                  name="origin"
                  type="text"
                  placeholder="Masukan Asal/Instansi Tamu Undangan"
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Relation
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="relation"
                  autoComplete="country-name"
                  onChange={handleInputChange}
                  className="block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>TAMU ORTU CPP</option>
                  <option>TAMU ORTU CPW</option>
                  <option>KERABAT CPP</option>
                  <option>KERABAT CPP</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* <p className="text-sm font-semibold leading-6 text-gray-900">
          Apakah Tamu adalah VIP
        </p> */}

        <div className=" space-y-6">
          {/* <div className="flex items-center gap-x-3">
            <input
              id="vip"
              name="isVIP"
              type="radio"
              value="VIP"
              checked={isVIP === true}
              onChange={handleInputChange}
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="vip"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              VIP
            </label>
          </div> */}
          {/* <div className="flex items-center gap-x-3">
            <input
              id="non-vip"
              name="isVIP"
              type="radio"
              value="Non-VIP"
              checked={isVIP === false}
              onChange={handleInputChange}
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="non-vip"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Non-VIP
            </label>
          </div> */}
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className=" flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default NewGuest;
