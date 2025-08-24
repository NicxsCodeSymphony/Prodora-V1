import { Stack } from 'expo-router';
import { PortalHost } from '~/components/ui/portal';
import '~/global.css';

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home', headerShown: false }} />
      </Stack>
      <PortalHost />
    </>
  );
}
