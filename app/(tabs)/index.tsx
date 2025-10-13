import { StyleSheet, View } from "react-native";
import RentalListing from "../../components/rental-listing";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <RentalListing />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
});
