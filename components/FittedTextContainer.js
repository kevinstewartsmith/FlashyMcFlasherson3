import { useLayoutEffect, useRef } from 'react';
import fitty from 'fitty';
import globals from '../styles/globals.css';

const FittedTextContainer = ({text, minText, maxText}) => {

    const containerRef = useRef(null);
   
    useLayoutEffect(() => {
        const fittyInstance = fitty(containerRef.current, {
            minSize: 1,
            maxSize: 70,
        });
        return () => {
          fittyInstance.unsubscribe();
        };
      }, []);
      

  return (
    <div className='fitted-text-container' ref={containerRef}>{ text }</div>
  )
}

export default FittedTextContainer
