import React, { useState } from 'react';

const HeartButton = () => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  return (
    <div>
      <button onClick={handleLike}>
        {isLiked ? '❤️ Liked' : '🤍 Like'}
      </button>
    </div>
  );
};

export default HeartButton;