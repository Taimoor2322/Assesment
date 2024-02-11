import React, { useEffect, useState } from "react";

import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_USERS, DELETE_USER } from "../../queries";
import AddNewUser from "./AddNewUser";

const User = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const { loading, error, data, refetch } = useQuery(GET_ALL_USERS, {
    variables: { page, limit, sortField, sortOrder },
  });
  const [deleteUser, { loading: loadingg, error: errorr }] = useMutation(
    DELETE_USER,
    {
      update(cache, { data: { deleteUser } }) {
        // Manually update the cache after a user is deleted
        cache.modify({
          fields: {
            allUsers(existingUsers = [], { readField }) {
              // Remove the deleted user from the cache
              return existingUsers.filter((userRef) => {
                return readField("id", userRef) !== deleteUser.id;
              });
            },
          },
        });
      },
    }
  );
  const [Users, setAllUsers] = useState(data?.allUsers);
  const [UserId, setUserID] = useState("");

  const [isOpenUser, setIsOpenUser] = useState(false);
  const HandleOpenUser = (user) => {
    //we can also pass this data to add new component but the requirement is to implement find by id as well so just passing id as a props and then will fetch data accordingly
    setIsOpenUser(true);
    setUserID(user.id);
  };
  useEffect(() => {
    setAllUsers(data?.allUsers);
  }, [data, UserId]);
  const Close = () => {
    setIsOpenUser(false);
  };
  let AddnewPopop = "";
  if (isOpenUser) {
    AddnewPopop = (
      <AddNewUser UserId={UserId} isOpenUser={isOpenUser} Close={Close} />
    );
  }
  const handleDeleteUser = async (id) => {
    try {
      setUserID(id);
      await deleteUser({ variables: { id: id } });
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };
  const handleNext = () => {
    setPage(page + 1);
  };
  return (
    <div className="overflow-x-auto">
      {AddnewPopop}
      <button
        className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md mb-4 mt-4"
        onClick={() => HandleOpenUser("")}
      >
        Add New User
      </button>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contacts
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              City
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Zip
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Users &&
            Users.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50 cursor-pointer">
                <td
                  className="px-6 py-4 whitespace-nowrap"
                  onClick={() => HandleOpenUser(user)}
                >
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.contact}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.address}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.city}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.zip}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex items-center justify-center mt-4">
        <button
          className={`px-4 py-2 rounded-md mr-2 bg-blue-500 text-white font-semibold ${
            page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-lg font-semibold">{page}</span>
        <button
          className='px-4 py-2 rounded-md mr-2 bg-blue-500 text-white font-semibold'
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="ml-4 px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="ml-2 px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};

export default User;
