import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserService from "../../Services/UserService";
import ProfileHeader from "./ProfileHeader";
import FavoriteFilms from "./FavoriteFilms";

const Profile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await UserService.getUserById(userId);
                setUser(userData);
            } catch (err) {
                setError("Failed to fetch user data.");
            }
        };

        fetchUser();
    }, [userId]);

    if (error) return <p>{error}</p>;
    if (!user) return <p>Loading...</p>;

    return (
        <div>
            <ProfileHeader user={user} />
            <FavoriteFilms />
        </div>
    )
};

export default Profile;