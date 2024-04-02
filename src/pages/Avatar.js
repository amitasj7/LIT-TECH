import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";
import { useNavigate } from "react-router-dom";

import imgPath from "../common/assets/male.png";
import imgPath2 from "../common/assets/hair_1.png";
import imgPath3 from "../common/assets/eye_1.png";
import imgPath4 from "../common/assets/nose_1.png";
import imgPath5 from "../common/assets/mouth_2.png";
import imgPath6 from "../common/assets/shirt_1.png";
import imgPath7 from "../common/assets/pant_1.png";
import imgPath8 from "../common/assets/hair_2.png";

const Avatar = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [hairImage, setHairImage] = useState(imgPath2);
  const [hairPosition, setHairPosition] = useState({ x: 155, y: 115 });
  const [hairScale, setHairScale] = useState({ width: 80, height: 60 });
  const imgRef = useRef(null);
  const imgRef2 = useRef(null);
  const imgRef3 = useRef(null);
  const imgRef4 = useRef(null);
  const imgRef5 = useRef(null);
  const imgRef6 = useRef(null);
  const imgRef7 = useRef(null);
  const imgRef8 = useRef(null);
  const myP5Ref = useRef(null);

  useEffect(() => {
    const preloadImage = (p) => {
      try {
        imgRef.current = p.loadImage(imgPath);
        imgRef2.current = p.loadImage(hairImage);
        imgRef3.current = p.loadImage(imgPath3);
        imgRef4.current = p.loadImage(imgPath4);
        imgRef5.current = p.loadImage(imgPath5);
        imgRef6.current = p.loadImage(imgPath6);
        imgRef7.current = p.loadImage(imgPath7);
        imgRef8.current = p.loadImage(imgPath8);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    const setupSketch = (p) => {
      try {
        p.setup = () => {
          const canvasWidth = canvasRef.current.offsetWidth;
          const canvasHeight = canvasRef.current.offsetHeight;
          p.createCanvas(canvasWidth, canvasHeight);
          p.background(255, 255, 255);
        };
        p.draw = () => {
          p.image(imgRef.current, 100, 140, 200, 500);
          p.image(
            imgRef2.current,
            hairPosition.x,
            hairPosition.y,
            hairScale.width,
            hairScale.height
          );
          p.image(imgRef3.current, 167, 150, 45, 30);
          p.image(imgRef4.current, 185, 165, 10, 20);
          p.image(imgRef5.current, 179, 183, 22, 15);
          p.image(imgRef7.current, 121, 335, 152, 107);
          p.image(imgRef6.current, 100, 197, 184, 185);
        };
      } catch (error) {
        console.error("Error setting up sketch:", error);
      }
    };

    try {
      myP5Ref.current = new p5(setupSketch, canvasRef.current);
      preloadImage(myP5Ref.current);
    } catch (error) {
      console.error("Error initializing p5.js sketch:", error);
    }

    return () => {
      try {
        myP5Ref.current.remove();
      } catch (error) {
        console.error("Error removing p5.js sketch:", error);
      }
    };
  }, [hairImage, hairPosition, hairScale]);

  const handleChange = (newHairImage, newX, newY, newWidth, newHeight) => {
    setHairImage(newHairImage);
    setHairPosition({ x: newX, y: newY });
    setHairScale({ width: newWidth, height: newHeight });
  };

  return (
    <>
      <div className="bg-orange-300 flex flex-row justify-end items-end ">
        <button
          onClick={() => {
            navigate("/avatarfemale");
          }}
        >
          female
        </button>
      </div>
      <div ref={canvasRef} style={{ width: "100%", height: "100vh" }}></div>
      <button onClick={() => handleChange(imgPath2, 155, 115, 80, 65)}>
        <img src={imgPath2} height="100px" width="100px" />
      </button>
      <button onClick={() => handleChange(imgPath8, 155, 120, 65, 60)}>
        <img src={imgPath8} height="100px" width="100px" />
      </button>
    </>
  );
};

export default Avatar;
