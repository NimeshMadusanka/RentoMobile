import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Types
interface UserProfile {
  name: string;
  email: string;
  phone: string;
  paymentMethod: string;
  memberSince: string;
  avatar?: string;
}

// Default profile data
const defaultProfile: UserProfile = {
  name: "",
  email: "",
  phone: "",
  paymentMethod: "Cash Payment",
  memberSince: "",
  avatar:
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
};

// Profile Edit Modal Component
const ProfileEditModal: React.FC<{
  visible: boolean;
  profile: UserProfile;
  onClose: () => void;
  onSave: (profile: UserProfile) => void;
}> = ({ visible, profile, onClose, onSave }) => {
  const [formData, setFormData] = useState<UserProfile>(profile);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleSave = () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      Alert.alert("Error", "Name and email are required");
      return;
    }
    onSave(formData);
    onClose();
  };

  const pickImage = async () => {
    try {
      Alert.alert(
        "Select Profile Picture",
        "Choose how you want to set your profile picture",
        [
          {
            text: "Camera",
            onPress: () => openCamera(),
          },
          {
            text: "Photo Library",
            onPress: () => openImageLibrary(),
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ]
      );
    } catch (error) {
      console.error("Error showing image picker options:", error);
    }
  };

  const openCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please grant camera permissions to take a profile picture."
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setFormData({ ...formData, avatar: result.assets[0].uri });
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Error", "Failed to take photo. Please try again.");
    }
  };

  const openImageLibrary = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please grant camera roll permissions to change your profile picture."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setFormData({ ...formData, avatar: result.assets[0].uri });
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to select image. Please try again.");
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Edit Profile</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={styles.avatarSection}>
            <Image
              source={{ uri: formData.avatar }}
              style={styles.editAvatar}
            />
            <TouchableOpacity
              style={styles.editAvatarButton}
              onPress={pickImage}
            >
              <Ionicons name="pencil" size={16} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Name</Text>
            <TextInput
              style={styles.formInput}
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="Enter your name"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Email</Text>
            <TextInput
              style={styles.formInput}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Phone</Text>
            <TextInput
              style={styles.formInput}
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Payment Method</Text>
            <TextInput
              style={styles.formInput}
              value={formData.paymentMethod}
              onChangeText={(text) =>
                setFormData({ ...formData, paymentMethod: text })
              }
              placeholder="Enter payment method"
              editable={false}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

// Menu Item Component
const MenuItem: React.FC<{
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
}> = ({ icon, title, subtitle, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuItemLeft}>
      <View style={styles.menuIcon}>
        <Ionicons name={icon as any} size={20} color="#000" />
      </View>
      <View style={styles.menuTextContainer}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#000" />
  </TouchableOpacity>
);

export default function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [editModalVisible, setEditModalVisible] = useState(false);

  // Load profile from AsyncStorage on component mount
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem("userProfile");
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  const saveProfile = async (newProfile: UserProfile) => {
    try {
      await AsyncStorage.setItem("userProfile", JSON.stringify(newProfile));
      setProfile(newProfile);
    } catch (error) {
      console.error("Error saving profile:", error);
      Alert.alert("Error", "Failed to save profile");
    }
  };

  const handleEditProfile = () => {
    setEditModalVisible(true);
  };

  const handleMenuPress = (item: string) => {
    if (item === "Privacy Policy") {
      router.push("/privacy-policy");
    } else {
      Alert.alert("Info", `${item} feature coming soon!`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: profile.avatar }} style={styles.avatar} />
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditProfile}
            >
              <Ionicons name="pencil" size={16} color="#000" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{profile.name}</Text>
          <Text style={styles.memberSince}>
            Member since {profile.memberSince}
          </Text>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <MenuItem
            icon="mail"
            title="Email"
            subtitle={profile.email || "Enter Your Email"}
            onPress={() => handleMenuPress("Email")}
          />
          <MenuItem
            icon="call"
            title="Phone"
            subtitle={profile.phone || "Enter Your Phone Number"}
            onPress={() => handleMenuPress("Phone")}
          />
          <MenuItem
            icon="cash"
            title="Payments"
            subtitle={profile.paymentMethod}
            onPress={() => handleMenuPress("Payment Method")}
          />
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <MenuItem
            icon="shield-checkmark"
            title="Privacy Policy"
            onPress={() => handleMenuPress("Privacy Policy")}
          />
        </View>
      </ScrollView>

      {/* Profile Edit Modal */}
      <ProfileEditModal
        visible={editModalVisible}
        profile={profile}
        onClose={() => setEditModalVisible(false)}
        onSave={saveProfile}
      />
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
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 32,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FFE4E1",
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C2C2C",
    marginBottom: 8,
  },
  memberSince: {
    fontSize: 16,
    color: "#4CAF50",
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C2C2C",
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 14,
    color: "#4CAF50",
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  cancelText: {
    fontSize: 16,
    color: "#666666",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C2C2C",
  },
  saveText: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "600",
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  avatarSection: {
    alignItems: "center",
    paddingVertical: 32,
  },
  editAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FFE4E1",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  formGroup: {
    marginBottom: 24,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C2C2C",
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#F9F9F9",
  },
});
