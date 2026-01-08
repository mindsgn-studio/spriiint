import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useHealthKit } from "@/hooks/use-health-kit";
import { StatusBar } from "expo-status-bar";

export default function PermissionScreen() {
  const router = useRouter();
  const { requestAuthorization } = useHealthKit();

  const handleConnect = async () => {
    try {
      const result = await requestAuthorization();
      // On iOS, requestAuthorization often returns void or true even if user denies specific perms
      // We assume success if no error was thrown, and let the user proceed.
      // The OS UI will have handled the actual permission toggle.
      if (result) {
        router.replace("/");
      }
    } catch (error) {
      console.error("Permission request failed", error);
    }
  };

  const handleSkip = () => {
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>❤️</Text>
        </View>

        <Text style={styles.title}>Connect Apple Health</Text>

        <Text style={styles.description}>
          Spriiint integrates with Apple Health to save your workouts and help
          close your rings.
        </Text>

        <View style={styles.benefitList}>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>🔥</Text>
            <Text style={styles.benefitText}>Track active calories burned</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>💪</Text>
            <Text style={styles.benefitText}>
              Log strength training sessions
            </Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>⭕️</Text>
            <Text style={styles.benefitText}>Close your Activity Rings</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleConnect}>
          <Text style={styles.buttonText}>Allow Access</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleSkip}>
          <Text style={styles.secondaryButtonText}>Not Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: "#1a1a1a",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    color: "#999",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },
  benefitList: {
    alignSelf: "stretch",
    gap: 20,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 12,
  },
  benefitIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  benefitText: {
    color: "#ccc",
    fontSize: 16,
    fontWeight: "500",
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    paddingVertical: 12,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#666",
    fontSize: 16,
  },
});
