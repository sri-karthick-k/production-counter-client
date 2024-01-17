import { Navigate } from 'react-router-dom';


import AddDevice from './edit';


function Tables() {
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return token !== null && token !== undefined;
  };
  if (isAuthenticated()) {
    return (
      <AddDevice/>
    );
    } else {
      return <Navigate to='/front/login'/>
    }
  }

export default Tables;
