import React from 'react';

const MatchesList = props => {

    return (
        <div>
            {
                props.matches ?
                props.matches.map(match => (
                    <div>
                        {match.home}
                    </div>
                ))
                : null
            }
        </div>
    );
};

export default MatchesList;