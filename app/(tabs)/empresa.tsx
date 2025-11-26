import React, { useContext, useState } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { GlobalContext } from '../../context/GlobalState';

export default function EmpresaScreen() {
  const { empresas, crearEmpresa } = useContext(GlobalContext);
  const [nombre, setNombre] = useState('');
  const [ruc, setRuc] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleCrear = () => {
    if (!nombre || !ruc) {
      setError('Por favor, complete todos los campos');
      setTimeout(() => setError(''), 3000);
      return;
    }
    
    crearEmpresa({ nombre, ruc });
    setNombre('');
    setRuc('');
    setMensaje('Empresa creada con éxito');
    setError(''); // Limpiar mensaje de error si existe
    setTimeout(() => setMensaje(''), 3000);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#f2f2f2' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Crear Empresa</Text>

        <Text style={styles.label}>Nombre Empresa</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>RUC</Text>
        <TextInput
          style={styles.input}
          value={ruc}
          onChangeText={setRuc}
        />

        <TouchableOpacity style={styles.button} onPress={handleCrear}>
          <Text style={styles.buttonText}>Crear Empresa</Text>
        </TouchableOpacity>

        {error ? <Text style={styles.error}>{error}</Text> : null}
        {mensaje ? <Text style={styles.mensaje}>{mensaje}</Text> : null}

        <Text style={styles.listTitle}>Empresas existentes</Text>
        <FlatList
          data={empresas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.nombre}</Text>
              <Text style={styles.itemText}>{item.ruc}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={{ marginTop: 10, textAlign: 'center', color: '#555' }}>
              No hay empresas aún
            </Text>
          }
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  label: {
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
    color: '#333',
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
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  mensaje: {
    textAlign: 'center',
    color: 'green',
    fontWeight: '600',
    marginBottom: 15,
  },
  error: {
    textAlign: 'center',
    color: 'red',
    fontWeight: '600',
    marginBottom: 15,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});