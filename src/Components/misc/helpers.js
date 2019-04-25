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
    Object.keys(DBdata)
        .map(item => (
            data.push({
                ...DBdata[item],
                id: item
            })
        ));
    return data
    // this.setState({
    //     matches: data,
    //     loading: false
    // })
}

export {
    validationHandler,
    getFirebaseDataHandler
}