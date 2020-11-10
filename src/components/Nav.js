import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMusic} from '@fortawesome/free-solid-svg-icons';

const Nav = ({libraryStatus, setLibraryStatus}) => {
    return(
        <nav>
            <h1>React Music Player</h1>
            <button onClick={() => setLibraryStatus(!libraryStatus)}>
                Library&nbsp;
                <FontAwesomeIcon icon={faMusic} />
            </button>
        </nav>
    );
}

export default Nav;