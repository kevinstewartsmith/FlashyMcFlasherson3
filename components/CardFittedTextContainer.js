import React, { useRef, useEffect } from 'react';
import fitty from 'fitty';

const FittyWithWordBreak = ({ text }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    container.textContent = text;

    fitty(container, {
      maxSize: 200, // Adjust the max font size as needed
      minSize: 8,   // Adjust the min font size as needed
      multiLine: false,
      observeMutations: false,
      wordBreak: 'break-word', // Enable word breaking
    });

    return () => {
      container.innerHTML = '';
    };
  }, [text]);

  return <div style={{width:"100%"}} ref={containerRef}>{ text }</div>;
};

export default FittyWithWordBreak;
