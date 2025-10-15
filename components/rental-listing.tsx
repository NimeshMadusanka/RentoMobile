import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface RentalItem {
  id: string;
  name: string;
  category: string;
  price: string;
  priceValue: number; // Numeric price for calculations
  seats?: string;
  image: string;
  images: string[]; // Multiple images for gallery
  description?: string;
  specifications: {
    seats: number;
    fuel: string;
    transmission: string;
    mileage: string;
  };
}

const categories = [
  "Car Rental",
  "Bike Rental",
  "Wedding Cars",
  "Camera Equipment",
  "Tour Equipment",
  "Surf Package",
  "Tour Packages",
];

// Helper function to add missing properties to rental items
const addMissingProperties = (item: any): RentalItem => {
  const getSpecifications = (category: string, seats: string) => {
    switch (category) {
      case "Bike Rental":
        return {
          seats: parseInt(seats?.split(" ")[0]) || 1,
          fuel: "Human Power",
          transmission: "Multi-speed",
          mileage: "N/A",
        };
      case "Camera Equipment":
        return {
          seats: 1,
          fuel: "Battery",
          transmission: "Manual",
          mileage: "N/A",
        };
      case "Tour Equipment":
        return {
          seats: parseInt(seats?.split(" ")[0]) || 1,
          fuel: "N/A",
          transmission: "Manual",
          mileage: "N/A",
        };
      case "Surf Package":
        return {
          seats: parseInt(seats?.split(" ")[0]) || 1,
          fuel: "N/A",
          transmission: "Manual",
          mileage: "N/A",
        };
      case "Tour Packages":
        return {
          seats: parseInt(seats?.split(" ")[0]) || 1,
          fuel: "N/A",
          transmission: "N/A",
          mileage: "N/A",
        };
      default: // Car Rental, Wedding Cars
        return {
          seats: parseInt(seats?.split(" ")[0]) || 4,
          fuel: "Gasoline",
          transmission: "Automatic",
          mileage: "25 MPG",
        };
    }
  };

  return {
    ...item,
    priceValue: parseInt(item.price.replace("$", "").replace("/day", "")),
    images: [item.image, item.image, item.image], // Use same image for gallery
    description:
      item.description || `${item.name} - Perfect for your rental needs.`,
    specifications: getSpecifications(item.category, item.seats),
  };
};

