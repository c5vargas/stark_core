import { useAuthStore } from "@/contexts/auth/stores/authStore";
import { FormEvent, useState } from "react";
import { CredentialsType } from "../libs/types";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
	const navigate = useNavigate()
	const { login, error, loading } = useAuthStore();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	
	const handleLogin = async(ev: FormEvent<HTMLFormElement>): Promise<void> => {
		ev.preventDefault();
		const credentials: CredentialsType = { email, password };

		try {
			const status = await login(credentials);

			if(status) {
				navigate("/dashboard")
			}
				
		} catch {
			console.error('Error during login');
		}
	};
	
	return {
		email,
		password,
		errorMessage: error,
		loading,
		handleLogin,
		setEmail,
		setPassword
	}
}

export default useLogin