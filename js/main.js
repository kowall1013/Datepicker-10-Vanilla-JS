const yearMonthIndicator = document.querySelector('.datepicker__monthIndicator')

const date = new Date(2021, 1, 16)

const monthsInAYear = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const month = date.getMonth()
const monthName = monthsInAYear[month]
const year = date.getFullYear()
const lastDayInMonth = new Date(year, month + 1, 0)
const daysInMonth = lastDayInMonth.getDate()

console.log(daysInMonth);


const dateTimeMonth = (month + 1).toString().padStart(2,'0')
yearMonthIndicator.innerHTML = `<time datetime="${year}-${dateTimeMonth}"> ${monthName} ${year} </time>`













