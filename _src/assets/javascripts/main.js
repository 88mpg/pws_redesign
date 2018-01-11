import Theme from './components/Theme'
import Search from './components/Search'

if (document.querySelector('select[name="themes"]')) new Theme();
if (document.querySelector('.search')) new Search();
