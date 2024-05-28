import { useState } from 'react';
import Star from './Star';

function StarRating({
  maxRating = 5,
  color = '#fcc419',
  size = 48,
  className = '',
  messages = [],
  defaultRating = 0,
  onSetRating,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);
  function handleRating(rating) {
    setRating(rating);
    onSetRating(rating);
  }

  return (
    <div className="m-auto flex items-center gap-[8px] md:gap-[16px]">
      <div className="flex items-center">
        {Array.from({ length: maxRating }, (_, i) => {
          return (
            <Star
              key={i}
              full={(tempRating ? tempRating : rating) >= i + 1}
              half={
                (tempRating ? tempRating : rating) >= i + 0.5 &&
                (tempRating ? tempRating : rating) < i + 1
              }
              onRate={(value) => handleRating(i + value)}
              onHoverIn={(value) => setTempRating(i + value)}
              onHoverOut={() => setTempRating(0)}
              color={color}
              size={size}
            />
          );
        })}
        <div className="w-[30px] p-1 md:w-[45px]">
          <p className="ml-5 text-base md:text-xl">
            {messages.length === maxRating
              ? messages[tempRating ? Math.ceil(tempRating) - 1 : rating - 1]
              : tempRating || rating || ''}
          </p>
        </div>
      </div>
    </div>
  );
}

export default StarRating;
