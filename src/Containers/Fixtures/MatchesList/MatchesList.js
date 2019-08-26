import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { matchCompetitionSeperator } from '../../../Components/misc/helpers';
import Button from '../../../Components/UI/Button/Button';

const styles = {
    TableCell: {
        borderBottom: 'none',
        fontSize: '15px',
        textAlign: 'center'
    },
    MiddleCell: {
        padding: '4px 0px',
        borderBottom: 'none',
        fontSize: '15px',
        textAlign: 'center'
    },
    RowContainer: {
        color: '#666666',
        height: '70px',
        backgroundColor: '#F6F9FB',
        borderTop: '1px solid #E8EAEC',
        borderBottom: '1px solid #E8EAEC',
        '&:hover': {
            backgroundColor: 'rgba(255, 211, 6, 0.3)'
         },
    },
    TeamCell: {
        fontWeight: '600'
    },
    Button: {

    }
};

const MatchesList = props => {

    const { classes } = props;

    const getTeamFixturesHandler = (teams, matchType) => {
        const leagueFixtures = matchCompetitionSeperator(teams, matchType);
        return leagueFixtures ?
            leagueFixtures.map((team, i) => (
                <TableRow className={classes.RowContainer} key={i}>
                    <TableCell className={classes.TableCell}>{team.dateShow}</TableCell>
                    <TableCell className={[classes.TableCell, classes.TeamCell].join(' ')}>{team.home}</TableCell>
                    <TableCell className={classes.MiddleCell}>-</TableCell>
                    <TableCell className={[classes.TableCell, classes.TeamCell].join(' ')}>{team.away}</TableCell>
                    <TableCell className={classes.TableCell}>
                        <Button add = {{
                        background: '#ffffff',
                        padding: '5px 9px',
                        borderRadius: '3px',
                        fontSize: '16px',
                        marginRight: '5px',
                        cursor: 'pointer',
                        border: 'none',
                        outline: 'none'
                    }}>More</Button>
                    </TableCell>
                </TableRow>
            ))
            : null
        }  

    return (
        <div>
            <Table>
                <TableBody>
                    {getTeamFixturesHandler(props.matches, 'Allianz Football League')}
                </TableBody>
            </Table>
        </div>
    );
};

MatchesList.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(MatchesList)
