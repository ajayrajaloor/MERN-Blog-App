import React, { useState } from "react";
import classes from "./navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import womanImg from "../../assets/woman.jpg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <Link to="/">Welcome</Link>
        </div>

      
        <div className={classes.right}>
       {user ?
       <>
       <span style={{color:'grey'}}>{user.username}</span> 
       </> 
       : ''}
          <img
            onClick={() => setShowModal((prev) => !prev)}
            src={womanImg}
            className={classes.img}
          />
          {showModal && (
            <div className={classes.modal}>
              <Link to="/create">Create</Link>

              <span onClick={handleLogout}>Logout</span>
            </div>
          )}
        
        </div>
      </div>
    </div>
  );
}

export default Navbar;
