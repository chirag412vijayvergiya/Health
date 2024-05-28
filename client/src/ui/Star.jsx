import StarfilledRating from './WithoutProtected/HomePage/Testimonials/StarfilledRating';
import StarhalfRating from './WithoutProtected/HomePage/Testimonials/StarhalfRating';
import StarblankRating from './WithoutProtected/HomePage/Testimonials/StarblankRating';
import { useRef } from 'react';
function Star({ onRate, full, onHoverIn, onHoverOut, color, size, half }) {
  const starRef = useRef(null);

  const handleMouseMove = (e) => {
    if (starRef.current) {
      const { left, width } = starRef.current.getBoundingClientRect();
      console.log({ left, width });
      const hoverValue = e.clientX - left < width / 2 ? 0.5 : 1;
      onHoverIn(hoverValue);
    }
  };

  const handleClick = (e) => {
    if (starRef.current) {
      const { left, width } = starRef.current.getBoundingClientRect();
      console.log({ left, width });
      const clickValue = e.clientX - left < width / 2 ? 0.5 : 1;
      onRate(clickValue);
    }
  };
  return (
    <span
      ref={starRef}
      role="button"
      onClick={handleClick}
      onMouseEnter={handleMouseMove}
      onMouseLeave={onHoverOut}
      className="h-[23px] w-[23px] md:h-[49px] md:w-[49px]"
    >
      {full ? (
        <StarfilledRating />
      ) : half ? (
        <StarhalfRating />
      ) : (
        <StarblankRating />
      )}
    </span>
  );
}
export default Star;
