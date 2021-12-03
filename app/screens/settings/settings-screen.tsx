import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField } from "../../components"
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
        <Text preset="bold" text="GitHub Connection" />
        <TextField label="Username" placeholder="Username" />
        <TextField label="Repo name" placeholder="Repo name" />
        <TextField label="Branch name" placeholder="Branch name" />
        <TextField label="Access key" placeholder="Access key" />
        <Button
          text="Connect"
          onPress={() => {
            console.log("connect")
          }}
        />
      </View>
    </Screen>
  )
})
