import { useState, useCallback, useEffect, useRef, MutableRefObject } from 'react';
import { UseStateTuple, IResponse, UseHttp, SendRequest } from '../types';


export default function useHttp<T> (): UseHttp<T> {
    
    const [isLoading, setIsLoading]: UseStateTuple<
        boolean
    > = useState<boolean>(false);

    const [error, setError]        : UseStateTuple<
        string
    >  = useState<string>('');

    const activeRequests           : MutableRefObject<
        AbortController[]
    > = useRef<AbortController[]>([]);

    const sendRequest: SendRequest<T> = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setIsLoading(true);
        const abortController: AbortController = new AbortController();
        activeRequests.current.push(abortController);
        try {
            const response: Response      = await fetch(url, { method, body, headers, signal: abortController.signal });
            const data    : T & IResponse = await response.json();

            activeRequests.current = activeRequests.current.filter(e => e !== abortController);
            
            if (!response.ok) {
                throw new Error(data.message);
            }
            
            return data;

        } catch (err) {
            setError(err.message || 'An error occurred. Please try again.');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const clearError = (): void => {
        setError('');
    };

    useEffect(() => {
        return () => {
            // The ref value 'activeRequests.current' will likely have changed by the time this effect cleanup function runs.
            // However, that is fine in this case, as we'd like the newest changed state to clear active requests from.
            // eslint-disable-next-line
            activeRequests.current.forEach(controller => {
                controller.abort();
            });
        }
    }, []);

    return { isLoading, error, sendRequest, clearError }
};