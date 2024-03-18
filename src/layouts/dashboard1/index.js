import { Navigate } from 'react-router-dom';
import Report from './report';


function Tables() {
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return token !== null && token !== undefined;
  };
  if (isAuthenticated()) {
    return (
      <Report/>
    );
    } else {
      return <Navigate to='/front/login'/>
    }
  }

export default Tables;

