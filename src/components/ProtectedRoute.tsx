import { useAppSelector } from '../Redux/hooks';
import { Redirect, Route } from "react-router-dom";



function ProtectedRoute({ component: Component, ...restOfProps }:any) {
    const loggedIn = useAppSelector(state => state.login.loggedIn);
  console.log(Component);
  console.log(restOfProps);


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