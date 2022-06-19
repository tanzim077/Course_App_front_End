import { Grid, IconButton, TextField } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const AddSteps = ({ steps, handleChange, handleAddFields }) => {

  return (
    <div>
      <Grid item xs={12}>
        <TextField
          name="id"
          onChange={handleChange}
          value={steps.id}
          label="ID"
        ></TextField>
      </Grid>

      <Grid item xs={12}>
        <TextField
          name="step_number"
          onChange={handleChange}
          value={steps.step_number}
          label="Step Number"
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="title"
          onChange={handleChange}
          value={steps.title}
          label="Title"
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="content"
          onChange={handleChange}
          value={steps.content}
          label="Content"
        ></TextField>
      </Grid>
      <IconButton onClick={handleAddFields}>
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default AddSteps;
