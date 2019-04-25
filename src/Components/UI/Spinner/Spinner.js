import React from 'react'

import classes from './Spinner.module.css'

const spinner = ({ height, width, marginTop }) => (
    <div
        style={{
            height,
            width,
            marginTop
        }}
        className={classes.Loader}>Loading...</div>
)

export default spinner