// context/GlobalState.tsx
import React, { createContext, ReactNode, useState } from 'react';

export interface Empresa { id: number; nombre: string; ruc: string; }
export interface Rol { id: number; nombre: string; }
export interface Usuario {
    id: number;
    nombre: string;
    email: string;
    password: string;
    empresaId: number;
    rolId: number;
}
export interface Producto {
    id: number;
    nombre: string;
    empresaId: number;
    costoBase: number;
}
export interface Movimiento {
    id: number;
    productoId: number;
    tipo: 'ENTRADA';
    cantidad: number;
    fecha: Date;
}
export interface Precio {
    id: number;
    productoId: number;
    precioVenta: number;
    fechaVigencia: Date;
}

interface GlobalContextProps {
    empresas: Empresa[];
    usuarios: Usuario[];
    roles: Rol[];
    productos: Producto[];
    movimientos: Movimiento[];
    precios: Precio[];
    usuarioLogueado: Usuario | null;
    crearEmpresa: (empresa: Omit<Empresa, 'id'>) => void;
    crearUsuario: (usuario: Omit<Usuario, 'id'>) => void;
    loginUsuario: (email: string, password: string) => boolean;
    crearProducto: (producto: Omit<Producto, 'id'>) => void;
    registrarMovimiento: (mov: Omit<Movimiento, 'id'>) => void;
    crearPrecio: (precio: Omit<Precio, 'id'>) => void;
    setUsuarioLogueado: (usuario: Usuario | null) => void;
}

export const GlobalContext = createContext<GlobalContextProps>({} as GlobalContextProps);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [productos, setProductos] = useState<Producto[]>([]);
    const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
    const [precios, setPrecios] = useState<Precio[]>([]);
    const [usuarioLogueado, setUsuarioLogueado] = useState<Usuario | null>(null);

    const roles: Rol[] = [
        { id: 1, nombre: 'Admin' },
        { id: 2, nombre: 'Mesero' },
        { id: 3, nombre: 'Cocinero' },
    ];

    const crearEmpresa = (empresa: Omit<Empresa, 'id'>) => setEmpresas([...empresas, { ...empresa, id: Date.now() }]);
    const crearUsuario = (usuario: Omit<Usuario, 'id'>) => setUsuarios([...usuarios, { ...usuario, id: Date.now() }]);
    const loginUsuario = (email: string, password: string) => {
        const u = usuarios.find(u => u.email === email && u.password === password);
        if (u) setUsuarioLogueado(u);
        return !!u;
    };

    const crearProducto = (producto: Omit<Producto, 'id'>) => setProductos([...productos, { ...producto, id: Date.now() }]);

    const registrarMovimiento = (mov: Omit<Movimiento, 'id' | 'fecha'>) => {
        const nuevo = { ...mov, id: Date.now(), fecha: new Date() };
        setMovimientos([...movimientos, nuevo]);
    };

    const crearPrecio = (precio: Omit<Precio, 'id'>) => {
        const nuevo = { ...precio, id: Date.now() }; 
        setPrecios([...precios, nuevo]);
    };



    return (
        <GlobalContext.Provider value={{
            empresas, usuarios, roles, productos, movimientos, precios,
            usuarioLogueado,
            crearEmpresa, crearUsuario, loginUsuario,
            crearProducto, registrarMovimiento, crearPrecio,
            setUsuarioLogueado
        }}>
            {children}
        </GlobalContext.Provider>
    );
};
