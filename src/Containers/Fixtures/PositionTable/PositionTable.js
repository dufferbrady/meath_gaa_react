import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import classes from './PositionTable.module.css';

const styles = {
    TableCell: {
        paddingLeft: '15px'
    },
    PromotionLine: {
        color: 'red'
    },
    RelegationLine: {
        borderTop: '1px dashed black'
    }
};

const positionTable = props => {

    const { classes } = props;

    const getTeamPositionsHandler = teams => (
        teams ?
            teams.map((pos, i) => (
                <TableRow key={i} className={classes.PromotionLine}>
                    <TableCell className={classes.TableCell}>{pos.team}</TableCell>
                    <TableCell className={classes.TableCell}>{pos.p}</TableCell>
                    <TableCell className={classes.TableCell}>{pos.w}</TableCell>
                    <TableCell className={classes.TableCell}>{pos.d}</TableCell>
                    <TableCell className={classes.TableCell}>{pos.l}</TableCell>
                    <TableCell className={classes.TableCell}>{pos.pts}</TableCell>
                </TableRow>
            ))
            : null
    )

    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.TableCell}>Team</TableCell>
                        <TableCell className={classes.TableCell}>P</TableCell>
                        <TableCell className={classes.TableCell}>W</TableCell>
                        <TableCell className={classes.TableCell}>D</TableCell>
                        <TableCell className={classes.TableCell}>L</TableCell>
                        <TableCell className={classes.TableCell}>Pts</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {getTeamPositionsHandler(props.teams)}
                </TableBody>
            </Table>
        </Paper>
    );
};

positionTable.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(positionTable);