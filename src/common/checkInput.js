export const checkInput = (inputFields) => {
  //// 여기는 Null체크 부분
  const validationSet = [
    //기업정보
    { key: "BizName", message: "사업자명을 입력하세요." },
    { key: "BizFoundDate", message: "설립일을 입력해주세요." },

    //회원유저
    { key: "UserType", message: "유저 타입을 선택해주세요." },
    { key: "LoginId", message: "아이디를 입력해주세요." },
    { key: "PasswordOk", message: "비밀번호 확인란을 입력해주세요" },
    { key: "Password", message: "비밀번호를 입력해주세요." },
    { key: "Name", message: "이름을 입력해주세요." },
    { key: "Sex", message: "성별을 선택해주세요." },
    { key: "Birthday", message: "생일을 선택해주세요." },
    { key: "Phone", message: "전화번호를 입력해주세요." },
    { key: "Email", message: "이메일을 입력해주세요." },
    { key: "RegDate", message: "가입일자를 선택해주세요." },
    { key: "ZipCode", message: "우편번호를 입력해주세요." },
  ];

  for (const [key, inputField] of Object.entries(inputFields)) {
    if (!inputField) {
      for (const validation of validationSet) {
        if (key.includes(validation.key)) {
          alert(`${validation.message}`);
          return false;
        }
      }
    }

    //// 아래는 유효성 검사
    if (
      !key.includes("PasswordOk") &&
      key.includes("Password") &&
      !checkPasswordRule(inputField)
    ) {
      return false;
    }

    if (
      (key.includes("Phone") || key.includes("Contact")) &&
      !checkPhoneRule(inputField)
    ) {
      return false;
    }

    if (key.includes("Email") && !checkEmailRule(inputField)) {
      return false;
    }

    if (key.includes("Birthday") && !checkDateFuture(inputField, "생일을")) {
      return false;
    }

    if (key.includes("RegDate") && !checkDateFuture(inputField, "가입일자를")) {
      return false;
    }

    if (
      key.includes("BizFoundDate") &&
      !checkDateFuture(inputField, "설립일을")
    ) {
      return false;
    }
  }
  return true;
};

export const checkPasswordRule = (inputField) => {
  const passwordRules =
    /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

  if (!passwordRules.test(inputField)) {
    alert(
      "비밀 번호는 숫자,영문자,특수문자 조합으로 8~15자리를 사용해야 합니다."
    );
    return false;
  }
  return true;
};

export const checkEmailRule = (inputField) => {
  const emailRules =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  if (!emailRules.test(inputField)) {
    alert("이메일 형식을 확인해주세요.");
    return false;
  }
  return true;
};

export const checkPhoneRule = (inputField) => {
  const phoneRules = /^\d{2,3}-\d{3,4}-\d{4}$/;
  if (!phoneRules.test(inputField)) {
    alert("전화번호 형식을 확인해주세요.");
    return false;
  }
  return true;
};

export const checkDateFuture = (inputField, message) => {
  const currentDate = new Date();
  const myDate = new Date(inputField);

  if (myDate > currentDate) {
    alert(`${message} 미래 날짜로 선택할 수 없습니다.`);
    return false;
  }
  return true;
};
