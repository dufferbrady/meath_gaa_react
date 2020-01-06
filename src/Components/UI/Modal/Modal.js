import React, { Component } from 'react'
import classes from './Modal.module.css'
import BackDrop from '../Backdrop/Backdrop'
import Aux from '../../../HOC/Auxillary/Auxillary'

class Modal extends Component {
    // shouldComponentUpdate ( nextProps, nextState ) {
    //     return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    // }

    componentWillUpdate () {
        console.log('[Modal] WillUpdate');
    }

    render() {
        return (
            <Aux>
                <BackDrop show={ this.props.show } click={ this.props.cancelModal }/>
                <div 
                    className={classes.Modal}
                    style= {{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? 1 : 0,
                        ...this.props.add
                    }}>
                    { this.props.children }
                </div>
            </Aux>
        )
    }
} 

export default Modal