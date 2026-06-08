export const isValidName = (name: string): boolean => {
  return /^[a-zA-Z0-9\s'-]{1,100}$/.test(name);
};

export const isValidEmail = (email: string): boolean => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
}