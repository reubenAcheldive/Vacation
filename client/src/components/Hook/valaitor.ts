
export const validatorForm = () => {
  const usernameRegex =
    /^[A-Za-z \p{Han}\p{Katakana}\p{Hiragana}\p{Hangul}-]*$/;
  const firstNameRegex =
    /^[A-Za-z \p{Han}\p{Katakana}\p{Hiragana}\p{Hangul}-]*$/;
  const lastNameRegex =
    /^[A-Za-z \p{Han}\p{Katakana}\p{Hiragana}\p{Hangul}-]*$/;
  const passwordRegex = /^[A-Za-z0-9]\w{8,}$/;

  return { usernameRegex, firstNameRegex, lastNameRegex, passwordRegex };
};
