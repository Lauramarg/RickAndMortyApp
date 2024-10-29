import {
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  Image,
  Pressable,
} from "react-native";
import { Personaje } from "@/hooks/useFetchAPI";
import React from "react";
import { Colors } from "@/constants/Colors";

type Props = {
  visible: boolean;
  close: () => void;
  Character: Personaje;
  styles: any;
};

const CharacterDetail = ({ visible, close, Character, styles }: Props) => {
  return (
    <Modal visible={visible} animationType="slide">
      <View
        style={{
          backgroundColor: Colors.RickAndMortyPortal.RickAndMortyPortal3,
        }}
      >
        <Pressable style={styles.button} onPress={close}>
          <Image
            source={require("../assets/images/close.png")}
            style={styles.close}
          />
        </Pressable>
      </View>
      <View
        style={{
          backgroundColor: Colors.RickAndMortyPortal.RickAndMortyPortal3,
        }}
      >
        <Image source={{ uri: Character.image }} style={styles.modalImg} />
      </View>
      <View style={styles.modalDescription}>
        <View style={styles.modalDetail}>
          <Text style={styles.name}>{Character.name}</Text>
          <Text style={styles.status}>
            Status: {Character.status}{" "}
            <Image
              source={require("../assets/images/indicator.webp")}
              style={[
                styles.stateIndicator,
                {
                  tintColor:
                    Character.status === "Alive"
                      ? "green"
                      : Character.status === "Dead"
                      ? "red"
                      : "gray",
                },
              ]}
            ></Image>
          </Text>
          <Text style={styles.modalText}>Species: {Character.species}</Text>
        </View>
        <View style={styles.modalDetail}>
          <Text style={styles.modalText}>Origin: {Character.origin.name}</Text>
          <Text style={styles.modalText}>
            Location: {Character.location.name}
          </Text>
          <Text style={styles.modalText}>
            Episodes: {Character.episode.length}
          </Text>
          <Text style={styles.modalText}>Gender: {Character.gender}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default CharacterDetail;
