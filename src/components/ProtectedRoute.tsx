import { useAppSelector } from '../Redux/hooks';
import { Redirect, Route, RouteProps } from "react-router-dom";

export interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<RouteProps>  
}

const ProtectedRoute:  React.FC<ProtectedRouteProps> = ({ component: Component, ...restOfProps }) =>{
    const loggedIn = useAppSelector(state => state.login.loggedIn);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        loggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedRoute;