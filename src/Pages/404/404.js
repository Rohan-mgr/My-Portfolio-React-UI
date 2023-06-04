import React from "react";
import "./404.css";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import { BiArrowBack } from "react-icons/bi";

function Page404() {
  const navigate = useNavigate();
  const backToHome = () => {
    return navigate("/");
  };
  return (
    <div class="main-wrapper">
      <div class="error-box">
        <h1>{"{404}"}</h1>
        <h3>
          <i class="fa fa-warning"></i> Oops! Page not found!
        </h3>
        <p className="text-center ml-2">
          The page you requested was not found.
        </p>
        <Button Padding=".8rem" Func={backToHome}>
          <BiArrowBack /> Back To Home
        </Button>
      </div>
    </div>
  );
}

export default Page404;
