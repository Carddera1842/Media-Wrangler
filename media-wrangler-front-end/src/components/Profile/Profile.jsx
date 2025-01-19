import React from "react";
import { useAuth } from "../../Services/AuthContext";
import ProfileHeader from "./ProfileHeader";
import MovieListTable from "./MovieListTable";
import CalendarPlaceholder from "./Calendar";
import './Profile.css';

const Profile = () => {
  const { user, error } = useAuth();

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-page">
      <div className="profile-main">
        <div className="profile-left">
          <div className="profile-header">
            <ProfileHeader user={user} />
          </div>
          <div className="profile-calendar">
            <CalendarPlaceholder user={user} />
          </div>
        </div>
        <div className="profile-sidebar">
          <MovieListTable />
        </div>
      </div>
    </div>
  );
};

export default Profile;
