// src/components/Layout.js
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Header from './Header'; // Make sure to import the Header component

const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Navbar />
      <Footer />
    </div>
  );
};

export default Layout;
