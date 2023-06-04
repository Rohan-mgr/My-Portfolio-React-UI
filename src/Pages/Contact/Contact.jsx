import React from "react";
import "./Contact.css";
import { Container, Form } from "react-bootstrap";
import Button from "../../Components/Button/Button";
import { useFormik } from "formik";
import MySpinner from "../../Components/Spinner/Spinner";
import { contactFormValidation } from "../../validation-schema/validation";
import { handleMessageUpload } from "../../services/admin";
import { toast } from "react-toastify";

function Contact() {
  const formik = useFormik({
    initialValues: {
      from_name: "",
      phone: "",
      user_email: "",
      message: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await handleMessageUpload(values);
        console.log(response?.message);
        toast.success(response?.message);
      } catch (error) {
        toast.error(error.getMessage());
        throw new Error(error);
      } finally {
        resetForm();
      }
    },
    validationSchema: contactFormValidation,
    validateOnBlur: false,
  });

  return (
    <Container fluid id="contact">
      <h2 className="number-heading">
        <span>03.</span> Get In Touch
      </h2>
      <Form className="common__form" onSubmit={formik.handleSubmit}>
        <div className="Contact__form__left">
          <Form.Group>
            <Form.Label htmlFor="fullName">
              Name:<sup>*</sup>{" "}
            </Form.Label>
            <Form.Control
              type="text"
              name="from_name"
              value={formik.values.from_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Your Full Name"
              id="fullName"
              isInvalid={!!formik.errors.from_name && formik.touched.from_name}
            />

            {formik.errors.from_name && formik.touched.from_name && (
              <div className="invalid-feedback">{formik.errors.from_name}</div>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="phone">
              Phone:<sup>*</sup>{" "}
            </Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Your Phone Number"
              id="phone"
              isInvalid={!!formik.errors.phone && formik.touched.phone}
            />
            {formik.errors.phone && formik.touched.phone && (
              <div className="invalid-feedback">{formik.errors.phone}</div>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="email">
              E-mail:<sup>*</sup>{" "}
            </Form.Label>
            <Form.Control
              type="email"
              name="user_email"
              value={formik.values.user_email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Your E-mail"
              id="email"
              isInvalid={
                !!formik.errors.user_email && formik.touched.user_email
              }
            />
            {formik.errors.user_email && formik.touched.user_email && (
              <div className="invalid-feedback">{formik.errors.user_email}</div>
            )}
          </Form.Group>
        </div>
        <div className="Contact__form__right">
          <Form.Group>
            <Form.Label htmlFor="message">
              Message:<sup>*</sup>
            </Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Your Message...."
              name="message"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="message"
              rows={9}
              isInvalid={!!formik.errors.message && formik.touched.message}
            />
            {formik.errors.message && formik.touched.message && (
              <div className="invalid-feedback">{formik.errors.message}</div>
            )}
          </Form.Group>

          <Button Type="submit">
            {formik.isSubmitting ? (
              <>
                <MySpinner /> Sending Your Message...
              </>
            ) : (
              "Send Your Message"
            )}
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default Contact;
