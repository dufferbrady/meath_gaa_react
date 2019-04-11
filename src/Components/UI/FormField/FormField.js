import React from 'react';
import classes from './FormField.module.css';

const FormField = ({ label, add, formData, id, change }) => {

    let formTemplate = null;
    switch (formData.element) {
        case ('input'):
            formTemplate = (
                <div className={classes.FormField}>
                    {formData.showLabel ?
                        <div
                            style={{
                                ...label
                            }}>
                            {formData.config.label}
                        </div>
                        : null}
                    <input
                        onChange={e => change({ e, id })}
                        style={{
                            ...add
                        }}
                        value={formData.value}
                        {...formData.config} />
                </div>
            )
            break;
        case ('select'):
            formTemplate = (
                <div>
                    {formData.showLabel ?
                        <div
                            style={{
                                ...label
                            }}>
                            {formData.config.label}
                        </div>
                        : null}
                    <select
                        //onSelect={e => change({ e, id })}
                        style={{
                            ...add
                        }}>
                        value={formData.value}
                        <option value="">Please Select a Club</option>
                        {
                            formData.config.options.map(club => (
                                <option key={club.key} value={club.value}>
                                    {club.value}
                                </option>
                            ))
                        }
                    </select>
                </div>
            )
            break;
        default: formTemplate = null;
    }
    return (
        <div>
            {formTemplate}
        </div>
    );
};

export default FormField;