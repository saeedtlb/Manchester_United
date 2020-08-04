import React from 'react';

import Fade from 'react-reveal/Fade';

const FormFields = ({ formdata, id, change }) => {
  const showError = () => {
    const valid = !formdata.valid && formdata.validation;
    return (
      <Fade bottom collapse when={valid}>
        <div className="input_error">{formdata.validationMessage}</div>
      </Fade>
    );
  };

  const renderTemplate = () => {
    let formTemplate = null;

    switch (formdata.element) {
      case 'input':
        formTemplate = (
          <div>
            {formdata.showlabel ? (
              <div className="label_input">{formdata.config.label}</div>
            ) : null}
            <input
              {...formdata.config}
              value={formdata.value}
              autoComplete="off"
              onChange={(event) => change({ event, id })}
            />
            {showError()}
          </div>
        );
        break;
      case 'select':
        formTemplate = (
          <div>
            {formdata.showlabel ? (
              <div className="label_input">{formdata.config.label}</div>
            ) : null}
            <select
              value={formdata.value}
              onChange={(event) => change({ event, id })}
            >
              <option value="">Select One</option>
              {formdata.config.options.map((item) => (
                <option key={item.key} value={item.value}>
                  {item.value}
                </option>
              ))}
            </select>
            {showError()}
          </div>
        );
        break;
      default:
        formTemplate = null;
    }

    return formTemplate;
  };
  return <>{renderTemplate()}</>;
};

export default FormFields;
