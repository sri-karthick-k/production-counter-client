import { Navigate } from 'react-router-dom';


const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return token !== null && token !== undefined;
  };
  
const Logout = ()=>{
    if (isAuthenticated()) {
        let x = window.confirm("Are You Sure You Want to LogOut?")
        if(x){
            localStorage.removeItem("token");
            localStorage.removeItem("uid");
            localStorage.removeItem("role");
            return <Navigate to='/login'/>
        }
        else{
            return <Navigate to='/get-devices'/>
        }
      } 
      return <Navigate to='/login'/>
}   

export default Logout;