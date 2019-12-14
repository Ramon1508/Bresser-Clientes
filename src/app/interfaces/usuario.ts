export interface Usuario {
  nombre: string;
  id?: string;
  foto: string;
  correo: string;
  contraseña: string;
  apellido: string;
  telefono: string;
  agente_id?: string;
  favoritos?: string[];
}
