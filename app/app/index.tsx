import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { TouchableOpacity, Text } from 'react-native';
import { useSQLiteContext  } from 'expo-sqlite';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as schema from '@/db/schema';
import * as Haptics from 'expo-haptics';
import { FlashList } from "@shopify/flash-list";


export default function WorkoutScreen() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, {schema});
  const { data } = useLiveQuery(drizzleDb.select().from(schema.workouts));
  
  const saveWorkout = async () => {
    Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
    )
    
    try {
     const data =  await drizzleDb.insert(schema.workouts).values(
      [
        {
          type: `push up`,
          repetitions: 10,
          sets: 1,
        },
        {
          type: `squats`,
          repetitions: 10,
          sets: 1,
        },
      ]
    );
    } catch(error){
      console.log(error)
    } finally {
      console.log("completed saving workout")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <FlashList
          data={data}
          renderItem={({ item }) => 
            <TouchableOpacity style={styles.card}>
              <Text>{item.type}</Text>
              <Text>{item.synced_at}</Text>
            </TouchableOpacity>
          }
        />
      </View>
      <View style={styles.action}>  
        <TouchableOpacity style={styles.button} onPress={async () => {saveWorkout()}}>
          <Text style={styles.text}>Save Workout</Text>
        </TouchableOpacity>
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
  action: {
    paddingBottom: 40,
  },
  card: {
    flex: 1,
    height: 50,

  },
  list: {
    flex: 1,
    padding: 10,
    paddingTop: 100,
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