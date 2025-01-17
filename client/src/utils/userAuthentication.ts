const EMAIL_REGEXP = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const SPECIAL_CHARACTER_REGEXP = /[~!@#$%^&*()_+|<>?:{}]/;
const USERNAME_MIN_LENGTH = 2;
const USERNAME_MAX_LENGTH = 8;

interface checkEmailPatternProps {
  email: string;
}

interface checkUserNamePatternProps {
  userName: string;
}

export const checkEmailPattern = ({ email }: checkEmailPatternProps) => {
  const trimmedEmail = email.trim();
  let isValidEmail: boolean;

  if (!EMAIL_REGEXP.test(trimmedEmail)) {
    isValidEmail = false;
  } else {
    isValidEmail = true;
  }

  return { isValidEmail };
};

export const checkUserNamePattern = ({
  userName,
}: checkUserNamePatternProps) => {
  const trimmedUserName = userName.trim();
  let isValidUserName: boolean;

  if (
    SPECIAL_CHARACTER_REGEXP.test(trimmedUserName) ||
    trimmedUserName.length < USERNAME_MIN_LENGTH ||
    trimmedUserName.length > USERNAME_MAX_LENGTH
  ) {
    isValidUserName = false;
  } else {
    isValidUserName = true;
  }

  return { isValidUserName };
};
