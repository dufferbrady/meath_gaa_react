import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import { NodeGroup } from 'react-move';
import { interpolate, interpolateTransformSvg } from 'd3-interpolate'

import classes from './Stripes.module.css'

class Stripes extends Component {

    state = {
        stripes: [
            {
                name: 'StripeOne',
                background: "#259C41",
                left: 0,
                rotate: 25,
                top: -150,
                delay: 0
            },
            {
                name: 'StripeTwo',
                background: '#FFD306',
                left: 30,
                rotate: 25,
                top: -150,
                delay: 500
            },
            {
                name: 'StripeThree',
                background: '#259C41',
                left: 60,
                rotate: 25,
                top: -150,
                delay: 1000
            }
        ]
    }


    render() {
        return (
            <div>
                <NodeGroup
                    data={this.state.stripes}
                    keyAccessor={(item) => item.name}

                    start={(item, index) => ({
                        background: '#FFD306',
                        opacity: 0,
                        left: 0,
                        rotate: 0,
                        top: 0
                    })}

                    enter={(item, index) => ({
                        background: [item.background],
                        opacity: [1],
                        left: [item.left],
                        rotate: [item.rotate],
                        top: [item.top],
                        timing: { delay: item.delay, duration: 200, ease: easePolyOut },
                        events: {
                            end() {
                                console.log('[Enter Function]', item.background)
                            }
                        }
                    })}

                    interpolation={(begValue, endValue, attr) => {
                        if (attr === 'transform') {
                            return interpolateTransformSvg(begValue, endValue)
                        }

                        return interpolate(begValue, endValue)
                    }}
                >
                    {nodes => (
                        <div className={classes.Stripes_Wrapper}>
                            {nodes.map(({ key, state: { background, opacity, left, rotate, top } }) => {
                                console.log('[Map Function]', background)
                                return (
                                    <div
                                        className={classes.Stripe}
                                        key={key}
                                        style={{
                                            background,
                                            opacity,
                                            transform: `rotate(${rotate}deg) translate(${left}px, ${top}px)`
                                        }}
                                    ></div>
                                )
                            })}
                        </div>
                    )}
                </NodeGroup>
            </div>
        );
    }
}

export default Stripes;