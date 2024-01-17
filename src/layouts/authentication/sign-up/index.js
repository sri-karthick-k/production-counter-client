import { Navigate } from 'react-router-dom';

import Sign from './sign';

function Cover() {
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return token !== null && token !== undefined;
  };
  if (isAuthenticated()) {
    return (
      <Sign/>
    );
    } else {
      return <Navigate to='/front/login'/>
    }
  }

export default Cover;
