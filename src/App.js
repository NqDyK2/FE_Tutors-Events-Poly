import React from 'react';
import { Helmet } from 'react-helmet-async';

import './App.css';
import { ScrollToTop } from './components/ScrollToTop';
import AppRoutes from './routes/routes';

function App() {
  return (
    <div>
      <Helmet>
        <title>Tutors Event - FPOLY</title>
        <meta name="description" content="Tutors Event - FPOLY" />
      </Helmet>
      <ScrollToTop>
        <AppRoutes />
      </ScrollToTop>
    </div>
  );
}

export default App;
