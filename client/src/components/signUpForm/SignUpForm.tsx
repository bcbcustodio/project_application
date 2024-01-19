import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { styled } from "@material-ui/core";
import { useState } from "react";
import { SERVER_BASEURL } from "../config/config";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiOutlinedInput-input": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

function SignUpForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [favoriteColor, setFavoriteColor] = useState("");
  const [age, setAge] = useState(0);

  const createUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const createUserAPI = `${SERVER_BASEURL}/create`;
    await Axios.post(createUserAPI, {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email,
      favoriteColor: favoriteColor,
      age: age,
    })
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response.data);
        alert("something went wrong. Please try again");
      });
  };

  return (
    <>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          borderRadius: 10,
          background: "transparent",
          border: "2px solid rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(30px)",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            padding: "1.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={createUser} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <CssTextField
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CssTextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  name="username"
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  required
                  fullWidth
                  name="age"
                  label="Age"
                  id="age"
                  onChange={(e) => setAge(parseInt(e.target.value))}
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  required
                  fullWidth
                  id="favoriteColor"
                  label="Favorite Color"
                  onChange={(e) => setFavoriteColor(e.target.value)}
                  name="favoriteColor"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  sx={{
                    color: "white",
                    textDecoration: "none",
                    fontWeight: 600,
                    fontFamily: "Outline, sans-serif",
                  }}
                  href="/login"
                  variant="body2"
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export { SignUpForm };
