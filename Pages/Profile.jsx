import React, { useState, useEffect } from "react";
import AppBarComponent from "../LoginHome/AppBarComponent";
import "../assets/css/Profile.css";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Profile = () => {
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [cookies, setCookie] = useCookies(["user_token"]);
  const [profileData, setProfileData] = useState({
    fname: "",
    mname: "",
    lname: "",
    studentnum: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    user_id: "",
    address: "",
  });

  useEffect(() => {
    if (cookies.user_token) {
      const decodedToken = jwtDecode(cookies.user_token);
      setProfileData({
        fname: decodedToken.fname || "",
        mname: decodedToken.mname || "",
        lname: decodedToken.lname || "",
        dob: decodedToken.dob || "",
        email: decodedToken.email || "",
        address: decodedToken.address || "",
        gender: decodedToken.gender || "",
        profile_picture: decodedToken.profile_picture || "",
        studentnum: decodedToken.studentnum || "",
        user_id: decodedToken.user_id || "",
        expires_at: decodedToken.expires_at || "",
      });
    }
  }, [cookies.user_token]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpenConfirmDialog(true);
  };

  const handleConfirmClose = () => {
    setOpenConfirmDialog(false);
  };

  const handleSave = (event) => {
    setOpenConfirmDialog(false);
    event.preventDefault();
    const data = {
      fname: profileData.fname,
      mname: profileData.mname,
      lname: profileData.lname,
      user_id: profileData.user_id,
      dob: profileData.dob,
      studentnum: profileData.studentnum,
      gender: profileData.gender,
      email: profileData.email,
      address: profileData.address,
      profile_picture:profileData.profile_picture,
      expires_at: profileData.expires_at,
    }
    axios.post("http://localhost/nud-hub/API/updateProfile.php", data)
    .then( function (response) {

      if(response.status === 201){
        setCookie("user_token", response.data.data, {
          path: "/",
          expires: response.data.expires_at,
          secure: true,
          sameSite: "strict",
        });
        setOpenSaveDialog(true);
      }
    })
  };

  const handleSaveDialogClose = () => {
    setOpenSaveDialog(false);
  };

  const handleChange = (event) => {  
    const { id, value } = event.target;
    setProfileData((prevState) =>({
      ...prevState,
      [id]: value
    }))
  };

  return (
    <>
      <AppBarComponent />

      <div className="profile-container">
        <div className="row">
          <div className="col-auto">
            <div className="image-placeholder">
              <img src={profileData.profile_picture} alt="Profile" className="profile-image" />
            </div>
          </div>

          <div className="col profile">
            <div className="title-container">
              <h1 className="title">My Profile</h1>
              <p className="subtitle">View your profile here</p>
            </div>
            <form className="profile-form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="form-group col-4">
                  <label htmlFor="fname">FIRST NAME</label>
                  <input type="text" id="fname" className="form-control" value={profileData.fname} disabled/>
                </div>
                <div className="form-group col-4">
                  <label htmlFor="mname">MIDDLE NAME</label>
                  <input type="text" id="mname" className="form-control" value={profileData.mname} onChange={handleChange}/>
                </div>
                <div className="form-group col-4">
                  <label htmlFor="lname">LAST NAME</label>
                  <input type="text" id="lname" className="form-control" value={profileData.lname} disabled/>
                </div>
                <div className="form-group col-6">
                  <label htmlFor="studentnum">ID NUMBER</label>
                  <input type="num" id="studentnum" className="form-control" value={profileData.studentnum} onChange={handleChange}/>
                </div>
                <div className="form-group col-6">
                  <label htmlFor="dob">DATE OF BIRTH</label>
                  <input type="date" id="dob" className="form-control" value={profileData.dob} onChange={handleChange} />
                </div>
                <div className="form-group col-10">
                  <label htmlFor="address">ADDRESS</label>
                  <input type="text" id="address" className="form-control" value={profileData.address} onChange={handleChange} />
                </div>
                <div className="form-group col-2">
                  <label htmlFor="gender">SEX</label>
                  <select id="gender" className="form-control" value={profileData.gender} onChange={handleChange}>
                    <option value="" disabled>Select Sex</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="form-group col-12">
                  <label htmlFor="email">EMAIL</label>
                  <input type="email" id="email" className="form-control" value={profileData.email} disabled />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-save"></i> Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>

      <Dialog
        open={openConfirmDialog}
        onClose={handleConfirmClose}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title" sx={{ fontFamily: 'ClanOT-Black' }}>{"Confirm Save"} </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description" sx={{ fontFamily: 'ClanOT-Bold' }}>
            Are you sure you want to save the changes?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} color="primary" sx={{ fontFamily: 'ClanOT-Bold' }}>
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" sx={{ fontFamily: 'ClanOT-Bold' }} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openSaveDialog}
        onClose={handleSaveDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontFamily: 'ClanOT-Black' }}>{"Profile Saved"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ fontFamily: 'ClanOT-Bold' }}>
            Your profile changes have been saved successfully.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveDialogClose} color="primary" sx={{ fontFamily: 'ClanOT-Bold' }}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Profile;