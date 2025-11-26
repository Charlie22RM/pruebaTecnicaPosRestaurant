import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';


export default function TabLayout() {


  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="empresa"
        options={{
          title: 'Empresa'
        }}
      />
      <Tabs.Screen
        name="roles"
        options={{
          title: 'Roles'
        }}
      />
      <Tabs.Screen
        name="usuario"
        options={{
          title: 'Usuario'
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: 'Login'
        }}
      />
      <Tabs.Screen
        name="producto"
        options={{
          title: 'Producto'
        }}
      />
      <Tabs.Screen
        name="movimiento"
        options={{
          title: 'Movimiento'
        }}
      />
      <Tabs.Screen
        name="precio"
        options={{
          title: 'Precio'
        }}
      />
    </Tabs>

  );
}
