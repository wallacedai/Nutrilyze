// src/components/Scanner.js
import React, { useEffect } from 'react';
import Quagga from 'quagga';

const Scanner = ({ onDetected }) => {
  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          target: '#scanner-container',
          constraints: {
            width: 640,
            height: 480,
            facingMode: 'environment',
          },
        },
        decoder: {
          readers: ['ean_reader', 'code_128_reader', 'upc_reader'],
        },
      },
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((result) => {
      if (result && result.codeResult && result.codeResult.code) {
        Quagga.stop(); // Stop processing further detection
        onDetected(result.codeResult.code);
      }
    });

    return () => {
      Quagga.offDetected(); // Remove all event listeners
      Quagga.stop(); // Stop the scanner when the component is unmounted
    };
  }, [onDetected]);

  return <div id="scanner-container" style={{ width: '100%', height: '100%' }} />;
};

export default Scanner;
