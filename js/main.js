const yearMonthIndicator = document.querySelector('.datepicker__monthIndicator')
const dateGrid = document.querySelector('.datepicker__date-grid')

const date = new Date(2021, 1, 17)

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


const dateTimeMonth = (month + 1).toString().padStart(2,'0')
yearMonthIndicator.innerHTML = `<time datetime="${year}-${dateTimeMonth}"> ${monthName} ${year} </time>`

for (let day = 1; day <= daysInMonth; day++){
  const button = document.createElement('button')
  const dateTimeDay = day.toString().padStart(2, '0')
  const firstDayOfMonth = date.getDay()

  if (day === 1) button.style.setProperty('--firstDayOfMonth', firstDayOfMonth + 1 )

  button.innerHTML = `
  <time datetime="${year}-${dateTimeMonth}-${dateTimeDay}">${day}</time>
  `

  dateGrid.appendChild(button)
}













