import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Project from "./Project";

const Projects = () => {
  // Global hardware availability
  const [hardwareSets, setHardwareSets] = useState({
    HWSet1: { total: 100, checkedOut: 0 },
    HWSet2: { total: 100, checkedOut: 0 },
  });

  const [projects, setProjects] = useState([
    { id: 1, name: "Project Name 1", joined: true, hardware: { HWSet1: 0, HWSet2: 0 } },
    { id: 2, name: "Project Name 2", joined: false, hardware: { HWSet1: 0, HWSet2: 0 } },
    { id: 3, name: "Project Name 3", joined: false, hardware: { HWSet1: 0, HWSet2: 0 } },
  ]);

  // Add new project dynamically
  const addProject = () => {
    const newProject = {
      id: Date.now(),
      name: `Project Name ${projects.length + 1}`,
      joined: false,
      hardware: { HWSet1: 0, HWSet2: 0 }, // Unique counters per project
    };
    setProjects([...projects, newProject]);
  };

  // Remove a project
  const removeProject = (id) => {
    setProjects((prevProjects) => prevProjects.filter((proj) => proj.id !== id));
  };

  // Function to handle hardware check-in/check-out per project
  const updateProjectHardware = (projectId, setName, amount) => {
    setProjects((prevProjects) =>
      prevProjects.map((proj) => {
        if (proj.id === projectId) {
          const newCheckedOut = proj.hardware[setName] + amount;
          return {
            ...proj,
            hardware: { ...proj.hardware, [setName]: newCheckedOut },
          };
        }
        return proj;
      })
    );

    // Update global hardware availability
    setHardwareSets((prev) => ({
      ...prev,
      [setName]: { ...prev[setName], checkedOut: prev[setName].checkedOut + amount },
    }));
  };

  return (
    <Box sx={{ border: "1px solid black", padding: 2, width: "600px" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>Projects</Typography>

      {/* Render Projects */}
      {projects.map((proj) => (
        <Project
          key={proj.id}
          id={proj.id}
          name={proj.name}
          initiallyJoined={proj.joined}
          onRemove={removeProject}
          hardwareSets={hardwareSets}
          projectHardware={proj.hardware}
          updateProjectHardware={updateProjectHardware}
        />
      ))}

      {/* Add Project Button */}
      <Button variant="contained" onClick={addProject} sx={{ marginTop: 2 }}>
        Add Project
      </Button>
    </Box>
  );
};

export default Projects;
