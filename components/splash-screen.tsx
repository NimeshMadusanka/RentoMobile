import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

interface SplashScreenProps {
  onGetStarted?: () => void;
}

export default function SplashScreen({ onGetStarted }: SplashScreenProps) {
  return (
    <View style={styles.container}>
      {/* Background Image with Gradient Overlay */}
      <ImageBackground
        source={{
          uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAcYzL5vWZJZFZN-WcCON2Lzy3LH0xzVeY8RoN0qclVxGtICKTwV38d4G_NvYP4PqyoSoaypW4qMQENPM8BXu_-fEeQm2ocuLH671EX1Q91r1-z1YATkkQX_pqymci5XDzvNtv4nOzBo_7ClcKh5iRLgoFdqnsRjnRH2eP_LGSUTIV2J4RKql2S6lE6OwIWkkKYpJYtggZMvK98C0EabHBNvpKJx4bR34bZhPrn6VIfw2tOiirGZkYkKIEMRMHt6dCwqRRL8DTUdY",
        }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[
            "transparent",
            "rgba(245, 245, 245, 0.3)",
            "rgba(245, 245, 245, 0.8)",
            "#F5F5F5",
          ]}
          locations={[0, 0.3, 0.6, 1]}
          style={styles.gradient}
        />
      </ImageBackground>

      {/* Content Container */}
      <View style={styles.contentContainer}>
        {/* Car Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="car" size={40} color="#4CAF50" />
          </View>
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Drive with Freedom</Text>
          <Text style={styles.subheading}>
            Your journey begins here. Find the perfect vehicle for your next
            adventure.
          </Text>
        </View>

        {/* Get Started Button */}
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={onGetStarted}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.6,
    width: width,
  },
  gradient: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginTop: 100,
    marginBottom: 30,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E8F5E8",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textContainer: {
    alignItems: "center",
    maxWidth: 300,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2C2C2C",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  subheading: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    lineHeight: 22,
    fontWeight: "400",
  },
  getStartedButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 25,
    marginTop: 40,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  getStartedText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});
