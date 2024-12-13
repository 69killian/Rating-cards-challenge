"use client"
import React, { useState } from 'react';

const Card = () => {
  
  const [hoveredStarIndex, setHoveredStarIndex] = useState(null);
  const totalStars = 6;

  const handleMouseEnter = (index) => {
    setHoveredStarIndex(index);  
  };

  const handleMouseLeave = () => {
    setHoveredStarIndex(null);  
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <section className="bg-white w-[353px] h-auto p-6 rounded-[8px] shadow-lg border border-gray-300">
        <div className='flex justify-end mb-[16px]'>
          <img 
            src="/closeButton.png" 
            alt="reload" 
            className="" 
          />
        </div>
        <div className="font-montserrat text-center text-xl font-semibold text-[#333333] mb-4">
          Quelle note donnerais-tu à ce challenge ?
        </div>
        <div className="text-center text-gray-600 mb-6 font-semibold font-normal text-[#333333] text-[16px]">
          Bon, j&apos;espère que tu vas mettre 5 évidemment. Si ce n&apos;est pas le cas, viens me dire pourquoi !
        </div>

       
        <div className='flex justify-center'>
          {new Array(totalStars).fill(null).map((_, index) => (
            index > 0 && (  
              <img 
                key={index}
                src={hoveredStarIndex >= index ? "/state=hover.png" : "/state=default.png"}  
                alt="star"
                className=" cursor-pointer transition-transform transform duration-300 hover:scale-110"  
                onMouseEnter={() => handleMouseEnter(index)} 
                onMouseLeave={handleMouseLeave}
              />
            )
          ))}
        </div>
      </section>
    </div>
  );
};

export default Card;
