import { OSProvider } from '../../context/OSContext';
import Desktop from '../../components/os/Desktop';

const VALID_APPS = ['about', 'projects', 'skills', 'contact'];

export default function AppPage({ params }) {
  const appId = VALID_APPS.includes(params.appId) ? params.appId : null;
  return (
    <OSProvider defaultOpenApp={appId}>
      <Desktop />
    </OSProvider>
  );
}

export function generateStaticParams() {
  return VALID_APPS.map((appId) => ({ appId }));
}
