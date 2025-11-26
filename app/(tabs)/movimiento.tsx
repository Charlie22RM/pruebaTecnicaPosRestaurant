import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { GlobalContext } from '../../context/GlobalState';

export default function MovimientoScreen() {
  const { registrarMovimiento, empresas, productos, movimientos } = useContext(GlobalContext);
  const [cantidad, setCantidad] = useState('');
  const [openEmpresa, setOpenEmpresa] = useState(false);
  const [empresaId, setEmpresaId] = useState(empresas[0]?.id || null);
  const [openProducto, setOpenProducto] = useState(false);
  const [productoId, setProductoId] = useState(null);

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const productosFiltrados = productos.filter(p => p.empresaId === empresaId);

  const handleCrear = () => {
    // Validar campos vacíos
    if (!empresaId || !productoId || !cantidad) {
      setError('Por favor, complete todos los campos');
      setTimeout(() => setError(''), 3000);
      return;
    }

    // Validar que cantidad sea un número válido y positivo
    const cantidadNum = parseFloat(cantidad);
    if (isNaN(cantidadNum) || cantidadNum <= 0) {
      setError('Por favor, ingrese una cantidad válida mayor a 0');
      setTimeout(() => setError(''), 3000);
      return;
    }

    // Validar que haya productos disponibles para la empresa seleccionada
    if (productosFiltrados.length === 0) {
      setError('No hay productos disponibles para la empresa seleccionada');
      setTimeout(() => setError(''), 3000);
      return;
    }

    registrarMovimiento({
      productoId,
      tipo: 'ENTRADA',
      cantidad: cantidadNum,
      fecha: new Date(),
    });

    setCantidad('');
    setProductoId(null);
    setError(''); // Limpiar error si existe

    setMensaje('Movimiento registrado con éxito');
    setTimeout(() => setMensaje(''), 3000);
  };

  const handleCantidadChange = (text: string) => {
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
    
    setCantidad(cleanedText);
    setError(''); // Limpiar error cuando el usuario empiece a escribir
  };

  const handleEmpresaChange = (value: any) => {
    setEmpresaId(value);
    setProductoId(null); // Resetear producto cuando cambia la empresa
    setError('');
  };

  const handleProductoChange = (value: any) => {
    setProductoId(value);
    setError('');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Registrar Movimiento (ENTRADA)</Text>

      <Text style={styles.label}>Empresa</Text>
      <DropDownPicker
        open={openEmpresa}
        value={empresaId}
        items={empresas.map(e => ({ label: e.nombre, value: e.id }))}
        setOpen={setOpenEmpresa}
        setValue={handleEmpresaChange}
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

      <Text style={styles.label}>Producto</Text>
      <DropDownPicker
        open={openProducto}
        value={productoId}
        items={productosFiltrados.map(p => ({ label: p.nombre, value: p.id }))}
        setOpen={setOpenProducto}
        setValue={handleProductoChange}
        setItems={() => {}}
        style={[
          styles.dropdown,
          error && !productoId && styles.inputError
        ]}
        dropDownContainerStyle={styles.dropdownContainer}
        placeholder={productosFiltrados.length === 0 ? "No hay productos disponibles" : "Seleccione producto"}
        disabled={productosFiltrados.length === 0}
        zIndex={2000}
        zIndexInverse={2000}
      />

      {productosFiltrados.length === 0 && empresaId && (
        <Text style={styles.warningText}>
          No hay productos registrados para esta empresa
        </Text>
      )}

      <Text style={styles.label}>Cantidad</Text>
      <TextInput
        value={cantidad}
        onChangeText={handleCantidadChange}
        keyboardType="decimal-pad"
        style={[
          styles.input,
          error && !cantidad && styles.inputError
        ]}
      />

      {/* Mensaje de error */}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Mensaje de éxito */}
      {mensaje ? <Text style={styles.mensaje}>{mensaje}</Text> : null}

      <TouchableOpacity 
        style={[
          styles.button, 
          productosFiltrados.length === 0 && styles.buttonDisabled
        ]} 
        onPress={handleCrear}
        disabled={productosFiltrados.length === 0}
      >
        <Text style={styles.buttonText}>
          {productosFiltrados.length === 0 ? 'Sin productos disponibles' : 'Registrar Movimiento'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.listTitle}>Movimientos existentes</Text>
      {movimientos.length === 0 ? (
        <Text style={styles.emptyText}>No hay movimientos aún</Text>
      ) : (
        movimientos.map(m => {
          const producto = productos.find(p => p.id === m.productoId);
          const empresa = empresas.find(e => e.id === producto?.empresaId);
          return (
            <View key={m.id} style={styles.itemContainer}>
              <View style={styles.itemContent}>
                <Text style={styles.itemText}>{producto?.nombre}</Text>
                <Text style={styles.itemEmpresa}>{empresa?.nombre}</Text>
              </View>
              <View style={styles.itemDetails}>
                <Text style={[
                  styles.itemTipo,
                  m.tipo === 'ENTRADA' ? styles.tipoEntrada : styles.tipoSalida
                ]}>
                  {m.tipo}
                </Text>
                <Text style={styles.itemCantidad}>{m.cantidad}</Text>
                <Text style={styles.itemFecha}>
                  {new Date(m.fecha).toLocaleDateString()}
                </Text>
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
  buttonDisabled: {
    backgroundColor: '#A0A0A0',
    opacity: 0.6,
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
  warningText: {
    color: '#ff9500',
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
    fontStyle: 'italic',
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
  itemContent: {
    flex: 1,
  },
  itemDetails: {
    alignItems: 'flex-end',
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
  itemTipo: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tipoEntrada: {
    color: 'green',
  },
  tipoSalida: {
    color: 'red',
  },
  itemCantidad: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  itemFecha: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});