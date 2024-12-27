import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handlePress = (value) => {
    if (value === "=") {
      try {
        const lastChar = input.slice(-1);
        const expression = ["+", "-", "*", "/"].includes(lastChar)
          ? input.slice(0, -1)
          : input;
        setResult(eval(expression).toString());
        setInput("");
      } catch (error) {
        setResult("Error");
      }
    } else if (value === "C") {
      setInput("");
      setResult("");
    } else if (value === "DEL") {
      setInput(input.slice(0, -1));
    } else if (value === "%") {
      if (!input.includes("%")) {
        setInput(input + value);
      }
    } else {
      const lastChar = input.slice(-1);
      if (
        ["/", "*", "-", "+"].includes(value) &&
        ["/", "*", "-", "+"].includes(lastChar)
      ) {
        return;
      }

      if (result !== "") {
        setInput(value);
        setResult("");
      } else {
        setInput(input + value);
      }
    }
  };

  const renderButtonRow = (row) => {
    return (
      <View style={styles.buttonRow}>
        {row.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.button,
              item === "C" || item === "%" || item === "DEL"
                ? styles.lightGreyButton
                : item === "/" ||
                  item === "*" ||
                  item === "-" ||
                  item === "+" ||
                  item === "="
                ? styles.orangeButton
                : styles.blackButton,
            ]}
            onPress={() => handlePress(item)}
          >
            <Text
              style={[
                styles.buttonText,
                item === "C" || item === "%" || item === "DEL"
                  ? styles.greyText
                  : styles.blackText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Title Section */}
      <Text style={styles.title}>Calc by DEV</Text>

      <View style={styles.resultContainer}>
        <Text style={styles.inputText}>{input}</Text>
        <Text style={styles.resultText}>{result}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {renderButtonRow(["C", "DEL", "%", "/"])}
        {renderButtonRow(["7", "8", "9", "*"])}
        {renderButtonRow(["4", "5", "6", "-"])}
        {renderButtonRow(["1", "2", "3", "+"])}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.zeroButton, styles.blackButton]}
            onPress={() => handlePress("0")}
          >
            <Text style={styles.blackText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.blackButton]}
            onPress={() => handlePress(".")}
          >
            <Text style={styles.blackText}>.</Text>
          </TouchableOpacity>
          {/* Updated = button to have a green background */}
          <TouchableOpacity
            style={[styles.button, styles.greenButton]}
            onPress={() => handlePress("=")}
          >
            <Text style={styles.whiteText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#121212",
    padding: 30,
  },
  title: {
    fontSize: 28,
    color: "#ffffff",
    fontFamily: "Arial",
    marginBottom: 20,
    textAlign: "center",
  },
  resultContainer: {
    width: "100%",
    backgroundColor: "#333333",
    padding: 20,
    borderRadius: 10,
    minHeight: 90,
    justifyContent: "flex-end",
    flexDirection: "column",
    overflow: "hidden",
    marginBottom: 20,
  },
  inputText: {
    fontSize: 36,
    color: "#e0e0e0",
    fontFamily: "Arial",
  },
  resultText: {
    fontSize: 48,
    color: "#f5f5f5",
    fontFamily: "Arial",
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  button: {
    flex: 1,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 75,
    marginHorizontal: 5,
  },
  zeroButton: {
    flex: 2,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 30,
  },
  lightGreyButton: {
    backgroundColor: "#9e9e9e",
  },
  blackButton: {
    backgroundColor: "#404040",
  },
  orangeButton: {
    backgroundColor: "#ff7043",
  },
  greenButton: {
    backgroundColor: "#4caf50", // Green background for the '=' button
  },
  greyText: {
    color: "#212121",
    fontSize: 28,
    fontFamily: "Arial",
  },
  blackText: {
    color: "#ffffff",
    fontSize: 28,
    fontFamily: "Arial",
  },
  whiteText: {
    color: "#ffffff",
    fontSize: 28,
    fontFamily: "Arial",
  },
  orangeText: {
    color: "#ffffff",
    fontSize: 28,
    fontFamily: "Arial",
  },
});
