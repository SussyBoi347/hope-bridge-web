import About from './pages/About';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import GetInvolved from './pages/GetInvolved';
import GetSupport from './pages/GetSupport';
import Home from './pages/Home';
import Programs from './pages/Programs';
import Schools from './pages/Schools';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "Contact": Contact,
    "Donate": Donate,
    "GetInvolved": GetInvolved,
    "GetSupport": GetSupport,
    "Home": Home,
    "Programs": Programs,
    "Schools": Schools,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};