import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const style ={
    Cell:{
        padding: '4px 16px 4px 11px',
        borderBottom: '1px solid black',
        color: 'black',
        textAlign: 'center'
    },
    TopCell:{
        padding: '4px 16px 4px 11px',
        borderBottom: '1px solid black',
        color: '#ffffff',
        textAlign: 'center',
        backgroundColor: '#259C41'
    },
    TableBorder: {
        borderLeft: '2px solid #083412'
    }
}

const positionTable = props => {

    const getTeamPositionsHandler = teams => (
        teams ?
            teams.map((pos, i) => (
                <TableRow key={i}>
                    <TableCell style={style.Cell}>{pos.team}</TableCell>
                    <TableCell style={style.Cell}>{pos.p}</TableCell>
                    <TableCell style={style.Cell}>{pos.w}</TableCell>
                    <TableCell style={style.Cell}>{pos.d}</TableCell>
                    <TableCell style={style.Cell}>{pos.l}</TableCell>
                    <TableCell style={style.Cell}>{pos.pts}</TableCell>
                </TableRow>
            ))
            : null
    )

    return (
        <div>
            <Table style={style.TableBorder}>
                <TableHead>
                    <TableRow>
                        <TableCell style={style.TopCell}>Team</TableCell>
                        <TableCell style={style.TopCell}>P</TableCell>
                        <TableCell style={style.TopCell}>W</TableCell>
                        <TableCell style={style.TopCell}>D</TableCell>
                        <TableCell style={style.TopCell}>L</TableCell>
                        <TableCell style={style.TopCell}>Pts</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {getTeamPositionsHandler(props.teams)}
                </TableBody>
            </Table>
        </div>
    );
};

export default positionTable;