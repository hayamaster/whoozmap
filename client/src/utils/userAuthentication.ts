const EMAIL_REGEXP = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

interface checkEmailPatternProps {
  email: string;
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
