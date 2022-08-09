import { useState } from 'react';
import { AUTH_ACTION_TYPES } from '../context/AuthContext';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
	const { dispatch } = useAuthContext();
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);

	const signup = async (email, password) => {
		setIsLoading(true);
		setError(null);
		const response = await fetch('/api/user/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		});
		const json = await response.json();
		if (!response.ok) {
			setError(json.error);
		}
		if (response.ok) {
			localStorage.setItem('user', JSON.stringify(json));
			dispatch({
				type: AUTH_ACTION_TYPES.LOGIN,
				payload: json,
			});
		}
		setIsLoading(false);
	};

	return { signup, isLoading, error };
};
