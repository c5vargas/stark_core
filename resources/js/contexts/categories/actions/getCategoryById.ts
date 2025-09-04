import client from "@/contexts/shared/libs/api/httpAxios"

const getCategoryById = async(id: number) => {
	try {
		const { results } = await client.get(`/api/categories/${id}`)
		return results.data
	} catch(error: any) {
		if(error.response) {
			const { status, data } = error.response;
			const errorMessage = data.message || 'Error desconocido';

			switch (status) {
				case 404:
					throw new Error('Categoría no encontrada');
				case 400:
					throw new Error(errorMessage || 'Solicitud inválida');
				default:
					throw new Error('Error en la autenticación. Inténtalo de nuevo');
			}
		} else if (error.request) {
			throw new Error('No se ha podido comunicar con el servidor. Verifica tu conexión.')
		}

		throw new Error('Error inesperado. Inténtalo más tarde');

	}
}

export default getCategoryById
