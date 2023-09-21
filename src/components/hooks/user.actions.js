import {useNavigate} from "react-router-dom";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword
} from "firebase/auth";


function useUserActions() {
  const navigate = useNavigate();
  let auth = getAuth();
  let user = null;
  return {
    login,
    register,
    logout
  };

// Login the user
  function login(data) {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        setUserData(res.user)
        navigate("/")
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

// Register the user
  function register(data) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        setUserData(res.user);
        navigate('/login/')
      })
      .catch((err) => {
        alert(err.message)
      })
  }

// Logout the user
  function logout() {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("auth");
        navigate("/login")
      })
      .catch(err => {
        console.log(err)
      })
  }
}

// Get the user
function getUser() {
  const auth = JSON.parse(localStorage.getItem("auth")) || null;
  if (auth) {
    return auth.user;
  } else {
    return null;
  }
}

// Get the access token
function getAccessToken() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return auth.access;
}

// Get the refresh token
function getRefreshToken() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return auth.refresh;
}

// Set the access, token and user property
function setUserData(data) {
  localStorage.setItem(
    "auth",
    JSON.stringify({
      access: data.accessToken,
      refresh: data.refreshToken,
      user: data,
    })
  );
}


export {
  useUserActions,
  getUser,
  getAccessToken,
  getRefreshToken,
  setUserData,
};
