import DoctorsSideDrawer from './DoctorsSideDrawer';
import PatientSideDrawer from './PatientSideDrawer';

function SideDrawer({ Role, onUserClick }) {
  return Role === 'patient' ? (
    <DoctorsSideDrawer onUserClick={onUserClick} />
  ) : (
    <PatientSideDrawer onUserClick={onUserClick} />
  );
}

export default SideDrawer;
