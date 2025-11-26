import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { GlobalContext } from '../../context/GlobalState';

export default function ProductoScreen() {
  const { crearProducto, empresas, productos } = useContext(GlobalContext);
  const [nombre, setNombre] = useState('');
  const [costoBase, setCostoBase] = useState('');

  const [openEmpresa, setOpenEmpresa] = useState(false);
  const [empresaId, setEmpresaId] = useState(empresas[0]?.id || null);

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleCrear = () => {
    // Validar campos vacíos
    if (!nombre || !empresaId || !costoBase) {
      setError('Por favor, complete todos los campos');
      setTimeout(() => setError(''), 3000);
      return;
    }

    // Validar que costoBase sea un número válido y positivo
    const costo = parseFloat(costoBase);
    if (isNaN(costo) || costo <= 0) {
      setError('Por favor, ingrese un costo base válido mayor a 0');
      setTimeout(() => setError(''), 3000);
      return;
    }

    // Validar que el nombre no sea demasiado corto
    if (nombre.trim().length < 2) {
      setError('El nombre del producto debe tener al menos 2 caracteres');
      setTimeout(() => setError(''), 3000);
      return;
    }

    crearProducto({ 
      nombre: nombre.trim(), 
      empresaId, 
      costoBase: costo 
    });

    setNombre('');
    setCostoBase('');
    setError(''); // Limpiar error si existe

    setMensaje('Producto creado con éxito'); 
    setTimeout(() => setMensaje(''), 3000); 
  };

  const handleCostoChange = (text: string) => {
    // Permitir solo números y un punto decimal
    const cleanedText = text.replace(/[^0-9.]/g, '');
    
    // Validar que solo haya un punto decimal
    const parts = cleanedText.split('.');
    if (parts.length > 2) {
      return; // No actualizar si hay más de un punto
    }
    
    // Validar que no haya más de 2 decimales
    if (parts[1] && parts[1].length > 2) {
      return;
    }
    
    setCostoBase(cleanedText);
    setError(''); // Limpiar error cuando el usuario empiece a escribir
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Crear Producto</Text>

      <Text style={styles.label}>Nombre Producto</Text>
      <TextInput
        value={nombre}
        onChangeText={(text: string) => {
          setNombre(text);
          setError(''); // Limpiar error cuando el usuario empiece a escribir
        }}
        style={[
          styles.input,
          error && styles.inputError
        ]}
        maxLength={50}
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
        style={[
          styles.dropdown,
          error && !empresaId && styles.inputError
        ]}
        dropDownContainerStyle={styles.dropdownContainer}
        placeholder="Seleccione empresa"
        zIndex={3000}
        zIndexInverse={1000}
      />

      <Text style={styles.label}>Costo Base</Text>
      <TextInput
        value={costoBase}
        onChangeText={handleCostoChange}
        style={[
          styles.input,
          error && styles.inputError
        ]}
        keyboardType="decimal-pad"
        placeholder="0.00"
        placeholderTextColor="#999"
      />

      {/* Mensaje de error */}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Mensaje de éxito */}
      {mensaje ? <Text style={styles.mensaje}>{mensaje}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleCrear}>
        <Text style={styles.buttonText}>Crear Producto</Text>
      </TouchableOpacity>

      <Text style={styles.listTitle}>Productos existentes</Text>
      {productos.length === 0 ? (
        <Text style={styles.emptyText}>No hay productos aún</Text>
      ) : (
        productos.map(p => (
          <View key={p.id} style={styles.itemContainer}>
            <View>
              <Text style={styles.itemText}>{p.nombre}</Text>
              <Text style={styles.itemEmpresa}>
                {empresas.find(e => e.id === p.empresaId)?.nombre || 'Empresa'}
              </Text>
            </View>
            <Text style={styles.itemCosto}>${p.costoBase.toFixed(2)}</Text>
          </View>
        ))
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
  inputError: {
    borderColor: '#ff3b30',
    backgroundColor: '#fffafa',
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
    marginBottom: 20,
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
    color: '#ff3b30',
    fontWeight: '600',
    marginBottom: 15,
    fontSize: 14,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    marginTop: 10,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  itemEmpresa: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  itemCosto: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: 'bold',
  },
});