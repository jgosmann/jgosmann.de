import { config, dom, library } from '@fortawesome/fontawesome-svg-core';
config.keepOriginalSource = false;

import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkSquareAlt';
import { faFlickr } from '@fortawesome/free-brands-svg-icons/faFlickr';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
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
    faHome,
    faKeybase,
    faLinkedin,
    faStackOverflow,
    faTwitter);

dom.watch();


import enableHeader from './header';
import enableCollapsibles from './collapsibles';
import enableMinmenu from './minmenu';
import enableFlyIn from './flyin';


const activateNavLinks = () => {
  const nav = document.getElementsByTagName('nav')[0];
  if (!nav) return;
  const navlinks = nav.getElementsByTagName('a');
  for (let i = 0; i < navlinks.length; ++i) {
      const target = document.getElementById(
          navlinks[i].attributes['href'].value.substring(1))
      navlinks[i].addEventListener('click', (e) => {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      });
  }
}

const Load = () => {
  enableHeader();
  activateNavLinks();
  enableFlyIn();
  enableCollapsibles();
  enableMinmenu();
}

if (document.readyState === 'loading') {
  window.addEventListener('load', Load);
} else {
  Load();
}
