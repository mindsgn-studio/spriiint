import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { drizzle, useLiveQuery } from 'drizzle-orm/expo-sqlite';
import * as schema from '@/db/schema';

export default function WorkoutScreen() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, {schema});

  const { data } = useLiveQuery(
    drizzleDb.select().from(schema.workouts)
  );

  return (
    <View style={styles.container}>
      <View style={styles.components}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  components: {
    flex: 1,
  },
  button: {
    backgroundColor: "black",
    width: 200,
    padding:10,
    alignSelf:"center",
    alignItems: "center"
  },
  text:{
    color: "white"
  }
});