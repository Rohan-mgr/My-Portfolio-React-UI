import Spinner from "react-bootstrap/Spinner";

function MySpinner({ spinnerSize }) {
  return (
    <Spinner
      as="span"
      animation="border"
      size={spinnerSize || "sm"}
      role="status"
      aria-hidden="true"
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default MySpinner;
