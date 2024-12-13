"use client"
import React, { useState, useEffect } from 'react';

const Card = () => {
  const [hoveredStarIndex, setHoveredStarIndex] = useState<number | null>(null); 
  const [isLoaded, setIsLoaded] = useState(false); 
  const [isHovered, setIsHovered] = useState(false);
  const totalStars = 6;

  const handleMouseEnter = (index: number) => {  
    setHoveredStarIndex(index);  
  };

  const handleMouseLeave = () => {
    setHoveredStarIndex(null);  
  };

  const handleMouseEnterClose = () => {
    setIsHovered(true);  
  };

  const handleMouseLeaveClose = () => {
    setIsHovered(false);  
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true); 
    }, 100);
    return () => clearTimeout(timer); 
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <section className={`bg-white w-[353px] h-auto p-6 rounded-[8px] shadow-lg border border-gray-300 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        
        <div className='flex justify-end mb-[16px]'>
          
          <img 
            src={isHovered ? "/closeButton-hover.png" : "/closeButton.png"}
            alt="reload" 
            className="cursor-pointer transition-transform transform duration-200 hover:scale-105" 
            onMouseEnter={handleMouseEnterClose}  
            onMouseLeave={handleMouseLeaveClose}  
          />
        </div>

        <div className="font-montserrat text-center text-xl font-semibold text-[#333333] mb-4">
          Quelle note donnerais-tu à ce challenge ?
        </div>
        <div className="text-center text-gray-600 mb-6 font-normal text-[#333333] text-[16px]">
          Bon, j&apos;espère que tu vas mettre 5 évidemment. Si ce n&apos;est pas le cas, viens me dire pourquoi !
        </div>

        <div className={`flex justify-center transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {new Array(totalStars).fill(null).map((_, index) => (
            index > 0 && (  
              <img 
                key={index}
                src={hoveredStarIndex >= index ? "/state=hover.png" : "/state=default.png"}  
                alt="star"
                className="cursor-pointer transition-transform transform duration-300 hover:scale-110"  
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
