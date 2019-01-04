import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock
} from 'react-bootstrap';


interface IInput {
  type: any
  label: any
  value: any
  placeholder: any
  onChange: any
  validationState: any
  validationText: any

}

// A generic input element that encapsulates several
// of the react-bootstrap components that are necessary
// for event simple scenarios.
const Input = (i: Input) => (
  <FormGroup validationState={i.validationState}>
    <ControlLabel>{i.label}</ControlLabel>
    <FormControl
      type={i.type}
      value={i.value}
      placeholder={i.placeholder}
      onChange={i.onChange}
    />
    <FormControl.Feedback />
    <HelpBlock>{i.validationText}</HelpBlock>
  </FormGroup>
);

Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  validationState: PropTypes.oneOf([
    undefined,
    'success',
    'warning',
    'error'
  ]),
  validationText: PropTypes.string
};

export default Input;