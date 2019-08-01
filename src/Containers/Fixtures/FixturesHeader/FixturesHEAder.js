import React from 'react';

import classes from './FixturesHeader.module.css';
import Button from '../../../Components/UI/Button/Button';

const FixturesHeader = props => {
    return (
        <div className={classes.Container}>
            <div className={classes.Left_Grouping}>
                <span>Show Fixtures</span>
                <div className={classes.Buttons}>
                    <Button add = {{
                        background: '#ffffff',
                        padding: '5px 9px',
                        borderRadius: '3px',
                        fontSize: '13px',
                        marginRight: '5px',
                        cursor: 'pointer',
                        border: 'none',
                        outline: 'none'
                    }}>All</Button>
                    <Button add = {{
                        background: '#ffffff',
                        padding: '5px 9px',
                        borderRadius: '3px',
                        fontSize: '13px',
                        marginRight: '5px',
                        cursor: 'pointer',
                        border: 'none',
                        outline: 'none'
                    }}>Played</Button>
                    <Button add = {{
                        background: '#ffffff',
                        padding: '5px 9px',
                        borderRadius: '3px',
                        fontSize: '13px',
                        marginRight: '5px',
                        cursor: 'pointer',
                        border: 'none',
                        outline: 'none'
                    }}>Not Played</Button>
                </div>
            </div>
            <div className={classes.Right_Grouping}>
                <span>Fixture Results</span>
                <div className={classes.Buttons}>
                    <Button add = {{
                        background: '#ffffff',
                        padding: '5px 9px',
                        borderRadius: '3px',
                        fontSize: '13px',
                        marginRight: '5px',
                        cursor: 'pointer',
                        border: 'none',
                        outline: 'none'
                    }}>All</Button>
                    <Button add = {{
                        background: '#ffffff',
                        padding: '5px 9px',
                        borderRadius: '3px',
                        fontSize: '13px',
                        marginRight: '5px',
                        cursor: 'pointer',
                        border: 'none',
                        outline: 'none'
                    }}>W</Button>
                    <Button add = {{
                        background: '#ffffff',
                        padding: '5px 9px',
                        borderRadius: '3px',
                        fontSize: '13px',
                        marginRight: '5px',
                        cursor: 'pointer',
                        border: 'none',
                        outline: 'none'
                    }}>L</Button>
                    <Button add = {{
                        background: '#ffffff',
                        padding: '5px 9px',
                        borderRadius: '3px',
                        fontSize: '13px',
                        marginRight: '5px',
                        cursor: 'pointer',
                        border: 'none',
                        outline: 'none'
                    }}>D</Button>
                </div>
            </div>
        </div>
    );
};

export default FixturesHeader;