import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@material-ui/core";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import QrScanner from "react-qr-scanner";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cameraContainer: {
    width: "100%",
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
  camera: {
    maxWidth: "100%",
    maxHeight: "400px",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [scanResult, setScanResult] = useState(null);
  const [openScanner, setOpenScanner] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleScan = (data) => {
    if (data) {
      setScanResult(data);
      setOpenDialog(true);
      setOpenScanner(false); // Hide scanner after scanning
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleToggleScanner = () => {
    setOpenScanner(!openScanner);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <IconButton onClick={handleToggleScanner} color="primary">
        <CameraAltIcon />
      </IconButton>
      {openScanner && (
        <div className={classes.cameraContainer}>
          <QrScanner
            delay={300}
            style={{ width: "100%", height: "400px" }} // Ensure camera takes full container width and a fixed height
            onError={handleError}
            onScan={handleScan}
          />
        </div>
      )}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Scan Result</DialogTitle>
        <DialogContent>
          <DialogContentText>Scanned QR code: {scanResult}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              console.log("Handle stock logic");
              handleCloseDialog();
            }}
            color="primary"
          >
            Stock
          </Button>
          <Button
            onClick={() => {
              console.log("Handle sell logic");
              handleCloseDialog();
            }}
            color="primary"
          >
            Sell
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;
