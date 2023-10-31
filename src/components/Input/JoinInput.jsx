import { useState } from 'react';
import * as St from '../../styles/styles';
import { validateUserId, validatePassword } from '../../util/validation';

export default function JoinInput(props) {
  const { value, handleChange, errorMessage } = props;
  const [isCheck, setIsCheck] = useState(true);

  const handleKeyUp = () => {
    let isValid = true;

    if (props.type === 'text') {
      isValid = validateUserId(value);
    } else if (props.type === 'password') {
      isValid = validatePassword(value);
    }

    setIsCheck(isValid);
  };

  return (
    <>
      <St.Input
        type={props.type || 'text'}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      {!isCheck && <St.ErrorMessage>{errorMessage}</St.ErrorMessage>}
    </>
  );
}
