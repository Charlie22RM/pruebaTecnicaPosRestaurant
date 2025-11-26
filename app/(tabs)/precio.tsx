import React, { useContext, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { GlobalContext } from '../../context/GlobalState';

export default function PrecioScreen() {
  const { empresas, productos, crearPrecio, precios } = useContext(GlobalContext);

  const [openEmpresa, setOpenEmpresa] = useState(false);
  const [empresaId, setEmpresaId] = useState(empresas[0]?.id || null);

  const [openProducto, setOpenProducto] = useState(false);
  const [productoId, setProductoId] = useState<number | null>(null);

  const [precioVenta, setPrecioVenta] = useState('');
  const [fechaVigencia, setFechaVigencia] = useState(new Date());

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const productosFiltrados = productos.filter(p => p.empresaId === empresaId);

  const handleCrear = () => {
    // Validar campos vacíos
    if (!empresaId || !productoId || !precioVenta) {
      setError('Por favor, complete todos los campos');
      setTimeout(() => setError(''), 3000);
      return;
    }

    // Validar que precioVenta sea un número válido y positivo
    const precio = parseFloat(precioVenta);
    if (isNaN(precio) || precio <= 0) {
      setError('Por favor, ingrese un precio de venta válido mayor a 0');
      setTimeout(() => setError(''), 3000);
      return;
    }

    // Validar que la fecha no sea en el pasado
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaSeleccionada = new Date(fechaVigencia);
    fechaSeleccionada.setHours(0, 0, 0, 0);

    if (fechaSeleccionada < hoy) {
      setError('La fecha de vigencia no puede ser en el pasado');
      setTimeout(() => setError(''), 3000);
      return;
    }

    // Validar que haya productos disponibles para la empresa seleccionada
    if (productosFiltrados.length === 0) {
      setError('No hay productos disponibles para la empresa seleccionada');
      setTimeout(() => setError(''), 3000);
      return;
    }

    crearPrecio({
      productoId,
      precioVenta: precio,
      fechaVigencia,
    });

    setPrecioVenta('');
    setProductoId(null);
    setError(''); // Limpiar error si existe

    setMensaje('Precio creado con éxito');
    setTimeout(() => setMensaje(''), 3000);
  };

  const handlePrecioChange = (text: string) => {
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
    
    setPrecioVenta(cleanedText);
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

  const handleFechaChange = (text: string) => {
    const date = new Date(text);
    if (!isNaN(date.getTime())) {
      setFechaVigencia(date);
      setError('');
    }
  };

  const getFechaMinima = () => {
    const hoy = new Date();
    return hoy.toISOString().split('T')[0];
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Crear Precio de Venta</Text>

      <Text style={styles.label}>Empresa</Text>
      <DropDownPicker
        open={openEmpresa}
        value={empresaId}
        items={empresas.map(e => ({ label: e.nombre, value: e.id }))}
        setOpen={setOpenEmpresa}
        setValue={handleEmpresaChange}
        setItems={() => {}}
        placeholder="Seleccione empresa"
        style={[
          styles.dropdown,
          error && !empresaId && styles.inputError
        ]}
        dropDownContainerStyle={styles.dropdownContainer}
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
        placeholder={productosFiltrados.length === 0 ? "No hay productos disponibles" : "Seleccione producto"}
        disabled={productosFiltrados.length === 0}
        style={[
          styles.dropdown,
          error && !productoId && styles.inputError
        ]}
        dropDownContainerStyle={styles.dropdownContainer}
        zIndex={2000}
        zIndexInverse={2000}
      />

      {productosFiltrados.length === 0 && empresaId && (
        <Text style={styles.warningText}>
          No hay productos registrados para esta empresa
        </Text>
      )}

      <Text style={styles.label}>Precio Venta</Text>
      <TextInput
        value={precioVenta}
        onChangeText={handlePrecioChange}
        keyboardType="decimal-pad"
        style={[
          styles.input,
          error && !precioVenta && styles.inputError
        ]}
        placeholder="0.00"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Fecha Vigencia</Text>
      {Platform.OS === 'web' ? (
        <input
          type="date"
          value={fechaVigencia.toISOString().slice(0, 10)}
          onChange={e => {
            setFechaVigencia(new Date(e.target.value));
            setError('');
          }}
          min={getFechaMinima()}
          style={{
            width: '100%',
            padding: 12,
            borderRadius: 12,
            borderColor: error ? '#ff3b30' : '#ccc',
            borderWidth: 1,
            marginBottom: 15,
            backgroundColor: '#fff',
            fontSize: 16,
          }}
        />
      ) : (
        <TextInput
          value={fechaVigencia.toISOString().slice(0, 10)}
          onChangeText={handleFechaChange}
          placeholder="YYYY-MM-DD"
          style={[
            styles.input,
            error && styles.inputError
          ]}
        />
      )}

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
          {productosFiltrados.length === 0 ? 'Sin productos disponibles' : 'Crear Precio'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.listTitle}>Precios existentes</Text>
      {precios.length === 0 ? (
        <Text style={styles.emptyText}>No hay precios aún</Text>
      ) : (
        precios.map(p => {
          const producto = productos.find(prod => prod.id === p.productoId);
          const empresa = empresas.find(e => e.id === producto?.empresaId);
          return (
            <View key={p.id} style={styles.itemContainer}>
              <View style={styles.itemContent}>
                <Text style={styles.itemText}>{producto?.nombre}</Text>
                <Text style={styles.itemEmpresa}>{empresa?.nombre}</Text>
              </View>
              <View style={styles.itemDetails}>
                <Text style={styles.itemPrecio}>${p.precioVenta.toFixed(2)}</Text>
                <Text style={styles.itemFecha}>
                  Vigente desde: {p.fechaVigencia.toISOString().slice(0, 10)}
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
    padding: 20 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center', 
    color: '#333' 
  },
  label: { 
    fontWeight: '600', 
    marginTop: 10, 
    marginBottom: 5, 
    color: '#333',
    fontSize: 16 
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
    marginBottom: 15 
  },
  dropdownContainer: { 
    borderRadius: 12, 
    backgroundColor: '#fff', 
    borderColor: '#ccc' 
  },
  button: { 
    backgroundColor: '#4A90E2', 
    paddingVertical: 15, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginBottom: 20, 
    elevation: 4 
  },
  buttonDisabled: {
    backgroundColor: '#A0A0A0',
    opacity: 0.6,
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: '600' 
  },
  mensaje: { 
    textAlign: 'center', 
    color: 'green', 
    fontWeight: '600', 
    marginBottom: 15,
    fontSize: 16 
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
    marginTop: 10 
  },
  emptyText: { 
    textAlign: 'center', 
    color: '#555', 
    marginTop: 10,
    fontSize: 16 
  },
  itemContainer: { 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 10, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    elevation: 2 
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
    fontWeight: '600' 
  },
  itemEmpresa: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  itemPrecio: {
    fontSize: 18,
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  itemFecha: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});