import React from 'react';

import Nav from '../../Components/Admin/Dashboard/nav/nav'
import classes from './DashboardLayout.module.css';

const DashboardLayout = props => {
    return (
        <div className={classes.Layout_Container}>
            <div className={classes.Container_Left}>
                <Nav />
            </div>
            <div className={classes.Container_Right}>
                {props.children}
            </div>
        </div>
    );
};

export default DashboardLayout;