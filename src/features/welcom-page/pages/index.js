import React from 'react';
import { Helmet } from 'react-helmet-async';
import WelcomHeader from '../components/Header';
import WelcomeFooter from '../components/Footer';
import WelcomeBanner from '../components/Banner';
const WelcomePage = () => {
  return (
    <>
      <Helmet>
        <title>Chào mừng đến với - FPOLY</title>
      </Helmet>

      {/* header component */}
      <WelcomHeader />

      {/* slide */}
      <WelcomeBanner/>

      {/* footer component */}
      <WelcomeFooter />
    </>
  );
};

export default WelcomePage;
