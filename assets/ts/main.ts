import { config, dom, library } from '@fortawesome/fontawesome-svg-core';
config.keepOriginalSource = false;

import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkSquareAlt';
library.add(faExternalLinkSquareAlt);

dom.watch();


import setHeaderSize from './header';
window.addEventListener('scroll', setHeaderSize);
setHeaderSize();


import enableCollapsibles from './collapsibles';
enableCollapsibles();
