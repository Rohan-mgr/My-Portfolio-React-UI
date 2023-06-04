import { Navigate } from "react-router-dom";
import { _getSecureLs } from "../../helper/storage";

function PrivateRoute({ children }) {
  const { isLoggedIn } = _getSecureLs("auth");
  if (!isLoggedIn) {
    return <Navigate to="/admin" replace />;
  }
  return children;
}
export default PrivateRoute;
