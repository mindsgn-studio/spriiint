import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function IndexScreen() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/workout");
  }, []);
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "space-between",
    paddingTop: 120,
    paddingBottom: 60,
  },
});
