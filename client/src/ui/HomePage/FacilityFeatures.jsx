import { FaAmbulance } from 'react-icons/fa';
import { FaHandHoldingHeart } from 'react-icons/fa6';
import { FaXRay } from 'react-icons/fa';
import { FaUserNurse } from 'react-icons/fa6';
import { GiLoveInjection } from 'react-icons/gi';
import { GrYoga } from 'react-icons/gr';

function FacilityFeatures({ children, type }) {
  const base = 'flex rounded-full p-[0.9rem]';
  const styles = {
    1: [`${base} bg-green-300`, <FaAmbulance style={{ color: 'grey' }} />],
    2: [
      `${base} bg-yellow-300`,
      <FaHandHoldingHeart style={{ color: 'green' }} />,
    ],
    3: [`${base} bg-orange-300`, <FaXRay style={{ color: 'black' }} />],
    4: [`${base} bg-lime-400`, <FaUserNurse style={{ color: 'indigo' }} />],
    5: [`${base} bg-blue-400`, <GiLoveInjection style={{ color: 'black' }} />],
    6: [`${base} bg-indigo-400`, <GrYoga style={{ color: 'lime' }} />],
  };
  return (
    <div className="flex flex-row items-center gap-4 text-left">
      <div className={styles[type][0]}>{styles[type][1]}</div>
      <p className="text-lg font-medium text-grey-800 dark:text-grey-200">
        {children}
      </p>
    </div>
  );
}

export default FacilityFeatures;
