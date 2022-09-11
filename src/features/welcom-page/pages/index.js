import React from 'react';
import { Helmet } from 'react-helmet-async';
import WelcomHeader from '../components/Header';

const WelcomePage = () => {
  return (
    <>
      <Helmet>
        <title>Chào mừng đến với - FPOLY</title>
      </Helmet>
      <WelcomHeader />
    </>
  );
};

export default WelcomePage;
