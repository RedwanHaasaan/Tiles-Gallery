"use client";
import Lottie from "lottie-react";
const LottiePlayer = ({ animationData, loop = true, className = "" }) => {
  return (
    <div className={className}>
      <Lottie animationData={animationData} loop={loop} />
    </div>
  );
};

export default LottiePlayer;
