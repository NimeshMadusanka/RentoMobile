import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type RentalCategory =
  | "Bike Rental"
  | "Car Rental"
  | "Airport Tour"
  | "Tour Booking"
  | "Surf Packages"
  | "Tour Equipment"
  | "Wedding Car Rent";

export interface RentalSpecifications {
  /** Numeric seat count (e.g., 2, 5, 7, 14) */
  seats?: number;
  /** Number of helmets provided (for bikes) */
  helmets?: number;
  /** Fuel type label (e.g., "92 Petrol", "Diesel", "95 Octane") */
  fuel?: string;
  /** Transmission type */
  transmission?: "Automatic" | "Manual";
  /** Optional mileage text */
  mileage?: string;
}

export interface RentalItem {
  /** Unique identifier */
  id: string;

  /** Display name of the rental/tour item */
  name: string;

  /** Category constrained to known values from your dataset */
  category: RentalCategory;

  /** Display price text (e.g., "Rs.2,000/Per Day", "Contact Us for price", "LKR 25,000") */
  price: string;

  /**
   * Optional numeric price for calculations (when known).
   * Use `null` or omit when price is "Contact for price".
   */
  priceValue?: number | null;

  /** Human-readable seats label (e.g., "2 seats", "7 seats") */
  seats?: string;

  /** Optional location (present for Surf Packages / Tour Equipment / Wedding Car Rent) */
  location?: string;

  /** Primary image URL or require() result */
  image: string | number;

  /** Gallery image URLs */
  images: string[];

  /** Optional description text */
  description?: string;

  /** Technical specs (varies by category) */
  specifications?: RentalSpecifications;
}

const categories = [
  "Bike Rental",
  "Car Rental",
  "Airport Tour",
  "Tour Booking",
  "Surf Packages",
  "Tour Equipment",
];

