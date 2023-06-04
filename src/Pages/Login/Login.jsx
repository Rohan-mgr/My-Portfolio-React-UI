import React, { useState, useEffect } from "react";
import "./Login.css";
import Button from "../../Components/Button/Button";
import Form from "react-bootstrap/Form";
import Logo from "../../Components/Logo/Logo";
import { useFormik } from "formik";
import { adminLoginValidation } from "../../validation-schema/validation";
import { Link, useNavigate } from "react-router-dom";
import { handleAdminLogin } from "../../services/admin";
import Alert from "../../Components/Alert/Alert";
import { _setSecureLs, _getSecureLs } from "../../helper/storage";
import MySpinner from "../../Components/Spinner/Spinner";

function ResetPassword() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const { isLoggedIn } = _getSecureLs("auth");
    isLoggedIn && navigate("/admin/dashboard/projects");
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: adminLoginValidation,
    validateOnBlur: false,

    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await handleAdminLogin(values);
        setStatus((prevState) => {
          return {
            ...prevState,
            message: response?.message,
            status: response?.status,
          };
        });
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        _setSecureLs("auth", {
          isLoggedIn: true,
          token: response.token,
          user: response.adminId,
          expiryDate: expiryDate.toISOString(),
        });

        navigate("/admin/dashboard/projects");
      } catch (e) {
        setStatus({ message: e });
        resetForm();
        throw new Error(e);
      }
    },
  });
  return (
    <div className="admin-login">
      <Form className="col-10 col-lg-5 p-4" onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3 text-center">
          <Logo />
          <h3>Admin Login</h3>
        </Form.Group>
        {status && (
          <Alert
            status
            SetStatus={setStatus}
            Variant={status?.status ? "success" : "danger"}
          >
            {status.message}
          </Alert>
        )}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            Email<span>*</span>
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.email && formik.touched.email}
          />
          {formik.errors.email && formik.touched.email && (
            <div className="invalid-feedback">{formik.errors.email}</div>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            Password<span>*</span>
          </Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors.password && formik.touched.password}
          />
          {formik.errors.password && formik.touched.password && (
            <div className="invalid-feedback">{formik.errors.password}</div>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Link to="/forget-password">Forget Password?</Link>
        </Form.Group>
        <Button Padding=".8rem" Type="submit">
          {formik.isSubmitting ? (
            <>
              <MySpinner /> Submitting...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </Form>
    </div>
  );
}

export default ResetPassword;
