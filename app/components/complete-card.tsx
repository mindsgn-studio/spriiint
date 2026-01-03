import { View, StyleSheet, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.completedContainer}>
      <Text style={styles.completedText}>✓ Completed</Text>
      <Text style={styles.completedSubtext}>See you tomorrow</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  completedContainer: {
    alignItems: "center",
    padding: 40,
  },
  completedText: {
    color: "#4ade80",
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 8,
  },
  completedSubtext: {
    color: "#666",
    fontSize: 16,
  },
});
