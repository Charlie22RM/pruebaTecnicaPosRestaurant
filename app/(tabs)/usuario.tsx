import React, { useContext, useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { GlobalContext } from '../../context/GlobalState';

export default function Usuario() {
  const { crearUsuario, empresas, roles, usuarios } = useContext(GlobalContext);

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [openEmpresa, setOpenEmpresa] = useState(false);
  const [empresaId, setEmpresaId] = useState<number | null>(null);

  const [openRol, setOpenRol] = useState(false);
  const [rolId, setRolId] = useState<number | null>(null);

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (empresas.length > 0 && !empresaId) {
      setEmpresaId(empresas[0].id);
    }
  }, [empresas]);

  useEffect(() => {
    if (roles.length > 0 && !rolId) {
      setRolId(roles[0].id);
    }
  }, [roles]);

  const handleCrear = () => {
    if (!nombre || !email || !password || !empresaId || !rolId) {
      setError('Por favor, complete todos los campos');
      setTimeout(() => setError(''), 3000);
      return;
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, ingrese un email válido');
      setTimeout(() => setError(''), 3000);
      return;
    }

    crearUsuario({
      nombre,
      email,
      password,
      empresaId,
      rolId,
    });

    setNombre('');
    setEmail('');
    setPassword('');
    setError(''); // Limpiar mensaje de error si existe

    setMensaje('Usuario creado con éxito'); 
    setTimeout(() => setMensaje(''), 3000); 
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Crear Usuario</Text>

      <Text style={styles.label}>Nombre Usuario</Text>
      <TextInput
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
        placeholder="Ingrese el nombre completo"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholder="ejemplo@correo.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholder="Ingrese la contraseña"
      />

      <Text style={styles.label}>Empresa</Text>
      <DropDownPicker
        open={openEmpresa}
        value={empresaId}
        items={empresas.map(e => ({
          label: e.nombre,
          value: e.id,
        }))}
        setOpen={setOpenEmpresa}
        setValue={setEmpresaId}
        setItems={() => {}}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        placeholder="Seleccione empresa"
        zIndex={3000}
        zIndexInverse={1000}
      />

      <Text style={styles.label}>Rol</Text>
      <DropDownPicker
        open={openRol}
        value={rolId}
        items={roles.map(r => ({
          label: r.nombre,
          value: r.id,
        }))}
        setOpen={setOpenRol}
        setValue={setRolId}
        setItems={() => {}}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        placeholder="Seleccione rol"
        zIndex={2000}
        zIndexInverse={2000}
      />

      <TouchableOpacity style={styles.button} onPress={handleCrear}>
        <Text style={styles.buttonText}>Crear Usuario</Text>
      </TouchableOpacity>

      {/* Mensaje de error */}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Mensaje de éxito */}
      {mensaje ? <Text style={styles.mensaje}>{mensaje}</Text> : null}

      <Text style={styles.listTitle}>Usuarios existentes</Text>

      {usuarios.length === 0 ? (
        <Text style={styles.emptyText}>No hay usuarios aún</Text>
      ) : (
        usuarios.map(u => {
          const empresa = empresas.find(e => e.id === u.empresaId);
          const rol = roles.find(r => r.id === u.rolId);
          
          return (
            <View key={u.id} style={styles.itemContainer}>
              <View style={styles.itemContent}>
                <Text style={styles.itemName}>{u.nombre}</Text>
                <Text style={styles.itemEmail}>{u.email}</Text>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemEmpresa}>{empresa?.nombre || 'Empresa no encontrada'}</Text>
                  <Text style={styles.itemRol}>{rol?.nombre || 'Rol no encontrado'}</Text>
                </View>
              </View>
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
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
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    elevation: 2,
    fontSize: 16,
  },
  dropdown: {
    borderRadius: 12,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    marginBottom: 15,
  },
  dropdownContainer: {
    borderRadius: 12,
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
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
    fontSize: 16,
  },
  error: {
    textAlign: 'center',
    color: 'red',
    fontWeight: '600',
    marginBottom: 15,
    fontSize: 16,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#555',
    marginTop: 10,
    fontSize: 16,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 8,
  },
  itemEmpresa: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
  },
  itemRol: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
  },
});