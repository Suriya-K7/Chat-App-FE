import React, { useContext } from "react";
import "./profile.css";
import DataContext from "../../context/DataContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { loggedUser } = useContext(DataContext);

  return (
    <section className='section profile__page'>
      <div className='profile__data'>
        <div className='box rounded container'>
          <div className='profile__img'>
            <img
              src={loggedUser.photo}
              alt=''
              className='img'
              width={400}
              height={400}
            />
          </div>
          <div className='profile__details'>
            <span>UserName : {loggedUser.username}</span>
            <span>Email : {loggedUser.email}</span>
            <span>Contact No : {loggedUser.phone}</span>
          </div>
          <div className='d-flex justify-content-center flex-column align-items-center gap-2 mt-4 '>
            <Link
              to='/editProfile'
              className='text-white button rounded noline'
            >
              Edit Profile
            </Link>
            <Link
              to='/chat'
              className='text-white button rounded noline'
            >
              Go back to Chat
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
