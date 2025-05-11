// src/App.jsx
import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

function App() {
  const [showContent, setShowContent] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 12,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  useGSAP(() => {
    if (!showContent) return;

    // Responsive scale based on screen width
    const scaleFactor = window.innerWidth < 768 ? 1.2 : 1;

    gsap.to(".main", {
      scale: scaleFactor,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
    });

    gsap.to(".sky, .bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".character", {
      scale: 1.2,
      x: "-50%",
      bottom: "-25%",
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    const main = document.querySelector(".main");

    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".main .text", { x: `${xMove * 0.4}%` });
      gsap.to(".sky", { x: xMove });
      gsap.to(".bg", { x: xMove * 1.7 });
    });
  }, [showContent]);

  return (
    <>
      {/* SVG Intro Animation */}
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./sky.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />

        </svg>
      </div>


      {/* Main Content */}
      {showContent && (
        <div className="app-wrapper w-full max-w-[1920px] mx-auto px-2">
          <div className="main w-full rotate-[-5deg] scale-[1]">
            <div className="landing relative w-full h-screen bg-black overflow-hidden">

              {/* Navbar */}
              <div className="navbar absolute top-0 left-0 z-10 w-full py-6 px-6 flex items-center justify-between">
                <div className="logo flex gap-4 items-center">
                  <div className="lines flex flex-col gap-[5px] mt-1">
                    <div className="line w-6 h-[3px] bg-white rounded-full"></div>
                    <div className="line w-4 h-[3px] bg-white rounded-full"></div>
                    <div className="line w-2 h-[3px] bg-white rounded-full"></div>
                  </div>
                  <h3 className="text-3xl text-white">Rockstar</h3>
                </div>
              </div>

              {/* Images & Text */}
              <div className="imagesdiv relative w-full h-full">
                <img
                  className="absolute sky scale-[1.5] rotate-[-15deg] top-0 left-0 w-full h-full object-cover"
                  src="./sky.png"
                  alt=""
                />
                <img
                  className="absolute bg scale-[1.7] rotate-[-5deg] top-0 left-0 w-full h-full object-cover"
                  src="./bg.png"
                  alt=""
                />
                <div className="text text-white flex flex-col gap-2 absolute top-[10vh] left-1/2 -translate-x-1/2 scale-[1.2] rotate-[-5deg] text-center">
                  <h1 className="text-[10vw] leading-none">grand</h1>
                  <h1 className="text-[10vw] leading-none">theft</h1>
                  <h1 className="text-[10vw] leading-none">auto</h1>
                </div>
                <img
                  className="absolute character bottom-[-5%] left-1/2 -translate-x-1/2 scale-[0.9] md:scale-[1] rotate-[-5deg] max-w-[50vw] md:max-w-[28vw] h-auto"
                  src="./girlbg.png"
                  alt=""
                />
              </div>

              {/* Bottom Bar */}
              <div className="btmbar text-white absolute bottom-0 left-0 w-full py-8 px-10 bg-gradient-to-t from-black to-transparent">
                <div className="flex gap-1 items-center mt-5">
                  <i className="text-xl ri-arrow-down-line"></i>
                  <h3 className="text-l font-[Helvetica_Now_Display]">
                    Scroll Down
                  </h3>
                </div>
                <img
                  className="absolute h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src="./ps5.png"
                  alt=""
                />
              </div>
            </div>

            {/* Second Section */}
            <div className="w-full h-screen flex flex-col md:flex-row items-center justify-center bg-black text-white gap-8 p-6">
              <div className="relative w-full md:w-1/2 h-[50vh] md:h-[80%] flex items-center justify-center">
                <img
                  className="max-h-full max-w-full object-contain scale-[1.2]"
                  src="./imag.png"
                  alt=""
                />
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <h1 className="text-[6vw] md:text-6xl">Still Running,</h1>
                <h1 className="text-[6vw] md:text-6xl">Not Hunting</h1>
                <p className="text-base md:text-lg">
                  Dive into an open-world experience like no other — from high-speed chases through neon-lit streets to building your empire in the heart of the city.
                </p>
                <p className="text-base md:text-lg">
                  Explore sprawling landscapes, engage in epic missions, and define your legacy in a world where every choice shapes your story.
                </p>
                <button className="bg-yellow-500 px-6 py-3 text-black text-lg rounded hover:bg-yellow-400 transition">
                  Download Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
