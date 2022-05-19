import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";

// import ProductsList from "./components/ProductsList";
// import AddProduct from "./components/AddProduct";
// import EditProduct from "./components/EditProduct";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import UserList from "./components/UserList";
import UserLevelList from "./components/UserLevelList";
import ProposalList from "./components/ProposalList";
import AddProposal from "./components/AddProposal";
import ApprovalList from "./components/ApprovalList";
import EditApproval from "./components/EditApproval";
import MonitoringList from "./components/MonitoringList";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/dashboard" element={<><Navbar/> <Dashboard/></>} />
        <Route path="/user" element={<><Navbar/> <UserList/></>} />
        <Route path="/user_level" element={<><Navbar/> <UserLevelList/></>} />

        <Route path="/proposal" element={<><Navbar/> <ProposalList /></>} />
        <Route path="/proposal/add" element={<><Navbar/> <AddProposal /></>} />

        <Route path="/approval" element={<><Navbar/> <ApprovalList /></>} />
        <Route path="/approval/edit/:id" element={<><Navbar/> <EditApproval /></>} />

        <Route path="/monitoring" element={<><Navbar/> <MonitoringList /></>} />

        {/* <Route path="/product" element={<><Navbar/> <ProductsList /></>} />
        <Route path="/product/add" element={<><Navbar/> <AddProduct /></>} />
        <Route path="/product/edit/:id" element={<><Navbar/> <EditProduct /></>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
