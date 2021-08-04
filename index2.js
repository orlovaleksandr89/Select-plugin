class CustomSelect {
  constructor(id, options) {
    this.id = id || 'CustomSelect'
    this.options = options || []
    this.selectedId = null
    this.#setup()
  }

  render(container) {
    const items = this.options.map((item) => {
      return `<li class='select-dropdown__list-item' data-type='item' data-value='${item.value}'>
        ${item.text}
      </li>`
    })
    const selectMenu = document.createElement('div')
    selectMenu.className = `select-dropdown select-dropdown--${this.id}`
    selectMenu.setAttribute('data-type', 'input')
    selectMenu.innerHTML = `
    <button class="select-dropdown__button select-dropdown__button--${
      this.id
    }" data-type="input">
    <span class="select-dropdown select-dropdown--${
      this.id
    }" data-type="input " data-text="text" >Выберите Элемент</span>
    <span data-type="input" class="zmdi-chevron-down"> <i data-type="input" class="fas fa-sort-down"></i></span>
    </button>
    <ul class="select-dropdown__list select-dropdown__list--${this.id}">
    ${items.join('')}
    </ul>`

    container.append(selectMenu)
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this)
    container.addEventListener('click', this.clickHandler)
  }
  clickHandler(event) {
    const { type } = event.target.dataset
    console.log(type)
    if (type === 'input') {
      this.#toggle()
    }
    if (type === 'item') {
      const id = event.target.dataset.value
      this.#currentSelectedOption(id)
    }
  }

  get #selectedValue() {
    return this.options.find((item) => item.value === this.selectedId)
  }
  #currentSelectedOption(id) {
    this.selectedId = +id
    this.$text = container.querySelector('[data-text="text"]')
    this.$text.textContent = this.#selectedValue.text
    const allItems = this.list.querySelectorAll('[data-type="item"]')
    allItems.forEach((item) => item.classList.remove('selected'))
    const selectedItem = this.list.querySelector(`[data-value='${id}']`)
    selectedItem.classList.add('selected')
    this.#close()
  }

  get #isOpen() {
    this.list = document.querySelector('.select-dropdown__list')

    return this.list.classList.contains('active')
  }

  #toggle() {
    this.#isOpen ? this.#close() : this.#open()
  }

  #open() {
    this.list = document.querySelector('.select-dropdown__list')
    this.list.classList.add('active')
  }
  #close() {
    this.list.classList.remove('active')
  }
}
const options = [
  { value: 1, text: 'JavaScript' },
  { value: 2, text: 'NodeJS' },
  { value: 3, text: 'ReactJS' },
  { value: 4, text: 'HTML' },
  { value: 5, text: 'CSS' },
  { value: 6, text: 'VueJS' },
  { value: 7, text: 'NextJS' },
  { value: 8, text: 'KaboomJS' },
]
const customSelect = new CustomSelect('My List', options)
const mainContainer = document.querySelector('#container')
customSelect.render(mainContainer)
