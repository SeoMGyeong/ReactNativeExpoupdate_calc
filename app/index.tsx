import Button, { ButtonTypes } from "@/components/Button";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const Index = () => {
  const [result, setResult] = useState(0);
  return (
    <View style={styles.container}>
      <StatusBar style="auto"></StatusBar>
      <View style={styles.resultContainer}>
        <Text style={styles.text}>{result.toLocaleString("KR-ko")}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.leftArea}>
          <View style={styles.numberArea}>
            <Text>숫자키</Text>
          </View>
          <View style={styles.bottomArea}>
            <Text>0,=</Text>
          </View>
        </View>
        <View style={styles.rightArea}>
          <Text>연산키</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  }, // 제일 외곽부분

  resultContainer: {
    backgroundColor: "#000000",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 10,
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#a5b4fc",
  },
  leftArea: {
    flex: 1,
    flexDirection: "column",
  },
  rightArea: {
    flex: 1,
    flexDirection: "column",
  },
  numberArea: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  bottomArea: {
    flex: 1,
    flexDirection: "row",
  },

  text: {
    fontSize: 60,
    fontWeight: "700",
    color: "#ffffff",
  },
  button: {
    width: 100,
    height: 100,
  },
});

export default Index;
