import React, { useEffect, useState } from "react";
import VerticalNavigation from "../../navigation/VerticalNavigation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { findGuest, UpdateCheckIn } from "./action";
import finish from "../../icon/finish.png";
const Home = () => {
  const [invitationList, setInvitationList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [person, setPerson] = useState(0);
  const [name, setName] = useState("");

  const fetchData = async () => {
    try {
      const data = await findGuest(name);

      setInvitationList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckin = async (id, person) => {
    try {
      await UpdateCheckIn(id, person);
      await fetchData(); // Re-fetch data after updating
      setOpen(false);
    } catch (error) {
      console.error("Error updating check-in status:", error);
    }
  };

  const handleFindGuest = async (name) => {
    setName(name);
  };

  const cariTamu = async (name) => {
    try {
      await findGuest(name);
      await fetchData();
      setOpen(false);
    } catch (error) {
      console.error("Error updating check-in status:", error);
    }
  };

  const handleClickOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };
  const handleInputChange = (event) => {
    setPerson(event);
    console.log(event);
  };
  console.log("ini hasil", invitationList);
  return (
    <div className="flex flex-row">
      <VerticalNavigation />
      <div className="p-4">
        <div>
          <h3>Cari Disini</h3>
          <div className="mt-6 flex max-w-md gap-x-4">
            <label htmlFor="email-address" className="sr-only">
              Find the guest
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              placeholder="Masukan Nama Tamu Undangan"
              autoComplete="email"
              onChange={(e) => handleFindGuest(e.target.value)}
              className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
            <button
              type="submit"
              onClick={() => cariTamu(name)}
              className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Find Guest
            </button>
          </div>
        </div>

        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          className="mt-8"
        >
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell>
                <Typography variant="body1" fontWeight="bold">
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight="bold">
                  Guest Category
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight="bold">
                  Asal
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight="bold">
                  Jabatan/Kota
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight="bold">
                  Status
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invitationList.map((row) => (
              <TableRow
                key={row.id}
                hover
                // onClick={() => handleSelect(row.value)}
                style={{ cursor: "pointer" }}
                onClick={() => handleClickOpen(row)}
              >
                <TableCell>{row.nama}</TableCell>
                <TableCell>
                  {row.guestCategory == "VIP" ? (
                    <p className="mt-1 text-m text-gray-700 bg-yellow-300 p-4 rounded-lg font-bold flex justify-center items-center">
                      VIP
                    </p>
                  ) : (
                    <p className="mt-1 text-m text-gray-700 bg-gray-300 p-4 rounded-lg font-bold flex justify-center items-center">
                      Non-VIP
                    </p>
                  )}
                </TableCell>
                <TableCell>{row.kategori}</TableCell>
                <TableCell>{row.jabatan_kota}</TableCell>
                <TableCell>
                  {row.isCheckIn == true ? <>Checked In</> : <>Not Check In</>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog
          open={open}
          onClose={handleClose}
          sx={{ "& .MuiDialog-paper": { width: "60%", maxWidth: "none" } }}
        >
          <DialogTitle>
            <h1>Check In Confirmation</h1>
          </DialogTitle>
          <DialogContent>
            {selectedRow && (
              <div>
                <div className="flex flex-2 flex-col gap-6">
                  <div className="flex flex-col justify-center items-center">
                    <img
                      src={finish}
                      alt="finish"
                      className="object-contain h-max w-32"
                    />
                    <h1 className="text-xl font-bold text-green-600 mt-4">
                      Check In
                    </h1>
                    <p className="text-lg font-semibold text-green-600">
                      Apakah anda yakin untuk melakukan Check In?
                    </p>
                  </div>

                  <h2 className="font-semibold text-xl capitalize">
                    {selectedRow.nama}
                  </h2>
                  <div className="flex justify-between gap-5 w-full text-right items-center">
                    <h4 className="text-gray-500 capitalize">Category</h4>

                    {selectedRow.guestCategory === "VIP" ? (
                      <p className=" text-gray-700 bg-yellow-300 p-2 rounded-lg font-bold px-4 ">
                        VIP
                      </p>
                    ) : (
                      <p className=" text-gray-700 bg-gray-300 p-2 rounded-lg font-bold px-4 ">
                        Regular
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between gap-5 w-full text-right">
                    <h4 className="text-gray-500 capitalize">Sesi</h4>
                    <p className="text-black-100 font-semibold capitalize">
                      {selectedRow.sesi}
                    </p>
                  </div>
                  <div className="flex justify-between gap-5 w-full text-right">
                    <h4 className="text-gray-500 capitalize">Jabatan / Kota</h4>
                    <p className=" text-black-100 font-semibold capitalize">
                      {selectedRow.jabatan_kota}
                    </p>
                  </div>
                  <div className="flex justify-between gap-5 w-full text-right">
                    <h4 className="text-gray-500 capitalize">Kategori</h4>
                    <p className=" text-black-100 font-semibold capitalize">
                      {selectedRow.kategori}
                    </p>
                  </div>
                  <div className="flex justify-between gap-5 w-full text-right">
                    <h4 className="text-gray-500 capitalize">Relasi</h4>
                    <p className=" text-black-100 font-semibold capitalize">
                      {selectedRow.relasi}
                    </p>
                  </div>
                  <div className="flex justify-between gap-5 w-full text-right items-center">
                    <h4 className="text-gray-500 capitalize">Status</h4>
                    {selectedRow.isCheckIn == true ? (
                      <p className="  text-white  bg-red-600 p-2 rounded-lg font-bold">
                        Already Check In
                      </p>
                    ) : (
                      <p className=" text-white  bg-green-500 p-2 rounded-lg font-bold">
                        Not Yet Check In
                      </p>
                    )}
                  </div>
                </div>
                <div class="gap-5 w-full text-left mt-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="person-count"
                  >
                    Number of Persons
                  </label>
                  <input
                    id="person-count"
                    name="person-count"
                    type="number"
                    min="1"
                    class=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter number of persons"
                    onChange={(e) => handleInputChange(e.target.value)}
                  />
                </div>
              </div>
            )}
            <div className="mt-6">
              <button
                onClick={() => handleCheckin(selectedRow, person)}
                className="bg-green-700 p-3 rounded-lg text-white pl-5 pr-5 mr-4"
              >
                Check In
              </button>
              <button
                onClick={handleClose}
                className="outline-red-600 text-red-600 p-3 rounded-lg pl-5 pr-5"
              >
                Close
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Home;
