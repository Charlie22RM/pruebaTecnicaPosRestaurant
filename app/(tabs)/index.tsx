import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GlobalContext } from '../../context/GlobalState';

export default function HomeTab() {
  const { usuarioLogueado } = useContext(GlobalContext);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Bienvenido!
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(tabs)/empresa')}
      >
        <Text style={styles.buttonText}>Creación de empresa</Text>

      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(tabs)/roles')}
      >
        <Text style={styles.buttonText}>Consulta de Roles</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(tabs)/usuario')}
      >
        <Text style={styles.buttonText}>Creación de usuario</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.loginButton]}
        onPress={() => router.push('/(tabs)/login')}
      >
        <Text style={styles.buttonText}>Login de usuario</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(tabs)/producto')}
      >
        <Text style={styles.buttonText}>Creación de producto</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(tabs)/movimiento')}
      >
        <Text style={styles.buttonText}>Creación de movimientos
          (ENTRADA)
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(tabs)/precio')}
      >
        <Text style={styles.buttonText}>Creación de precios</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  button: {
    width: '80%',
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  loginButton: {
    backgroundColor: '#50E3C2',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
