import React, { useState, useEffect } from "react";
import "./styles.css";

const Range = ({ values, rangeWidth, delta }) => {
  const [initialMinValue, setInitialMinValue] = useState(1);
  const [initialMaxValue, setInitialMaxValue] = useState(100);

  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(100);

  const [axisX, setAxisX] = useState(0);
  const [isDown, setIsDown] = useState(false);

  const [minMarginLeft, setMinMarginLeft] = useState(0);
  const [maxMarginRight, setMaxMarginRight] = useState(0);

  useEffect(() => {
    if (values.min && values.max) {
      setMinValue(values.min);
      setMaxValue(values.max);
      setInitialMinValue(values.min);
      setInitialMaxValue(values.max);
    }
  }, [values]);

  useEffect(() => {
    document.addEventListener("onMouseUp", moveEnd, false);
  }, []);

  const moveStart = (e) => {
    setIsDown(true);
    setAxisX(e.clientX);
  };

  const handleSetMargin = (isIncrease, marginValue, setMargin) => {
    const margin = isIncrease ? marginValue + delta : marginValue - delta;
    setMargin(margin);
  };

  // interactive funtion for the min value
  const movingMinElement = (e) => {
    if (isDown) {
      // When move min element to the left
      if (e.clientX > axisX) {
        setAxisX(e.clientX);
        if (minMarginLeft < rangeWidth) {
          handleSetMargin(true, minMarginLeft, setMinMarginLeft);
          setMinValue(
            parseInt(e.target.offsetLeft / (rangeWidth / initialMaxValue) - initialMinValue),
          );
        }
      }
      // When move min element to the right
      if (e.clientX < axisX) {
        setAxisX(e.clientX);
        if (minMarginLeft > initialMinValue) {
          handleSetMargin(false, minMarginLeft, setMinMarginLeft);
          setMinValue(
            parseInt(e.target.offsetLeft / (rangeWidth / initialMaxValue)) + initialMinValue,
          );
        }
      }
    }
  };

  // interactive funtion for the max value
  const movingMaxElement = (e) => {
    if (isDown) {
      // When move max element to the left
      if (e.clientX < axisX) {
        setAxisX(e.clientX);
        if (maxMarginRight < rangeWidth) {
          handleSetMargin(true, maxMarginRight, setMaxMarginRight);
          setMaxValue(
            parseInt(e.target.offsetLeft / (rangeWidth / initialMaxValue)) - initialMinValue,
          );
        }
      }
      // When move max element to the right
      if (e.clientX > axisX) {
        setAxisX(e.clientX);
        if (maxMarginRight > initialMinValue) {
          handleSetMargin(false, maxMarginRight, setMaxMarginRight);
          setMaxValue(
            parseInt(e.target.offsetLeft / (rangeWidth / initialMaxValue)) + initialMinValue,
          );
        }
      }
    }
  };

  const moveEnd = () => {
    setIsDown(false);
  };

  const handleSetMinValue = () => {
    if (minValue > initialMinValue) {
      setMinMarginLeft(minMarginLeft - rangeWidth / initialMaxValue);
      setMinValue(parseInt(minValue - delta / (rangeWidth / initialMaxValue)));
    }
  };

  return (
    <div className="range-component">
      <button className="value-button" onClick={handleSetMinValue}>
        {minValue < initialMinValue ? initialMinValue : minValue} €
      </button>
      <div className="range-slider" style={{ width: `${rangeWidth}px` }}>
        <div className="range-slider-tracking" />
        <div
          className="range-slider-input min-value"
          style={{ left: `${minMarginLeft}px`, cursor: isDown ? "grabbing" : "grab" }}
          onMouseDown={moveStart}
          onMouseMove={movingMinElement}
          onMouseUp={moveEnd}
          onMouseLeave={moveEnd}
        />
        <div
          className="range-slider-input max-value"
          style={{ right: `${maxMarginRight}px`, cursor: isDown ? "grabbing" : "grab" }}
          onMouseDown={moveStart}
          onMouseMove={movingMaxElement}
          onMouseUp={moveEnd}
          onMouseLeave={moveEnd}
        />
      </div>
      <button className="value-button">
        {maxValue > initialMaxValue ? initialMaxValue : maxValue} €
      </button>
    </div>
  );
};

export default Range;
