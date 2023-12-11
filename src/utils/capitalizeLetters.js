const capitalizeLetters = (string = "") => {
  return String(string).replace(/\b\w/g, (c) => c.toUpperCase());
};

export default capitalizeLetters;
