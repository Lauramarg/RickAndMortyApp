import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { Personaje as typePersonaje } from "@/hooks/useFetchAPI";
// expo fonts
import { useFonts } from "expo-font";
import { Colors } from "@/constants/Colors";
import CharacterDetail from "./CharacterDetail";

const fonts = {
  "Creepster-Regular": require("../assets/fonts/Creepster-Regular.ttf"),
};

const Personaje = (Character: typePersonaje) => {
  const { name, status, species, image } = Character;
  const [fontsLoaded] = useFonts(fonts);
  const [showModal, setShowModal] = React.useState(false);

  if (!fontsLoaded) {
    return null;
  }

  const handlePress = () => {
    setShowModal(!showModal);
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      {showModal && (
        <CharacterDetail
          styles={styles} // reusamos los estilos
          visible={showModal}
          close={() => setShowModal(false)}
          Character={Character}
        />
      )}
      <Image source={{ uri: image }} style={styles.img} />
      <View style={styles.description}>
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.status}>
          Status: {status}{" "}
          <Image
            source={require("../assets/images/indicator.webp")}
            style={[
              styles.stateIndicator,
              {
                tintColor:
                  status === "Alive"
                    ? "green"
                    : status === "Dead"
                    ? "red"
                    : "gray",
              },
            ]}
          ></Image>
        </Text>
        <Text style={styles.species}>Species: {species}</Text>
      </View>
    </Pressable>
  );
};

export default Personaje;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
    paddingBottom: 8,
    backgroundColor: Colors.light.background,
    margin: 12,
    marginHorizontal: 18,
    borderRadius: 15,
    elevation: 5,
  },
  img: {
    width: "100%",
    height: 220,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  modalImg: {
    width: "100%",
    height: 400,
    borderRadius: 5,
  },
  description: {
    flexDirection: "column",
    gap: 4,
  },
  modalDescription: {
    flexDirection: "column",
    gap: 4,
    padding: 8,
    backgroundColor: Colors.RickAndMortyPortal.RickAndMortyPortal3,
    flex: 1,
  },
  modalDetail: {
    flexDirection: "column",
    gap: 4,
    padding: 8,
    paddingLeft: 16,
    margin: 8,
    marginHorizontal: 12,
    elevation: 5,
    backgroundColor: Colors.light.background,
    borderRadius: 15,
  },
  details: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between",
  },
  stateIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  name: {
    fontSize: 24,
    fontFamily: "Creepster-Regular",
    color: Colors.RickAndMortyPortal.RickAndMortyPortal1,
    textTransform: "uppercase",
  },
  status: {
    fontSize: 14,
  },
  species: {
    fontSize: 14,
  },
  modalText: {
    fontSize: 14,
    color: Colors.RickAndMortyPortal.RickAndMortyPortal5,
  },
  button: {
    padding: 4,
    marginVertical: 6,
    marginRight: 6,
    elevation: 5,
    backgroundColor: Colors.RickAndMortyPortal.RickAndMortyPortal3,
    borderRadius: 30,
    justifyContent: "center",
    paddingBottom: 4,
    width: 30,
    height: 30,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  close: {
    width: 20,
    height: 20,
  },
});
