import React, { useState } from "react";
import { deleteUser } from "../../service/UserService";
import toast from "react-hot-toast";

const UserList = ({ users, setUsers }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filterUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteUserById = async (userId) => {
    try {
      const response = await deleteUser(userId);
      if (response.status === 204) {
        setUsers((prevUser) =>
          prevUser.filter((user) => user.userId !== userId)
        );
        toast.success("User delete successfully");
      } else {
        throw new Error("Error while deleting user");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div
      className="div category-list-container"
      style={{
        height: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <div className="row pe-2">
        <div className="input-group mb-3">
          <input
            type="text"
            name="keyword"
            id="keyword"
            placeholder="Search by keyword"
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>

      <div className="div row g-3 pe-2">
        {filterUsers.length > 0 &&
          filterUsers.map((user, index) => (
            <div key={index} className="col-12">
              <div className="div card p-3 bg-dark">
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <h5 className="mb-1 text-white">{user.name}</h5>
                    <p className="mb-0 text-white">{user.email}</p>
                  </div>
                  {user.role !== "ROLE_ADMIN" && (
                    <div>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteUserById(user.userId)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserList;
