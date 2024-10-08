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
import { Box, CssBaseline, Fab } from "@mui/material";

import { findGuest, UpdateCheckIn, findGuestQR, formatedTime } from "./action";
import finish from "../../icon/caution.png";

import QrScanner from "qr-scanner";
import Statistic from "../Statistic/Statistic";
let stopScan = false;
let hasilScan = "";

const Home = () => {
  const [invitationList, setInvitationList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [person, setPerson] = useState(0);
  const [name, setName] = useState("");
  const [qrOpen, setQrOpen] = useState(false);
  const [btnScan, setBtnScan] = useState(true);
  const [scanData, setScanData] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [errors, setErrors] = useState({});
  const [dataDisplay, setDataDisplay] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const totalValuePage = 10;

  const scanNow = async () => {
    setBtnScan(false); // Scanning starts, so set button state to false
    stopScan = false; // Ensure scanning is active

    await new Promise((r) => setTimeout(r, 100));
    const videoElement = document.getElementById("scanView");
    const scanner = new QrScanner(
      videoElement,
      async (result) => {
        hasilScan = result.data;
        setScanData(hasilScan);
        await fetchDataQR(hasilScan); // Fetch data with scanned ID
        stopScan = true; // Stop scanning after a successful scan
        setBtnScan(true); // Set button state to true after scanning
      },
      {
        onDecodeError: (error) => {
          console.error(error);
        },
        maxScansPerSecond: 1,
        highlightScanRegion: true,
        highlightCodeOutline: true,
        returnDetailedScanResult: true,
      }
    );
    await scanner.start();
    while (!stopScan) await new Promise((r) => setTimeout(r, 100));
    scanner.stop();
    scanner.destroy();
  };

  const fetchData = async () => {
    try {
      const data = await findGuest(name);

      setInvitationList(data);
      setDataDisplay(data.slice(0, totalValuePage));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataQR = async (id) => {
    try {
      const data = await findGuestQR(id);
      setScanResult(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(invitationList);
  }, []);

  useEffect(() => {
    const start = (currentPageNumber - 1) * totalValuePage;
    const end = currentPageNumber * totalValuePage;
    setDataDisplay(invitationList.slice(start, end));
  }, [currentPageNumber]);

  const handleCheckin = async (id, person) => {
    if (!person) {
      alert("Masukan Jumlah Tamu");
      return; // Exit the function if person is not set
    }
    try {
      await UpdateCheckIn(id, person);
      await fetchData(); // Re-fetch data after updating
      setOpen(false);
      setQrOpen(false);
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

  const handleQRDialog = () => {
    setQrOpen(true); // Show the QR dialog
    scanNow(); // Automatically start scanning when QR dialog is opened
  };

  const handleQRClose = () => {
    setQrOpen(false);
    stopScan = true; // Stop scanning when dialog is closed
  };

  const goOnPrevPage = () => {
    if (currentPageNumber === 1) return;
    setCurrentPageNumber((prev) => prev - 1);
  };
  const goOnNextPage = () => {
    if (currentPageNumber === invitationList.length / totalValuePage) return;
    setCurrentPageNumber((prev) => prev + 1);
  };
  const handleSelectChange = (e) => {
    setCurrentPageNumber(e.target.value);
  };
  console.log("ini hasil", invitationList);
  return (
    <div className="flex flex-row">
      <div className="fixed h-screen w-64 bg-white shadow-lg shadow-blue-gray-900/5">
        <VerticalNavigation />
      </div>
      <div className="ml-64 flex-1 p-4 pr-12">
        <div>
          <Statistic />
          <h1 className="font-bold">Home</h1>
          <div className="mt-6 flex max-w-lg gap-x-4">
            <label htmlFor="email-address" className="sr-only">
              Find the guest
            </label>
            <input
              name="email"
              placeholder="Masukan Nama Tamu Undangan"
              autoComplete="email"
              onChange={(e) => handleFindGuest(e.target.value)}
              className="w-64 flex-auto rounded-md border-1 bg-white/5 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-black/5 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
            <button
              type="submit"
              onClick={() => cariTamu(name)}
              className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Find Guest
            </button>
            <button
              type="submit"
              onClick={() => handleQRDialog()}
              className="flex-none rounded-md bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Scan QR
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
                  Instansi / Keluarga
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight="bold">
                  Alamat
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight="bold">
                  Status
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight="bold">
                  Check In Time
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataDisplay.map((row) => (
              <TableRow
                key={row.id}
                hover
                // onClick={() => handleSelect(row.value)}
                style={{ cursor: "pointer" }}
                onClick={() => handleClickOpen(row)}
              >
                <TableCell>{row.nama}</TableCell>
                <TableCell>
                  {row.guestCategory === "VIP" ? (
                    <p className="mt-1 text-m text-gray-700 bg-yellow-300 p-2 rounded-lg font-bold flex justify-center items-center">
                      VIP
                    </p>
                  ) : (
                    <p className="mt-1 text-m text-gray-700 bg-gray-300 p-2 rounded-lg font-bold flex justify-center items-center">
                      Non-VIP
                    </p>
                  )}
                </TableCell>
                <TableCell>{row.instansiKeluarga}</TableCell>
                <TableCell>{row.alamat}</TableCell>
                <TableCell>
                  {row.isCheckIn === true ? (
                    <p className="mt-1 text-m text-white bg-red-800 p-2 rounded-lg font-bold flex justify-center items-center">
                      Checked In
                    </p>
                  ) : (
                    <p className="mt-1 text-m text-white bg-blue-500 p-2 rounded-lg font-bold flex justify-center items-center">
                      Not Yet Check In
                    </p>
                  )}
                </TableCell>
                <TableCell>
                  {row.checkInTime === null ? (
                    <p>-</p>
                  ) : (
                    formatedTime(row.checkInTime)
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="gap-4">
          <button onClick={goOnPrevPage} className="bg-slate-400 p-4">
            Prev
          </button>
          <button onClick={goOnNextPage} className="bg-yellow-400 p-4">
            Next
          </button>
        </div>

        <Dialog
          open={open}
          onClose={handleClose}
          sx={{ "& .MuiDialog-paper": { width: "60%", maxWidth: "none" } }}
        >
          <DialogTitle>
            <h1 className="font-bold">Check In Confirmation</h1>
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
                    <h1 className="text-xl font-bold text-yellow-400 mt-4">
                      Check In
                    </h1>
                    <p className="text-lg font-semibold">
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
                    <h4 className="text-gray-500 capitalize">
                      Instansi / Keluarga
                    </h4>
                    <p className=" text-black-100 font-semibold capitalize">
                      {selectedRow.instansiKeluarga}
                    </p>
                  </div>
                  <div className="flex justify-between gap-5 w-full text-right">
                    <h4 className="text-gray-500 capitalize">Alamat</h4>
                    <p className=" text-black-100 font-semibold capitalize">
                      {selectedRow.alamat}
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
                    {selectedRow.isCheckIn === true ? (
                      <p className="  text-white  bg-red-600 p-2 rounded-lg font-bold">
                        Already Check In
                      </p>
                    ) : (
                      <p className=" text-white  bg-blue-500 p-2 rounded-lg font-bold">
                        Not Yet Check In
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between gap-5 w-full text-right">
                    <h4 className="text-gray-500 capitalize">Pax</h4>
                    <p className=" text-black-100 font-semibold capitalize">
                      {selectedRow.pax}
                    </p>
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

        <Dialog
          open={qrOpen}
          onClose={handleQRClose}
          sx={{ "& .MuiDialog-paper": { width: "60%", maxWidth: "none" } }}
        >
          <DialogTitle>
            <h1 className="text-2xl font-bold">Scan QR Code Below</h1>
          </DialogTitle>
          <DialogContent>
            <div>
              <Box
                sx={{
                  flexDirection: "row",
                  paddingTop: "16px",
                }}
              >
                {!btnScan && (
                  <video
                    id="scanView"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderStyle: "dotted",
                    }}
                  ></video>
                )}
                {btnScan && scanResult && (
                  <div>
                    <div>
                      <div className=" w-full flex flex-col gap-6">
                        <div className="flex flex-col justify-center items-center">
                          <img
                            src={finish}
                            alt="finish"
                            className="object-contain h-max w-32"
                          />
                          <h1 className="text-xl font-bold text-yellow-400 mt-4">
                            Check In
                          </h1>
                          <p className="text-lg font-semibold ">
                            Apakah anda yakin untuk melakukan Check In?
                          </p>
                        </div>

                        <h2 className="font-semibold text-xl capitalize">
                          {scanResult.nama}
                        </h2>
                        <div className="flex justify-between gap-5 w-full text-right items-center">
                          <h4 className="text-gray-500 capitalize">Category</h4>

                          {scanResult.guestCategory === "VIP" ? (
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
                          <h4 className="text-gray-500 capitalize">
                            Instansi / Keluarga
                          </h4>
                          <p className=" text-black-100 font-semibold capitalize">
                            {scanResult.instansiKeluarga}
                          </p>
                        </div>
                        <div className="flex justify-between gap-5 w-full text-right">
                          <h4 className="text-gray-500 capitalize">alamat</h4>
                          <p className=" text-black-100 font-semibold capitalize">
                            {scanResult.alamat}
                          </p>
                        </div>
                        <div className="flex justify-between gap-5 w-full text-right">
                          <h4 className="text-gray-500 capitalize">Relasi</h4>
                          <p className=" text-black-100 font-semibold capitalize">
                            {scanResult.relasi}
                          </p>
                        </div>
                        <div className="flex justify-between gap-5 w-full text-right items-center">
                          <h4 className="text-gray-500 capitalize">Status</h4>
                          {scanResult.isCheckIn === true ? (
                            <p className="  text-white  bg-red-600 p-2 rounded-lg font-bold">
                              Already Check In
                            </p>
                          ) : (
                            <p className=" text-white  bg-blue-500 p-2 rounded-lg font-bold">
                              Not Yet Check In
                            </p>
                          )}
                        </div>
                        <div className="flex justify-between gap-5 w-full text-right">
                          <h4 className="text-gray-500 capitalize">Pax</h4>
                          <p className=" text-black-100 font-semibold capitalize">
                            {scanResult.pax}
                          </p>
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
                    <div className="mt-6">
                      <button
                        onClick={() => handleCheckin(scanResult, person)}
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
                  </div>
                )}
              </Box>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Home;
