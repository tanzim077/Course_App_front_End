import { Button, CircularProgress, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../features/actions/courseAction";
import AddCourse from "../AddCourse/AddCourse";
import SingleCourse from "../SingleCourse/SingleCourse";

const Courses = () => {
  const { course, user } = useSelector((state) => state);

  const { role } = "role" in user.user ? user.user : user.user.user;

  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  let data = course.course;

  useEffect(() => {
    dispatch(getAllCourses())
      .then(() => {
        data = course.course;
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return isLoading ? (
    <Box sx={{ display: "flex",  justifyContent : "center", py :"20%" }}>
      <CircularProgress />
    </Box>
  ) : (
    <Box sx={{ display: "flex" }}>
      <Box bgcolor="#e8eaf6" direction="row" spacing={1} sx={{ px: 3 }}>
        {/* <Box sx={{ display: "flex",  gap: "20px", padding: "20px" }}> */}
        <h2>All Courses</h2>
        {role === "admin" && (
          <Button onClick={handleOpen} variant="contained" color="primary">
            Add Course
          </Button>
        )}
        {/* </Box> */}
      </Box>
      <AddCourse type={"Add"} open={open} handleClose={handleClose} />

      <Box
        sx={{
          padding: "20px",
          display: "grid",
          gap: 2,
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        {data.length > 0 &&
          data.map((item) => {
            return (
              <div key={item._id}>
                <SingleCourse
                  style={{ flexGrow: 1 }}
                  course={item}
                  role={role}
                />
              </div>
            );
          })}
      </Box>
    </Box>
  );
};

export default Courses;
