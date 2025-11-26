import React, { useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { GlobalContext } from '../../context/GlobalState';

export default function Roles() {
  const { roles } = useContext(GlobalContext);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Roles Predefinidos</Text>

      {roles.length === 0 ? (
        <Text style={styles.emptyText}>No hay roles disponibles</Text>
      ) : (
        roles.map(r => (
          <View key={r.id} style={styles.itemContainer}>
            <Text style={styles.itemText}>{r.nombre}</Text>
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
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
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
  emptyText: {
    textAlign: 'center',
    color: '#555',
    marginTop: 10,
  },
});
