import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  icon: string;
  iconColor: string;
  isUnread: boolean;
}

const notifications: Notification[] = [
  {
    id: "1",
    title: "Booking Confirmation",
    description:
      "Your booking for the Tesla Model S is confirmed for July 15-18.",
    timestamp: "2 mins ago",
    icon: "checkmark",
    iconColor: "#4CAF50",
    isUnread: true,
  },
  {
    id: "2",
    title: "Rental Reminder",
    description: "Your rental of the BMW 3 Series starts in 2 days.",
    timestamp: "1 hour ago",
    icon: "calendar",
    iconColor: "#4CAF50",
    isUnread: true,
  },
  {
    id: "3",
    title: "Special Offer",
    description: "Get 15% off your next rental with code SUMMER15.",
    timestamp: "3 hours ago",
    icon: "percent",
    iconColor: "#9BA1A6",
    isUnread: false,
  },
  {
    id: "4",
    title: "App Update",
    description:
      "New safety features added to the app for a safer rental experience.",
    timestamp: "Yesterday",
    icon: "information",
    iconColor: "#9BA1A6",
    isUnread: false,
  },
  {
    id: "5",
    title: "Payment Confirmation",
    description: "Your payment for the Ford Mustang rental has been processed.",
    timestamp: "July 14",
    icon: "card",
    iconColor: "#9BA1A6",
    isUnread: false,
  },
];

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Notifications List */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {notifications.map((notification, index) => (
          <View key={notification.id}>
            <TouchableOpacity style={styles.notificationItem}>
              <View style={styles.notificationContent}>
                {/* Icon */}
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: notification.iconColor },
                  ]}
                >
                  <Ionicons
                    name={notification.icon as any}
                    size={20}
                    color="white"
                  />
                </View>

                {/* Unread Indicator */}
                {notification.isUnread && <View style={styles.unreadDot} />}

                {/* Content */}
                <View style={styles.textContent}>
                  <Text style={styles.notificationTitle}>
                    {notification.title}
                  </Text>
                  <Text style={styles.notificationDescription}>
                    {notification.description}
                  </Text>
                  <Text style={styles.notificationTimestamp}>
                    {notification.timestamp}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Separator */}
            {index < notifications.length - 1 && (
              <View style={styles.separator} />
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#F5F5F5",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C2C2C",
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  notificationItem: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  notificationContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    position: "relative",
  },
  unreadDot: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4CAF50",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  textContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C2C2C",
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
    color: "#2C2C2C",
    lineHeight: 20,
    marginBottom: 4,
  },
  notificationTimestamp: {
    fontSize: 12,
    color: "#9BA1A6",
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginLeft: 72,
  },
});
