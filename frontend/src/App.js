// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HistoryTab from './pages/History_Tab';
import ScannerTab from './pages/Scanner_Tab';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ScannerTab />} />
          <Route path="/history" element={<HistoryTab />} />
          <Route path="/scanner" element={<ScannerTab />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
