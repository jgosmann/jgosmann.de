import { config, dom, library } from '@fortawesome/fontawesome-svg-core';
config.keepOriginalSource = false;

import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkSquareAlt';
import { faFlickr } from '@fortawesome/free-brands-svg-icons/faFlickr';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faKeybase } from '@fortawesome/free-brands-svg-icons/faKeybase';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { faStackOverflow } from '@fortawesome/free-brands-svg-icons/faStackOverflow';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
library.add(
    faBars,
    faExternalLinkSquareAlt,
    faFlickr,
    faGithub,
    faKeybase,
    faLinkedin,
    faStackOverflow,
    faTwitter);

dom.watch();


import { highlightCurrentSection, setHeaderSize } from './header';
window.addEventListener('scroll', setHeaderSize);
setHeaderSize();
window.setInterval(highlightCurrentSection, 200);


import enableCollapsibles from './collapsibles';
enableCollapsibles();


import enableMinmenu from './minmenu';
enableMinmenu();
