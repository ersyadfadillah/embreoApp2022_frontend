import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";

import ProductsList from "./components/ProductsList";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import UserList from "./components/UserList";
import UserLevelList from "./components/UserLevelList";
import ProposalList from "./components/ProposalList";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/dashboard" element={<><Navbar/> <Dashboard/></>} />
        <Route path="/user" element={<><Navbar/> <UserList/></>} />
        <Route path="/user_level" element={<><Navbar/> <UserLevelList/></>} />

        <Route path="/proposal" element={<><Navbar/> <ProposalList /></>} />

        <Route path="/product" element={<><Navbar/> <ProductsList /></>} />
        <Route path="/add" element={<><Navbar/> <AddProduct /></>} />
        <Route path="/edit/:id" element={<><Navbar/> <EditProduct /></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
