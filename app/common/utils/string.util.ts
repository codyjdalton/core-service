/**
 * @const truncate
 * @param {string} str 
 * @param {number} n 
 */
export const truncate = (str: string, n: number): string => {
    return (str && str.length > n) ? str.substr(0, n-1) + '...' : str;
};