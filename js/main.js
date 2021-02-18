const date = new Date(2021, 1, 18)
const form = document.querySelector('form')

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

const createDateGridHTML = date => {
  const dategrid = document.createElement('div')
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDayOfTheMonth = new Date(date.setDate(1)).getDay()
  const lastDayInMonth = new Date(year, month + 1, 0)
  const daysInMonth = lastDayInMonth.getDate()

  for (let day = 1; day <= daysInMonth; day++) {
    const button = document.createElement('button')
    if (day === 1) button.style.setProperty('--firstDayOfMonth', firstDayOfTheMonth + 1)

    const datetimeDay = day.toString().padStart(2, '0')
    const datetimeMonth = (month + 1).toString().padStart(2, '0')
    button.innerHTML = `<time datetime="${year}-${datetimeMonth}-${datetimeDay}">${day}</time>`

    dategrid.appendChild(button)
  }

  return dategrid.innerHTML
}

const createDatepicker = date => {
  const datepicker = document.createElement('div')
  datepicker.classList.add('datepicker')

  const year = date.getFullYear()
  const month = date.getMonth()
  const monthName = monthsInAYear[month]
  const dateTimeMonth = (month + 1).toString().padStart(2, '0')

  const previousNextMonthButtons = `
    <div class="datepicker__buttons">
      <button class="datepicker__previous">
        <svg viewBox="0 0 20 20">
          <path fill="currentColor" d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z" /></svg>
        </svg>
      </button>

      <button class="datepicker__next">
        <svg viewBox="0 0 20 20">
          <path fill="currentColor" d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
        </svg>
      </button>
    </div>
  `
  const calendar = `
    <div class="datepicker__calendar">
      <div class="datepicker__monthIndicator">
              <time datetime="${year}-${dateTimeMonth}">${monthName} ${year}</time>
      </div>
       <div class="datepicker__day-of-week">
          <div>Su</div>
          <div>Mo</div>
          <div>Tu</div>
          <div>We</div>
          <div>Th</div>
          <div>Fr</div>
          <div>Sa</div>
      </div>
      <div class="datepicker__date-grid">
        ${createDateGridHTML(date)}
      </div>
    </div>
  `

  datepicker.innerHTML = `
    ${previousNextMonthButtons}
    ${calendar}
  `
  const previousNextButton = datepicker.querySelector('.datepicker__buttons')

  previousNextButton.addEventListener('click', event => {
    const datetimeToDate = dateTime => {

      const [year, month] = dateTime.split('-')
      console.log(year);
      console.log(month);
      
      



      return new Date(year, month - 1)
    }
    if (!event.target.matches('button')) return

    if (event.target.matches('.datepicker__previous')) {
    }

    if (event.target.matches('.datepicker__next')) {
      const timeEl = datepicker.querySelector('.datepicker__monthIndicator').firstElementChild
      const dateTime = timeEl.getAttribute('datetime')
      const currentDate = datetimeToDate(dateTime)

    }
  })

  return datepicker
}

form.appendChild(createDatepicker(date))















