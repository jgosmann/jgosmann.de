import { config, dom, library } from '@fortawesome/fontawesome-svg-core';
config.keepOriginalSource = false;

import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkSquareAlt';
import { faFlickr } from '@fortawesome/free-brands-svg-icons/faFlickr';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faKeybase } from '@fortawesome/free-brands-svg-icons/faKeybase';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { faStackOverflow } from '@fortawesome/free-brands-svg-icons/faStackOverflow';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
library.add(
    faBars,
    faChevronDown,
    faChevronUp,
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


const navlinks = document.getElementsByTagName('nav')[0].getElementsByTagName('a');
for (let i = 0; i < navlinks.length; ++i) {
    const target = document.getElementById(
        navlinks[i].attributes['href'].value.substring(1))
    navlinks[i].addEventListener('click', (e) => {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    });
}
