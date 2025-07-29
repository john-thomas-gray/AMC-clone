export const generateTicketConfirmationNumber = (): string => {
  let confirmationNumber = "";

  for (let i = 0; i < 10; i++) {
    const random = Math.floor(Math.random() * 10);
    confirmationNumber = confirmationNumber + random;
  }

  return confirmationNumber;
};
