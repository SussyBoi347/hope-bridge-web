import About from './pages/About';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import GetInvolved from './pages/GetInvolved';
import GetSupport from './pages/GetSupport';
import Mission from './pages/Mission';
import Programs from './pages/Programs';
import Schools from './pages/Schools';
import StoryProject from './pages/StoryProject';
import StorySharing from './pages/StorySharing';
import Home from './pages/Home';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "Contact": Contact,
    "Donate": Donate,
    "GetInvolved": GetInvolved,
    "GetSupport": GetSupport,
    "Mission": Mission,
    "Programs": Programs,
    "Schools": Schools,
    "StoryProject": StoryProject,
    "StorySharing": StorySharing,
    "Home": Home,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};