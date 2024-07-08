import Button, { ButtonTypes } from "@/components/Button";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

const Operators = {
  CLEAR: "C",
  PLUS: "+",
  MULTY: "*",
  DIVIDE: "/",
  DOT: ".",
  MINUS: "-",
  EQUAL: "=",
};

const windowWidth = useWindowDimensions().width;
const btnWidth = (windowWidth - 5) / 4; //4칸 쓸거라서 4로 나눔

const Index = () => {
  const [result, setResult] = useState<number>(0); // 결과
  const [formula, setFormula] = useState<string>(""); // 입력한 숫자와 연산자 저장. 문자로 처리
  const [pointCheck, setPointCheck] = useState<boolean>(true);
  const [operatorCheck, setOperatorCheck] = useState<boolean>(true);

  //숫자 갖고오는 함수
  const getNumber = (number) => {
    console.log(number);
    setFormula((prev) => prev + number);
    setOperatorCheck(true); // true가 operator를 쓸 수 있음
  };

  const getOperator = (oper) => {
    console.log(oper);
    setFormula((prev) => prev + oper);
    setOperatorCheck(false); // 연산자 못씀
  };

  const getPoint = (point) => {
    console.log(point);
    if (formula.length === 0) setOperatorCheck(false); //formula의 값이 0이라는 말은 내용이 없다는 뜻, 0이면 연산자 못적음
    if (pointCheck) {
      setFormula((prev) => prev + point); // 포인트 추가
      setPointCheck(false); // 더이상 포인트 못찍게
    }
  };

  const delNum = () => {
    console.log("del");
    let str = String(formula).slice(0, -1); // 수식 문자화 후 맨 끝의 문자 잘라내기
    setFormula(str);
    setPointCheck(true);
  };

  const allClear = () => {
    console.log("ac");
    setResult(0);
    setFormula("");
    setPointCheck(true);
  }; // 전부 초기화

  const calculate = () => {
    console.log("cal");
    if (isNaN(eval(formula))) {
      setResult(0);
    } else if (eval(formula) == Infinity) {
      // 무한루프 , 0으로 나눴을때
      alert("0으로 나눌 수 없습니다.");
      setResult(0);
      return false;
    } else {
      setResult(eval(formula));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto"></StatusBar>
      <View style={styles.formulaContainer}>
        <Text style={styles.text2}>{formula}</Text>
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.text}>{result.toLocaleString("KR-ko")}</Text>
      </View>

      <View style={{ height: 3, backgroundColor: "#aaaaaa" }}></View>

      <View style={styles.buttonPad}>
        <View style={styles.topContainer}>
          <button value="AC" onClick={allClear} style={styles.button}>
            AC
          </button>
          <button value="Del" onClick={delNum} style={styles.button}>
            Del
          </button>
          <button value="/" onClick={getOperator} style={styles.button}>
            /
          </button>

          <button value="*" onClick={getOperator} style={styles.button}>
            *
          </button>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.leftArea}>
            <View style={styles.numberArea}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  value={num}
                  onClick={getNumber}
                  style={styles.button}
                >
                  {num}
                </button>
              ))}
            </View>
            <View style={styles.bottomArea}>
              <button value="0" onClick={getNumber} style={styles.button}>
                0
              </button>
              <button value="." onClick={getPoint} style={styles.button}>
                .
              </button>
            </View>
          </View>
          <View style={styles.rightArea}>
            <button value="-" onClick={getOperator} style={styles.button}>
              -
            </button>
            <button value="+" onClick={getOperator} style={styles.button}>
              +
            </button>
            <button value="=" onClick={calculate} style={styles.button}>
              =
            </button>
          </View>
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
  formulaContainer: {
    backgroundColor: "#000000",
    justifyContent: "flex-end",
    alignItems: "flex-end", // 선생님은 이거 없음
    padding: 5,
  },
  resultContainer: {
    backgroundColor: "#000000",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 10,
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
  buttonPad: {
    flexDirection: "column", // 세로정렬
    backgroundColor: "#000000",
    paddingTop: 1,
    paddingBottom: 50,
  },
  topContainer: {
    flexDirection: "row", // 가로정렬
    justifyContent: "space-evenly",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
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
  text2: {
    fontSize: 16,
    color: "#cccccc",
  },
  button: {
    width: btnWidth,
    height: btnWidth,
    fontSize: 60,
  },
});

export default Index;
