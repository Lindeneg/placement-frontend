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