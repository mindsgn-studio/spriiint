import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useHealthKit } from "@/hooks/use-health-kit";

export default function IndexScreen() {
  const router = useRouter();
  const { status } = useHealthKit();

  useEffect(() => {
    // Wait for permission status to initialize
    if (!status) return;
    console.log(status);
    /*
    if (status === "notDetermined") {
      router.replace("/permission");
    } else {
      // If authorized or explicitly denied, proceed to main app
      // router.replace("/workout");
    }*/
  }, [status]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});
