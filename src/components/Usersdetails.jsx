"use client"
import { useEffect, useState } from "react";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Replace '/api/users' with the correct endpoint
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const data = await response.json();
        setUser(data); // Assuming 'data' is a single user object
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserDetails();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserDetails;
