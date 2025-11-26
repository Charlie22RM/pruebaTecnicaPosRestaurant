import { useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GlobalContext } from '../../context/GlobalState';

export default function Login() {
  const { loginUsuario } = useContext(GlobalContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    // Validar campos vacíos
    if (!email || !password) {
      setError('Por favor, complete todos los campos');
      setTimeout(() => setError(''), 3000);
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, ingrese un email válido');
      setTimeout(() => setError(''), 3000);
      return;
    }

    setLoading(true);
    setError('');

    // Simular una pequeña demora para mejor UX
    setTimeout(() => {
      if (loginUsuario(email, password)) {
        setEmail('');
        setPassword('');
        router.push('/(tabs)');
      } else {
        setError('Usuario o contraseña incorrectos');
        setTimeout(() => setError(''), 3000);
      }
      setLoading(false);
    }, 500);
  };

  const handleLoginWithAlert = () => {
    if (!email || !password) {
      Alert.alert('Campos requeridos', 'Por favor, complete todos los campos');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Email inválido', 'Por favor, ingrese un email válido');
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      if (loginUsuario(email, password)) {
        setEmail('');
        setPassword('');
        router.push('/(tabs)');
      } else {
        Alert.alert('Error', 'Usuario o contraseña incorrectos');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de Sesión</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setError(''); 
        }}
        style={[
          styles.input,
          error && styles.inputError
        ]}
        placeholder="ejemplo@correo.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setError(''); 
        }}
        secureTextEntry
        style={[
          styles.input,
          error && styles.inputError
        ]}
        autoComplete="password"
      />

      {/* Mensaje de error */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity 
        style={[
          styles.button, 
          loading && styles.buttonDisabled
        ]} 
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  label: {
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
    color: '#333',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#ff3b30',
    backgroundColor: '#fffafa',
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#A0A0A0',
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    color: '#ff3b30',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 10,
    fontSize: 14,
  },
});