import React, { useEffect, useState } from "react";
import "./ManageUsers.css";
import UserForm from "../../components/UserForm/UserForm";
import UserList from "../../components/UserList/UserList";
import { fetchUser } from "../../service/UserService";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [_, setLoading] = useState(false);

  useEffect(() => {
    async function getAllUsers() {
      try {
        setLoading(true);
        const response = await fetchUser();
        setUsers(response.data);
      } catch (error) {
        console.log("🚀 ~ fetchUsers ~ error:", error);
        toast.error("Unable to fetch users");
      } finally {
        setLoading(false);
      }
    }
    getAllUsers();
  }, []);

  return (
    <div className="users-container text-light">
      <div className="div left-column overflow-y-scroll">
        <UserForm setUsers={setUsers} />
      </div>
      <div className="right-column">
        <UserList users={users} setUsers={setUsers} />
      </div>
    </div>
  );
};

export default ManageUsers;
