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
import { getInvitationList, UpdateCheckIn } from "../Home/action";

const DaftarTamu = () => {
  const [invitationList, setInvitationList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [person, setPerson] = useState(0);

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

  const handleCheckin = async (id, person) => {
    try {
      await UpdateCheckIn(id, person);
      await fetchData(); // Re-fetch data after updating
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
  return (
    <div className="flex flex-row">
      <VerticalNavigation />
      <div className="p-4">
        <div>
          <h3>Daftar Tamu</h3>
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
              className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
            <button
              type="submit"
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
          <DialogTitle>Details</DialogTitle>
          <DialogContent>
            {selectedRow && (
              <div>
                <p>
                  <strong>Name:</strong> {selectedRow.Name}
                </p>
                <p>
                  <strong>Origin:</strong> {selectedRow.Origin}
                </p>
                <p>
                  <strong>VIP:</strong> {selectedRow.isVIP ? "VIP" : "Non-VIP"}
                </p>
              </div>
            )}

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

            <Button onClick={handleClose} color="primary">
              Close
            </Button>
            <Button
              onClick={() => handleCheckin(selectedRow, person)}
              color="primary"
            >
              Check In
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DaftarTamu;
