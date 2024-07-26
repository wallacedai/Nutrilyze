import React, { useEffect, useRef } from 'react';
import Quagga from 'quagga';

const Scanner = ({ onDetected }) => {
  const scannerRef = useRef(null);

  useEffect(() => {
    Quagga.init({
      inputStream: {
        type: 'LiveStream',
        target: scannerRef.current,
        constraints: {
          width: 640,
          height: 480,
          facingMode: 'environment', // or 'user' for front camera
        },
      },
      decoder: {
        readers: ['ean_reader', 'code_128_reader', 'upc_reader'], // Add more readers if needed
      },
    }, (err) => {
      if (err) {
        console.error('QuaggaJS initialization failed:', err);
        return;
      }
      Quagga.start();
      console.log('QuaggaJS started');
    });

    Quagga.onDetected((result) => {
      const code = result.codeResult.code;
      console.log('Barcode detected:', code);
      if (onDetected) {
        onDetected(code);
      }
    });

    return () => {
      Quagga.stop();
      console.log('QuaggaJS stopped');
    };
  }, [onDetected]);

  return (
    <div ref={scannerRef} style={{ width: '100%', height: '100%' }} />
  );
};

export default Scanner;
