import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, user }) => {
 
  return (Object.keys(user).length !== 0) ? children : <Navigate to="/" />;
};

export default PrivateRoute;