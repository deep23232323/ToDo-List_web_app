import React from "react";
import { HiHandThumbUp } from "react-icons/hi2";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { CiExport } from "react-icons/ci";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const HeroSection = ({ text }) => {
  const text1 = "“Your tasks, your day —  stay productive!” ";
  const text2 = "“customize the catagories!” ";
  const text3 = "“Export your data!” ";

  const titleRef = useRef(null);

  useEffect(() => {
    const el = titleRef.current;

    // Entrance animation
    gsap.fromTo(
      el,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }
    );

    // Continuous animation (floating)
    gsap.to(el, {
      y: -8,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div className="relative top-15 md:left-20 left-3 ">
      {text == 1 && (
        <div  ref={titleRef} className=" flex items-center md:gap-1">
          <h1
           
            className="md:text-[20px] w-[300px] md:w-full  text-wrap text-[17px] font-bold josefin-sans"
          >
            {text1.toUpperCase()}
          </h1>
          <HiHandThumbUp size={30} />
        </div>
      )}
      {text == 2 && (
        <div ref={titleRef} className=" flex items-center gap-3">
          <h1
            
            className="md:text-[20px] text-[17px] font-bold josefin-sans"
          >
            {text2.toUpperCase()}
          </h1>
          <MdOutlineDashboardCustomize size={30} />
        </div>
      )}
      {text == 3 && (
        <div ref={titleRef} className=" flex items-center gap-3">
          <h1
            
            className="md:text-[20px] text-[17px] font-bold josefin-sans"
          >
            {text3.toUpperCase()}
          </h1>
          <CiExport size={30} />
        </div>
      )}
    </div>
  );
};

export default HeroSection;
