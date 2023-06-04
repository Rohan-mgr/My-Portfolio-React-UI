import React, { useState } from "react";
import "./ResetPassword.css";
import Button from "../Button/Button";
import Form from "react-bootstrap/Form";
import Logo from "../Logo/Logo";
import { useFormik } from "formik";
import { emailValidation } from "../../validation-schema/validation";
import { handleResetPassword } from "../../services/admin";
import Alert from "../Alert/Alert";
import MySpinner from "../Spinner/Spinner";

function ResetPassword() {
  const [status, setStatus] = useState(null);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: emailValidation,
    validateOnBlur: false,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await handleResetPassword(values);
        setStatus((prevState) => {
          return {
            ...prevState,
            message: response?.message,
            status: response?.status,
          };
        });
        resetForm();
      } catch (e) {
        setStatus({ message: e });
        resetForm();
        throw new Error(e);
      }
    },
  });
  // console.log(!status);
  return (
    <div className="reset-password">
      <Form className="col-10 col-lg-5 p-4" onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3 text-center">
          <Logo />
          <h3>Enter Your Registered Email Address</h3>
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
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          {/* <Form.Check type="checkbox" label="Check me out" /> */}
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