const rentalData: RentalItem[] = [
  // Car Rental
  {
    id: "1",
    name: "Toyota Camry",
    category: "Car Rental",
    price: "$45/day",
    priceValue: 45,
    seats: "4 seats",
    image: "https://images.unsplash.com/photo-1549317336-206569e8475c?w=400",
    images: [
      "https://images.unsplash.com/photo-1549317336-206569e8475c?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop",
    ],
    description:
      "Reliable and fuel-efficient sedan perfect for city driving and long trips. Comfortable interior with modern features.",
    specifications: {
      seats: 4,
      fuel: "Gasoline",
      transmission: "Automatic",
      mileage: "28 MPG",
    },
  },
  {
    id: "2",
    name: "Honda Civic",
    category: "Car Rental",
    price: "$50/day",
    priceValue: 50,
    seats: "5 seats",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1549317336-206569e8475c?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
    ],
    description:
      "Sporty and efficient compact car with excellent handling and modern technology features.",
    specifications: {
      seats: 5,
      fuel: "Gasoline",
      transmission: "Automatic",
      mileage: "32 MPG",
    },
  },
  {
    id: "3",
    name: "Ford Focus",
    category: "Car Rental",
    price: "$55/day",
    priceValue: 55,
    seats: "5 seats",
    image: "https://images.unsplash.com/photo-1549317336-206569e8475c?w=400",
    images: [
      "https://images.unsplash.com/photo-1549317336-206569e8475c?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
    ],
    description:
      "Versatile hatchback with spacious interior and advanced safety features for urban and highway driving.",
    specifications: {
      seats: 5,
      fuel: "Gasoline",
      transmission: "Manual",
      mileage: "30 MPG",
    },
  },
  {
    id: "4",
    name: "BMW 3 Series",
    category: "Car Rental",
    price: "$80/day",
    priceValue: 80,
    seats: "5 seats",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1606152421802-db97b9c7a11a?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop",
    ],
    description:
      "Luxury sedan with premium features, excellent performance, and sophisticated design for business and leisure.",
    specifications: {
      seats: 5,
      fuel: "Gasoline",
      transmission: "Automatic",
      mileage: "26 MPG",
    },
  },
  {
    id: "5",
    name: "Mercedes C-Class",
    category: "Car Rental",
    price: "$90/day",
    priceValue: 90,
    seats: "5 seats",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
    ],
    description:
      "Premium luxury sedan with cutting-edge technology, superior comfort, and exceptional performance.",
    specifications: {
      seats: 5,
      fuel: "Gasoline",
      transmission: "Automatic",
      mileage: "24 MPG",
    },
  },
  {
    id: "6",
    name: "Audi A4",
    category: "Car Rental",
    price: "$85/day",
    priceValue: 85,
    seats: "5 seats",
    image: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11a?w=400",
    images: [
      "https://images.unsplash.com/photo-1606152421802-db97b9c7a11a?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
    ],
    description:
      "Sophisticated luxury sedan with quattro all-wheel drive, premium interior, and advanced driver assistance.",
    specifications: {
      seats: 5,
      fuel: "Gasoline",
      transmission: "Automatic",
      mileage: "25 MPG",
    },
  },
  // Bike Rental
  {
    id: "7",
    name: "Mountain Bike",
    category: "Bike Rental",
    price: "$25/day",
    priceValue: 25,
    seats: "1 seat",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
    ],
    description:
      "Durable mountain bike perfect for off-road adventures and trail riding.",
    specifications: {
      seats: 1,
      fuel: "Human Power",
      transmission: "Multi-speed",
      mileage: "N/A",
    },
  },
  {
    id: "8",
    name: "Road Bike",
    category: "Bike Rental",
    price: "$30/day",
    priceValue: 30,
    seats: "1 seat",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
    ],
    description:
      "Lightweight road bike designed for speed and efficiency on paved roads.",
    specifications: {
      seats: 1,
      fuel: "Human Power",
      transmission: "Multi-speed",
      mileage: "N/A",
    },
  },
  {
    id: "9",
    name: "Electric Bike",
    category: "Bike Rental",
    price: "$40/day",
    priceValue: 40,
    seats: "1 seat",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
    ],
    description:
      "Electric-assisted bike for effortless riding with battery-powered motor support.",
    specifications: {
      seats: 1,
      fuel: "Electric + Human",
      transmission: "Multi-speed",
      mileage: "40 miles range",
    },
  },
  {
    id: "10",
    name: "City Bike",
    category: "Bike Rental",
    price: "$20/day",
    priceValue: 20,
    seats: "1 seat",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
    ],
    description:
      "Comfortable city bike perfect for urban commuting and leisurely rides.",
    specifications: {
      seats: 1,
      fuel: "Human Power",
      transmission: "Single speed",
      mileage: "N/A",
    },
  },
  {
    id: "11",
    name: "BMX Bike",
    category: "Bike Rental",
    price: "$15/day",
    priceValue: 15,
    seats: "1 seat",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
    ],
    description:
      "Sturdy BMX bike designed for tricks, jumps, and street riding.",
    specifications: {
      seats: 1,
      fuel: "Human Power",
      transmission: "Single speed",
      mileage: "N/A",
    },
  },
  {
    id: "12",
    name: "Tandem Bike",
    category: "Bike Rental",
    price: "$35/day",
    priceValue: 35,
    seats: "2 seats",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
    ],
    description:
      "Two-person tandem bike for shared riding experiences and romantic outings.",
    specifications: {
      seats: 2,
      fuel: "Human Power",
      transmission: "Multi-speed",
      mileage: "N/A",
    },
  },
  // Wedding Cars
  addMissingProperties({
    id: "13",
    name: "Luxury Limousine",
    category: "Wedding Cars",
    price: "$200/day",
    seats: "8 seats",
    image: "https://images.unsplash.com/photo-1549317336-206569e8475c?w=400",
    description:
      "Elegant luxury limousine perfect for special occasions and wedding ceremonies.",
  }),
  addMissingProperties({
    id: "14",
    name: "Vintage Car",
    category: "Wedding Cars",
    price: "$150/day",
    seats: "4 seats",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400",
    description:
      "Classic vintage car with timeless elegance for memorable wedding moments.",
  }),
  addMissingProperties({
    id: "15",
    name: "Rolls Royce",
    category: "Wedding Cars",
    price: "$300/day",
    seats: "4 seats",
    image: "https://images.unsplash.com/photo-1549317336-206569e8475c?w=400",
    description:
      "Ultimate luxury Rolls Royce for the most prestigious wedding celebrations.",
  }),
  addMissingProperties({
    id: "16",
    name: "Bentley",
    category: "Wedding Cars",
    price: "$250/day",
    seats: "4 seats",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400",
    description:
      "Sophisticated Bentley offering unmatched comfort and style for your special day.",
  }),
  addMissingProperties({
    id: "17",
    name: "Mercedes S-Class",
    category: "Wedding Cars",
    price: "$180/day",
    seats: "5 seats",
    image: "https://images.unsplash.com/photo-1549317336-206569e8475c?w=400",
    description:
      "Premium Mercedes S-Class with advanced features for elegant wedding transportation.",
  }),
  addMissingProperties({
    id: "18",
    name: "BMW 7 Series",
    category: "Wedding Cars",
    price: "$170/day",
    seats: "5 seats",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400",
    description:
      "Luxury BMW 7 Series combining performance and comfort for your wedding day.",
  }),
  // Camera Equipment
  addMissingProperties({
    id: "19",
    name: "Canon EOS R5",
    category: "Camera Equipment",
    price: "$80/day",
    seats: "Professional",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
    description:
      "Professional mirrorless camera with 45MP sensor and 8K video recording capabilities.",
  }),
  addMissingProperties({
    id: "20",
    name: "Sony A7R IV",
    category: "Camera Equipment",
    price: "$75/day",
    seats: "Professional",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
    description:
      "High-resolution full-frame mirrorless camera with 61MP sensor for professional photography.",
  }),
  addMissingProperties({
    id: "21",
    name: "Nikon D850",
    category: "Camera Equipment",
    price: "$70/day",
    seats: "Professional",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
    description:
      "Professional DSLR camera with 45.7MP sensor and exceptional low-light performance.",
  }),
  addMissingProperties({
    id: "22",
    name: "Canon 24-70mm Lens",
    category: "Camera Equipment",
    price: "$30/day",
    seats: "Professional",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
    description:
      "Versatile professional zoom lens perfect for portraits, events, and general photography.",
  }),
  addMissingProperties({
    id: "23",
    name: "Sony 70-200mm Lens",
    category: "Camera Equipment",
    price: "$35/day",
    seats: "Professional",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
    description:
      "Professional telephoto zoom lens ideal for sports, wildlife, and portrait photography.",
  }),
  addMissingProperties({
    id: "24",
    name: "Drone DJI Mavic",
    category: "Camera Equipment",
    price: "$60/day",
    seats: "Professional",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
    description:
      "Professional drone with 4K camera, intelligent flight modes, and extended battery life.",
  }),
  // Tour Equipment
  addMissingProperties({
    id: "25",
    name: "Camping Tent",
    category: "Tour Equipment",
    price: "$35/day",
    seats: "4 person",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
    description:
      "Spacious 4-person camping tent with weather protection and easy setup.",
  }),
  addMissingProperties({
    id: "26",
    name: "Hiking Backpack",
    category: "Tour Equipment",
    price: "$20/day",
    seats: "60L capacity",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
    description:
      "Professional hiking backpack with 60L capacity and ergonomic design.",
  }),
  addMissingProperties({
    id: "27",
    name: "Sleeping Bag",
    category: "Tour Equipment",
    price: "$15/day",
    seats: "1 person",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
    description: "Warm and comfortable sleeping bag for outdoor adventures.",
  }),
  addMissingProperties({
    id: "28",
    name: "Camping Stove",
    category: "Tour Equipment",
    price: "$12/day",
    seats: "Portable",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
    description:
      "Portable camping stove perfect for cooking meals in the wilderness.",
  }),
  addMissingProperties({
    id: "29",
    name: "GPS Device",
    category: "Tour Equipment",
    price: "$25/day",
    seats: "Navigation",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
    description:
      "Professional GPS navigation device for outdoor adventures and hiking.",
  }),
  addMissingProperties({
    id: "30",
    name: "Binoculars",
    category: "Tour Equipment",
    price: "$10/day",
    seats: "10x magnification",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
    description:
      "High-quality binoculars with 10x magnification for wildlife viewing.",
  }),
  // Surf Package
  addMissingProperties({
    id: "31",
    name: "Surfboard Package",
    category: "Surf Package",
    price: "$40/day",
    seats: "Complete set",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
    description: "Complete surfboard package including board, leash, and wax.",
  }),
  addMissingProperties({
    id: "32",
    name: "Wetsuit + Board",
    category: "Surf Package",
    price: "$50/day",
    seats: "All included",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
    description:
      "Surfboard and wetsuit package for comfortable surfing in any weather.",
  }),
  addMissingProperties({
    id: "33",
    name: "Beginner Surf Set",
    category: "Surf Package",
    price: "$35/day",
    seats: "Learning package",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
    description:
      "Beginner-friendly surfboard and safety equipment for learning to surf.",
  }),
  addMissingProperties({
    id: "34",
    name: "Pro Surfboard",
    category: "Surf Package",
    price: "$45/day",
    seats: "Professional",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
    description:
      "Professional-grade surfboard for experienced surfers and advanced techniques.",
  }),
  addMissingProperties({
    id: "35",
    name: "Bodyboard Set",
    category: "Surf Package",
    price: "$25/day",
    seats: "Bodyboard + fins",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
    description: "Bodyboard and fins package for body surfing and wave riding.",
  }),
  addMissingProperties({
    id: "36",
    name: "Stand Up Paddle",
    category: "Surf Package",
    price: "$30/day",
    seats: "SUP board + paddle",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
    description:
      "Stand-up paddleboard and paddle for SUP adventures and fitness.",
  }),
  // Tour Packages
  addMissingProperties({
    id: "37",
    name: "City Tour Package",
    category: "Tour Packages",
    price: "$120/day",
    seats: "Group tour",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
    description:
      "Comprehensive city tour package with professional guide and transportation.",
  }),
  addMissingProperties({
    id: "38",
    name: "Adventure Tour",
    category: "Tour Packages",
    price: "$180/day",
    seats: "Full day",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
    description:
      "Full-day adventure tour with exciting activities and outdoor experiences.",
  }),
  addMissingProperties({
    id: "39",
    name: "Cultural Heritage Tour",
    category: "Tour Packages",
    price: "$100/day",
    seats: "Historical sites",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
    description:
      "Cultural heritage tour visiting historical sites and landmarks.",
  }),
  addMissingProperties({
    id: "40",
    name: "Nature Safari",
    category: "Tour Packages",
    price: "$150/day",
    seats: "Wildlife viewing",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
    description:
      "Nature safari tour for wildlife viewing and photography opportunities.",
  }),
  addMissingProperties({
    id: "41",
    name: "Food Tour Experience",
    category: "Tour Packages",
    price: "$80/day",
    seats: "Culinary journey",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
    description:
      "Culinary food tour experience tasting local cuisine and specialties.",
  }),
  addMissingProperties({
    id: "42",
    name: "Photography Tour",
    category: "Tour Packages",
    price: "$200/day",
    seats: "Photo workshop",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
    description:
      "Professional photography tour with workshop and equipment included.",
  }),
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
    router.push({
      pathname: "/vehicle-details",
      params: {
        vehicleData: JSON.stringify(item),
      },
    });
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
        <Image source={{ uri: item.image }} style={styles.rentalImage} />
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
