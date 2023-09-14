import React, {useEffect} from 'react';
// import { useHistory } from 'react-router-dom';


const CheckoutSuccess = () => {
  // const history = useHistory();

  // useEffect(() => {
  //   // Use setTimeout to navigate back to the home page after 5 seconds
  //   const timeoutId = setTimeout(() => {
  //     history.push('/'); 
  //   }, 5000);


  //   return () => clearTimeout(timeoutId);
  // }, [history]);


  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', 
  };

  const messageStyle = {
    fontColor: 'white',
    fontSize: '27px',
    textAlign: 'center',
    backgroundColor: '#08DA55', 
    color: 'white', 
    padding: '20px',
    borderRadius: '30px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={containerStyle}>
      <div style={messageStyle}>
        <h2 className='success-page__header'>Checking out successfully!</h2>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
