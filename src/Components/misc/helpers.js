import { firebase } from '../../Firebase'

const validationHandler = input => {
    let error = [true, ''];

    if (input.validation.email) {
        let valid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input.value);
        let message = `${!valid ? 'Sorry, please give a valid email' : ''}`;
        error = !valid ? [valid, message] : error;
    }

    if (input.validation.required) {
        let valid = input.value.trim() !== '';
        let message = `${!valid ? 'Sorry, please fill in all required fields' : ''}`;
        error = !valid ? [valid, message] : error;
    }

    return error
}

const getFirebaseDataHandler = DBdata => {
    let data = [];
    console.log(DBdata)
    Object
        .keys(DBdata)
        .map(item => {
            data.push({
                ...DBdata[item],
                id: item,
            })
        });
    console.log(data)
    return data
}

const dateConvertor = date => {
    const dateString = date.replace(/-/gi, "");
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);

    const newDate = Date(year, month - 1, day);
    const dateFinal = `${newDate.substring(0, 3)},${newDate.substring(3, 10)}`
    return dateFinal
}

const playerSeperator = (players, position) => {
    if(position === 'GK') {
        return players.filter(player => player.position === 'Goalkeeper')
    }else if(position === 'DF') {
        return players.filter(player => (
            player.position === 'Corner Back' ||
            player.position === 'Full Back' ||
            player.position === 'Wing Back' || 
            player.position === 'Center Back'
        ))
    }else if(position === 'MD') {
        return players.filter(player => player.position === 'Midfield')
    }else if(position === 'FD') {
        return players.filter(player => (
            player.position === 'Corner Forward' ||
            player.position === 'Full Forward' ||
            player.position === 'Wing Forward' || 
            player.position === 'Center Forward'
        ))
    }
}

export {
    validationHandler,
    getFirebaseDataHandler,
    dateConvertor,
    playerSeperator
}