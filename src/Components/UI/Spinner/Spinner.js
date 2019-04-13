import React from 'react'

import classes from './Spinner.module.css'

const spinner = ({ height, width }) => (
    <div
        style={{
            height,
            width
        }}
        className={classes.Loader}>Loading...</div>
)

export default spinner