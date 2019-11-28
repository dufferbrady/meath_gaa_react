import React from 'react';
import classes from './FormField.module.css';

const FormField = ({ label, add, formData, id, change, formStyle }) => {

    let formTemplate = null;
    switch (formData.element) {
        case ('input'):
            formTemplate = (
                <div className={classes.FormField} style={{...formStyle}}>
                    {formData.showLabel ?
                        <div
                            style={{
                                ...label
                            }}>
                            {formData.config.label}
                        </div>
                        : null}
                    <input
                        autoComplete="false"
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
                <div style={{...formStyle}}>
                    {formData.showLabel ?
                        <div
                            style={{
                                ...label
                            }}>
                            {formData.config.label}
                        </div>
                        : null}
                    <select
                        onChange={e => change({ e, id })}
                        style={{
                            ...add
                        }}
                        value={formData.value}>
                        <option value="">Select one</option>
                        {
                            formData.config.options.map(option => (
                                <option key={option.key} value={option.value}>
                                    {option.value}
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