import { useState } from 'react';
import * as St from '../../styles/styles';

export default function JoinInput(props) {
  // const { value, handleChange, handleKeyUp, errorMessage } = props; (API)
  const { value, handleChange, errorMessage } = props;
  const [isCheck, setIsCheck] = useState(true);

  const handleValidateKeyUp = () => {
    // 오류 해결을 위한 주석처리 (API)
    // const isValidate = handleKeyUp(value);
    // setIsCheck(isValidate);
  };

  return (
    <>
      <St.Input
        type={props.type || 'text'}
        onChange={(e) => handleChange(e.target.value)}
        onKeyUp={handleValidateKeyUp}
      />
      {/* 회원가입 및 로그인 관련 유효성 검사 코드 삭제 (API) 
      {!isCheck && <St.ErrorMessage>{errorMessage}</St.ErrorMessage>} */}
    </>
  );
}
