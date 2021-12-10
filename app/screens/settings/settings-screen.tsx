import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Screen, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  padding: spacing.medium,
}

export const SettingsScreen = observer(function SettingsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text="Settings" />
      <Text>All app settings.</Text>

      <View style={{ marginTop: spacing.medium }}>
        <Text preset="bold" text="PassMan Server Connection" />
        <TextField label="URL" placeholder="URL" />
        <TextField label="Key" placeholder="Key" />
        <TextField label="User name" placeholder="User name" />
        <Text text="Status Text here: Connecting... Connected!" />
      </View>
    </Screen>
  )
})
