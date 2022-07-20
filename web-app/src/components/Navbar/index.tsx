import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [user, loading, error] = useAuthState(auth);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <nav className="bg-[#282829] py-3 px-3">
      <div className="flex items-center">
        <img
          src={
            "https://www.ups.com/assets/resources/webcontent/images/ups-logo.svg"
          }
          alt="React Logo"
          className="w-8"
        />
        <div>
          <div className="text-white text-2xl ml-3">Device Locator</div>
        </div>
        <div className="ml-auto">
          {user && (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                style={{
                  color: "white",
                  padding: "0px",
                }}
              >
                <AccountCircle fontSize="large" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link to={"/signout"}>Sign out</Link>
                </MenuItem>
              </Menu>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
