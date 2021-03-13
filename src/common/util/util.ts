const MONTHS: string [] = [
    'JANUARY', 'FEBRUARY', 'MARCH',
    'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER',
    'OCTOBER', 'NOVEMBER', 'DECEMBER'
];

export const getURL = (path: string): string => (
    process.env.REACT_APP_SERVER_BASE_URL + '/api' + (path[0] === '/' ? path : '/' + path)
);

export const getCustomDateStringFromTimestamp = (ts: number): string | null => {
    const date: Date = new Date(ts);
    const [month, day]: [number, number] = [date.getUTCMonth(), date.getUTCDate()];
    if (month < MONTHS.length) {
        let suffix: string;
        if      (day === 1)  { suffix = 'ST' }
        else if (day === 2 ) { suffix = 'ND' }
        else if (day === 3)  { suffix = 'RD' }
        else                 { suffix = 'TH' }
        return MONTHS[month] + ' ' + day + suffix;
    }
    return null;
};

export const devLog = (err: any): void => {
    process.env.NODE_ENV === 'development' && console.log(err);
};;

/* 

Why localStorage?

I see three options for storing a token client-side:

1) Store actual token in localStorage     => prone to XSS.
2) Store actual token in httpOnly cookie  => prone to CSRF.
3) Store refresh token in httpOnly cookie => Safe (I think?)

However, I wold argue that if your site has an XSS vulnerability, you have a wealth of other problems as well,
potentially much more severe than being able to read the value of a token that expires within the next hour (in this case).

That is not to say that in theory, it's bad to expose your token in localStorage but your site 
should be secure from cross-origin-scripts anyways and thus in practice it is sufficiently safe to use localStorage, in my opinion.

*/


export const setLocalV = (data: string | object, key: string = '_plcmprv'): void => {
    try {
        const mData: string = typeof data === 'string' ? data : JSON.stringify(data); 
        localStorage.setItem(key, btoa(mData));
    } catch (err) {
        process.env.NODE_ENV === 'development' && console.log(err);
    }
};

export const removeLocalV = (key: string = '_plcmprv'): void => {
    localStorage.removeItem(key);
};

export function getLocalV<T>(key: string = '_plcmprv', parse: boolean = true): T | null {
    const item: string | null = localStorage.getItem(key);
    if (item) {
        return parse ? JSON.parse(atob(item)) : atob(item);
    }
    return null;
};