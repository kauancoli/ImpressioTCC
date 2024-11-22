export function getCookie(name: string) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
}

export function setCookie(
  key: string,
  value: string,
  maxAge: number = 8 * 60 * 60
) {
  const cookie = `${key}=${value};path=/;Secure;SameSite=None;max-age=${maxAge}`;
  document.cookie = cookie;
}