const rentalData: RentalItem[] = [
  // 🏍 Bike Rentals
  {
    id: "1",
    name: "TVS Ntorq 135CC",
    category: "Bike Rental",
    price: "Rs.2,500/Per Day",
    seats: "2 seats",
    image: require("../assets/images/Bike List/TVS Ntorq 135CC/1.jpg"),
    images: [
      require("../assets/images/Bike List/TVS Ntorq 135CC/1.jpg"),
      require("../assets/images/Bike List/TVS Ntorq 135CC/2.jpg"),
      require("../assets/images/Bike List/TVS Ntorq 135CC/3.jpg"),
    ],
    description: "",
    specifications: {
      seats: 2,
      helmets: 2,
      fuel: "92 Petrol",
      transmission: "Automatic",
    },
  },
  {
    id: "2",
    name: "Bajaj Pulsar 150CC",
    category: "Bike Rental",
    price: "Rs.2,000/Per Day",
    seats: "2 seats",
    image: require("../assets/images/Bike List/Bajaj Pulsar 150CC/1.jpg"),
    images: [
      require("../assets/images/Bike List/Bajaj Pulsar 150CC/1.jpg"),
      require("../assets/images/Bike List/Bajaj Pulsar 150CC/2.jpg"),
      require("../assets/images/Bike List/Bajaj Pulsar 150CC/3.jpg"),
    ],
    description: "",
    specifications: {
      seats: 2,
      helmets: 2,
      fuel: "92 Petrol",
      transmission: "Manual",
    },
  },
  {
    id: "3",
    name: "Honda Navi 109CC",
    category: "Bike Rental",
    price: "Rs.1,800/Per Day",
    seats: "2 seats",
    image: require("../assets/images/Bike List/Honda Navi 109CC/1.jpg"),
    images: [
      require("../assets/images/Bike List/Honda Navi 109CC/1.jpg"),
      require("../assets/images/Bike List/Honda Navi 109CC/2.jpg"),
      require("../assets/images/Bike List/Honda Navi 109CC/3.jpg"),
    ],
    description: "",
    specifications: {
      seats: 2,
      helmets: 2,
      fuel: "92 Petrol",
      transmission: "Manual",
    },
  },
  {
    id: "4",
    name: "Yamaha RayZr 160CC",
    category: "Bike Rental",
    price: "Rs.2,000/Per Day",
    seats: "2 seats",
    image: require("../assets/images/Bike List/Yamaha RayZr 160CC/1.jpg"),
    images: [
      require("../assets/images/Bike List/Yamaha RayZr 160CC/1.jpg"),
      require("../assets/images/Bike List/Yamaha RayZr 160CC/2.jpg"),
      require("../assets/images/Bike List/Yamaha RayZr 160CC/3.jpg"),
    ],
    description: "",
    specifications: {
      seats: 2,
      helmets: 2,
      fuel: "92 Petrol",
      transmission: "Automatic",
    },
  },
  {
    id: "5",
    name: "Honda Dio 110CC",
    category: "Bike Rental",
    price: "Rs.2,000/Per Day",
    seats: "2 seats",
    image: require("../assets/images/Bike List/Honda Dio 110CC/1.jpg"),
    images: [
      require("../assets/images/Bike List/Honda Dio 110CC/1.jpg"),
      require("../assets/images/Bike List/Honda Dio 110CC/2.jpg"),
      require("../assets/images/Bike List/Honda Dio 110CC/3.jpg"),
    ],
    description: "",
    specifications: {
      seats: 2,
      helmets: 2,
      fuel: "92 Petrol",
      transmission: "Automatic",
    },
  },

  // 🚗 Car Rentals
  {
    id: "7",
    name: "Suzuki Every",
    category: "Car Rental",
    price: "Contact for price",
    seats: "7 seats",
    image: require("../assets/images/Car List/Suzuki Every/1.jpg"),
    images: [
      require("../assets/images/Car List/Suzuki Every/1.jpg"),
      require("../assets/images/Car List/Suzuki Every/2.jpg"),
      require("../assets/images/Car List/Suzuki Every/3.jpg"),
    ],
    description: "",
    specifications: {
      seats: 7,
      fuel: "95 Octane",
      transmission: "Automatic",
    },
  },
  {
    id: "8",
    name: "Toyota Hilux",
    category: "Car Rental",
    price: "Contact for price",
    seats: "5 seats",
    image: require("../assets/images/Car List/Toyota Hilux/1.jpg"),
    images: [
      require("../assets/images/Car List/Toyota Hilux/1.jpg"),
      require("../assets/images/Car List/Toyota Hilux/2.jpg"),
      require("../assets/images/Car List/Toyota Hilux/3.jpg"),
    ],
    description: "",
    specifications: {
      seats: 5,
      fuel: "Diesel",
      transmission: "Automatic",
    },
  },
  {
    id: "9",
    name: "Toyota KDH",
    category: "Car Rental",
    price: "Contact for price",
    seats: "14 seats",
    image: require("../assets/images/Car List/Toyota KDH/1.jpg"),
    images: [
      require("../assets/images/Car List/Toyota KDH/1.jpg"),
      require("../assets/images/Car List/Toyota KDH/2.jpg"),
      require("../assets/images/Car List/Toyota KDH/3.jpg"),
    ],
    description: "",
    specifications: {
      seats: 14,
      fuel: "Diesel",
      transmission: "Automatic",
    },
  },
  {
    id: "10",
    name: "Renault Kwid",
    category: "Car Rental",
    price: "Contact for price",
    seats: "5 seats",
    image: require("../assets/images/Car List/Renault Kwid/1.jpg"),
    images: [
      require("../assets/images/Car List/Renault Kwid/1.jpg"),
      require("../assets/images/Car List/Renault Kwid/2.jpg"),
      require("../assets/images/Car List/Renault Kwid/3.jpg"),
    ],
    description: "",
    specifications: {
      seats: 5,
      fuel: "92 Octane",
      transmission: "Manual",
    },
  },
  {
    id: "11",
    name: "Honda Fit Shuttle",
    category: "Car Rental",
    price: "Contact for price",
    seats: "5 seats",
    image: require("../assets/images/Car List/Honda Fit Shuttle/1.jpg"),
    images: [
      require("../assets/images/Car List/Honda Fit Shuttle/1.jpg"),
      require("../assets/images/Car List/Honda Fit Shuttle/2.jpg"),
      require("../assets/images/Car List/Honda Fit Shuttle/3.jpg"),
    ],
    description: "",
    specifications: {
      seats: 5,
      fuel: "92 Octane",
      transmission: "Automatic",
    },
  },
  {
    id: "12",
    name: "Suzuki WagonR",
    category: "Car Rental",
    price: "Contact for price",
    seats: "5 seats",
    image: require("../assets/images/Car List/Suzuki WagonR/1.jpg"),
    images: [
      require("../assets/images/Car List/Suzuki WagonR/1.jpg"),
      require("../assets/images/Car List/Suzuki WagonR/2.jpg"),
      require("../assets/images/Car List/Suzuki WagonR/3.jpg"),
    ],
    description: "",
    specifications: {
      seats: 5,
      fuel: "92 Octane",
      transmission: "Automatic",
    },
  },

  // ✈ Airport Tours
  {
    id: "13",
    name: "Toyota KDH",
    category: "Airport Tour",
    price: "LKR 25,000",
    seats: "7 seats",
    image: require("../assets/images/Car List/Toyota KDH/1.jpg"),
    images: [
      require("../assets/images/Car List/Toyota KDH/1.jpg"),
      require("../assets/images/Car List/Toyota KDH/2.jpg"),
      require("../assets/images/Car List/Toyota KDH/3.jpg"),
    ],
    description: "From Ahangama to Colombo Airport, Sri Lanka",
    specifications: {
      seats: 7,
      fuel: "95 Octane",
      transmission: "Automatic",
    },
  },
  {
    id: "14",
    name: "Toyota Hilux",
    category: "Airport Tour",
    price: "LKR 25,000",
    seats: "5 seats",
    image: require("../assets/images/Car List/Toyota Hilux/1.jpg"),
    images: [
      require("../assets/images/Car List/Toyota Hilux/1.jpg"),
      require("../assets/images/Car List/Toyota Hilux/2.jpg"),
      require("../assets/images/Car List/Toyota Hilux/3.jpg"),
    ],
    description: "From Ahangama to Colombo Airport, Sri Lanka",
    specifications: {
      seats: 5,
      fuel: "Diesel",
      transmission: "Automatic",
    },
  },
  {
    id: "15",
    name: "Toyota KDH",
    category: "Airport Tour",
    price: "LKR 25,000",
    seats: "14 seats",
    image: require("../assets/images/Car List/Toyota KDH/1.jpg"),
    images: [
      require("../assets/images/Car List/Toyota KDH/1.jpg"),
      require("../assets/images/Car List/Toyota KDH/2.jpg"),
      require("../assets/images/Car List/Toyota KDH/3.jpg"),
    ],
    description: "From Ahangama to Colombo Airport, Sri Lanka",
    specifications: {
      seats: 14,
      fuel: "Diesel",
      transmission: "Automatic",
    },
  },
  {
    id: "16",
    name: "Renault Kwid",
    category: "Airport Tour",
    price: "LKR 25,000",
    seats: "5 seats",
    image: require("../assets/images/Car List/Renault Kwid/1.jpg"),
    images: [
      require("../assets/images/Car List/Renault Kwid/1.jpg"),
      require("../assets/images/Car List/Renault Kwid/2.jpg"),
      require("../assets/images/Car List/Renault Kwid/3.jpg"),
    ],
    description: "From Ahangama to Colombo Airport, Sri Lanka",
    specifications: {
      seats: 5,
      fuel: "92 Octane",
      transmission: "Manual",
    },
  },
  {
    id: "17",
    name: "Honda Fit Shuttle",
    category: "Airport Tour",
    price: "LKR 25,000",
    seats: "5 seats",
    image: require("../assets/images/Car List/Honda Fit Shuttle/1.jpg"),
    images: [
      require("../assets/images/Car List/Honda Fit Shuttle/1.jpg"),
      require("../assets/images/Car List/Honda Fit Shuttle/2.jpg"),
      require("../assets/images/Car List/Honda Fit Shuttle/3.jpg"),
    ],
    description: "From Ahangama to Colombo Airport, Sri Lanka",
    specifications: {
      seats: 5,
      fuel: "92 Octane",
      transmission: "Automatic",
    },
  },
  {
    id: "18",
    name: "Suzuki WagonR",
    category: "Airport Tour",
    price: "LKR 25,000",
    seats: "5 seats",
    image: require("../assets/images/Car List/Suzuki WagonR/1.jpg"),
    images: [
      require("../assets/images/Car List/Suzuki WagonR/1.jpg"),
      require("../assets/images/Car List/Suzuki WagonR/2.jpg"),
      require("../assets/images/Car List/Suzuki WagonR/3.jpg"),
    ],
    description: "From Ahangama to Colombo Airport, Sri Lanka",
    specifications: {
      seats: 5,
      fuel: "92 Octane",
      transmission: "Automatic",
    },
  },

  // Tour bookings
  {
    id: "19",
    name: "Ella Sri Lanka",
    category: "Tour Booking",
    price: "Contact Us for price",
    image: require("../assets/images/Tour Booking List/Ella Sri Lanka/1.jpg"),
    images: [
      require("../assets/images/Tour Booking List/Ella Sri Lanka/1.jpg"),
      require("../assets/images/Tour Booking List/Ella Sri Lanka/2.jpg"),
      require("../assets/images/Tour Booking List/Ella Sri Lanka/3.jpg"),
    ],
    description:
      "Lush tea plantations, Nine Arches Bridge, and hiking trails like Little Adam's Peak.",
  },

  {
    id: "20",
    name: "Nuwara Eliya",
    category: "Tour Booking",
    price: "Contact Us for price",
    image: require("../assets/images/Tour Booking List/Nuwara Eliya/1.jpg"),
    images: [
      require("../assets/images/Tour Booking List/Nuwara Eliya/1.jpg"),
      require("../assets/images/Tour Booking List/Nuwara Eliya/2.jpg"),
      require("../assets/images/Tour Booking List/Nuwara Eliya/3.jpg"),
    ],
    description:
      "Cool climate getaway featuring Gregory Lake, colonial buildings, and lush green hills.",
  },

  {
    id: "21",
    name: "Mirissa",
    category: "Tour Booking",
    price: "Contact Us for price",
    image: require("../assets/images/Tour Booking List/Mirissa/1.jpg"),
    images: [
      require("../assets/images/Tour Booking List/Mirissa/1.jpg"),
      require("../assets/images/Tour Booking List/Mirissa/2.jpg"),
      require("../assets/images/Tour Booking List/Mirissa/3.jpg"),
    ],
    description:
      "Coastal paradise perfect for whale watching, beach relaxing, and beginner-friendly surfing waves.",
  },

  {
    id: "22",
    name: "Sigiriya",
    category: "Tour Booking",
    price: "Contact Us for price",
    image: require("../assets/images/Tour Booking List/Sigiriya/1.jpg"),
    images: [
      require("../assets/images/Tour Booking List/Sigiriya/1.jpg"),
      require("../assets/images/Tour Booking List/Sigiriya/2.jpg"),
      require("../assets/images/Tour Booking List/Sigiriya/3.jpg"),
    ],
    description:
      "UNESCO World Heritage Site with ancient rock fortress, gardens, and stunning panoramic views.",
  },

  {
    id: "23",
    name: "Kandy",
    category: "Tour Booking",
    price: "Contact Us for price",
    image: require("../assets/images/Tour Booking List/Kandy/1.jpg"),
    images: [
      require("../assets/images/Tour Booking List/Kandy/1.jpg"),
      require("../assets/images/Tour Booking List/Kandy/2.jpg"),
      require("../assets/images/Tour Booking List/Kandy/3.jpg"),
    ],
    description:
      "Cultural capital home to the Temple of the Tooth and beautiful botanical gardens.",
  },

  {
    id: "24",
    name: "Galle Fort",
    category: "Tour Booking",
    price: "Contact Us for price",
    image: require("../assets/images/Tour Booking List/Galle Fort/1.jpg"),
    images: [
      require("../assets/images/Tour Booking List/Galle Fort/1.jpg"),
      require("../assets/images/Tour Booking List/Galle Fort/2.jpg"),
      require("../assets/images/Tour Booking List/Galle Fort/3.jpg"),
    ],
    description:
      "Historic Dutch fort with charming streets, ocean views, and trendy local cafés.",
  },

  {
    id: "25",
    name: "Ella Sri Lanka",
    category: "Tour Booking",
    price: "Contact Us for price",
    image: require("../assets/images/Tour Booking List/Ella Sri Lanka/1.jpg"),
    images: [
      require("../assets/images/Tour Booking List/Ella Sri Lanka/1.jpg"),
      require("../assets/images/Tour Booking List/Ella Sri Lanka/2.jpg"),
      require("../assets/images/Tour Booking List/Ella Sri Lanka/3.jpg"),
    ],
    description:
      "Wildlife sanctuary offering jeep safaris to spot leopards, elephants, and exotic birds.",
  },

  {
    id: "26",
    name: "Arugam Bay",
    category: "Tour Booking",
    price: "Contact Us for price",
    image: require("../assets/images/Tour Booking List/Arugam Bay/1.jpg"),
    images: [
      require("../assets/images/Tour Booking List/Arugam Bay/1.jpg"),
      require("../assets/images/Tour Booking List/Arugam Bay/2.jpg"),
      require("../assets/images/Tour Booking List/Arugam Bay/3.jpg"),
    ],
    description:
      "Famous surf spot with golden beaches, chill vibes, and a vibrant backpacker scene.",
  },

  {
    id: "27",
    name: "Anuradhapura",
    category: "Tour Booking",
    price: "Contact Us for price",
    image: require("../assets/images/Tour Booking List/Anuradhapura/1.jpg"),
    images: [
      require("../assets/images/Tour Booking List/Anuradhapura/1.jpg"),
      require("../assets/images/Tour Booking List/Anuradhapura/2.jpg"),
      require("../assets/images/Tour Booking List/Anuradhapura/3.jpg"),
    ],
    description:
      "Ancient city filled with Buddhist stupas, sacred sites, and centuries-old archaeological wonders.",
  },

  // Surf Packages
  {
    id: "28",
    name: "Single Surf Package",
    category: "Surf Packages",
    location: "Ahangama, Sri Lanka",
    price: "Contact Us for price",
    image: require("../assets/images/Surf Packages List/Single Surf Package/1.jpg"),
    images: [
      require("../assets/images/Surf Packages List/Single Surf Package/1.jpg"),
      require("../assets/images/Surf Packages List/Single Surf Package/2.jpg"),
      require("../assets/images/Surf Packages List/Single Surf Package/3.jpg"),
    ],
    description:
      "Perfect for beginners or solo adventurers who want focused one-on-one coaching and personalized guidance to ride their first waves.",
  },

  {
    id: "29",
    name: "Couple Surf Package",
    category: "Surf Packages",
    location: "Ahangama, Sri Lanka",
    price: "Contact Us for price",
    image: require("../assets/images/Surf Packages List/Couple Surf Packages/1.jpg"),
    images: [
      require("../assets/images/Surf Packages List/Couple Surf Packages/1.jpg"),
      require("../assets/images/Surf Packages List/Couple Surf Packages/2.jpg"),
      require("../assets/images/Surf Packages List/Couple Surf Packages/3.jpg"),
    ],
    description:
      "Designed for couples or friends who want to share the joy of surfing together with a professional coach by their side.",
  },

  {
    id: "30",
    name: "Group Surf Package (3 People)",
    category: "Surf Packages",
    location: "Ahangama, Sri Lanka",
    price: "Contact Us for price",
    image: require("../assets/images/Surf Packages List/Group Surf Package (3 People)/1.jpg"),
    images: [
      require("../assets/images/Surf Packages List/Group Surf Package (3 People)/1.jpg"),
      require("../assets/images/Surf Packages List/Group Surf Package (3 People)/2.jpg"),
      require("../assets/images/Surf Packages List/Group Surf Package (3 People)/3.jpg"),
    ],
    description:
      "A fun and affordable group package for small teams of three, perfect for bonding while learning surfing basics and catching waves together.",
  },

  {
    id: "31",
    name: "Group Surf Package (6 People)",
    category: "Surf Packages",
    location: "Ahangama, Sri Lanka",
    price: "Contact Us for price",
    image: require("../assets/images/Surf Packages List/Group Surf Package (3 People)/1.jpg"),
    images: [
      require("../assets/images/Surf Packages List/Group Surf Package (3 People)/1.jpg"),
      require("../assets/images/Surf Packages List/Group Surf Package (3 People)/2.jpg"),
      require("../assets/images/Surf Packages List/Group Surf Package (3 People)/3.jpg"),
    ],
    description:
      "Ideal for families or groups of friends — enjoy a day of surfing with multiple coaches, extended hours, and lots of memories captured on camera.",
  },

  // Tour Equipment
  {
    id: "32",
    name: "Surfboard",
    category: "Tour Equipment",
    location: "Ahangama, Sri Lanka",
    price: "Contact Us for price",
    image: require("../assets/images/Tour Equipment List/Surfboard/1.jpg"),
    images: [
      require("../assets/images/Tour Equipment List/Surfboard/1.jpg"),
      require("../assets/images/Tour Equipment List/Surfboard/2.jpg"),
      require("../assets/images/Tour Equipment List/Surfboard/3.jpg"),
    ],
    description:
      "Lightweight fiberglass surfboard, great for beginners and pros.",
  },

  {
    id: "33",
    name: "Tent",
    category: "Tour Equipment",
    location: "Ahangama, Sri Lanka",
    price: "Contact Us for price",
    image: require("../assets/images/Tour Equipment List/Tent/1.jpg"),
    images: [
      require("../assets/images/Tour Equipment List/Tent/1.jpg"),
      require("../assets/images/Tour Equipment List/Tent/2.jpg"),
      require("../assets/images/Tour Equipment List/Tent/3.jpg"),
    ],
    description: "4-person waterproof tent with easy setup.",
  },

  {
    id: "34",
    name: "Portable Gas Cooker",
    category: "Tour Equipment",
    location: "Ahangama, Sri Lanka",
    price: "Contact Us for price",
    image: require("../assets/images/Tour Equipment List/Portable Gas Cooker/1.jpg"),
    images: [
      require("../assets/images/Tour Equipment List/Portable Gas Cooker/1.jpg"),
      require("../assets/images/Tour Equipment List/Portable Gas Cooker/2.jpg"),
      require("../assets/images/Tour Equipment List/Portable Gas Cooker/3.jpg"),
    ],
    description: "Compact stove perfect for outdoor cooking.",
  },

  {
    id: "35",
    name: "Camping Chair",
    category: "Tour Equipment",
    location: "Ahangama, Sri Lanka",
    price: "Contact Us for price",
    image: require("../assets/images/Tour Equipment List/Camping Chair/1.jpg"),
    images: [
      require("../assets/images/Tour Equipment List/Camping Chair/1.jpg"),
      require("../assets/images/Tour Equipment List/Camping Chair/2.jpg"),
      require("../assets/images/Tour Equipment List/Camping Chair/3.jpg"),
    ],
    description: "Foldable and lightweight chair for camping.",
  },

  {
    id: "36",
    name: "Backpack (50L)",
    category: "Tour Equipment",
    location: "Ahangama, Sri Lanka",
    price: "Contact Us for price",
    image: require("../assets/images/Tour Equipment List/BackPack (50L)/1.jpg"),
    images: [
      require("../assets/images/Tour Equipment List/BackPack (50L)/1.jpg"),
      require("../assets/images/Tour Equipment List/BackPack (50L)/2.jpg"),
      require("../assets/images/Tour Equipment List/BackPack (50L)/3.jpg"),
    ],
    description: "Waterproof trekking backpack with multiple compartments.",
  },

  {
    id: "37",
    name: "Sleeping Bag",
    category: "Tour Equipment",
    location: "Ahangama, Sri Lanka",
    price: "Contact Us for price",
    image: require("../assets/images/Tour Equipment List/Sleeping Bag/1.jpg"),
    images: [
      require("../assets/images/Tour Equipment List/Sleeping Bag/1.jpg"),
      require("../assets/images/Tour Equipment List/Sleeping Bag/2.jpg"),
      require("../assets/images/Tour Equipment List/Sleeping Bag/3.jpg"),
    ],
    description: "Warm, all-weather sleeping bag for outdoor nights.",
  },

  // 🚗 Wedding Car Rent
  {
    id: "38",
    name: "Toyota Premio",
    category: "Wedding Car Rent",
    location: "Ahangama, Sri Lanka",
    price: "Contact Us for Price",
    seats: "5 seats",
    image: "",
    images: ["", "", ""],
    description: "",
    specifications: {
      seats: 5,
      fuel: "Petrol",
      transmission: "Automatic",
    },
  },

  {
    id: "39",
    name: "Mercedes-Benz S-Class",
    category: "Wedding Car Rent",
    location: "Ahangama, Sri Lanka",
    price: "Contact Us for Price",
    seats: "4 seats",
    image: "",
    images: ["", "", ""],
    description: "",
    specifications: {
      seats: 4,
      fuel: "Petrol",
      transmission: "Automatic",
    },
  },

  {
    id: "40",
    name: "BMW 7 Series",
    category: "Wedding Car Rent",
    location: "Ahangama, Sri Lanka",
    price: "Contact Us for Price",
    seats: "5 seats",
    image: "",
    images: ["", "", ""],
    description: "",
    specifications: {
      seats: 5,
      fuel: "Petrol",
      transmission: "Automatic",
    },
  },

  {
    id: "41",
    name: "Rolls-Royce Silver Shadow",
    category: "Wedding Car Rent",
    location: "Ahangama, Sri Lanka",
    price: "Contact Us for Price",
    seats: "4 seats",
    image: "",
    images: ["", "", ""],
    description: "",
    specifications: {
      seats: 4,
      fuel: "Petrol",
      transmission: "Automatic",
    },
  },

  {
    id: "42",
    name: "Range Rover Sport",
    category: "Wedding Car Rent",
    location: "Ahangama, Sri Lanka",
    price: "Contact Us for Price",
    seats: "5 seats",
    image: "",
    images: ["", "", ""],
    description: "",
    specifications: {
      seats: 5,
      fuel: "Petrol",
      transmission: "Automatic",
    },
  },

  {
    id: "43",
    name: "Toyota Land Cruiser Prado",
    category: "Wedding Car Rent",
    location: "Ahangama, Sri Lanka",
    price: "Contact Us for Price",
    seats: "7 seats",
    image: "",
    images: ["", "", ""],
    description: "",
    specifications: {
      seats: 7,
      fuel: "Petrol",
      transmission: "Automatic",
    },
  },
];

