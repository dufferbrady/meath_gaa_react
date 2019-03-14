import React from 'react';
import Zoom from 'react-reveal/Zoom'

import classes from './Text.module.css'

const Text = () => {
    return (
        <div className={ classes.Text }>
            <Zoom left cascade delay={300}>
                Meath GAA
            </Zoom>
        </div>
    );
};

export default Text;