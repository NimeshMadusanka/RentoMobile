import SplashScreen from "@/components/splash-screen";
import { router } from "expo-router";
import React, { useEffect } from "react";

export default function Splash() {
  useEffect(() => {
    // Simulate loading time and then navigate to main app
    const timer = setTimeout(() => {
      router.replace("/(tabs)");
    }, 13000); // Show splash for 13 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    router.replace("/(tabs)");
  };

  return <SplashScreen onGetStarted={handleGetStarted} />;
}
