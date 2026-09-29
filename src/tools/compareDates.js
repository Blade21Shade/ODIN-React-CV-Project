/**
 * Checks if a 'startDate' is before an 'endDate'
 * @param {String} startDate The date that should be first chronologically in yyyy-mm-dd format 
 * @param {String} endDate The date that should be second chronologically in yyyy-mm-dd format 
 * @returns True if the start date is before the end date, false if not
 */
export default function compareDates(startDate, endDate) {
    // yyyy-mm-dd
    let startSplit = startDate.split('-');
    let endSplit = endDate.split('-');

    /**
     * 1. If end year is greater than start year, the dates are valid: return true
     * 2. If the end year is less than start year, the dates are invalid: return false
     * 3. If the years are equal, check months
     * Repeat 1-3 for months if needed, then days if needed
     */
    for (let i = 0; i < 3; i++) {
        if (endSplit[i] > startSplit[i]) {
            return true;
        } else if (endSplit[i] < startSplit[i]) {
            return false;
        }
    }

    // Starting and ending on the same day of the same month of the same year is considered invalid
    return false;
}