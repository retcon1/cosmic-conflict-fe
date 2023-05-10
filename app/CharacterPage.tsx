import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import useGlobalStorage from "../hooks/useGlobalStorage";
import Loading from "../components/Loading";
import moneyIcon from "../assets/collection/character/money.png";
import shieldIcon from "../assets/collection/character/shield.png";
import swordIcon from "../assets/collection/character/sword.png";
import shopIcon from "../assets/collection/character/shopping.png";
import battleIcon from "../assets/collection/character/twoswords.png";

interface Character {
  characterName: string;
  attack: number;
  defense: number;
  gold: number;
  race: string;
  username: string;
  inventory: [];
}

const CharacterPage: React.FC = () => {
  const { value: user } = useGlobalStorage("user");
  const [character, setCharacter] = useState({
    characterName: "",
    attack: 0,
    defence: 0,
    gold: 0,
    race: "",
    inventory: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function updateCharacter() {
      if (user) {
        setCharacter(user);
      }
    }
    updateCharacter();
    setIsLoading(false);
  }, [user]);

  return (
    <ImageBackground
      source={require("../assets/collection/fightscene/download.gif")}
      style={styles.container}
    >
      {isLoading ? (
        <View>
          <Text>Loading...</Text>
          <Loading />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.title}>{character.characterName}</Text>
          </View>
          <View style={styles.imageWrapper}>
            {character.race === "human" ? (
              <Image
                source={require("../assets/images/human.png")}
                style={styles.image}
              />
            ) : (
              <Image
                source={require("../assets/images/alien.png")}
                style={styles.image}
              />
            )}
          </View>
          <View style={styles.row}>
            <Image source={swordIcon} style={styles.icon} />
            <Text style={[styles.value, { color: "red" }]}>
              {character.attack}
            </Text>
          </View>
          <View style={styles.row}>
            <Image source={shieldIcon} style={styles.icon} />
            <Text style={[styles.value, { color: "#939596" }]}>
              {character.defence}
            </Text>
          </View>
          <View style={styles.row}>
            <Image source={moneyIcon} style={styles.icon} />
            <Text style={styles.value}>{character.gold}</Text>
          </View>
          <View>
            <Text style={[styles.items, { color: "white" }]}>Inventory </Text>
            {!character.inventory || character.inventory.length === 0 ? (
              <Text style={styles.label}>No Items Held</Text>
            ) : (
              character.inventory.map((item) => {
                return (
                  <Text key={item} style={styles.items}>
                    {item}
                  </Text>
                );
              })
            )}
          </View>
          <View>
            <Link href={"./Shop"}>
              <TouchableOpacity style={styles.shopButton}>
                <Image source={shopIcon} style={styles.icon} />
              </TouchableOpacity>
            </Link>
          </View>
          <View>
            <Link href={"./Battle"}>
              <Pressable style={styles.battleButton}>
                <Image source={battleIcon} style={styles.icon} />
              </Pressable>
            </Link>
          </View>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    position: "relative",
    top: -160,
    color: "white",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  row: {
    flexDirection: "row",
    marginVertical: 20,
    top: 40,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  value: {
    fontSize: 20,
    color: "gold",
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  items: {
    marginVertical: 2,
    fontSize: 18,
    alignSelf: "center",
    color: "#55f27f",
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  shopButton: {
    width: 90,
    height: 70,
    position: 'absolute',
    left: -170,
    bottom: 600,
    backgroundColor: "d68888",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  battleButton: {
    width: 90,
    height: 70,
    position: 'absolute',
    left: 90,
    bottom: 600,
    backgroundColor: "d68888",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 30,
    marginVertical: 10,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    bottom: 30,
    marginBottom: 10,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  icon: {
    width: 55,
    height: 55,
  }
});

export default CharacterPage;
