import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Close from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import { auth } from "../firebase/config";
import { FaSignInAlt } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';
// import { GoSignIn } from "react-icons/go";




const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    borderRadius: "4px",
    outline: "none",
    textAlign: "center",
  },
}));

function Signin() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [signUp, setSignUp] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [login, setLogin] = React.useState(false);
  const [username, setUsername] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setOpen(false);
  };

  const handleOpenSignUp = () => {
    setSignUp(true);
  };
  const handleCloseSignUp = () => {
    setName("");
    setEmail("");
    setPassword("");
    setSignUp(false);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((e) => {
        var user = auth.currentUser;

        user
          .updateProfile({
            displayName: name,
          })
          .then(function () {
            setUsername(name);
            setLogin(true);
                        setName("");
                    setEmail("");
        setPassword("");
          })
          .catch(function (error) {
            console.log(error.message);
          });

      })
      .catch((error) => {
        alert(error.message);
        setEmail("");
        setPassword("");
      });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((e) => {
        setUsername(e.user.displayName);
        setLogin(true);
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        alert(error.message);
        setEmail("");
        setPassword("");
      });
  };

  const handleSignOut = (e) => {
    setOpen(false)
    setSignUp(false);
    e.preventDefault()
    auth
      .signOut()
      .then(function () {
        setLogin(false)
        window.location.reload(true)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

   auth.onAuthStateChanged(function (user) {
     if (user) {
       var name = user.displayName;
       setLogin(true)
       setUsername(name);
     }
   });

  return (
    <>
      {login ? (
        <div>
          <div type="button" className="first-link">
            <FaUserAlt /> {username}
          </div>
          <div type="button" onClick={handleSignOut} className="first-link">
            <FaSignOutAlt /> Sign Out
          </div>
        </div>
      ) : (
        <div>
          <div type="button" onClick={handleOpen} className="first-link">
            <FaSignInAlt /> Sign In
          </div>
          <div type="button" onClick={handleOpenSignUp} className="first-link">
            <FaSignInAlt /> Sign Up
          </div>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className="paper">
                <Close
                  onClick={handleClose}
                  fontSize="large"
                  className="close"
                />
                <h4 className="heading">Sign In</h4>

                <form onSubmit={handleSignIn}>
                  <span className="label">Email:</span>
                  <input
                    type="email"
                    className="input"
                    placeholder="Email Adress"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                    required
                  />
                  <br />
                  <span className="label">Password:</span>
                  <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                    required
                  />
                  <br />
                  <Button type="submit" className="buttons">
                    Sign In
                  </Button>
                </form>
              </div>
            </Fade>
          </Modal>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={signUp}
            onClose={handleCloseSignUp}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={signUp}>
              <div className="paper">
                <Close
                  onClick={handleCloseSignUp}
                  fontSize="large"
                  className="close"
                />
                <h4 className="heading">Sign Up</h4>

                <form onSubmit={handleSignUp}>
                  <span className="label">Name:</span>
                  <input
                    type="text"
                    className="input"
                    placeholder="Name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    value={name}
                    required
                  />
                  <br />
                  <span className="label">Email:</span>
                  <input
                    type="email"
                    className="input"
                    placeholder="Email Adress"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                    required
                  />
                  <br />
                  <span className="label">Password:</span>
                  <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                    required
                  />
                  <br />
                  <Button type="submit" className="buttons">
                    Sign Up
                  </Button>
                </form>
              </div>
            </Fade>
          </Modal>
        </div>
      )}
    </>
  );
}

export default Signin;
