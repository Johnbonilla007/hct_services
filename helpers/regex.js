const regexEmail = email => {
  const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{2,63}\.){1,125}[A-Z]{2,63}$/;
  const valid = regex.test(email);
  return valid;
};

module.export = {
  regexEmail,
};
