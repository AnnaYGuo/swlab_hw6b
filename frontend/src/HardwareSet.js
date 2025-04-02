import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const HardwareSet = ({ name, projectId, projectCheckedOut, globalHardware, updateProjectHardware }) => {
  const [quantity, setQuantity] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    setQuantity(e.target.value);
  };

  // Check out hardware (limited by availability)
  const handleCheckOut = () => {
    const amount = parseInt(quantity, 10);
    if (amount > 0 && globalHardware.checkedOut + amount <= globalHardware.total) {
      updateProjectHardware(projectId, name, amount);
      setQuantity(""); // Reset input
      
      fetch(`http://localhost:5000/checkout/${projectId}/${amount}`)
      // fetch(`http://127.0.0.1:5000/checkout/${projectId}/${amount}`)
      .then(response => response.json())
      .then(data => alert(data.message))
      .catch(error => console.error('Error:', error));
    }

  };

  // Check in hardware (limited by what the project has checked out)
  const handleCheckIn = () => {
    const amount = parseInt(quantity, 10);
    if (amount > 0 && projectCheckedOut - amount >= 0) {
      updateProjectHardware(projectId, name, -amount);
      setQuantity(""); // Reset input
      
      fetch(`http://localhost:5000/checkin/${projectId}/${amount}`)
      // fetch(`http://127.0.0.1:5000/checkin/${projectId}/${amount}`)
      .then(response => response.json())  // Convert response to JSON
      .then(data => alert(data.message))  // Display the message
      .catch(error => console.error("Error:", error)); // Handle errors

      // const response = fetch(`http://127./0.0.1:5000/checkin/${projectId}/${amount}`)
      // fetch = alert(response.message)
      // .then(response => response.json())
      // .then(data => alert(data.message))  // Display pop-up
      // .catch(error => console.error('Error:', error));
      
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", marginY: 1 }}>
      <Typography variant="body1" sx={{ flexGrow: 1 }}>
        {name}: {projectCheckedOut}/{globalHardware.total} (Global: {globalHardware.checkedOut}/100)
      </Typography>
      
      <TextField
        size="small"
        variant="outlined"
        sx={{ width: "80px", marginX: 1 }}
        label="Enter qty"
        value={quantity}
        onChange={handleInputChange}
      />
      
      <Button variant="outlined" size="small" onClick={handleCheckIn} sx={{ marginX: 0.5 }}>
        Check In
      </Button>
      <Button variant="outlined" size="small" onClick={handleCheckOut} sx={{ marginX: 0.5 }}>
        Check Out
      </Button>
    </Box>
  );
};

export default HardwareSet;
