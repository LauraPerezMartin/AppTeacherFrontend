export interface Usuario {
    id?: number;
    nombre: string;
    apellidos: string;
    username: string;
    email: string;
    password: string;
    telefono: string;
    direccion: string;
    ciudad: string;
    latitud?: string;
    longitud?: string;
    imagen?: string;
    edad?: number;
    fecha_nacimiento: string;
    genero: string;
    dni: string;
    fecha_alta?: string;
    rol: string;
    experiencia?: number,
    precio?: number,
    borrado: boolean;
}
