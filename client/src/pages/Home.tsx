import { useState, useEffect, useLayoutEffect } from "react";
import { retrieveUsers } from "../api/userAPI";
import type { UserData } from "../interfaces/UserData";
import ErrorPage from "./ErrorPage";
import UserList from "../components/Users";
import auth from "../utils/auth";
import "./Home.css";
const Home = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);

    // Check login state before loading users
    useLayoutEffect(() => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    }, []);

    // Fetch users when logged in
    useEffect(() => {
        if (loginCheck) {
            fetchUsers();
        }
    }, [loginCheck]);

    const fetchUsers = async () => {
        try {
            const data = await retrieveUsers();
            console.log("Fetched Users:", data);
            setUsers(data); // ✅ Properly set the users list
        } catch (err) {
            console.error("Failed to retrieve users:", err);
            setError(true);
        }
    };

    if (error) {
        return <ErrorPage />;
    }

    return (
        <div className="home-container">
            {!loginCheck ? (
                <div className="login-notice">
                    <h1>Welcome to PantryPal!</h1>
                    <p>Login to connect with friends and manage recipes.</p>
                </div>
            ) : (
                <>
                    <h2 className="section-title">Your Friends</h2>
                    <UserList users={users} />
                </>
            )}
        </div>
    );
};

export default Home;
