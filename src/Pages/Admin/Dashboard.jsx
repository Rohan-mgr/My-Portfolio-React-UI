import React, { useEffect } from "react";
import Header from "./Header";
import SideNav from "./SideNav";
import Main from "./Main";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/admin/dashboard/projects");
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <SideNav />
      <Main />
    </div>
  );
}

export default Dashboard;
