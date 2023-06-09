import { StatusBar } from "expo-status-bar";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Link } from "expo-router";
import React, { useEffect, useContext, useState } from "react";
import * as Font from "expo-font";

export const loadFonts = async () => {
  return Font.loadAsync({
    "sci-fi-font": require("../assets/images/Fonts/AquireBold-8Ma60.otf"),
  });
};
import { Audio } from "expo-av";

const placeholderLogo = require("../assets/images/placeholderLogo.png");
const backgroundSound = require("../assets/media/level.wav");
const clickSound = require("../assets/media/open.wav");

//LOCKS SCREEN TO PORTRAIT
import * as ScreenOrientation from "expo-screen-orientation";

export default function App() {
  useEffect(() => {
    lockOrientation();
    const soundObject = new Audio.Sound();
    const playSound = async (): Promise<void> => {
      try {
        await soundObject.loadAsync(backgroundSound);
        await soundObject.setIsLoopingAsync(true);
        await soundObject.playAsync();
      } catch (err) {
        console.log(err);
      }
    };
    playSound();
    return (): void => {
      soundObject.unloadAsync();
    };
  }, []);

  const lockOrientation = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
  };

  return (
    <ImageBackground
      source={require("../assets/images/mainBackground.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          source={require("../assets/images/cosmicLogo.png")}
          style={styles.logo}
        />
        <Link href={"./LoginPage"} asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </Link>
        <Link href={"./SignUpPage"} asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </Link>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 400,
    height: 400,
    resizeMode: "contain",
    marginBottom: 100,
    shadowColor: "black",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  button: {
    margin: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 15,
    backgroundColor: "#b094cc",
    shadowColor: "#999",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    textTransform: "uppercase",
  },
});

