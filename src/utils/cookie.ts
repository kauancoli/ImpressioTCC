export function getCookie(name: string) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
}

export function setCookie(key: string, value: string) {
  const cookie = `${key}=${value};path=/;Secure;SameSite=None`;
  document.cookie = cookie;
}
