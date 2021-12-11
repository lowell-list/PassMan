import React from "react"
import { StyleProp, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native"
import { color, typography, spacing } from "../../theme"
import { translate, TxKeyPath } from "../../i18n"
import { Text } from "../text/text"
import { Button } from "../button/button"
import Clipboard from "expo-clipboard"

// the base styling for the container
const CONTAINER: ViewStyle = {
  // paddingBottom: spacing.small,
}

// the base styling for the TextInput
const INPUT: TextStyle = {
  padding: spacing.small,
  paddingTop: spacing.small,
  fontFamily: typography.primary,
  color: color.text,
  minHeight: 44,
  fontSize: 18,
  backgroundColor: color.palette.offWhite,
  textAlignVertical: "top",
}

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
}

export interface TextFieldProps extends TextInputProps {
  /**
   * The placeholder i18n key.
   */
  placeholderTx?: TxKeyPath

  /**
   * The Placeholder text if no placeholderTx is provided.
   */
  placeholder?: string

  /**
   * The label i18n key.
   */
  labelTx?: TxKeyPath

  /**
   * The label text if no labelTx is provided.
   */
  label?: string

  /**
   * Optional container style overrides useful for margins & padding.
   */
  style?: StyleProp<ViewStyle>

  /**
   * Optional style overrides for the input.
   */
  inputStyle?: StyleProp<TextStyle>

  /**
   * If true, include a Copy to Clipboard button
   */
  copyButton?: boolean

  /**
   * Various look & feels.
   */
  preset?: keyof typeof PRESETS

  forwardedRef?: any
}

/**
 * A component which has a label and an input together.
 */
export function TextField(props: TextFieldProps) {
  const {
    placeholderTx,
    placeholder,
    labelTx,
    label,
    preset = "default",
    style: styleOverride,
    inputStyle: inputStyleOverride,
    copyButton = false,
    forwardedRef,
    ...rest
  } = props

  const containerStyles = [CONTAINER, PRESETS[preset], styleOverride]
  const inputStyles = [INPUT, inputStyleOverride]
  const actualPlaceholder = placeholderTx ? translate(placeholderTx) : placeholder

  const [showCopied, setShowCopied] = React.useState(false)

  // timer for "Copied!" text
  React.useEffect(() => {
    if (!showCopied) {
      return () => {}
    }
    const timerValue = setTimeout(() => setShowCopied(false), 2000)
    return () => {
      clearTimeout(timerValue)
    }
  }, [showCopied])

  return (
    <View style={containerStyles}>
      <Text preset="fieldLabel" tx={labelTx} text={label} />
      <TextInput
        placeholder={actualPlaceholder}
        placeholderTextColor={color.palette.lighterGrey}
        underlineColorAndroid={color.transparent}
        {...rest}
        style={inputStyles}
        ref={forwardedRef}
      />
      {copyButton && (
        <Button
          preset="link"
          text={showCopied ? "Copied!" : "Copy"}
          style={{ position: "absolute", right: spacing.small, bottom: spacing.small }}
          onPress={() => {
            Clipboard.setString(props.value || "")
            setShowCopied(true)
          }}
        />
      )}
    </View>
  )
}
