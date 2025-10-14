import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function PrivacyPolicyScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          <Text style={styles.lastUpdated}>
            Last updated: {new Date().toLocaleDateString()}
          </Text>

          <Text style={styles.sectionTitle}>1. Introduction</Text>
          <Text style={styles.paragraph}>
            Welcome to RentoMobile (&quot;we,&quot; &quot;our,&quot; or
            &quot;us&quot;). This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you use our mobile
            application for vehicle rental services. Please read this privacy
            policy carefully. If you do not agree with the terms of this privacy
            policy, please do not access the application.
          </Text>

          <Text style={styles.sectionTitle}>2. Information We Collect</Text>

          <Text style={styles.subsectionTitle}>2.1 Personal Information</Text>
          <Text style={styles.paragraph}>
            We may collect personal information that you provide directly to us,
            including:
          </Text>
          <Text style={styles.bulletPoint}>
            • Name, email address, and phone number
          </Text>
          <Text style={styles.bulletPoint}>
            • Driver&apos;s license information and verification documents
          </Text>
          <Text style={styles.bulletPoint}>
            • Payment information (credit card details, billing address)
          </Text>
          <Text style={styles.bulletPoint}>
            • Profile picture and account preferences
          </Text>
          <Text style={styles.bulletPoint}>
            • Emergency contact information
          </Text>

          <Text style={styles.subsectionTitle}>
            2.2 Vehicle and Rental Information
          </Text>
          <Text style={styles.paragraph}>
            We collect information related to your vehicle rentals, including:
          </Text>
          <Text style={styles.bulletPoint}>
            • Rental history and booking details
          </Text>
          <Text style={styles.bulletPoint}>
            • Vehicle preferences and usage patterns
          </Text>
          <Text style={styles.bulletPoint}>• Pickup and return locations</Text>
          <Text style={styles.bulletPoint}>• Rental duration and mileage</Text>

          <Text style={styles.subsectionTitle}>2.3 Location Information</Text>
          <Text style={styles.paragraph}>
            With your permission, we may collect location information to:
          </Text>
          <Text style={styles.bulletPoint}>
            • Help you find nearby vehicles
          </Text>
          <Text style={styles.bulletPoint}>
            • Provide navigation assistance
          </Text>
          <Text style={styles.bulletPoint}>
            • Verify vehicle return locations
          </Text>
          <Text style={styles.bulletPoint}>• Improve our services</Text>

          <Text style={styles.subsectionTitle}>2.4 Device Information</Text>
          <Text style={styles.paragraph}>
            We automatically collect certain information about your device,
            including:
          </Text>
          <Text style={styles.bulletPoint}>
            • Device type, operating system, and version
          </Text>
          <Text style={styles.bulletPoint}>• Unique device identifiers</Text>
          <Text style={styles.bulletPoint}>
            • App usage data and performance metrics
          </Text>
          <Text style={styles.bulletPoint}>• Crash reports and error logs</Text>

          <Text style={styles.sectionTitle}>
            3. How We Use Your Information
          </Text>
          <Text style={styles.paragraph}>
            We use the information we collect to:
          </Text>
          <Text style={styles.bulletPoint}>
            • Provide, operate, and maintain our rental services
          </Text>
          <Text style={styles.bulletPoint}>
            • Process rental bookings and payments
          </Text>
          <Text style={styles.bulletPoint}>
            • Verify your identity and driving credentials
          </Text>
          <Text style={styles.bulletPoint}>
            • Communicate with you about your rentals
          </Text>
          <Text style={styles.bulletPoint}>
            • Send you important updates and notifications
          </Text>
          <Text style={styles.bulletPoint}>
            • Improve our app functionality and user experience
          </Text>
          <Text style={styles.bulletPoint}>
            • Prevent fraud and ensure platform security
          </Text>
          <Text style={styles.bulletPoint}>
            • Comply with legal obligations
          </Text>

          <Text style={styles.sectionTitle}>
            4. Information Sharing and Disclosure
          </Text>
          <Text style={styles.paragraph}>
            We may share your information in the following circumstances:
          </Text>
          <Text style={styles.bulletPoint}>
            • With vehicle owners and rental partners
          </Text>
          <Text style={styles.bulletPoint}>
            • With payment processors and financial institutions
          </Text>
          <Text style={styles.bulletPoint}>
            • With insurance providers for coverage purposes
          </Text>
          <Text style={styles.bulletPoint}>
            • With law enforcement when required by law
          </Text>
          <Text style={styles.bulletPoint}>
            • With service providers who assist our operations
          </Text>
          <Text style={styles.bulletPoint}>
            • In connection with a business transfer or merger
          </Text>

          <Text style={styles.sectionTitle}>5. Data Security</Text>
          <Text style={styles.paragraph}>
            We implement appropriate technical and organizational measures to
            protect your personal information against unauthorized access,
            alteration, disclosure, or destruction. However, no method of
            transmission over the internet or electronic storage is 100% secure.
            While we strive to protect your information, we cannot guarantee
            absolute security.
          </Text>

          <Text style={styles.sectionTitle}>6. Data Retention</Text>
          <Text style={styles.paragraph}>
            We retain your personal information for as long as necessary to
            provide our services, comply with legal obligations, resolve
            disputes, and enforce our agreements. When we no longer need your
            information, we will securely delete or anonymize it.
          </Text>

          <Text style={styles.sectionTitle}>7. Your Rights and Choices</Text>
          <Text style={styles.paragraph}>You have the right to:</Text>
          <Text style={styles.bulletPoint}>
            • Access and update your personal information
          </Text>
          <Text style={styles.bulletPoint}>
            • Request deletion of your account and data
          </Text>
          <Text style={styles.bulletPoint}>
            • Opt-out of marketing communications
          </Text>
          <Text style={styles.bulletPoint}>
            • Control location sharing permissions
          </Text>
          <Text style={styles.bulletPoint}>• Request a copy of your data</Text>
          <Text style={styles.bulletPoint}>
            • Object to certain processing activities
          </Text>

          <Text style={styles.sectionTitle}>8. Third-Party Services</Text>
          <Text style={styles.paragraph}>
            Our app may contain links to third-party websites or services. We
            are not responsible for the privacy practices of these third
            parties. We encourage you to read their privacy policies before
            providing any information.
          </Text>

          <Text style={styles.sectionTitle}>9. Children&apos;s Privacy</Text>
          <Text style={styles.paragraph}>
            Our services are not intended for children under 18 years of age. We
            do not knowingly collect personal information from children under
            18. If you are a parent or guardian and believe your child has
            provided us with personal information, please contact us.
          </Text>

          <Text style={styles.sectionTitle}>
            10. International Data Transfers
          </Text>
          <Text style={styles.paragraph}>
            Your information may be transferred to and processed in countries
            other than your own. We ensure appropriate safeguards are in place
            to protect your information in accordance with this privacy policy.
          </Text>

          <Text style={styles.sectionTitle}>
            11. Changes to This Privacy Policy
          </Text>
          <Text style={styles.paragraph}>
            We may update this privacy policy from time to time. We will notify
            you of any changes by posting the new privacy policy in the app and
            updating the &quot;Last updated&quot; date. Your continued use of
            the app after such changes constitutes acceptance of the updated
            policy.
          </Text>

          <Text style={styles.sectionTitle}>12. Contact Us</Text>
          <Text style={styles.paragraph}>
            If you have any questions about this privacy policy or our data
            practices, please contact us at:
          </Text>
          <Text style={styles.contactInfo}>Email: privacy@rentomobile.com</Text>
          <Text style={styles.contactInfo}>Phone: +1 (555) 123-4567</Text>
          <Text style={styles.contactInfo}>
            Address: 123 Rental Street, City, State 12345
          </Text>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By using RentoMobile, you acknowledge that you have read and
              understood this privacy policy.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  lastUpdated: {
    fontSize: 14,
    color: "#666666",
    fontStyle: "italic",
    marginBottom: 24,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: 24,
    marginBottom: 12,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C2C2C",
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    color: "#2C2C2C",
    marginBottom: 12,
  },
  bulletPoint: {
    fontSize: 14,
    lineHeight: 20,
    color: "#2C2C2C",
    marginLeft: 16,
    marginBottom: 4,
  },
  contactInfo: {
    fontSize: 14,
    lineHeight: 20,
    color: "#4CAF50",
    fontWeight: "500",
    marginBottom: 4,
  },
  footer: {
    marginTop: 32,
    padding: 20,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  footerText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#2C2C2C",
    fontStyle: "italic",
    textAlign: "center",
  },
});
