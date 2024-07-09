import Button, { ButtonTypes } from "@/components/Button";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

const Operators = {
  ALLCLEAR: "C",
  DEL: "DEL",
  PLUS: "+",
  MULTY: "*",
  DIVIDE: "/",
  DOT: ".",
  MINUS: "-",
  EQUAL: "=",
};

const windowWidth = useWindowDimensions().width;
const btnWidth = (windowWidth - 5) / 4; //4칸 쓸거라서 4로 나눔 , 더 작게 하려면 / 5해도 됨 / 숫자 5는 여백

const Index = () => {
  const [result, setResult] = useState<number>(0); // 결과
  const [formula, setFormula] = useState<string>(""); // 입력한 숫자와 연산자 저장. 문자로 처리
  const [pointCheck, setPointCheck] = useState<boolean>(true);
  const [operatorCheck, setOperatorCheck] = useState<boolean>(true);

  //숫자 갖고오는 함수
  const getNumber = (num: string) => {
    setFormula((prev) => prev + num); // +는 연결연산자로 쓰임 , 기존(prev)에 붙일겁니다~~~
    setOperatorCheck(true); // true면 연산자 입력 가능
  }; // 문자로 받을거라서 string

  const getOperator = (op: string) => {
    if (operatorCheck) setFormula((prev) => prev + op);
    setOperatorCheck(false); // false면 연산자 입력 불가
    setPointCheck(true);
  };

  const getPoint = (point: string) => {
    if (formula.length === 0) setOperatorCheck(false); // formula길이가 0이라면 연산자 입력x
    if (pointCheck) {
      // point가 있다면?
      setFormula((prev) => prev + point);
      setPointCheck(false); // 더이상 입력 안되게 함
    }
  };

  const delNum = () => {
    let str = String(formula).slice(0, -1); // formula String으로 받고 마지막 요소를 제외
    formula.includes(".") ? setPointCheck(false) : setPointCheck(true);
    setFormula(str);
    setOperatorCheck(true);

    //   formula안에 포인트가 존재하느냐 ? setPointCheck(false) : setPointCheck(true);
    // point가 찍혀있다면 point를 삭제했을때 다시 point를 찍을 수 있게 해야함
  };

  const allClear = () => {
    setResult(0);
    setFormula("");
    setPointCheck(true);
  }; // 전부 초기화

  const calculate = () => {
    if (isNaN(eval(formula))) {
      // isNaN 숫자가 아닌가요?
      setResult(0); // result는 number기때문에 0으로 해주기
    } else if (eval(formula) === Infinity) {
      // 결과값이 무한대일때
      alert("0으로 나눌 수 없습니다."); // react native Alert 쓰니까 바로 에러뜸;;;
      setResult(0);
      return false;
    } else {
      setResult(eval(formula));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.formulaContainer}>
        <Text style={styles.text2}>{formula}</Text>
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.text}>{result.toLocaleString("KR-ko")}</Text>
      </View>

      <View style={{ height: 3, backgroundColor: "#313131" }}></View>

      <View style={styles.buttonPad}>
        <View style={styles.topContainer}>
          <Button
            title="AC"
            onPress={allClear}
            buttonType={ButtonTypes.OPERATOR}
            buttonStyle={{ width: btnWidth, height: btnWidth }}
          />
          <Button
            title="DEL"
            onPress={delNum} // 인수값 없어서 함수형식으로 안적어 줘도 됨
            buttonType={ButtonTypes.OPERATOR}
            buttonStyle={{ width: btnWidth, height: btnWidth }}
          />
          <Button
            title="("
            onPress={() => getNumber("(")}
            buttonType={ButtonTypes.OPERATOR}
            buttonStyle={{ width: btnWidth, height: btnWidth }}
          />
          <Button
            title=")"
            onPress={() => getNumber(")")}
            buttonType={ButtonTypes.OPERATOR}
            buttonStyle={{ width: btnWidth, height: btnWidth }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.leftArea}>
            <View style={styles.numberArea}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <Button
                  key={num}
                  title={num.toString()} // title은 문자형만 가능, toString()으로 변환해주기
                  onPress={() => getNumber(num.toString())} //Button.tsx에서 함수형태로 받는다고 했기 때문
                  buttonType={ButtonTypes.NUMBER}
                  buttonStyle={{
                    width: btnWidth,
                    height: btnWidth,
                    marginBottom: 1,
                  }} // 아래쪽 여백 줌
                />
              ))}
            </View>
            <View style={styles.bottomArea}>
              <Button
                title="0"
                onPress={() => getNumber("0")}
                buttonType={ButtonTypes.NUMBER}
                buttonStyle={{ width: btnWidth, height: btnWidth }}
              />
              <Button
                title="."
                onPress={() => getPoint(".")}
                buttonType={ButtonTypes.OPERATOR}
                buttonStyle={{ width: btnWidth, height: btnWidth }}
              />
              <Button
                title="="
                onPress={calculate}
                buttonType={ButtonTypes.OPERATOR}
                buttonStyle={{ width: btnWidth, height: btnWidth }} // +1은 여백, 2칸을 합쳤기때문에 그만큼 여백이 있어야함
              />
            </View>
          </View>
          <View style={styles.rightArea}>
            <Button
              title="/"
              onPress={() => getOperator("/")}
              buttonType={ButtonTypes.OPERATOR}
              buttonStyle={{ width: btnWidth, height: btnWidth }}
            />
            <Button
              title="*"
              onPress={() => getOperator("*")}
              buttonType={ButtonTypes.OPERATOR}
              buttonStyle={{ width: btnWidth, height: btnWidth }}
            />

            <Button
              title="-"
              onPress={() => getOperator("-")}
              buttonType={ButtonTypes.OPERATOR}
              buttonStyle={{ width: btnWidth, height: btnWidth }}
            />
            <Button
              title="+"
              onPress={() => getOperator("+")}
              buttonType={ButtonTypes.OPERATOR}
              buttonStyle={{ width: btnWidth, height: btnWidth }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // flex와 alignItems 같이 쓰면 화면 전체 꽉 채움
    flexDirection: "column", // 세로정렬
    justifyContent: "center",
    alignItems: "stretch", // 수직 영역 확장 (수직에서 90도 되는 방향으로 확장->가로 확장) 화면 전체 꽉 채움
  }, // 제일 외곽부분
  formulaContainer: {
    backgroundColor: "#000000", // 배경색 검정
    justifyContent: "flex-end",
    alignItems: "flex-end", // 선생님은 이거 없음 -> 이전 계산결과 나오는 부분
    padding: 5,
  },
  resultContainer: {
    //결과값 나오는 부분
    backgroundColor: "#000000",
    flex: 1, // 안적으면 상단에 붙음
    justifyContent: "flex-end", // flex영역의 끝부분 (우린 가로정렬이라 오른쪽으로)
    alignItems: "flex-end", // 수직정렬, 아래쪽 끝 , 오른쪽 하단에 위치
    padding: 10, // 내부 영역
  },
  buttonPad: {
    // 버튼크기가 정해져있기때문에...
    flexDirection: "column", // 세로정렬
    backgroundColor: "#000000",
    paddingTop: 1,
    paddingBottom: 50,
  },
  topContainer: {
    // button의 위쪽영역
    flexDirection: "row", // 가로정렬
    justifyContent: "space-evenly", // 간격 균일하게
  },
  buttonContainer: {
    //button의 아래쪽 영역
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  leftArea: {
    // 가로정렬의 왼쪽 영역
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  rightArea: {
    // 가로 정렬의 오른쪽 영역
    flexDirection: "column",
    justifyContent: "space-evenly", // 선생님은 이거 없음
    paddingRight: 1, // 여백, top부분에 균등하게 여백을 주는데 그럼 여백이 생기기 ..?????
  },
  numberArea: {
    // 왼쪽 영역의 숫자
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap-reverse", // 줄바꿈 역순
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
