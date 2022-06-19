import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogOut } from "../../features/actions/userAction";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const { role } = user;

  const handleLogOut = () => {
    dispatch(userLogOut())
      .then(() => {
        navigate("/auth");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-Between" }}>
          <Typography
            onClick={() => navigate("/courses")}
            variant="h6"
            component="div"
            // sx={{ flexGrow: 0 ,cursor :"pointer"}}
            sx={{ cursor: "pointer" }}
          >
            Course App
          </Typography>
          <Box>
            {!isLoggedIn && (
              <Button onClick={() => navigate("/auth")} color="inherit">
                Login
              </Button>
            )}
            {isLoggedIn && (
              <Button onClick={handleLogOut} color="inherit">
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
