import { StyleSheet, View, Pressable, OpaqueColorValue } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

type Props = {
  icon: "add" | "trash";
  size?: number;
  color?: string | OpaqueColorValue;
  onPress: () => void;
}

const IconButton = ({ icon, size, color, onPress }: Props) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
      <View style={styles.buttonContainer}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  )
}

export default IconButton

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2
  },
  pressed: {
    opacity: .75
  }
})