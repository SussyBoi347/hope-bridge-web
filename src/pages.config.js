import Home from './pages/Home';
import Donate from './pages/Donate';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Donate": Donate,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};