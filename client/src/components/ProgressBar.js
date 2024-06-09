import React from 'react';

const ProgressBar = ({ progress }) => {
  // Determine color based on progress completion
  const getColor = (progress) => {
    if (progress >= 75) {
      return 'rgb(144, 238, 144)'; // Light Green
    } else if (progress >= 50) {
      return 'rgb(135, 206, 250)'; // Light Blue
    } else if (progress >= 25) {
      return 'rgb(255, 255, 153)'; // Light Yellow
    } else {
      return 'rgb(255, 160, 122)'; // Light Salmon
    }
  };

  const color = getColor(progress); // Get color based on progress

  return (
    <div className='outer-bar'>
      <div className='inner-bar' style={{ width: `${progress}%`, backgroundColor: color }}></div>
    </div>
  );
};

export default ProgressBar;
