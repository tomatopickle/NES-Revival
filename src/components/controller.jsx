import React, { useState, useEffect } from "react";
import "./controller.css";

function Controller() {
  const [activeButton, setActiveButton] = useState(null);

  const keys = {
    z: "a",
    x: "b",
    Enter: "start",
    Control: "select",
    ArrowLeft: "arrowRight",
    ArrowRight: "arrowLeft",
    ArrowUp: "arrowDown",
    ArrowDown: "arrowUp",
  };

  const handleKeyDown = (e) => {
    console.log(e.key);
    if (keys[e.key]) {
      setActiveButton(keys[e.key]);
    }
  };

  const handleKeyUp = (e) => {
    if (keys[e.key]) {
      setActiveButton(null);
    }
  };
  useEffect(() => {
    // Add event listeners for keydown and keyup
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Cleanup the event listeners when the component is unmounted
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <>
      <div className="cable"></div>
      <div id="cable2" className="cable"></div>
      <div className="controller">
        <div className="base">
          <div className="front">
            <div className="decoration">
              <div className="stickers">
                <div className={`st-a ${activeButton === "a" ? "active" : ""}`}>
                  A
                </div>
                <div className={`st-b ${activeButton === "b" ? "active" : ""}`}>
                  B
                </div>
                <div className="st-select">SELECT</div>
                <div className="st-start">START</div>
              </div>
              <div className="decoration-central">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div className="cross">
              <div className="circle"></div>
              <div className="horizontal">
                <div
                  className={`arrowlf ${
                    activeButton === "arrowLeft" ? "active" : ""
                  }`}
                ></div>
                <div
                  className={`arrowrh ${
                    activeButton === "arrowRight" ? "active" : ""
                  }`}
                ></div>
              </div>
              <div className="vertical">
                <div
                  className={`arrowlf ${
                    activeButton === "arrowUp" ? "active" : ""
                  }`}
                ></div>
                <div
                  className={`arrowrh ${
                    activeButton === "arrowDown" ? "active" : ""
                  }`}
                ></div>
              </div>
              <div className="back-cross">
                <div className="horiz"></div>
                <div className="vert"></div>
              </div>
            </div>
            <div className="buttons-a-b">
              <div className="btn-border">
                <div
                  className={`btn-round a ${
                    activeButton === "a" ? "active" : ""
                  }`}
                ></div>
              </div>
              <div className="btn-border">
                <div
                  className={`btn-round b ${
                    activeButton === "b" ? "active" : ""
                  }`}
                ></div>
              </div>
            </div>
            <div className="buttons-select">
              <div
                className={`btn-central b ${
                  activeButton === "select" ? "active" : ""
                }`}
              ></div>
              <div
                className={`btn-central b ${
                  activeButton === "start" ? "active" : ""
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Controller;
