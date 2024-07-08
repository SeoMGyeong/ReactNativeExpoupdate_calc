import { Pressable, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import { ButtonColors } from "@/constants/Colors";

interface Props {
  title: string;
  buttonStyle: any; //any는 아무거나 다 됨
  onPress: any;
  buttonType: string;
} // 타입 지정

const ButtonTypes = {
  NUMBER: "NUMBER",
  OPERATOR: "OPERATOR",
};

const Button = ({ title, buttonStyle, onPress, buttonType }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: ButtonColors[buttonType][0],
        },
        pressed && {
          backgroundColor: ButtonColors[buttonType][1],
        },
        buttonStyle,
      ]}
      onPressOut={onPress}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired, // isRequired 필수항목
  onPress: PropTypes.func.isRequired,
  buttonStyle: PropTypes.object,
  buttonType: PropTypes.oneOf(Object.values(ButtonTypes)),
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  title: {
    fontSize: 50,
    color: "#ffffff",
  },
});

export { ButtonTypes };
export default Button;
