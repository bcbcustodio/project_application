import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { styled } from "@material-ui/core";
import { useState, useEffect } from "react";
import { SERVER_BASEURL } from "../config/config";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { ObjectId } from "mongodb";
import Person2Icon from "@mui/icons-material/Person2";

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

interface UserDetails {
  _id?: ObjectId;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  age?: number;
  currentPassword?: string;
  newPassword?: string;
  favoriteColor?: string;
}

function ProfileForm({ userId }: { userId: string }) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [favoriteColor, setFavoriteColor] = useState("");
  const [age, setAge] = useState(0);
  const [user, setUser] = useState<UserDetails>({});
  const [done, setDone] = useState(false);

  const updateUser = async () => {
    const updateUserAPI = `${SERVER_BASEURL}/update/${userId}`;
    let updateArgs: UserDetails = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      favoriteColor: favoriteColor,
      age: age,
    };

    if (newPassword) {
      updateArgs = {
        ...updateArgs,
        currentPassword: currentPassword,
        newPassword: newPassword,
      };
    }
    await Axios.put(updateUserAPI, updateArgs)
      .then(() => {
        navigate("/profile");
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response.data);
        alert("something went wrong. Please try again");
      });
  };
  const getCurrentUser = async () => {
    const getCurrentUserAPI = `${SERVER_BASEURL}/read/${userId}`;
    Axios.get(getCurrentUserAPI)
      .then((response) => {
        setUser(response.data);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response.data);
      });
  };

  useEffect(() => {
    getCurrentUser().then(() => {
      setDone(true);
    });
  }, []);

  return (
    <>
      {done ? (
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            borderRadius: 10,
            background: "transparent",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(30px)",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            marginTop: "2rem",
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
              <Person2Icon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {user.firstName + " " + user.lastName}
            </Typography>
            <Typography component="h1" variant="h5">
              {user.username}
            </Typography>
            <Typography component="h1" variant="h5">
              {user.age}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={updateUser}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CssTextField
                    name="firstName"
                    required
                    fullWidth
                    id="outlined-basic"
                    label="First Name"
                    autoFocus
                    defaultValue={user.firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CssTextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    defaultValue={user.lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CssTextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    defaultValue={user.username}
                    onChange={(e) => setUsername(e.target.value)}
                    name="username"
                  />
                </Grid>
                <Grid item xs={12}>
                  <CssTextField
                    required
                    fullWidth
                    name="currentPassword"
                    label="Current Password"
                    type="password"
                    id="currentPassword"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CssTextField
                    required
                    fullWidth
                    name="newPassword"
                    label="New Password"
                    type="password"
                    id="newPassword"
                    onChange={(e) => setNewPassword(e.target.value)}
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
                Update Profile
              </Button>
            </Box>
          </Box>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
}

export { ProfileForm };
