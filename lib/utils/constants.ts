export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (typeof window !== "undefined" ? window.location.origin : "");

export const passwordRegex =
  /^(?=.*[!@#$%^&*()_+|~\-={}\[\]:;"'<>,.?\/])(?=.*[A-Z])(?=.*\d.*\d)(?=.*[a-z]).{6,}$/;
