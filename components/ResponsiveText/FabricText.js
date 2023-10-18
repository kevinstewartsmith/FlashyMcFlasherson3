import {useEffect, useState, useRef} from "react";

function FabricText({ text }) {
  const containerRef = useRef();
  const h1Ref = useRef();
  const [fontSize, setFontSize] = useState(100);

  //trigger useEffect if the window is resized

  //trigger useEffect if the window is resized


  



  useEffect(() => {
    const { width, height } = h1Ref.current.getBoundingClientRect();
    const containerWidth = containerRef.current?.clientWidth;
    const containerHeight = containerRef.current?.clientHeight;

    if (height > containerHeight) {
      setFontSize((prev) => prev * 0.9);
    }

    setTimeout(() => {
      const updatedContainerWidth = containerRef.current?.clientWidth;
      const updatedContainerHeight = containerRef.current?.clientHeight;

      if (
        width < updatedContainerWidth * 0.8 &&
        height < updatedContainerHeight * 0.8 &&
        fontSize < 200
      ) {
        setFontSize((prev) => prev * 1.1);
      }
    }, 50);
  }, [text, fontSize]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%", // Initial width set to 50% of the viewport width
        height: "100%", // Initial height set to 30% of the viewport width
        //border: "1px solid black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginLeft:10,
        marginRight:10,
        marginBottom:10,
      }}
    >
      <h1
        ref={h1Ref}
        style={{
          fontSize: `${fontSize}px`,
          margin: "0",
          padding: "0",
          whiteSpace: "pre-line",
          wordBreak: "break-word",
          textAlign: "center",
        }}
      >
        {text}
      </h1>
    </div>
  );
}

export default FabricText;
