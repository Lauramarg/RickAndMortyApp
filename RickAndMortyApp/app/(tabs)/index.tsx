import {
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useFetchAPI from "@/hooks/useFetchAPI";
import Personaje from "@/components/Personaje";
import { Colors } from "@/constants/Colors";

export default function HomeScreen() {
  const { data, loading, error, loadMore, loadingMore } = useFetchAPI(
    "https://rickandmortyapi.com/api/character"
  );

  const renderHeader = () => (
    <View>
      <Image
        source={require("@/assets/images/banner.jpg")}
        style={styles.reactLogo}
      />
      <ThemedView style={styles.titleContainer}>
        <ThemedText style={{ alignSelf: "center" }} type="title">
          Rick and Morty Characters Wiki
        </ThemedText>
      </ThemedView>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      {loading && <ActivityIndicator />}
      {error && <ThemedText>Error: {error}</ThemedText>}
      <FlatList
        data={data}
        keyExtractor={(item) => item.name.toString()}
        renderItem={({ item }) => <Personaje {...item} />}
        // onEndReached={loadMore}
        // onEndReachedThreshold={0.5}
        ListHeaderComponent={renderHeader}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.RickAndMortyPortal.RickAndMortyPortal3,
    paddingTop: 42,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    textAlign: "center",
    padding: 16,
  },
  reactLogo: {
    height: 280,
    width: "100%",
    resizeMode: "cover",
  },
});
