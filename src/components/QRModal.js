import React from "react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
const QRModal = () => {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ "& .MuiDialog-paper": { width: "60%", maxWidth: "none" } }}
      >
        <DialogTitle>
          <h1>Check In Confirmation</h1>
        </DialogTitle>
        <DialogContent>
          <div className="mt-6">
            <button
              // onClick={() => handleCheckin(selectedRow, person)}
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
  );
};

export default QRModal;
