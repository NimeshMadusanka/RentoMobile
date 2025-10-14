import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

interface VehicleDetails {
  id: string;
  name: string;
  category: string;
  price: string;
  priceValue: number;
  description: string;
  images: string[];
  specifications: {
    seats: number;
    fuel: string;
    transmission: string;
    mileage: string;
  };
}

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

// Default fallback vehicle data
const defaultVehicle: VehicleDetails = {
  id: "1",
  name: "Luxury Sedan",
  category: "Car Rental",
  price: "$250/day",
  priceValue: 250,
  description:
    "Experience the ultimate in comfort and style with our luxury sedan. Perfect for business trips or special occasions, this vehicle offers premium features and a smooth ride.",
  images: [
    "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
  ],
  specifications: {
    seats: 5,
    fuel: "Gasoline",
    transmission: "Automatic",
    mileage: "25 MPG",
  },
};

const CalendarComponent: React.FC<{
  selectedRange: DateRange;
  onDateSelect: (date: Date) => void;
}> = ({ selectedRange, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const today = new Date();
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const days = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayWeekday; i++) {
    days.push(null);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }

  const isDateInRange = (date: Date) => {
    if (!selectedRange.startDate || !selectedRange.endDate) return false;
    return date >= selectedRange.startDate && date <= selectedRange.endDate;
  };

  const isDateSelected = (date: Date) => {
    if (selectedRange.startDate && !selectedRange.endDate) {
      return date.getTime() === selectedRange.startDate.getTime();
    }
    if (selectedRange.startDate && selectedRange.endDate) {
      return (
        date.getTime() === selectedRange.startDate.getTime() ||
        date.getTime() === selectedRange.endDate.getTime()
      );
    }
    return false;
  };

  const isDateDisabled = (date: Date) => {
    return date < today;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth);
    if (direction === "prev") {
      newMonth.setMonth(month - 1);
    } else {
      newMonth.setMonth(month + 1);
    }
    setCurrentMonth(newMonth);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.calendarHeader}>
        <TouchableOpacity onPress={() => navigateMonth("prev")}>
          <Ionicons name="chevron-back" size={20} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={styles.calendarTitle}>
          {monthNames[month]} {year}
        </Text>
        <TouchableOpacity onPress={() => navigateMonth("next")}>
          <Ionicons name="chevron-forward" size={20} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <View style={styles.weekDaysContainer}>
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <Text key={index} style={styles.weekDayText}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.calendarGrid}>
        {days.map((date, index) => {
          if (!date) {
            return <View key={index} style={styles.calendarDay} />;
          }

          const isDisabled = isDateDisabled(date);
          const isInRange = isDateInRange(date);
          const isSelected = isDateSelected(date);

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.calendarDay,
                isInRange && styles.calendarDayInRange,
                isSelected && styles.calendarDaySelected,
                isDisabled && styles.calendarDayDisabled,
              ]}
              onPress={() => !isDisabled && onDateSelect(date)}
              disabled={isDisabled}
            >
              <Text
                style={[
                  styles.calendarDayText,
                  isSelected && styles.calendarDayTextSelected,
                  isDisabled && styles.calendarDayTextDisabled,
                ]}
              >
                {date.getDate()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default function VehicleDetailsScreen() {
  const { vehicleData } = useLocalSearchParams();
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Parse the vehicle data from params or use default
  const vehicle: VehicleDetails = vehicleData
    ? JSON.parse(vehicleData as string)
    : defaultVehicle;

  const handleDateSelect = (date: Date) => {
    if (
      !selectedRange.startDate ||
      (selectedRange.startDate && selectedRange.endDate)
    ) {
      // Start new selection
      setSelectedRange({ startDate: date, endDate: null });
    } else if (selectedRange.startDate && !selectedRange.endDate) {
      // Complete the range
      if (date > selectedRange.startDate) {
        setSelectedRange({ startDate: selectedRange.startDate, endDate: date });
      } else {
        setSelectedRange({ startDate: date, endDate: selectedRange.startDate });
      }
    }
  };

  const openWhatsApp = (booking: any) => {
    const phoneNumber = "94767806639"; // WhatsApp business number
    const message = `Hello! I would like to confirm my booking:

🚗 *Vehicle:* ${booking.vehicleName}
📅 *Date Range:* ${booking.dateRange}
💰 *Price:* $${booking.price}/day
📱 *Booking ID:* ${booking.id}

Please confirm this booking and provide any additional information needed.

Thank you!`;

    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    const webWhatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    if (Platform.OS === "web") {
      // For web, open WhatsApp Web
      window.open(webWhatsappUrl, "_blank");
    } else {
      // For mobile, try WhatsApp app first, then fallback to web
      Linking.canOpenURL(whatsappUrl)
        .then((supported) => {
          if (supported) {
            return Linking.openURL(whatsappUrl);
          } else {
            // Fallback to WhatsApp Web
            return Linking.openURL(webWhatsappUrl);
          }
        })
        .catch((err) => {
          console.error("Error opening WhatsApp:", err);
          // Fallback to WhatsApp Web
          Linking.openURL(webWhatsappUrl);
        });
    }
  };

  const handleBookNow = async () => {
    if (!selectedRange.startDate || !selectedRange.endDate) {
      if (Platform.OS === "web") {
        alert(
          "Please select a date range\n\nChoose your rental start and end dates."
        );
      } else {
        Alert.alert(
          "Please select a date range",
          "Choose your rental start and end dates."
        );
      }
      return;
    }

    try {
      const booking = {
        id: Date.now().toString(),
        vehicleName: vehicle.name,
        vehicleType: vehicle.category,
        price: vehicle.priceValue,
        startDate: selectedRange.startDate.toISOString(),
        endDate: selectedRange.endDate.toISOString(),
        dateRange: `${selectedRange.startDate.toLocaleDateString()} - ${selectedRange.endDate.toLocaleDateString()}`,
        status: "CONFIRMED",
        image: vehicle.images[0],
        isUpcoming: true,
        createdAt: new Date().toISOString(),
      };

      // Get existing bookings
      const existingBookings = await AsyncStorage.getItem("bookings");
      const bookings = existingBookings ? JSON.parse(existingBookings) : [];

      // Add new booking
      bookings.push(booking);

      // Save to AsyncStorage
      await AsyncStorage.setItem("bookings", JSON.stringify(bookings));

      if (Platform.OS === "web") {
        alert(
          `Booking Confirmed!\n\nYour ${vehicle.name} rental has been booked for ${booking.dateRange}\n\nOpening WhatsApp to confirm your booking...`
        );
        // Reset selection
        setSelectedRange({ startDate: null, endDate: null });
        // Open WhatsApp
        setTimeout(() => {
          openWhatsApp(booking);
        }, 1000);
      } else {
        Alert.alert(
          "Booking Confirmed!",
          `Your ${vehicle.name} rental has been booked for ${booking.dateRange}\n\nOpening WhatsApp to confirm your booking...`,
          [
            {
              text: "Open WhatsApp",
              onPress: () => {
                // Reset selection
                setSelectedRange({ startDate: null, endDate: null });
                // Open WhatsApp
                openWhatsApp(booking);
              },
            },
            {
              text: "Cancel",
              onPress: () => {
                // Reset selection
                setSelectedRange({ startDate: null, endDate: null });
              },
            },
          ]
        );
      }
    } catch (error) {
      console.error("Error saving booking:", error);
      if (Platform.OS === "web") {
        alert("Error\n\nFailed to save booking. Please try again.");
      } else {
        Alert.alert("Error", "Failed to save booking. Please try again.");
      }
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === vehicle.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? vehicle.images.length - 1 : prev - 1
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Gallery */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: vehicle.images[currentImageIndex] }}
            style={styles.mainImage}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.imageNavLeft} onPress={prevImage}>
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageNavRight} onPress={nextImage}>
            <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.imageIndicators}>
            {vehicle.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === currentImageIndex && styles.activeIndicator,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Vehicle Info */}
        <View style={styles.vehicleInfo}>
          <Text style={styles.vehicleName}>{vehicle.name}</Text>
          <Text style={styles.vehiclePrice}>{vehicle.price}</Text>
          <Text style={styles.vehicleDescription}>{vehicle.description}</Text>
        </View>

        {/* Specifications */}
        <View style={styles.specificationsSection}>
          <Text style={styles.sectionTitle}>Specifications</Text>
          <View style={styles.specsGrid}>
            <View style={styles.specCard}>
              <Text style={styles.specLabel}>Seats</Text>
              <Text style={styles.specValue}>
                {vehicle.specifications.seats}
              </Text>
            </View>
            <View style={styles.specCard}>
              <Text style={styles.specLabel}>Fuel</Text>
              <Text style={styles.specValue}>
                {vehicle.specifications.fuel}
              </Text>
            </View>
            <View style={styles.specCard}>
              <Text style={styles.specLabel}>Transmission</Text>
              <Text style={styles.specValue}>
                {vehicle.specifications.transmission}
              </Text>
            </View>
            <View style={styles.specCard}>
              <Text style={styles.specLabel}>Mileage</Text>
              <Text style={styles.specValue}>
                {vehicle.specifications.mileage}
              </Text>
            </View>
          </View>
        </View>

        {/* Availability Calendar */}
        <View style={styles.availabilitySection}>
          <Text style={styles.sectionTitle}>Availability</Text>
          <CalendarComponent
            selectedRange={selectedRange}
            onDateSelect={handleDateSelect}
          />
        </View>

        {/* Book Now Button */}
        <TouchableOpacity style={styles.bookNowButton} onPress={handleBookNow}>
          <Text style={styles.bookNowText}>Book Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: "relative",
    height: 250,
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  imageNavLeft: {
    position: "absolute",
    left: 16,
    top: "50%",
    transform: [{ translateY: -12 }],
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 8,
  },
  imageNavRight: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: [{ translateY: -12 }],
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 8,
  },
  imageIndicators: {
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  activeIndicator: {
    backgroundColor: "#FFFFFF",
  },
  vehicleInfo: {
    padding: 20,
  },
  vehicleName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C2C2C",
    marginBottom: 8,
  },
  vehiclePrice: {
    fontSize: 18,
    color: "#4CAF50",
    marginBottom: 16,
  },
  vehicleDescription: {
    fontSize: 16,
    color: "#666666",
    lineHeight: 24,
  },
  specificationsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C2C2C",
    marginBottom: 16,
  },
  specsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  specCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    width: (width - 64) / 2,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  specLabel: {
    fontSize: 14,
    color: "#4CAF50",
    marginBottom: 4,
  },
  specValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C2C2C",
  },
  availabilitySection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  calendarContainer: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  calendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C2C2C",
  },
  weekDaysContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  weekDayText: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "600",
    width: 40,
    textAlign: "center",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  calendarDay: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
  },
  calendarDayInRange: {
    backgroundColor: "#E8F5E8",
  },
  calendarDaySelected: {
    backgroundColor: "#4CAF50",
    borderRadius: 20,
  },
  calendarDayDisabled: {
    opacity: 0.3,
  },
  calendarDayText: {
    fontSize: 16,
    color: "#2C2C2C",
  },
  calendarDayTextSelected: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  calendarDayTextDisabled: {
    color: "#CCCCCC",
  },
  bookNowButton: {
    backgroundColor: "#4CAF50",
    marginHorizontal: 20,
    marginBottom: 32,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  bookNowText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
