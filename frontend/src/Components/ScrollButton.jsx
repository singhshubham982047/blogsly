import React, { useEffect, useState } from "react";

import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";

const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      {isVisible && (
        <div
          onClick={scrollToTop}
          className={`fixed flex items-center justify-center bottom-9 right-9  p-2  font-normal text-center  text-sky-500 text-2xl border-2 border-sky-500 hover:bg-gradient-to-r from-purple-400 to-sky-500 hover:text-white cursor-pointer z-10 transition-all duration-200 ease-in-out rounded`}>
          <MdOutlineKeyboardDoubleArrowUp />
        </div>
      )}
    </div>
  );
};

export default ScrollButton;
