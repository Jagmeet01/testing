import React, { useState } from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import Backdrop from "@mui/material/Backdrop"
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExistToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../Redux/actions/UserActions";
import { useDispatch, useSelector } from "react-redux"
import "./Header.css"

const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart)

  const [open, setOpen] = useState(false);

  const naviagte = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ShoppingCartIcon style={{color:cartItems.length>=1? "tomato" : ""}} />,
     name: `Cart ${cartItems.length}`,
      func: cart },
    { icon: <ExistToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user?.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashbord,
    });
  }

  function dashbord() {
    naviagte("/admin/dashboard");
  }

  function orders() {
    naviagte("/orders");
  }

  function account() {
    naviagte("/account");
  }

  function cart() {
    naviagte("/cart");
  }

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  return (
    <>
    <Backdrop  open={open} style={{zIndex: "10"}}/>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user?.avatar?.url ? user?.avatar?.url : "/Profile.jpg"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
          key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth<=768? true : false}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
