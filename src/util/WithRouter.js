import React  from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
function withRouter(Component) {
  return (props) => (
    <Component
      {...props}
      params={useParams()}
      location={useLocation()}
      navigate={useNavigate()}
    />
  );
}
export default withRouter;

