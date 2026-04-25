import { OSProvider } from '../context/OSContext';
import Desktop from '../components/os/Desktop';

export default function HomePage() {
  return (
    <OSProvider>
      <Desktop />
    </OSProvider>
  );
}
