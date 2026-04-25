'use client';

import { useOS } from '../../context/OSContext';
import AppWindow from './AppWindow';

export default function WindowManager() {
  const { state } = useOS();
  if (!state.openApp) return null;
  return <AppWindow />;
}
