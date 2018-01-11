class Theme {

  constructor() {
    this.themes = [
      "Macho Man"
    ]

    this.themeMenu = document.querySelector('select[name="themes"]')

    this.populateThemeSelector();
    this.addEventListeners();
  }

  addEventListeners() {
    this.themeMenu.addEventListener('change', e => {
      e.preventDefault();

      const theme = e.target.value

      document.body.classList = theme;
    })
  }

  populateThemeSelector() {
    this.themes.forEach(theme => {
      let themeClass = theme.replace( / /g, "_" ).toLowerCase();

      let option = document.createElement('option');
      option.value = `theme__${themeClass}`
      option.innerHTML = theme;

      this.themeMenu.appendChild(option);
    });
  }

}

export default Theme;
