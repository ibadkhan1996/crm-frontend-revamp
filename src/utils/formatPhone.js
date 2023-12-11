const formatPhone = (phoneNumber) => {
  const phoneNumberString = phoneNumber.toString();

  const cleanedPhoneNumber = phoneNumberString.replace(/[^0-9/]/g, "");

  const formattedPhoneNumber = cleanedPhoneNumber.replace(/(\d{3})(\d{3})(\d+)/g, "$1-$2-$3");

  return formattedPhoneNumber.replace("/", " / ");
};

export default formatPhone;
