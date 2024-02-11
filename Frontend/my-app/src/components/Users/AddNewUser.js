import userimg from "../../styles/user.png";
import React, { useEffect, useState } from "react";

import { useQuery, useMutation, gql } from "@apollo/client";
import { GET_USER_BY_ID, UPDATE_USER, INSERT_USER } from "../../queries";
const AddNewUser = ({ UserId, isOpenUser, Close }) => {
  let userModal = {
    name: "",
    email: "",
  };
  const [userData, setUserData] = useState(userModal);
  const [Error, setError] = useState("");
  const { loading: isloading, data: loadedData } = useQuery(GET_USER_BY_ID, {
    variables: { id: UserId },
  });
  const [updateUser, { loading: dataloading, error: isError }] = useMutation(UPDATE_USER, {
    update(cache, { data: { updateUser } }) {
      // Manually update the cache after a user is updated
      cache.modify({
        fields: {
          allUsers(existingUsers = []) {
            // Update the existing user in the cache
            const updatedUserRef = cache.writeFragment({
              data: updateUser,
              fragment: gql`
                fragment UpdatedUser on User {
                  id
                  name
                  email
                  contact
                  address
                  city
                  zip
                }
              `
            });
            return existingUsers.map(userRef => {
              return userRef.id === updateUser.id ? updatedUserRef : userRef;
            });
          }
        }
      });
    }
  });
  const [insertUser, { loading: insertLoading, error: insertError }] = useMutation(INSERT_USER, {
    update(cache, { data: { insertUser } }) {
      // Manually update the cache after a new user is inserted
      cache.modify({
        fields: {
          allUsers(existingUsers = []) {
            // Add the newly inserted user to the cache
            const newUserRef = cache.writeFragment({
              data: insertUser,
              fragment: gql`
                fragment NewUser on User {
                  id
                  name
                  email
                  contact
                  address
                  city
                  zip
                }
              `
            });
            return [...existingUsers, newUserRef];
          }
        }
      });
    }
  });
  const handleSave = async () => {
    if (userData?.name === "") {
      setError("Name is Required");
    } else {
      if (UserId === "" || UserId === undefined) {
        // should create a null function to handle all null, undefined, empty string etc values
        try {
          const { data } = await insertUser({
            variables: {
              userData: userData,
            },
          });
          console.log("User inserted successfully:", data.insertUser);
        } catch (error) {
          console.error("Error inserting user:", error.message);
        }
      } else {
        try {
          const { data } = await updateUser({
            variables: {
              id: UserId,
              data: userData,
            },
          });
          console.log("User updated successfully:", data.updateUser);
        } catch (error) {
          console.error("Error updating user:", error.message);
        }
      }
    }
  };
  useEffect(() => {
    setUserData(loadedData?.user);
  }, [loadedData]);
  const handleOnchange = (e) => {
    setError("");
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <div>
      {/* <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto">
        <img
          className="w-32 h-32 rounded-full mx-auto mt-6"
          src={userimg}
          alt="User Avatar"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl text-center mb-2">John Doe</div>
          <p className="text-gray-700 text-center text-base">johndoe@example.com</p>
        </div>
      </div> */}
      {/* <!-- Modal Background --> */}
      {isOpenUser && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          {/* <!-- Modal Content --> */}
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* <!-- Overlay --> */}
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            {/* <!-- Modal Panel --> */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            {/* <!-- Modal Dialog --> */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:max-w-lg">
              {/* <!-- Modal Header --> */}
              <div className="bg-gray-50 px-4 py-5 sm:px-6">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  {userData?.name}
                </h3>
              </div>
              {/* <!-- Modal Body --> */}
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
                    placeholder="Enter your name"
                    value={userData?.name}
                    onChange={handleOnchange}
                  />
                  <span className="text-red-500">{Error}</span>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
                    placeholder="Enter your email"
                    value={userData?.email}
                    onChange={handleOnchange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Contact:
                  </label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
                    placeholder="Enter your contact number"
                    value={userData?.contact}
                    onChange={handleOnchange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Address:
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
                    placeholder="Enter your address"
                    value={userData?.address}
                    onChange={handleOnchange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    City:
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
                    placeholder="Enter your city"
                    value={userData?.city}
                    onChange={handleOnchange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    zip:
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
                    placeholder="Enter your zip"
                    value={userData?.zip}
                    onChange={handleOnchange}
                  />
                </div>
              </div>
              {/* <!-- Modal Footer --> */}
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleSave()}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => Close()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewUser;
