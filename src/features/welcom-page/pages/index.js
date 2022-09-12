import React from 'react';
import { Helmet } from 'react-helmet-async';
import WelcomHeader from '../components/Header';
import WelcomeFooter from '../components/Footer';
const WelcomePage = () => {
  return (
    <>
      <Helmet>
        <title>Chào mừng đến với - FPOLY</title>
      </Helmet>

      {/* header component */}
      <WelcomHeader />

      {/* slide */}
      <div>
        slide
      </div>

      {/* footer component */}
      <WelcomeFooter />
    </>
  );
};

export default WelcomePage;
