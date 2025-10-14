import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// Types
interface Booking {
  id: string;
  vehicleName: string;
  dateRange: string;
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED";
  image: string;
  isUpcoming: boolean;
}

// Mock data
const mockBookings: Booking[] = [
  {
    id: "1",
    vehicleName: "Tesla Model 3",
    dateRange: "May 15 - May 20",
    status: "CONFIRMED",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=200&fit=crop",
    isUpcoming: true,
  },
  {
    id: "2",
    vehicleName: "BMW i4",
    dateRange: "June 10 - June 15",
    status: "CONFIRMED",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=200&fit=crop",
    isUpcoming: true,
  },
  {
    id: "3",
    vehicleName: "Audi e-tron GT",
    dateRange: "April 1 - April 5",
    status: "COMPLETED",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=200&fit=crop",
    isUpcoming: false,
  },
];

// Booking Card Component
const BookingCard: React.FC<{ booking: Booking }> = ({ booking }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "#4CAF50";
      case "COMPLETED":
        return "#9E9E9E";
      case "CANCELLED":
        return "#F44336";
      default:
        return "#9E9E9E";
    }
  };

  const getStatusTextColor = (status: string) => {
    return status === "COMPLETED" ? "#666666" : "#FFFFFF";
  };

  return (
    <View style={styles.bookingCard}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: booking.image }} style={styles.carImage} />
        <View style={styles.imageOverlay}>
          <View style={styles.vehicleInfo}>
            <Text style={styles.vehicleName}>{booking.vehicleName}</Text>
            <Text style={styles.dateRange}>{booking.dateRange}</Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(booking.status) },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                { color: getStatusTextColor(booking.status) },
              ]}
            >
              {booking.status}
            </Text>
          </View>
        </View>
      </View>
      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.viewDetailsButton}>
          <Text style={styles.viewDetailsText}>View Details</Text>
        </TouchableOpacity>
        {booking.isUpcoming && (
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View> */}
    </View>
  );
};

export default function BookingsScreen() {
  const upcomingBookings = mockBookings.filter((booking) => booking.isUpcoming);
  const pastBookings = mockBookings.filter((booking) => !booking.isUpcoming);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Bookings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Upcoming Bookings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming</Text>
          {upcomingBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </View>

        {/* Past Bookings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Past Bookings</Text>
          {pastBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C2C2C",
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C2C2C",
    marginBottom: 16,
  },
  bookingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: "relative",
  },
  carImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 16,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  dateRange: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
  },
  viewDetailsButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  viewDetailsText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#666666",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
