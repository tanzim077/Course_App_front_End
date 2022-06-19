import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth/Auth";
import CourseDetails from "./components/CourseDetails/CourseDetails";
import Courses from "./components/Courses/Courses";
import Header from "./components/Header/Header";
import { alreadyLogin } from "./features/actions/userAction";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      if (localStorage.getItem("userId")) {
        const userId = localStorage.getItem("userId");
        dispatch(alreadyLogin(userId))
          .then(() => {
            setIsLoading(false);
          })
          .catch(() => {
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="app">
      <Header />
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 20 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/" element={<Auth />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/courses" element={<Auth />} />
              <Route path="/course/:id" element={<Auth />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Courses />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/course/:id" element={<CourseDetails />} />
            </>
          )}
        </Routes>
      )}
    </div>
  );
}

export default App;
