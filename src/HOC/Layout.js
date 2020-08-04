import React, { useState, useEffect } from 'react';
import Header from '../Components/Header_Footer/Header';
import Footer from '../Components/Header_Footer/Footer';
import { useLocation } from 'react-router-dom';

const Layout = (props) => {
  const location = useLocation();
  const [sign, setSign] = useState(false);

  useEffect(() => {
    const temp = location.pathname === '/sign_in' ? true : false;
    setSign(temp);
  }, [location]);

  return (
    <>
      {sign ? (
        props.children
      ) : (
        <>
          <Header {...props} />
          {props.children}
          <Footer />
        </>
      )}
    </>
  );
};

export default Layout;
