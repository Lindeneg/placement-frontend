export const getURL = (path: string): string => (
    process.env.REACT_APP_SERVER_BASE_URL + (path[0] === '/' ? path : '/' + path)
);