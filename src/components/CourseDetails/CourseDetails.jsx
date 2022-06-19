import { Box, Card, CardActions, CardContent, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CourseStep from "./CourseStep/CourseStep";

const CourseDetails = () => {
  const { id } = useParams();
  const { course } = useSelector((state) => state.course);

  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({});

  useEffect(() => {
    const data = course.find((item) => item._id === id);
    setItem(data);
    setLoading(false);
  }, []);

  const {
    course_name,
    course_description,
    steps,
    current_users,
    terminal_type,
  } = item;
  return loading ? (
    <Box sx={{ display: "flex", justifyContent: "center", py: "20%" }}>
      <CircularProgress />
    </Box>
  ) : (
    item && (
      <Card sx={{ minWidth: 275, px: 5, boxShadow: "none" }}>
        <CardContent sx={{ py: 4 }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Total Steps : {steps.length}
          </Typography>
          <Typography variant="h4" component="div">
            {course_name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {course_description}
          </Typography>
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">Terminal Type: {terminal_type}</Typography>
            <Typography variant="h6">Total Users: {current_users}</Typography>
          </div>
        </CardContent>

        <CardActions sx={{ display: "flex", gap: 4 }}>
          {item.steps.map((step) => (
            <CourseStep key={step._id} step={step} />
          ))}
        </CardActions>
      </Card>
    )
  );
};

export default CourseDetails;
