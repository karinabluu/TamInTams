import { useState } from 'react';
import * as St from '../../styles/styles';

export default function JoinInput(props) {
  const { value, handleChange, errorMessage } = props;
  const [isCheck, setIsCheck] = useState(true);

  const handleValidateKeyUp = () => {};

  return (
    <>
      <St.Input
        type={props.type || 'text'}
        onChange={(e) => handleChange(e.target.value)}
        onKeyUp={handleValidateKeyUp}
      />
    </>
  );
}
