import { Card, CardContent, Typography } from "@mui/material";

const colorCode = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#9e9e9e",
  "#607d8b",
];

const CourseStep = ({ step }) => {
  const randomColor = colorCode[Math.floor(Math.random() * colorCode.length)];

  const { title, step_number, id, content } = step;
  return (
    <Card sx={{ minWidth: 275,  backgroundColor: randomColor }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Step Number : {step_number}
        </Typography>
        <Typography variant="h4" component="div">
           {title}{" "}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {content}
        </Typography>
        <div style={{ display: "flex", gap: "20px" }}>
          <Typography variant="body2">Total Users: {id}</Typography>
        </div>
      </CardContent>
    </Card>
  );
};
export default CourseStep;
