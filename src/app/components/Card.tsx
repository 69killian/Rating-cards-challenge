"use client"
import React, { useState, useEffect, useRef } from 'react';

const Card = () => {
  const [hoveredStarIndex, setHoveredStarIndex] = useState<number | null>(null); 
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); 
  const [rating, setRating] = useState<number | null>(null); 
  const [ratingsHistory, setRatingsHistory] = useState<number[]>([]); 
  const totalStars = 6;

  const cardRef = useRef<HTMLDivElement>(null); 

  const handleMouseEnter = (index: number) => {  
    setHoveredStarIndex(index);  
  };

  const handleMouseLeave = () => {
    setHoveredStarIndex(null);  
    setRating(null);
  };

  const handleMouseEnterClose = () => {
    setIsHovered(true);  // Active le survol du bouton close
  };

  const handleMouseLeaveClose = () => {
    setIsHovered(false);  // Désactive le survol du bouton close
  };

  const handleRating = (index: number) => {
    setRating(index);  
    const newHistory = [...ratingsHistory, index];
    setRatingsHistory(newHistory);
    localStorage.setItem('ratingsHistory', JSON.stringify(newHistory)); // Sauvegarde dans localStorage
  };

  const handleReset = () => {
    setRating(null);
    setRatingsHistory([]);
    localStorage.removeItem('ratingsHistory'); // Vide localStorage
  };

  const handleCloseButtonClick = () => {
    setRating(null);  // Réinitialise les étoiles lorsque le bouton close est cliqué
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
      setHoveredStarIndex(null); // Réinitialise les étoiles quand on clique en dehors
    }
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem('ratingsHistory');
    if (savedHistory) {
      setRatingsHistory(JSON.parse(savedHistory)); // localStorage
    }

    
    document.addEventListener('click', handleClickOutside);

    const timer = setTimeout(() => {
      setIsLoaded(true); 
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClickOutside); 
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-8 h-screen">

     
      <section 
        ref={cardRef} 
        className={`bg-white w-[353px] h-auto p-6 rounded-[8px] shadow-lg border border-gray-300 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className='flex justify-end mb-[16px]'>
          <img 
            src={isHovered ? "/closeButton-hover.png" : "/closeButton.png"} 
            alt="reload" 
            className="cursor-pointer" 
            onClick={handleCloseButtonClick}
            onMouseEnter={handleMouseEnterClose}  
            onMouseLeave={handleMouseLeaveClose}  
          />
        </div>
        <div className="font-montserrat text-center text-xl font-semibold text-[#333333] mb-4">
          Quelle note donnerais-tu à ce challenge ?
        </div>
        <div className="text-center text-gray-600 mb-6 font-semibold font-normal text-[#333333] text-[16px]">
          Bon, j&apos;espère que tu vas mettre 5 évidemment. Si ce n&apos;est pas le cas, viens me dire pourquoi !
        </div>

        <div className="flex justify-center mb-6">
          {new Array(totalStars).fill(null).map((_, index) => (
            index > 0 && (  
              <img 
                key={index}
                src={hoveredStarIndex !== null && (hoveredStarIndex >= index || (rating !== null && rating >= index)) ? "/state=hover.png" : "/state=default.png"}  
                alt="star"
                className="cursor-pointer transition-transform transform duration-300 hover:scale-110"  
                onMouseEnter={() => handleMouseEnter(index)} 
                onMouseLeave={handleMouseLeave}
                onClick={() => handleRating(index)} 
              />
            )
          ))}
        </div>
      </section>
      

      <div className="lg:w-[300px] w-[350px] mt-8 lg:mt-0 p-6 bg-gray-100 rounded-lg shadow-md">
        <h3 className="text-center font-semibold text-[#333333] mb-2">Historique des évaluations</h3>
        <div className="space-y-2">
          {ratingsHistory.length > 0 ? (
            ratingsHistory.map((rating, index) => (
              <div key={index} className="flex justify-center text-sm text-[#333333]">
                <span>{`Évaluation ${index + 1}: ${rating} étoiles`}</span>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">Aucune évaluation enregistrée.</div>
          )}
        </div>
    
        <button 
          className="mt-4 w-full bg-[#7B61FF] text-white py-2 rounded-lg"
          onClick={handleReset}
        >
          Réinitialiser
        </button>
      </div>

    </div>
  );
};

export default Card;
