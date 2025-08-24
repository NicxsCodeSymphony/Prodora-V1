import { ScreenContent } from '../components/ScreenContent';
import { StatusBar } from 'expo-status-bar';

export default function HomePage() {
  return (
    <>
      <ScreenContent title="Home" path="app/index.tsx" />
      <StatusBar style="auto" />
    </>
  );
}