export default function RentalListing() {
  const [selectedCategory, setSelectedCategory] = useState("Car Rental");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = rentalData.filter((item) => {
    const matchesCategory = item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Function to check if profile data is complete
  const checkProfileData = async (): Promise<boolean> => {
    try {
      const savedProfile = await AsyncStorage.getItem("userProfile");
      if (!savedProfile) {
        return false;
      }

      const profile = JSON.parse(savedProfile);
      // Check if required fields are filled
      return !!(
        profile.name &&
        profile.name.trim() &&
        profile.email &&
        profile.email.trim()
      );
    } catch (error) {
      console.error("Error checking profile data:", error);
      return false;
    }
  };

  const handleRentNow = async (item: RentalItem) => {
    const isProfileComplete = await checkProfileData();

    if (!isProfileComplete) {
      Alert.alert(
        "Profile Required",
        "Please complete your profile information before renting. This helps us provide better service.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              // Navigate to profile tab
              router.push("/(tabs)/profile");
            },
          },
        ]
      );
      return;
    }

    // If profile is complete, proceed with normal flow
    // Use different navigation methods for iOS to prevent tab bar issues
    if (Platform.OS === "ios") {
      // Add a small delay for iOS to ensure proper navigation state
      setTimeout(() => {
        router.push({
          pathname: "/vehicle-details",
          params: {
            vehicleData: JSON.stringify(item),
          },
        });
      }, 100);
    } else {
      router.push({
        pathname: "/vehicle-details",
        params: {
          vehicleData: JSON.stringify(item),
        },
      });
    }
  };

  const renderRentalItem = ({ item }: { item: RentalItem }) => (
    <View style={styles.rentalCard}>
      <View style={styles.rentalInfo}>
        <Text style={styles.seatsText}>{item.seats}</Text>
        <Text style={styles.rentalName}>{item.name}</Text>
        <Text style={styles.rentalPrice}>{item.price}</Text>
        <TouchableOpacity
          style={styles.rentButton}
          onPress={() => handleRentNow(item)}
        >
          <Text style={styles.rentButtonText}>Rent Now</Text>
          <Ionicons name="arrow-forward" size={16} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.rentalImageContainer}>
        <Image
          source={
            typeof item.image === "string" ? { uri: item.image } : item.image
          }
          style={styles.rentalImage}
        />
      </View>
    </View>
  );

  const renderCategoryButton = (category: string) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryButton,
        selectedCategory === category && styles.selectedCategoryButton,
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text
        style={[
          styles.categoryButtonText,
          selectedCategory === category && styles.selectedCategoryButtonText,
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed white background area with header, search, and categories */}
      <View style={styles.fixedHeaderArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Rental Listing</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#4CAF50" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search vehicle"
              placeholderTextColor="#81C784"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map(renderCategoryButton)}
        </ScrollView>
      </View>

      {/* Scrollable content area */}
      <FlatList
        data={filteredData}
        renderItem={renderRentalItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        style={styles.flatListContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  fixedHeaderArea: {
    backgroundColor: "#fff",
    zIndex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    height: 60,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    height: 70,
    justifyContent: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E8",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    height: 45,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#2E7D32",
  },
  categoriesContainer: {
    backgroundColor: "#fff",
    paddingBottom: 15,
    height: 60,
  },
  categoriesContent: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    backgroundColor: "#E8F5E8",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCategoryButton: {
    backgroundColor: "#4CAF50",
  },
  categoryButtonText: {
    color: "#2E7D32",
    fontWeight: "500",
    fontSize: 14,
  },
  selectedCategoryButtonText: {
    color: "#fff",
  },
  flatListContainer: {
    flex: 1,
  },
  listContainer: {
    padding: 20,
  },
  rentalCard: {
    backgroundColor: "#E8F5E8",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  rentalInfo: {
    flex: 1,
    marginRight: 15,
  },
  seatsText: {
    color: "#2E7D32",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
  },
  rentalName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  rentalPrice: {
    fontSize: 16,
    color: "#000",
    marginBottom: 10,
  },
  rentButton: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  rentButtonText: {
    color: "#fff",
    fontWeight: "600",
    marginRight: 5,
  },
  rentalImageContainer: {
    width: 80,
    height: 80,
  },
  rentalImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
