import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCourse } from "../../features/actions/courseAction";
import AddCourse from "../AddCourse/AddCourse";

const SingleCourse = ({ course, role }) => {
  const {
    course_name,
    course_description,
    steps,
    current_users,
    yaml,
    terminal_type,
  } = course;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    dispatch(deleteCourse(course._id));
  };

  const handleShowDetails = () => {
    navigate(`/course/${course._id}`);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [role]);

  return isLoading ? (
    <div></div>
  ) : (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Total Steps : {steps.length}
        </Typography>
        <Typography variant="h5" component="div">
          Name : {course_name}{" "}
        </Typography>
        {course_description.length > 100 ? (
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
           { course_description.substring(0, 100)}...
          </Typography>
        ) : (
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {course_description}
          </Typography>
        )}
        <Typography variant="body2">Total Users: {current_users}</Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Button onClick={handleShowDetails} size="small">
            View Details
          </Button>
        </Box>

        {role === "admin" && (
          <Box>
            <IconButton
              color="error"
              size="small"
              aria-label="upload picture"
              component="span"
              onClick={handleDelete}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              color="secondary"
              size="small"
              aria-label="upload picture"
              component="span"
              onClick={handleOpen}
            >
              <EditIcon />
            </IconButton>
          </Box>
        )}
      </CardActions>
      {/* </Box> */}
      <AddCourse
        type={"Update"}
        open={open}
        handleClose={handleClose}
        course={course}
      />
      ;
    </Card>
  );
};

export default SingleCourse;
