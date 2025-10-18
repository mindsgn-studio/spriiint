import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { TouchableOpacity, Text } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { drizzle, useLiveQuery } from 'drizzle-orm/expo-sqlite';
import * as schema from '@/db/schema';

export default function WorkoutScreen() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, {schema});

  const saveWorkout = async () => {
    console.log("saving workout")
    
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

    console.log(data)
    } catch(error){
      console.log(error)
    } finally {
      console.log("completed saving workout")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.components}>
      </View>
      <View style={styles.components}>
      </View>
      <View style={styles.components}>  
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