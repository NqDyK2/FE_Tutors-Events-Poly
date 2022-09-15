import React from 'react';
import { Helmet } from 'react-helmet-async';
import WelcomHeader from '../components/Header';
import WelcomeFooter from '../components/Footer';
import WelcomeBanner from '../components/Banner';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../auth/authSlice';
import { Navigate } from 'react-router-dom';
const WelcomePage = () => {
  const isAuth = useSelector(selectIsAuthenticated);

  return isAuth ? (
    <Navigate to='/' />
  ) : (
    <>
      <Helmet>
        <title>Chào mừng đến với - FPOLY</title>
      </Helmet>

      {/* header component */}
      <WelcomHeader />

      {/* slide */}
      <WelcomeBanner />

      {/* footer component */}
      <WelcomeFooter />
    </>
  );
};

export default WelcomePage;
