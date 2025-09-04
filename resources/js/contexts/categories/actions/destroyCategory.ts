import client from "@/contexts/shared/libs/api/httpAxios"

const destroyCategory = async(id: number) => {
	try {
		const {message, status} = await client.delete(`/api/categories/${id}`)
		
		if(status !== 200)
			throw new Error(message);

		return message
	} catch(error: any) {
		if(error.response) {
			const { status, data } = error.response;
			const errorMessage = data.message || 'Error desconocido';

			switch (status) {
				case 400:
					throw new Error(errorMessage || 'Solicitud inválida');
				case 422:
					throw new Error(errorMessage || 'Los campos no son válidos');
				default:
					throw new Error('Error en la autenticación. Inténtalo de nuevo');
			}
		} else if (error.request) {
			throw new Error('No se ha podido comunicar con el servidor. Verifica tu conexión.')
		}
		throw new Error('Error inesperado. Inténtalo más tarde');

		
	}
}

export default destroyCategory
