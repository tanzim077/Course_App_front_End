import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  userCreate,
  userGoogleLogIn,
  userLogIn,
} from "../../features/actions/userAction";

const Auth = () => {
  const { user } = useSelector((state) => state);
  const { isLoggedIn } = user;
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/courses");
    }
  }, [isLoggedIn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSignup) {
      dispatch(userLogIn(inputs));
      navigate("/courses");
    } else {
      dispatch(userCreate(inputs));
      navigate("/courses");
    }
  };

  const handleCallbackResponse = (response) => {
    // console.log("Encoded JWT ID Token" + response.credential);
    var userObject = jwt_decode(response.credential);
    const { name, email, sub } = userObject;
    dispatch(userGoogleLogIn({ name, email, sub, role : "user" }));
  };

  useEffect(() => {
    // eslint-disable-next-line no-undef
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
      callback: handleCallbackResponse,
    });
    // eslint-disable-next-line no-undef
    google.accounts.id.renderButton(document.getElementById("googleSignIn"), {
      theme: "outline ",
      size: "medium",
    });
  }, []);

  return (
    <div style={{ padding: "10px" }}>
      <Paper sx={{ padding: "2%", boxShadow : "none" }}>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
            direction={"column"}
            justify={"center"}
            alignItems={"center"}
          >
            <Typography variant="h2" padding={2} textAlign="center">
              {isSignup ? "Signup" : "Login"}
            </Typography>
            {isSignup && (
              <Grid item xs={12}>
                <TextField
                  name="name"
                  onChange={handleChange}
                  value={inputs.name}
                  label="Name"
                ></TextField>
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                name="email"
                onChange={handleChange}
                value={inputs.email}
                label="Email"
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                onChange={handleChange}
                value={inputs.password}
                label="Password"
                type={"password"}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Grid>

            <Grid item xs={12}>
              <div id="googleSignIn"></div>
            </Grid>

            <Grid item xs={12}>
              <Button
                onClick={() => setIsSignup(!isSignup)}
                sx={{ borderRadius: 3, marginTop: 3 }}
              >
                Change To {isSignup ? "Login" : "Signup"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default Auth;
