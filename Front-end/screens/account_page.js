import React, { Component } from "react";
import { StyleSheet, View, Text, Image, ImageBackground } from "react-native";

function account_page(props) {
  return (
    <View style={styles.container}>
      <View style={styles.rectStackStack}>
        <View style={styles.rectStack}>
          <View style={styles.rect}>
            <Text style={styles.hiKyawPhyoAung}>Hi , Harry James</Text>
            <Text style={styles.todayMon24Oct}>Today, Mon 02 Dec</Text>
          </View>
          <View style={styles.rect2}>
            <Text style={styles.yourBalance}>YOUR BALANCE</Text>
            <View style={styles.s3Row}>
              <Text style={styles.s3}>S$</Text>
              <Text style={styles.loremIpsum}>3,4502.08</Text>
            </View>
            <View style={styles.incomeRow}>
              <Text style={styles.income}>INCOME</Text>
              <Text style={styles.expense}>EXPENSE</Text>
            </View>
            <View style={styles.s7Row}>
              <Text style={styles.s7}>+S$</Text>
              <View style={styles.loremIpsum1Stack}>
                <Text style={styles.loremIpsum1}>2520</Text>
              </View>
              <Text style={styles.s6}>-S$</Text>
              <Text style={styles.loremIpsum3}>550</Text>
            </View>
            <View style={styles.rect4}>
              <Text style={styles.loremIpsum4}>TRF 003-9294838-0 : I-BANK</Text>
              <View style={styles.adviceRow}>
                <Text style={styles.advice}>Advice</Text>
                <Text style={styles.sgd50}>SGD -50</Text>
              </View>
            </View>
            <View style={styles.rect4}>
              <Text style={styles.batGrabSiNg}>BAT GRAB SI NG 3934-2399</Text>
              <View style={styles.loremIpsum5Row}>
                <Text style={styles.loremIpsum5}>
                  Point-of-Sale Transaction
                </Text>
                <Text style={styles.sgd1150}>SGD -1150</Text>
              </View>
            </View>
          </View>
          <ImageBackground
            source={require("../assets/visacard.png")}
            resizeMode="stretch"
            style={styles.image}
            imageStyle={styles.image_imageStyle}
          >
            <Text style={styles.kyawPhyoAung}>HARRY JAMES</Text>
          </ImageBackground>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect: {
    top: 0,
    left: 0,
    width: 414,
    height: 292,
    backgroundColor: "rgba(192,42,42,1)",
    position: "absolute"
  },
  hiKyawPhyoAung: {
    color: "#121212",
    fontSize: 25,
    fontFamily: "Roboto_700",
    marginTop: 68,
    marginLeft: 26
  },
  todayMon24Oct: {
    color: "#121212",
    fontSize: 15,
    fontFamily: "Roboto_regular",
    marginTop: 1,
    marginLeft: 24
  },
  rect2: {
    top: 255,
    left: 0,
    width: 370,
    height: 641,
    backgroundColor: "rgba(230, 230, 230,1)",
    position: "absolute",
    borderRadius: 30
  },
  yourBalance: {
    color: "rgba(0,0,0,1)",
    opacity: 0.5,
    fontSize: 18,
    fontFamily: "Roboto_regular",
    letterSpacing: 2.7,
    marginTop: 133,
    marginLeft: 42
  },
  s3: {
    color: "rgba(40,107,6,1)",
    fontSize: 23,
    fontFamily: "Roboto_regular",
    letterSpacing: 2.7
  },
  loremIpsum: {
    color: "rgba(40,107,6,1)",
    fontSize: 23,
    fontFamily: "Roboto_regular",
    letterSpacing: 2.7,
    marginLeft: 9
  },
  s3Row: {
    height: 25,
    flexDirection: "row",
    marginTop: 17,
    marginLeft: 42,
    marginRight: 195
  },
  income: {
    color: "rgba(0,0,0,1)",
    opacity: 0.5,
    fontSize: 15,
    fontFamily: "Roboto_regular",
    letterSpacing: 2.7
  },
  expense: {
    color: "rgba(0,0,0,1)",
    opacity: 0.5,
    fontSize: 15,
    fontFamily: "Roboto_regular",
    letterSpacing: 2.7,
    marginLeft: 127
  },
  incomeRow: {
    height: 16,
    flexDirection: "row",
    marginTop: 37,
    marginLeft: 42,
    marginRight: 89
  },
  s7: {
    color: "rgba(0,0,0,1)",
    fontSize: 25,
    fontFamily: "Roboto_regular",
    letterSpacing: 2.7
  },
  loremIpsum1: {
    top: 0,
    left: 0,
    color: "rgba(0,0,0,1)",
    position: "absolute",
    fontSize: 25,
    fontFamily: "Roboto_regular",
    letterSpacing: 2.7
  },
  loremIpsum2: {
    top: 14,
    left: 14,
    color: "rgba(0,0,0,1)",
    position: "absolute",
    fontSize: 15,
    fontFamily: "Roboto_regular",
    letterSpacing: 2.7
  },
  loremIpsum1Stack: {
    width: 67,
    height: 28,
    marginLeft: 3
  },
  s6: {
    color: "rgba(0,0,0,1)",
    fontSize: 25,
    fontFamily: "Roboto_regular",
    letterSpacing: 2.7,
    marginLeft: 86
  },
  loremIpsum3: {
    color: "rgba(0,0,0,1)",
    fontSize: 25,
    fontFamily: "Roboto_regular",
    letterSpacing: 2.7,
    marginLeft: 4
  },
  s7Row: {
    height: 28,
    flexDirection: "row",
    marginTop: 11,
    marginLeft: 42,
    marginRight: 74
  },
  rect3: {
    width: 330,
    height: 74,
    backgroundColor: "rgba(230, 230, 230,1)",
    borderRadius: 21,
    shadowOffset: {
      width: -4,
      height: -4
    },
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.18,
    marginTop: 25,
    marginLeft: 23
  },
  loremIpsum4: {
    color: "rgba(0,0,0,1)",
    fontSize: 15,
    fontFamily: "Roboto_700",
    letterSpacing: 1.5,
    marginTop: 8,
    marginLeft: 15
  },
  advice: {
    color: "rgba(0,0,0,1)",
    fontSize: 15,
    fontFamily: "Roboto_regular",
    letterSpacing: 0
  },
  sgd50: {
    color: "rgba(0,0,0,1)",
    fontSize: 15,
    fontFamily: "Roboto_regular",
    letterSpacing: 0,
    marginLeft: 180,
    marginTop: 0
  },
  adviceRow: {
    height: 17,
    flexDirection: "row",
    marginTop: 7,
    marginLeft: 16,
    marginRight: 12
  },
  rect4: {
    width: 333,
    height: 73,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#ddd',
    backgroundColor: "rgba(230, 230, 230,1)",
    borderRadius: 21,
    shadowOffset: {
      height: 4,
      width: 4
    },
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.8,
    marginTop: 30,
    marginLeft: 21
  },
  batGrabSiNg: {
    color: "rgba(0,0,0,1)",
    fontSize: 15,
    fontFamily: "Roboto_700",
    letterSpacing: 1.5,
    marginTop: 8,
    marginLeft: 11
  },
  loremIpsum5: {
    color: "rgba(0,0,0,1)",
    fontSize: 15,
    fontFamily: "Roboto_regular",
    letterSpacing: 0,
    marginTop: 0
  },
  sgd1150: {
    color: "rgba(0,0,0,1)",
    fontSize: 15,
    fontFamily: "Roboto_regular",
    letterSpacing: 0,
    marginLeft: 64
  },
  loremIpsum5Row: {
    height: 16,
    flexDirection: "row",
    marginTop: 5,
    marginLeft: 11,
    marginRight: 12
  },
  loremIpsum6: {
    color: "rgba(0,0,0,1)",
    fontSize: 10,
    fontFamily: "Roboto_regular",
    letterSpacing: 0,
    marginTop: 12,
    marginBottom: 20
  },
  sgd1151: {
    color: "rgba(0,0,0,1)",
    fontSize: 15,
    fontFamily: "Roboto_regular",
    letterSpacing: 0,
    marginLeft: 109
  },
  loremIpsum6Row: {
    height: 29,
    flexDirection: "row",
    marginTop: 50,
    marginLeft: 31,
    marginRight: 39
  },
  image: {
    top: 146,
    left: 19,
    width: 326,
    height: 206,
    position: "absolute"
  },
  image_imageStyle: {},
  kyawPhyoAung: {
    color: "rgba(255,255,255,1)",
    fontSize: 15,
    fontFamily: "Roboto_regular",
    letterSpacing: 2.7,
    marginTop: 176,
    marginLeft: 21
  },
  rectStack: {
    top: 0,
    left: 0,
    width: 414,
    height: 896,
    position: "absolute"
  },
  text: {
    color: "#121212",
    position: "absolute",
    fontSize: 24,
    fontFamily: "Roboto_regular",
    textAlign: "center",
    left: 45,
    top: 346
  },
  rectStackStack: {
    width: 414,
    height: 896
  }
});

export default account_page;
