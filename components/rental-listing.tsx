import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
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
  seats?: string;
  image: string;
  description?: string;
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

const rentalData: RentalItem[] = [
  // Car Rental
  {
    id: "1",
    name: "Toyota Camry",
    category: "Car Rental",
    price: "$45/day",
    seats: "4 seats",
    image: "https://images.unsplash.com/photo-1549317336-206569e8475c?w=400",
  },
  {
    id: "2",
    name: "Honda Civic",
    category: "Car Rental",
    price: "$50/day",
    seats: "5 seats",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400",
  },
  {
    id: "3",
    name: "Ford Focus",
    category: "Car Rental",
    price: "$55/day",
    seats: "5 seats",
    image: "https://images.unsplash.com/photo-1549317336-206569e8475c?w=400",
  },
  {
    id: "4",
    name: "BMW 3 Series",
    category: "Car Rental",
    price: "$80/day",
    seats: "5 seats",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400",
  },
  {
    id: "5",
    name: "Mercedes C-Class",
    category: "Car Rental",
    price: "$90/day",
    seats: "5 seats",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400",
  },
  {
    id: "6",
    name: "Audi A4",
    category: "Car Rental",
    price: "$85/day",
    seats: "5 seats",
    image: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11a?w=400",
  },
  // Bike Rental
  {
    id: "7",
    name: "Mountain Bike",
    category: "Bike Rental",
    price: "$25/day",
    seats: "1 seat",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
  },
  {
    id: "8",
    name: "Road Bike",
    category: "Bike Rental",
    price: "$30/day",
    seats: "1 seat",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
  },
  {
    id: "9",
    name: "Electric Bike",
    category: "Bike Rental",
    price: "$40/day",
    seats: "1 seat",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
  },
  {
    id: "10",
    name: "City Bike",
    category: "Bike Rental",
    price: "$20/day",
    seats: "1 seat",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
  },
  {
    id: "11",
    name: "BMX Bike",
    category: "Bike Rental",
    price: "$15/day",
    seats: "1 seat",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
  },
  {
    id: "12",
    name: "Tandem Bike",
    category: "Bike Rental",
    price: "$35/day",
    seats: "2 seats",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
  },
  // Wedding Cars
  {
    id: "13",
    name: "Luxury Limousine",
    category: "Wedding Cars",
    price: "$200/day",
    seats: "8 seats",
    image: "https://images.unsplash.com/photo-1549317336-206569e8475c?w=400",
  },
  {
    id: "14",
    name: "Vintage Car",
    category: "Wedding Cars",
    price: "$150/day",
    seats: "4 seats",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400",
  },
  {
    id: "15",
    name: "Rolls Royce",
    category: "Wedding Cars",
    price: "$300/day",
    seats: "4 seats",
    image: "https://images.unsplash.com/photo-1549317336-206569e8475c?w=400",
  },
  {
    id: "16",
    name: "Bentley",
    category: "Wedding Cars",
    price: "$250/day",
    seats: "4 seats",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400",
  },
  {
    id: "17",
    name: "Mercedes S-Class",
    category: "Wedding Cars",
    price: "$180/day",
    seats: "5 seats",
    image: "https://images.unsplash.com/photo-1549317336-206569e8475c?w=400",
  },
  {
    id: "18",
    name: "BMW 7 Series",
    category: "Wedding Cars",
    price: "$170/day",
    seats: "5 seats",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400",
  },
  // Camera Equipment
  {
    id: "19",
    name: "Canon EOS R5",
    category: "Camera Equipment",
    price: "$80/day",
    seats: "Professional",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
  },
  {
    id: "20",
    name: "Sony A7R IV",
    category: "Camera Equipment",
    price: "$75/day",
    seats: "Professional",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
  },
  {
    id: "21",
    name: "Nikon D850",
    category: "Camera Equipment",
    price: "$70/day",
    seats: "Professional",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
  },
  {
    id: "22",
    name: "Canon 24-70mm Lens",
    category: "Camera Equipment",
    price: "$30/day",
    seats: "Professional",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
  },
  {
    id: "23",
    name: "Sony 70-200mm Lens",
    category: "Camera Equipment",
    price: "$35/day",
    seats: "Professional",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
  },
  {
    id: "24",
    name: "Drone DJI Mavic",
    category: "Camera Equipment",
    price: "$60/day",
    seats: "Professional",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
  },
  // Tour Equipment
  {
    id: "25",
    name: "Camping Tent",
    category: "Tour Equipment",
    price: "$35/day",
    seats: "4 person",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
  },
  {
    id: "26",
    name: "Hiking Backpack",
    category: "Tour Equipment",
    price: "$20/day",
    seats: "60L capacity",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
  },
  {
    id: "27",
    name: "Sleeping Bag",
    category: "Tour Equipment",
    price: "$15/day",
    seats: "1 person",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
  },
  {
    id: "28",
    name: "Camping Stove",
    category: "Tour Equipment",
    price: "$12/day",
    seats: "Portable",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
  },
  {
    id: "29",
    name: "GPS Device",
    category: "Tour Equipment",
    price: "$25/day",
    seats: "Navigation",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
  },
  {
    id: "30",
    name: "Binoculars",
    category: "Tour Equipment",
    price: "$10/day",
    seats: "10x magnification",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
  },
  // Surf Package
  {
    id: "31",
    name: "Surfboard Package",
    category: "Surf Package",
    price: "$40/day",
    seats: "Complete set",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
  },
  {
    id: "32",
    name: "Wetsuit + Board",
    category: "Surf Package",
    price: "$50/day",
    seats: "All included",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
  },
  {
    id: "33",
    name: "Beginner Surf Set",
    category: "Surf Package",
    price: "$35/day",
    seats: "Learning package",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
  },
  {
    id: "34",
    name: "Pro Surfboard",
    category: "Surf Package",
    price: "$45/day",
    seats: "Professional",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
  },
  {
    id: "35",
    name: "Bodyboard Set",
    category: "Surf Package",
    price: "$25/day",
    seats: "Bodyboard + fins",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
  },
  {
    id: "36",
    name: "Stand Up Paddle",
    category: "Surf Package",
    price: "$30/day",
    seats: "SUP board + paddle",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
  },
  // Tour Packages
  {
    id: "37",
    name: "City Tour Package",
    category: "Tour Packages",
    price: "$120/day",
    seats: "Group tour",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
  },
  {
    id: "38",
    name: "Adventure Tour",
    category: "Tour Packages",
    price: "$180/day",
    seats: "Full day",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
  },
  {
    id: "39",
    name: "Cultural Heritage Tour",
    category: "Tour Packages",
    price: "$100/day",
    seats: "Historical sites",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
  },
  {
    id: "40",
    name: "Nature Safari",
    category: "Tour Packages",
    price: "$150/day",
    seats: "Wildlife viewing",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
  },
  {
    id: "41",
    name: "Food Tour Experience",
    category: "Tour Packages",
    price: "$80/day",
    seats: "Culinary journey",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
  },
  {
    id: "42",
    name: "Photography Tour",
    category: "Tour Packages",
    price: "$200/day",
    seats: "Photo workshop",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
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

  const renderRentalItem = ({ item }: { item: RentalItem }) => (
    <View style={styles.rentalCard}>
      <View style={styles.rentalInfo}>
        <Text style={styles.seatsText}>{item.seats}</Text>
        <Text style={styles.rentalName}>{item.name}</Text>
        <Text style={styles.rentalPrice}>{item.price}</Text>
        <TouchableOpacity style={styles.rentButton}>
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
