const MONTHS: string [] = [
    'JANUARY', 'FEBRUARY', 'MARCH',
    'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER',
    'OCTOBER', 'NOVEMBER', 'DECEMBER'
];

export const getURL = (path: string): string => (
    process.env.REACT_APP_SERVER_BASE_URL + '/api' + (path[0] === '/' ? path : '/' + path)
);

export const getDateFromTimestamp = (ts: number): string | null => {
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
}

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
}

export function getLocalV<T>(key: string = '_plcmprv', parse: boolean = true): T | null {
    const item: string | null = localStorage.getItem(key);
    if (item) {
        return parse ? JSON.parse(atob(item)) : atob(item);
    }
    return null;
};