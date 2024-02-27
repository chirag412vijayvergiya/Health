import { DarkModeProvider } from './Context/DarkModeContext';
import AppLayout from './ui/AppLayout';

function App() {
  return (
    <DarkModeProvider>
      <AppLayout />
    </DarkModeProvider>
  );
}

export default App;
