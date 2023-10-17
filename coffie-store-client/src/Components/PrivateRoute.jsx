import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";


const PrivateRoute = ({children}) => {
    
    const {user,loading} = useContext(AuthContext)

   if(!user){
    return children;
   }
   if (loading) {
     return <h1 className="h-screen text-center text-5xl">Loading</h1>;
   }

    return <Navigate to='/'></Navigate>
};

export default PrivateRoute;