import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
        {/* Explore is not a  modal it is normal stack screen */}
        <Stack.Screen
          name="explores"
          options={{ presentation: "card", title: "Explores" }}
        />
        <Stack.Screen
          name="vehicle-details"
          options={{
            title: "Vehicle Details",
            headerStyle: {
              backgroundColor: "#FFFFFF",
            },
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "bold",
              color: "#2C2C2C",
            },
            headerTintColor: "#2C2C2C",
            headerShadowVisible: true,
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
