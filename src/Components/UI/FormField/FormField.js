import React from 'react';

const FormField = ({ formData, id }) => {

    let formTemplate = null;
    switch (formData.element) {
        case ('input'):
            formTemplate = (
                <div>
                    {formData.showLabel ?
                        <div>
                            {formData.config.label}
                        </div>
                        : null}
                    <input
                        value={formData.value}
                        {...formData.config} />
                </div>
            )
            break;
        case ('select'):
            formTemplate = (
                <div>
                    {formData.showLabel ?
                        <div>
                            {formData.config.label}
                        </div>
                        : null}
                    <select>
                        value={formData.value}
                        <option value="">Please Select a Club</option>
                        {
                            formData.config.options.map(club => (
                                <option key={club.key} value={club.value}>
                                    { club.value }
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