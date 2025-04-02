import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import HardwareSet from "./HardwareSet";

const Project = ({ id, name, initiallyJoined, onRemove, hardwareSets, projectHardware, updateProjectHardware }) => {
  const [joined, setJoined] = useState(initiallyJoined);

  const handleJoinLeave = () => {
    const newStatus = !joined;
    setJoined(newStatus);
  
    // Send request to backend
    if (!joined){ 
      // fetch(`${process.env.REACT_APP_API_URL}:5000/joinproject/${id}`)
      // fetch(`http://127.0.0.1:5000/joinproject/${id}`)
      fetch(`http://sw-lab-hw6-app-7ae071661b0c.herokuapp.com:5000/joinproject/${id}`)
      .then(response => response.json())
      .then(data => alert(data.message))
      .catch(error => console.error('Error:', error));
    }
    else{
      fetch(`http://sw-lab-hw6-app-7ae071661b0c.herokuapp.com:5000/leaveproject/${id}`)
      // fetch(`http://127.0.0.1:5000/leaveproject/${id}`)
      .then(response => response.json())
      .then(data => alert(data.message))
      .catch(error => console.error('Error:', error));
    }
  };
  

  return (
    <Box sx={{
      border: "1px solid gray",
      marginY: 1,
      padding: 2,
      backgroundColor: joined ? "#d6f5d6" : "white",
    }}>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>{name}</Typography>

      {/* Individual Hardware Sets for Each Project */}
      <HardwareSet
        name="HWSet1"
        projectId={id}
        projectCheckedOut={projectHardware.HWSet1}
        globalHardware={hardwareSets.HWSet1}
        updateProjectHardware={updateProjectHardware}
      />
      <HardwareSet
        name="HWSet2"
        projectId={id}
        projectCheckedOut={projectHardware.HWSet2}
        globalHardware={hardwareSets.HWSet2}
        updateProjectHardware={updateProjectHardware}
      />

      {/* Join/Leave Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleJoinLeave}
        sx={{ marginTop: 1, float: "right", backgroundColor: "lightgray", color: "black" }}
      >
        {joined ? "Leave" : "Join"}
      </Button>

      {/* Remove Button */}
      <Button
        variant="contained"
        color="secondary"
        onClick={() => onRemove(id)}
        sx={{ marginTop: 1, marginLeft: 1, backgroundColor: "#ff4d4d", color: "white" }}
      >
        Remove
      </Button>
    </Box>
  );
};

export default Project;
