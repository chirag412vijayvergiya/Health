import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

function StarRating({ filled, half }) {
  return (
    <div className="inline-block">
      {filled ? (
        <FaStar className="text-yellow-500" />
      ) : half ? (
        <FaStarHalfAlt className="text-yellow-500" />
      ) : (
        <FaStar className="text-gray-400" />
      )}
    </div>
  );
}

export default StarRating;
