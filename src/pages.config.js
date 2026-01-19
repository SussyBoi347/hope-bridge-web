import Donate from './pages/Donate';
import Home from './pages/Home';
import GetSupport from './pages/GetSupport';
import Programs from './pages/Programs';
import Schools from './pages/Schools';
import GetInvolved from './pages/GetInvolved';
import About from './pages/About';
import Contact from './pages/Contact';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Donate": Donate,
    "Home": Home,
    "GetSupport": GetSupport,
    "Programs": Programs,
    "Schools": Schools,
    "GetInvolved": GetInvolved,
    "About": About,
    "Contact": Contact,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};