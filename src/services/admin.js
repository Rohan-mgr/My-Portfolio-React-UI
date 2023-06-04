import { AUTH_ENDPOINT } from "../helper/endpoint";
const { httpAuth, httpMultiPartForm, http } = require("../helper/http");

export const getAllProjects = async () => {
  const URL = AUTH_ENDPOINT.fetchProjects;
  const response = await httpAuth.get(URL);
  return response;
};

export const handleResetPassword = async (email) => {
  const URL = AUTH_ENDPOINT.resetPassword;
  const response = await httpAuth.post(URL, JSON.stringify(email));
  return response;
};

export const handleSetNewPassword = async (id, token, newPassword) => {
  const URL = AUTH_ENDPOINT.resetNewPassword + `/${id}/${token}`;
  const response = await httpAuth.post(URL, JSON.stringify(newPassword));
  return response;
};
export const handleAdminLogin = async (credentials) => {
  const URL = AUTH_ENDPOINT.signIn;
  const response = await httpAuth.post(URL, JSON.stringify(credentials));
  return response;
};

export const handleProjectUpload = async (projectInfo) => {
  const URL = AUTH_ENDPOINT.uploadProject;

  const formData = new FormData();
  formData.append("title", projectInfo.title);
  formData.append("description", projectInfo.description);
  formData.append("githubLink", projectInfo.githubLink);
  formData.append("deployedLink", projectInfo.deployedLink);
  formData.append("feature_project", projectInfo.feature_project);
  formData.append("techList", JSON.stringify(projectInfo.techList));
  formData.append("image", projectInfo.image);

  const response = await httpMultiPartForm.post(URL, formData);
  return response;
};

export const handleMessageUpload = async (msg) => {
  const URL = AUTH_ENDPOINT.uploadMessage;
  const response = await httpAuth.post(URL, JSON.stringify(msg));
  return response;
};

export const getAllMessages = async (filter) => {
  const URL = AUTH_ENDPOINT.fetchMessages + `/${filter}`;
  const response = await http.get(URL);
  return response;
};
