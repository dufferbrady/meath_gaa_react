import React from 'react';

import DashboardLayout from '../../../HOC/DashboardLayout/DashboardLayout'
import { noAuto } from '@fortawesome/fontawesome-svg-core';

const Dashboard = () => {
    return (
        <DashboardLayout>
            <div style={{
                fontSize: '4vw',
                color: 'rgb(254,210,6)',
                marginTop: '50px'
                
            }}>
                This is the main dashboard
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;