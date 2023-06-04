import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import Button from "../../../../Components/Button/Button";
import MySpinner from "../../../../Components/Spinner/Spinner";
import MultiInputs from "../../../../Components/MultiInputs/MultiInputs";
import { projectFormValidation } from "../../../../validation-schema/validation";
import { handleProjectUpload } from "../../../../services/admin";
import Alert from "../../../../Components/Alert/Alert";
import { useNavigate } from "react-router-dom";
import { _getSecureLs, _removeAll } from "../../../../helper/storage";

function Projects() {
  const [techList, setTechLists] = useState([""]);
  const [status, setStatus] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const expiryDate = _getSecureLs("auth")?.expiryDate;

    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    setAutoLogout(remainingMilliseconds);
  }, []);

  const setAutoLogout = (remainingTime) => {
    setTimeout(() => {
      _removeAll();
      navigate("/admin");
    }, remainingTime);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      githubLink: "",
      deployedLink: "",
      feature_project: "false",
      image: null,
    },
    onSubmit: async (values, { resetForm }) => {
      values = { ...values, techList };
      try {
        const response = await handleProjectUpload(values);

        setStatus((prevState) => {
          return {
            ...prevState,
            message: response?.message,
            status: response?.status,
          };
        });

        resetForm();
        setTechLists([""]);
      } catch (e) {
        setStatus({ message: e });
        resetForm();
        setTechLists([""]);
        throw new Error(e);
      }
    },
    validationSchema: projectFormValidation,
    validateOnBlur: false,
  });

  return (
    <div className="projects">
      {status && (
        <Alert
          status
          SetStatus={setStatus}
          Variant={status?.status ? "success" : "danger"}
        >
          {status.message}
        </Alert>
      )}
      <h2 style={{ color: "#000" }}>+ Add New Projects</h2>
      <Form
        className="common__form"
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >
        <div className="Contact__form__left">
          <Form.Group>
            <Form.Label htmlFor="title">Title:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Project Title"
              id="fullName"
              isInvalid={!!formik.errors.title && formik.touched.title}
            />

            {formik.errors.title && formik.touched.title && (
              <div className="invalid-feedback">{formik.errors.title}</div>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="phone">Github Link:</Form.Label>
            <Form.Control
              type="text"
              name="githubLink"
              value={formik.values.githubLink}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Project github link"
              id="githubLink"
              isInvalid={
                !!formik.errors.githubLink && formik.touched.githubLink
              }
            />
            {formik.errors.githubLink && formik.touched.githubLink && (
              <div className="invalid-feedback">{formik.errors.githubLink}</div>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="phone">Deployed Link:</Form.Label>
            <Form.Control
              type="text"
              name="deployedLink"
              value={formik.values.deployedLink}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Project deployed link"
              id="deployedLink"
            />
          </Form.Group>

          <MultiInputs techLists={techList} setTechLists={setTechLists} />
        </div>
        <div className="Contact__form__right">
          <Form.Group>
            <Form.Label>Feature Project:</Form.Label>
            <Form.Check
              type="radio"
              name="feature_project"
              value="true"
              id="option1"
              label="Yes"
              checked={formik.values.feature_project === "true"}
              onChange={formik.handleChange}
            />
            <Form.Check
              type="radio"
              name="feature_project"
              id="option2"
              value="false"
              label="No"
              checked={formik.values.feature_project === "false"}
              onChange={formik.handleChange}
            />
            {formik.errors.feature_project &&
              formik.touched.feature_project && (
                <div style={{ color: "#dc3545", fontSize: "0.875em" }}>
                  {formik.errors.feature_project}
                </div>
              )}
          </Form.Group>
          {formik.values.feature_project === "true" && (
            <Form.Group>
              <Form.Label>Upload SS of Project: </Form.Label>
              <Form.Control
                type="file"
                name="image"
                size="sm"
                accept="image/png, image/jpg, image/svg, image/jpeg"
                onChange={(event) =>
                  formik.setFieldValue("image", event.currentTarget.files[0])
                }
                required={
                  formik.values.feature_project === "true" ? true : false
                }
              />
            </Form.Group>
          )}
          <Form.Group>
            <Form.Label htmlFor="message">
              Description:<sup>*</sup>
            </Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Project description...."
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="description"
              rows={9}
              isInvalid={
                !!formik.errors.description && formik.touched.description
              }
            />
            {formik.errors.description && formik.touched.description && (
              <div className="invalid-feedback">
                {formik.errors.description}
              </div>
            )}
          </Form.Group>

          <Button setBackground Type="submit">
            {formik.isSubmitting ? (
              <>
                <MySpinner /> Uploading Project...
              </>
            ) : (
              "Upload Project"
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Projects;
