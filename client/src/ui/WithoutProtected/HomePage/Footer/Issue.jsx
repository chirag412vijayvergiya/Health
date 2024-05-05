import { Link } from 'react-router-dom';
function Issue() {
  return (
    <Link to="/issues">
      <p className="fixed bottom-4 right-4 z-[10000000] flex items-center gap-x-3 rounded-l-full rounded-t-full bg-[#2f3a83] p-2 px-6 font-medium text-grey-300 drop-shadow-xl">
        🤔 Facing an issue?
      </p>
    </Link>
  );
}

export default Issue;
