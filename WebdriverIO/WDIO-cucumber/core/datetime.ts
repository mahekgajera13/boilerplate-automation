import * as moment from 'moment'
import { GeneralSettingsDefaultValues } from '../data/generalSettings';

class DateTime {

  static getCurrentQtrStartDate(dateTimeFormat: string) {  //dateformat example: 'DD.MM.YYYY' 
    return moment().startOf('quarter').format(dateTimeFormat);
  }

  static getCurrentQtrEndDate(dateTimeFormat: string) {
    return moment().endOf('quarter').format(dateTimeFormat);
  }

  static getNextQtrStartDate(dateTimeFormat: string) {
    const nextQuarterNo = (moment().quarter()) + 1;
    return moment().quarter(nextQuarterNo).startOf('quarter').format(dateTimeFormat);
  }

  static getNextQtrEndDate(dateTimeFormat: string) {  
    const nextQuarterNo = (moment().quarter()) + 1;
    return moment().quarter(nextQuarterNo).endOf('quarter').format(dateTimeFormat);
  }

  static getCurrentYearStartDate(dateTimeFormat: string) {
    return moment().startOf('year').format(dateTimeFormat);
  }


  static getCurrentYearEndDate(dateTimeFormat: string) {
    return moment().endOf('year').format(dateTimeFormat);
  }


  static getNextYearStartDate(dateTimeFormat: string) {
    const nextYearNo = moment().year() + 1;
    return moment().startOf('year').year(nextYearNo).format(dateTimeFormat);
  }


  static getNextYearEndDate(dateTimeFormat: string) {
    const nextYearNo = moment().year() + 1;
    return moment().endOf('year').year(nextYearNo).format(dateTimeFormat);
  }

  static getTodaysDate(dateTimeFormat: string) {
    return moment().format(dateTimeFormat);
  }

  static getNextSaturdaysDate(dateTimeFormat: string) {
    const today = moment();
    const daysUntilNextSaturday = (6 - today.day() + 7) % 7; // Calculate the number of days until next Saturday

    // Use moment to add days to the current date
    const nextSaturday = today.add(daysUntilNextSaturday, 'days');
    return nextSaturday.format(dateTimeFormat);
  }

  static getNextMondaysDate(dateTimeFormat: string) {
    const today = moment();
    const daysUntilNextMonday = (8 - today.day()) % 7 || 7; // Calculate the number of days until next Monday

    const nextMonday = today.add(daysUntilNextMonday, 'days');
    return nextMonday.format(dateTimeFormat);
  }

  static getNthYearStartDateFromCurrentYear(dateTimeFormat: string, noOfYear: number) {
    const NthYear = moment().year() + noOfYear;
    return moment().startOf('year').year(NthYear).format(dateTimeFormat);
  }

  static getNthYearEndDateFromCurrentYear(dateTimeFormat: string, noOfYear: number) {
    const NthYear = moment().year() + noOfYear;
    return moment().endOf('year').year(NthYear).format(dateTimeFormat);
  }

  /**
   * Get Dates of all mondays of specific month of current in the format specified
   * @param month month number where 1=Jan 2=Feb....12=Dec
   * @param dateFormat format of date needed
   * @returns Dates of all mondays of specific month of current in the format specified
   */
  static getAllMondayDatesFromSpecificMonthOfCurrentYear(month: number, dateFormat: string) {
    const year = moment().year();
    const startDate = moment(`${year}-${month}-01`);
    const endDate = startDate.clone().endOf('month');

    const mondays: string[] = [];

    while (startDate.isSameOrBefore(endDate)) {
      if (startDate.day() === 1) { // Check if the day is Monday (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        mondays.push(startDate.format(dateFormat));
      }
      startDate.add(1, 'day');
    }
    return mondays;
  }

  /**
   * Get Dates of all fridays of specific month of current in the format specified
   * @param month month number where 1=Jan 2=Feb....12=Dec
   * @param dateFormat format of date needed
   * @returns Dates of all fridays of specific month of current in the format specified
   */
  static getAllFridayDatesFromSpecificMonthOfCurrentYear(month: number, dateFormat: string) {
    const year = moment().year();
    const startDate = moment(`${year}-${month}-01`);
    const endDate = startDate.clone().endOf('month');

    const fridays: string[] = [];

    while (startDate.isSameOrBefore(endDate)) {
      if (startDate.day() === 5) { // Check if the day is Monday (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        fridays.push(startDate.format(dateFormat));
      }
      startDate.add(1, 'day');
    }
    return fridays;
  }

  static getNthMondayOfSpecificMonth(index: number, monthIndex: number, year: number) {
    const month = monthIndex; // (zero-based index)

    // Create a Moment object for the first day of the month
    const firstDayOfMonth = moment({ year, month });

    // Get the first Monday of the month
    const firstMonday = firstDayOfMonth.clone().startOf('month').day(1);

    // Calculate the date of the nth Monday
    const nthMonday = firstMonday.add(index - 1, 'weeks');

    // Output the date of the nth Monday
    return nthMonday.format(GeneralSettingsDefaultValues.global.dateFormat);
  }

  static getPreviousYearStartDate(dateTimeFormat: string) {
    return moment().startOf('year').subtract(1, "year").format(dateTimeFormat);
  }

  static getPreviousYearEndDate(dateTimeFormat: string) {
    return moment().endOf('year').subtract(1, "year").format(dateTimeFormat);
  }
  
  static getCurrentYearSpecificMonthEndDate(monthIndex: string, dateTimeFormat: string) {
    const lastDayOfMonth = moment().endOf('month').month(monthIndex);
      if (lastDayOfMonth.day() === 6) { // 6 represents Saturday
        // If it's Saturday, deduct a number (for example, 1 day)
        lastDayOfMonth.subtract(1, 'day');
    } else if (lastDayOfMonth.day() === 0) { // 0 represents Sunday
        // If it's Sunday, add a number (for example, 1 day)
        lastDayOfMonth.add(1, 'day');
    }
    const formattedDate = lastDayOfMonth.format(dateTimeFormat);
    return formattedDate;
  }

  static getCurrentYearSpecificMonthStartDate(monthIndex: string, dateTimeFormat: string) {
    const lastDayOfMonth = moment().startOf('month').month(monthIndex);
      if (lastDayOfMonth.day() === 6) { // 6 represents Saturday
        // If it's Saturday, deduct a number (for example, 1 day)
        lastDayOfMonth.subtract(1, 'day');
    } else if (lastDayOfMonth.day() === 0) { // 0 represents Sunday
        // If it's Sunday, add a number (for example, 1 day)
        lastDayOfMonth.add(1, 'day');
    }
    const formattedDate = lastDayOfMonth.format(dateTimeFormat);
    return formattedDate;
  }

  static getCurrentMonthYearDate(day: number, offsetMonths = 0, format = 'DD.MM.YYYY'): string {
    return moment()
      .add(offsetMonths, 'months')
      .date(day)
      .format(format);
  }
}
export default DateTime;