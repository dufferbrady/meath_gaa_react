import React from 'react'

import classes from './Spinner.module.css'

const spinner = ({ height, width, marginTop, marginLeft }) => (
    <div
        style={{
            height,
            width,
            marginTop,
            marginLeft
        }}
        className={classes.Loader}>Loading...</div>
)

export default spinner