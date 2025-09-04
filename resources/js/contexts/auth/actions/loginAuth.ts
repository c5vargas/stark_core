import client from "@/contexts/shared/libs/api/httpAxios";
import { Auth, CredentialsType } from "../libs/types";

interface IResponse {
  results: {
    token: string,
    user: Auth
  },
  status: number
}

const loginAuth = async(credentials: CredentialsType): Promise<IResponse> => {

  try {
    const response = await client.post<IResponse>('api/auth/login', credentials);
    return response
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;
      const errorMessage = data.message || 'Error desconocido';
    
      switch (status) {
        case 404:
          throw new Error('Usuario no encontrado.');
        case 400:
          throw new Error(errorMessage || 'Solicitud inválida.');
        default:
          throw new Error('Error en la autenticación. Inténtalo de nuevo.');
      }
    } else if (error.request) {
      throw new Error('No se ha podido comunicar con el servidor. Verifica tu conexión.');
    }
    
    throw new Error('Error inesperado. Inténtalo más tarde.');
  }
}

export default loginAuth