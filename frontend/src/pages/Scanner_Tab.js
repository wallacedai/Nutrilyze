// src/pages/Scanner_Tab.js
import React, { useState } from 'react';
import Scanner from '../components/Scanner';

const ScannerTab = () => {
  const [barcode, setBarcode] = useState('');
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [scannerVisible, setScannerVisible] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const handleDetected = async (code) => {
    if (isFetching) return; // Prevent multiple fetch requests
  
    // Convert the code to an integer to remove leading zeros
    const normalizedCode = parseInt(code, 10).toString();
  
    setBarcode(normalizedCode);
    setScannerVisible(false); // Hide the scanner once a barcode is detected
    setIsFetching(true); // Set fetching flag to true
  
    try {
      const response = await fetch(`http://localhost:8000/item/${normalizedCode}`);
  
      if (response.ok) {
        const data = await response.text(); // Use .text() to handle plain text response
        setItem(data);
        setError(null);
      } else {
        const errorData = await response.json();
        console.error('Error fetching item:', errorData.message);
        setItem(null);
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setItem(null);
      setError('Failed to fetch data. Please check your network connection and try again.');
    } finally {
      setIsFetching(false); // Reset fetching flag
    }
  };
  

  // Reset state when scanning another barcode
  const handleScanAnother = () => {
    setBarcode('');
    setItem(null);
    setError(null);
    setScannerVisible(true);
    setIsFetching(false);
  };

  // Open the scanner
  const openScanner = () => {
    setScannerVisible(true);
    setBarcode('');
    setItem(null);
    setError(null);
  };

  return (
    <div>
      <h1>Scanner Tab</h1>
      {!scannerVisible ? (
        <button onClick={openScanner}>Open Scanner</button>
      ) : (
        <Scanner onDetected={handleDetected} />
      )}
      {barcode && (
        <div>
          <h2>Detected Barcode:</h2>
          <p>{barcode}</p>
        </div>
      )}
      {item ? (
        <div>
          <h2>Item Details:</h2>
          <pre>{item}</pre> {/* Display item as plain text */}
        </div>
      ) : (
        error && (
          <div>
            <h2>Error:</h2>
            <p>{error}</p>
          </div>
        )
      )}
      {!scannerVisible && barcode && (
        <button onClick={handleScanAnother}>Scan Another Barcode</button>
      )}
    </div>
  );
};

export default ScannerTab;
