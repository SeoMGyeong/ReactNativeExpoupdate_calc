import Button, { ButtonTypes } from "@/components/Button";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

const Operators = {
  CLEAR: "C",
  PLUS: "+",
  MINUS: "-",
  EQUAL: "=",
};

const Index = () => {
  const [result, setResult] = useState(0);
  const [formula, setFormula] = useState([]);

  const calculate = () => {
    let calculatedNumber = 0;
    let operator = "";

    formula.forEach((value) => {
      if ([Operators.PLUS, Operators.MINUS].includes(value)) {
        operator = value;
      } else {
        if (operator === Operators.PLUS) {
          calculatedNumber += value;
        } else if (operator === Operators.MINUS) {
          calculatedNumber -= value;
        } else {
          calculatedNumber = value;
        }
      }
    });
    setResult(calculatedNumber);
    setFormula([]);
  };

  const onPressOperator = (operator: string) => {
    switch (operator) {
      case Operators.CLEAR:
        setFormula([]);
        setResult(0);
        return;
      case Operators.EQUAL:
        calculate();
        return;
      default:
        const last = formula[formula.length - 1];
        if ([Operators.PLUS, Operators.MINUS].includes(last)) {
          setFormula((prev) => {
            prev.pop();
            return [...prev, operator];
          });
        } else {
          setFormula((prev) => [...prev, operator]);
        }
        return;
    }
  };

  const onPressNumber = (number: number) => {
    const last = formula[formula.length - 1];
    if (isNaN(last)) {
      setResult(number);
      setFormula((prev) => [...prev, number]);
    } else {
      const newNumber = (last ?? 0) * 10 + number;
      setResult(newNumber);
      setFormula((prev) => {
        prev.pop();
        return [...prev, newNumber];
      });
    }
  };

  const windowWidth = useWindowDimensions().width;
  const btnWidth = (windowWidth - 5) / 4; //4칸 쓸거라서 4로 나눔

  return (
    <View style={styles.container}>
      <StatusBar style="auto"></StatusBar>
      <View style={styles.resultContainer}>
        <Text style={styles.text}>{result.toLocaleString("KR-ko")}</Text>
      </View>

      <View style={{ height: 3, backgroundColor: "#aaaaaa" }}></View>

      <View style={styles.buttonContainer}>
        <View style={styles.leftArea}>
          <View style={styles.numberArea}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <Button
                key={num}
                title={num.toString()}
                onPress={() => onPressNumber(num)}
                buttonStyle={{
                  width: btnWidth,
                  height: btnWidth,
                  marginBottom: 1,
                }}
                buttonType={ButtonTypes.NUMBER}
              />
            ))}
          </View>
          <View style={styles.bottomArea}>
            <Button
              title="0"
              onPress={() => onPressNumber(0)}
              buttonStyle={{
                width: btnWidth * 2 + 1,
                height: btnWidth,
                marginTop: 1,
              }}
              buttonType={ButtonTypes.NUMBER}
            />
            <Button
              title="="
              onPress={() => onPressOperator(Operators.EQUAL)}
              buttonStyle={{ width: btnWidth, height: btnWidth, marginTop: 1 }}
              buttonType={ButtonTypes.OPERATOR}
            />
          </View>
        </View>
        <View style={styles.rightArea}>
          <Button
            title="C"
            onPress={() => onPressOperator(Operators.CLEAR)}
            buttonStyle={{ width: btnWidth, height: btnWidth, marginBottom: 1 }}
            buttonType={ButtonTypes.OPERATOR}
          />
          <Button
            title="-"
            onPress={() => onPressOperator(Operators.MINUS)}
            buttonStyle={{ width: btnWidth, height: btnWidth, marginBottom: 1 }}
            buttonType={ButtonTypes.OPERATOR}
          />
          <Button
            title="+"
            onPress={() => onPressOperator(Operators.PLUS)}
            buttonStyle={{ width: btnWidth, height: btnWidth * 2 + 1 }}
            buttonType={ButtonTypes.OPERATOR}
          />
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
    flexDirection: "row",
    backgroundColor: "#000000",
    justifyContent: "space-evenly",
    paddingTop: 1,
  },
  leftArea: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  rightArea: {
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  numberArea: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap-reverse",
    justifyContent: "space-evenly",
  },
  bottomArea: {
    flexDirection: "row",
    justifyContent: "space-evenly",
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
