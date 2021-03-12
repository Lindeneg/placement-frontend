import { useState, useCallback, useEffect } from 'react';

import { StoredData } from "../../common/types";
import { getLocalV, removeLocalV, setLocalV } from '../../common/util/util';


export interface IAuthHook {
    token: string,
    userId: string,
    login: (userId: string, responseToken: string, tokenExpire?: number) => void,
    logout: () => void
};

export const useAuth = (): IAuthHook => {
	const [userId, setUserId]  = useState<string>('');
	const [token,  setToken]   = useState<string>('');

	const login = useCallback((userId: string, responseToken: string, tokenExpire?: number) => {
		const expires: number = tokenExpire || Date.now() + (1000 * 60 * 60);
		setUserId(userId);
		setToken(responseToken);
		setLocalV({ _id: userId, _token: responseToken, _expires: expires});
	}, []);

	const logout = useCallback(() => {
		setUserId('');
		setToken('');
		removeLocalV();
	}, []);

	useEffect(() => {
		const data = getLocalV<StoredData>();
		if (data && data._id && data._token && data._expires && Date.now() < data._expires) {
			login(data._id, data._token, data._expires);
		}
	}, [login]);

    return { token, userId, login, logout }
};