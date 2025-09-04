import client from "@/contexts/shared/libs/api/httpAxios"
import { CategoryForm } from "../libs/types";

const updateCategory = async(payload: CategoryForm) => {
	try {
		const {message, status} = await client.post(`/api/categories/${payload.id}`, payload, {}, true)
		
		if(status !== 200)
			throw new Error(message);

		return message
	} catch(error: any) {
		if(error.response) {
			const { status, data } = error.response;

            if (status === 400 || status === 422) {
                throw {
                    status,
                    message: data.message || 'The fields are not valid',
                    errors: data.errors || {} 
                };
            }

			throw new Error(data.message || 'Unknown error');
		} else if (error.request) {
            throw new Error('Could not communicate with the server. Please check your connection.');
		}
		throw new Error('Unexpected error. Please try again later.');

		
	}
}

export default updateCategory
