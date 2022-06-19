import {
  Alert,
  Box,
  Button,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCourse, updateCourse } from "../../features/actions/courseAction";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddCourse = ({ type, open, handleClose, course }) => {
  //   const [steps, setSteps] = useState([
  const dispatch = useDispatch();
  const steps = [
    {
      id: "1",
      step_number: "1",
      title: "Demo Title 1",
      content: "lorem ipsum dolor sit amet",
    },
    {
      id: "2",
      step_number: "2",
      title: "Demo Title 1",
      content: "lorem ipsum  lorem dolor lorem dolor  sit amet",
    },
    {
      id: "3",
      step_number: "3",
      title: "Demo Title 3",
      content: "lorem ipsum lorem dolor sit amet",
    },
  ];
  const [inputs, setInputs] = useState(
    course
      ? { ...course }
      : {
          steps,
          course_name: "",
          course_description: "",
          terminal_type: "",
          current_users: "",
          yaml: false,
        }
  );

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      type === "Add"
        ? dispatch(addCourse(inputs))
        : dispatch(updateCourse(inputs));
      handleClose();
      setInputs({steps});      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Paper sx={{ padding: "5%" }}>
            <form onSubmit={handleSubmit}>
              <Grid
                container
                spacing={2}
                direction={"column"}
                justify={"center"}
                alignItems={"center"}
              >
                <Typography variant="h3" padding={3} textAlign="center">
                  {type} Course
                </Typography>

                <Grid item xs={12}>
                  <TextField
                    name="course_name"
                    onChange={handleChange}
                    value={inputs.course_name}
                    label="Course Name"
                  ></TextField>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="course_description"
                    onChange={handleChange}
                    value={inputs.course_description}
                    label="Description"
                  ></TextField>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="terminal_type"
                    onChange={handleChange}
                    value={inputs.terminal_type}
                    label="Type"
                  ></TextField>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="current_users"
                    onChange={handleChange}
                    type="number"
                    value={inputs.current_users}
                    label="Current User"
                  ></TextField>
                </Grid>

                <Grid item xs={12}>
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box>
      </Modal>
    </div>
  );
};

export default AddCourse;
