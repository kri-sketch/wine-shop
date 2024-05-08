import React, { useState, useRef, useCallback, useMemo } from "react";
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
import Webcam from "react-webcam";
import { BrowserMultiFormatReader } from "@zxing/library";

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
  webcam: {
    width: "100%", // Ensure it's visible and properly sized on mobile
    height: "auto", // Adjust based on your needs
  },
}));

const videoConstraints = {
  width: { ideal: 4096 },
  height: { ideal: 2160 },
  facingMode: "environment", // Use the rear-facing camera on mobile
};

const Employee = () => {
  const classes = useStyles();
  // Declare webcamRef with a more specific type to recognize getScreenshot
  const webcamRef = useRef<Webcam>(null);
  const [scanResult, setScanResult] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  // Use useMemo to initialize barcodeReader once and only reinitialize if needed
  const barcodeReader = useMemo(() => new BrowserMultiFormatReader(), []);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setIsCameraOpen(false);
  };

  const handleSell = () => {
    console.log("Handle sell logic");
    handleCloseDialog();
  };

  const handleStock = () => {
    console.log("Handle stock logic");
    handleCloseDialog();
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      barcodeReader
        .decodeFromImageUrl(imageSrc)
        .then((result) => {
          setScanResult(result.getText()); // Ensuring proper method usage
          setOpenDialog(true);
          setIsCameraOpen(false); // Close camera after scan
        })
        .catch((err) => {
          console.log("Error scanning barcode: ", err);
        });
    }
  }, [barcodeReader]);

  const handleScan = () => {
    setIsCameraOpen(true); // Open camera view
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <IconButton onClick={handleScan} color="primary">
        <CameraAltIcon />
      </IconButton>
      {isCameraOpen && (
        <div className={classes.cameraContainer}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className={classes.webcam}
            onUserMediaError={(error) =>
              console.log("Webcam access error: ", error)
            }
          />
          <Button onClick={capture} color="primary">
            Scan Barcode
          </Button>
        </div>
      )}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Scan Result</DialogTitle>
        <DialogContent>
          <DialogContentText>Scanned barcode: {scanResult}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStock} color="primary">
            Stock
          </Button>
          <Button onClick={handleSell} color="primary">
            Sell
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Employee;
