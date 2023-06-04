import { useState } from "react";
import { useParams } from "react-router-dom";
import "./ResetPassword.css";
import Button from "../Button/Button";
import Form from "react-bootstrap/Form";
import Logo from "../Logo/Logo";
import { useFormik } from "formik";
import { passwordValidation } from "../../validation-schema/validation";
import { handleSetNewPassword } from "../../services/admin";
import Alert from "../Alert/Alert";
import MySpinner from "../Spinner/Spinner";

function ResetPassword() {
  // const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const { id, token } = useParams();
  const formik = useFormik({
    initialValues: {
      newPassword: "",
    },
    validationSchema: passwordValidation,
    validateOnBlur: false,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await handleSetNewPassword(id, token, values);
        console.log(response);
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
  return (
    <div className="reset-password">
      <Form className="col-10 col-lg-5 p-4" onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3 text-center">
          <Logo />
          <h3>Enter Your New Password</h3>
        </Form.Group>
        {status && (
          <Alert
            status
            SetStatus={setStatus}
            Variant={status?.status ? "success" : "danger"}
          >
            {status.message}!{" "}
            {/* {status?.status === 200 ? (
              <p
                style={{
                  display: "inline-block",
                  cursor: "pointer",
                  margin: "0px",
                }}
                onClick={() => navigate("/admin", { replace: true })}
              >
                Login Now
              </p>
            ) : null} */}
          </Alert>
        )}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            New Password<span>*</span>
          </Form.Label>
          <Form.Control
            type="password"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={
              !!formik.errors.newPassword && formik.touched.newPassword
            }
          />
          {formik.errors.newPassword && formik.touched.newPassword && (
            <div className="invalid-feedback">{formik.errors.newPassword}</div>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
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
