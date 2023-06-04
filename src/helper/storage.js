import SecureLS from "secure-ls";

var ls = new SecureLS({ encodingType: "rc4", isCompression: false });

export const _setSecureLs = (key, value) => {
  ls.set(key, value);
};

export const _getSecureLs = (key) => {
  return ls.get(key);
};

export const _remove = (key) => {
  return ls.remove(key);
};

export const _removeAll = () => {
  ls.removeAll();
};

export const getUserToken = () => {
  const userData = ls.get("auth");
  return userData?.token;
};

export const getCurrentUserId = () => {
  const userData = ls.get("auth");
  return userData?.user;
};
