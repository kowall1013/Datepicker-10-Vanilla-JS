const date = new Date(2021, 1, 18)
const form = document.querySelector('form')
const input = form.querySelector('input')

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
    button.setAttribute('type','button')
    if (day === 1) button.style.setProperty('--firstDayOfMonth', firstDayOfTheMonth + 1)

    const datetimeDay = day.toString().padStart(2, '0')
    const datetimeMonth = (month + 1).toString().padStart(2, '0')
    button.innerHTML = `<time datetime="${year}-${datetimeMonth}-${datetimeDay}">${day}</time>`

    dategrid.appendChild(button)
  }

  return dategrid.innerHTML
}

const datetimeToDate = dateTime => {
  const [year, month, day = 1] = dateTime.split("-").map(num => parseInt(num))

  return new Date(year, month - 1, day)
}

const toTwoDigitsString = date => {
  return  date.toString().padStart(2, '0')
}

const createDatepicker = (date, input) => {
  const datepicker = document.createElement('div')
  datepicker.classList.add('datepicker')

  const year = date.getFullYear()
  const month = date.getMonth()
  const monthName = monthsInAYear[month]
  const dateTimeMonth = (month + 1).toString().padStart(2, '0')

  const previousNextMonthButtons = `
    <div class="datepicker__buttons">
      <button type="button" class="datepicker__previous">
        <svg viewBox="0 0 20 20">
          <path fill="currentColor" d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z" /></svg>
        </svg>
      </button>

      <button type="button" class="datepicker__next">
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

  const inputRect = input.getBoundingClientRect()
  const oneRem = parseFloat(getComputedStyle(document.body)['font-size'])
  datepicker.style.left = `${inputRect.left}px`
  datepicker.style.top = `${inputRect.bottom + oneRem}px`

  
  


  const getDateFromYearMonthIndicator = _ => {
    const time = datepicker.querySelector('.datepicker__monthIndicator').firstElementChild
    const dateTime = time.getAttribute('datetime')

    return datetimeToDate(dateTime)
  }

  const updateYearMonthIndicatorTimeElement = date => {
    const time = datepicker.querySelector('.datepicker__monthIndicator').firstElementChild

    const year = date.getFullYear()
    const targetMonth = date.getMonth()
    const monthName = monthsInAYear[targetMonth]
    const dateTimeMonth = (targetMonth + 1).toString().padStart(2, '0')

    time.textContent = `${monthName} ${year}`
    time.setAttribute('datetime', `${year}-${dateTimeMonth}`)
  }

  const previousNextButton = datepicker.querySelector('.datepicker__buttons')

  previousNextButton.addEventListener('click', event => {
    if (!event.target.matches('button')) return
    const currentDate = getDateFromYearMonthIndicator()
    const month = currentDate.getMonth()

    const targetDate = event.target.matches('.datepicker__previous')
      ? new Date(year, month - 1)
      : new Date(year, month + 1)

    updateYearMonthIndicatorTimeElement(targetDate)

    const dategrid = document.querySelector('.datepicker__date-grid')
    dategrid.innerHTML = createDateGridHTML(targetDate)

  })

  const dategrid = datepicker.querySelector('.datepicker__date-grid')
  dategrid.addEventListener('click', event => {
    if (!event.target.matches('button')) return
    const button = event.target
    const buttons = [...button.parentElement.children]

    buttons.forEach(btn => btn.classList.remove('is-selected'))
    button.classList.add('is-selected')

    const time = button.firstElementChild
    const datetime = time.getAttribute('datetime')
    const selectedDate = datetimeToDate(datetime)

    const year = selectedDate.getFullYear()
    const month = toTwoDigitsString(selectedDate.getMonth() + 1)
    const day = toTwoDigitsString(selectedDate.getDate())

    const formatted = `${day}/${month}/${year}`
    input.value = formatted

  })

  return datepicker

}

document.body.appendChild(createDatepicker(date, input))















