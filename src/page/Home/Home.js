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
  Button,
} from "@mui/material";
import { findGuest, getInvitationList, UpdateCheckIn } from "./action";
import { Input } from "@material-tailwind/react";

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
              placeholder="Enter your email"
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

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>VIP</TableCell>
              <TableCell>Check In Status</TableCell>
              <TableCell>Person</TableCell>
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
                <TableCell>{row.Name}</TableCell>
                <TableCell>{row.Origin}</TableCell>
                <TableCell>
                  {row.isVIP == true ? <>VIP</> : <>Non-VIP</>}
                </TableCell>
                <TableCell>
                  {row.isCheckIn == true ? <>Checked In</> : <>Not Check In</>}
                </TableCell>
                <TableCell>{row.GuestQty}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            <h1>Check In Confirmation</h1>
          </DialogTitle>
          <DialogContent>
            {selectedRow && (
              <div>
                <div className="mt-2 border-t border-gray-100">
                  <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Nama Tamu
                      </dt>
                      <dd className="mt-1 text-m font-extrabold leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {selectedRow.Name}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Origin
                      </dt>
                      <dd className="mt-1 text-m font-extrabold leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {selectedRow.Origin}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Priority
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {selectedRow.isVIP === true ? (
                          <p className="mt-1 text-m  text-gray-700  bg-yellow-300 p-4 rounded-lg font-bold">
                            VIP
                          </p>
                        ) : (
                          <p className="mt-1 text-sm text-gray-700  bg-gray-300 p-4 rounded-lg font-bold">
                            Non-VIP
                          </p>
                        )}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Check In Status
                      </dt>
                      <dd className="mt-1 text-m font-extrabold leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {selectedRow.isCheckIn == true ? (
                          <p className="mt-1 text-m  text-white  bg-red-600 p-4 rounded-lg font-bold">
                            Already Check In
                          </p>
                        ) : (
                          <p className="mt-1 text-m  text-white  bg-green-500 p-4 rounded-lg font-bold">
                            Not Yet Check In
                          </p>
                        )}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div class="mb-4">
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
