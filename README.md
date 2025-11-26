# POS Restaurante (React Native / Expo)

## Descripción
Esta aplicación simula un **sistema de Punto de Venta (POS)** para restaurantes, implementada en **React Native con Expo**.  
Permite gestionar empresas, productos, precios de venta, movimientos de inventario y usuarios, utilizando **Context API** y **Hooks** para manejo de estado en memoria (sin base de datos externa).

La app incluye:
- Registro de **empresas** y **usuarios**.
- Gestión de **productos** asociados a empresas.
- Registro de **movimientos de inventario** (ENTRADA).
- Definición de **precios de venta** con fecha de vigencia.
- Interfaz basada en **DropDownPicker**, inputs estilizados y mensajes de éxito.
- Navegación con **expo-router** y pestañas personalizadas con `HapticTab`.

## Arquitectura

### Manejo de Estado
- **GlobalState.tsx** implementa un **Context API** que centraliza:
  - `empresas`, `usuarios`, `roles`, `productos`, `movimientos`, `precios`, `usuarioLogueado`.
- **Hooks**:
  - `useState` para estados locales de formularios y listas filtradas.
  - Context API proporciona funciones globales como `crearProducto`, `registrarMovimiento`, `crearPrecio`, `crearUsuario`, `loginUsuario`.

### Componentes
- **Pantallas**:
  - `UsuarioScreen` – Crear y listar usuarios.
  - `ProductoScreen` – Crear y listar productos por empresa.
  - `MovimientoScreen` – Registrar movimientos de inventario filtrados por empresa.
  - `PrecioScreen` – Crear precios de venta asociados a productos de la empresa seleccionada, con fecha de vigencia editable.
  - `RolesScreen` – Consulta de roles predefinidos (Admin, Mesero, Cocinero).

- **Diseño y UI**:
  - Inputs, dropdowns y botones estilizados con **StyleSheet**.
  - Fecha editable en web usando `react-datepicker` con estilo consistente.
  - TabBar con `expo-router` y pestañas personalizadas que respetan esquema de color.

## Instalación y Ejecución

```bash
# Clonar repositorio
git clone https://github.com/Charlie22RM/pruebaTecnicaPosRestaurant.git
cd posPruebaTecApp

# Instalar dependencias
npm install

# Instalar dependencias adicionales
npm install react-native-dropdown-picker react-datepicker date-fns

# Ejecutar en web
npm run web

# Ejecutar en Android / iOS (requiere Expo Go)
npm run android
npm run ios
