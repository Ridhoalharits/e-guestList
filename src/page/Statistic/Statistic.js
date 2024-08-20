import React from "react";
import VerticalNavigation from "../../navigation/VerticalNavigation";
import { useState, useEffect } from "react";
import {
  getAdditionalList,
  GetAlreadyIn,
  GetDidnotIn,
  GetTotalGuest,
  getTotalGuest,
  getTotalPax,
} from "./action";

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
import { getInvitationList } from "../Home/action";

const Statistic = () => {
  const data = GetTotalGuest();
  const udahmasuk = GetAlreadyIn(data);
  const belummasuk = GetDidnotIn(data);
  const jumlah = getTotalPax(data);
  const [additionalList, setAdditionalList] = useState([]);

  const fetchData = async () => {
    try {
      const data = await getAdditionalList();

      setAdditionalList(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log(fetchData);

  return (
    <div className="flex flex-row">
      <VerticalNavigation />

      <div className="p-4">
        <h1 className="font-xl font-bold">Statistik</h1>

        <div className="mb-8 pt-8 flex">
          <div className="bg-white p-6  rounded-lg shadow-md border border-slate-300 flex flex-col items-center justify-center w-64 mr-8">
            <p className="text-slate-600 font-medium">Total Tamu</p>
            <p className="text-5xl font-extrabold text-slate-900 mt-2">
              {data.length}
            </p>
          </div>
          <div className="bg-white p-6  rounded-lg shadow-md border border-slate-300 flex flex-col items-center justify-center w-64 mr-8">
            <p className="text-slate-600 font-medium">Total Sudah Masuk</p>
            <p className="text-5xl font-extrabold text-slate-900 mt-2">
              {udahmasuk}
            </p>
          </div>
          <div className="bg-white p-6  rounded-lg shadow-md border border-slate-300 flex flex-col items-center justify-center w-64">
            <p className="text-slate-600 font-medium">Total Belum Masuk</p>
            <p className="text-5xl font-extrabold text-slate-900 mt-2">
              {belummasuk}
            </p>
          </div>
        </div>
        <div className="bg-white p-6  rounded-lg shadow-md border border-slate-300 flex flex-col items-center justify-center w-64">
          <p className="text-slate-600 font-medium">Total Tamu Masuk</p>
          <p className="text-5xl font-extrabold text-slate-900 mt-2">
            {jumlah}
          </p>
        </div>

        <div className="flex-1 p-4 pr-12">
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
              </TableRow>
            </TableHead>
            <TableBody>
              {additionalList.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  // onClick={() => handleSelect(row.value)}
                  style={{ cursor: "pointer" }}
                  // onClick={() => handleClickOpen(row)}
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
                        Not Check In
                      </p>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
