import * as bcrypt from 'bcrypt';

const saltRounds = 12;

export function genBCryptPassword(password: string): string {
  return bcrypt.hashSync(password, saltRounds);
}

export function checkBCryptPassword(
  password: string,
  savedPassword: string,
): boolean {
  const isMatch = bcrypt.compareSync(password, savedPassword);
  return isMatch;
}
