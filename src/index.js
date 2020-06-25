import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as LocalAuthentication from "expo-local-authentication";

// const data = [
//   { name: "Google", password: "123456" },
//   { name: "Dribbble", password: "123456" },
//   { name: "Instagram", password: "123456" },
//   { name: "Linkedin", password: "123456" },
//   { name: "Github", password: "123456" },
//   { name: "Facebook", password: "123456" },
// ];

export default function Locker() {
  const [selected, setSelected] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState([]);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const select = (index) => {
    if (selected === index) {
      setSelected(null);
    } else {
      setHasAccess(false);
      authenticate();
      setSelected(index);
    }
  };

  const authenticate = async () => {
    const result = await LocalAuthentication.authenticateAsync();

    if (result.success) setHasAccess(true);
  };

  const saveNewPassword = () => {
    if (name && password) {
      setData((data) => [{ name, password }, ...data]);
    }

    setShowModal(false);
    setName("");
    setPassword("");
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => select(index)}
      style={styles.item}
    >
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.name}</Text>
        <MaterialCommunityIcons
          name={
            selected === index && hasAccess
              ? "lock-open-variant-outline"
              : "lock-outline"
          }
          color="#676767"
          size={32}
        />
      </View>

      {selected === index && hasAccess && (
        <View style={styles.itemPassword}>
          <Text style={styles.itemPasswordText}>{item.password}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="fingerprint" size={50} color="#676767" />
        <Text style={styles.title}>Locker</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.newPasswordContainer}>
          <View style={styles.newPasswordForm}>
            <Text style={[styles.title, { marginBottom: 24 }]}>Nova senha</Text>
            <TextInput
              onChangeText={setName}
              value={name}
              style={styles.input}
              placeholderTextColor="#272727"
              placeholder="Nome"
            />
            <TextInput
              onChangeText={setPassword}
              value={password}
              style={styles.input}
              placeholderTextColor="#272727"
              placeholder="Senha"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.closeBtnText}>Fechar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={saveNewPassword}
                style={styles.saveBtn}
              >
                <Text style={styles.saveBtnText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        onPress={() => setShowModal(true)}
        style={styles.floatingButton}
      >
        <MaterialCommunityIcons name="plus" color="#fff" size={36} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    width: "100%",
    paddingHorizontal: 26,
  },

  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 52,
    width: "100%",
  },

  title: {
    fontSize: 30,
    color: "#676767",
    fontWeight: "bold",
  },

  item: {
    backgroundColor: "#101010",
    paddingVertical: 28,
    paddingHorizontal: 24,
    marginBottom: 16,
    width: "100%",
    borderRadius: 8,
  },

  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  itemText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#676767",
  },

  itemPassword: {
    padding: 24,
  },

  itemPasswordText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#676767",
    fontFamily: "monospace",
    textAlign: "center",
  },

  floatingButton: {
    backgroundColor: "#676767",
    width: 64,
    height: 64,
    borderRadius: 32,
    position: "absolute",
    bottom: 24,
    right: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  newPasswordContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  newPasswordForm: {
    width: "90%",
    backgroundColor: "#010101",
    borderRadius: 16,
    padding: 24,
    justifyContent: "center",
  },

  input: {
    width: "100%",
    backgroundColor: "#0a0a0a",
    padding: 14,
    fontSize: 16,
    borderRadius: 8,
    marginBottom: 16,
    color: "#676767",
  },

  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  closeBtn: {
    padding: 12,
  },

  closeBtnText: {
    color: "#676767",
    fontSize: 16,
  },

  saveBtn: {
    padding: 12,
  },

  saveBtnText: {
    color: "#676767",
    fontSize: 16,
    fontWeight: "bold",
  },
});
