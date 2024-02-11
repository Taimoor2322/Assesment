// import './App.css';
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_ALL_USERS,
  GET_USER_BY_ID,
  UPDATE_USER,
  INSERT_USER,
} from "./queries";
import User from "./components/Users/User";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
function App() {
  // const { loading, error, data } = useQuery(GET_ALL_USERS);
  // const { loading:isloading , data:loadedData } = useQuery(GET_USER_BY_ID, {
  //   variables: { id: "65c7483d5bbd3c59cca71288" }
  // });
  // const [updateUser, { loading:dataloading, error:isError }] = useMutation(UPDATE_USER);
  // const [insertUser, { loading:insertLoading, error:insertError }] = useMutation(INSERT_USER);

  // console.log("data", data , loadedData);
  // const handleSubmit = async () => {
  //   try {
  //     const { data } = await updateUser({
  //       variables: {
  //         id: "65c7483d5bbd3c59cca71288",
  //         data: {name:'umer', email:'umer@gmail.com'}
  //       }
  //     });
  //     console.log('User updated successfully:', data.updateUser);
  //   } catch (error) {
  //     console.error('Error updating user:', error.message);
  //   }
  // };
  // const handleSubmitRecord = async () => {
  //   try {
  //     const { data } = await insertUser({
  //       variables: {
  //         userData: {name:'abdullah', email:'Abdullah@gmail.com'}
  //       }
  //     });
  //     console.log('User inserted successfully:', data.insertUser);
  //   } catch (error) {
  //     console.error('Error inserting user:', error.message);
  //   }
  // };

  return (
    // <div className="App">
    //   <header className="App-header">
    //    {/* <User /> */}
    //    <Dashboard/>
    //    {/* <button onClick={handleSubmit}>Update</button>
    //    <button onClick={handleSubmitRecord}>Insert</button> */}
    //   </header>
    // </div>
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path="/" element={<Dashboard />}/>
          <Route path="users" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
