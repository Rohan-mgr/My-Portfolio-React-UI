import { config } from "../config";

export const AUTH_ENDPOINT = {
  resetPassword: config.baseURL + "/admin/reset",
  resetNewPassword: config.baseURL + "/admin/new-password",
  signIn: config.baseURL + "/admin/signin",
  uploadProject: config.baseURL + "/admin/upload-projects",
  fetchProjects: config.baseURL + "/admin/projects",
  uploadMessage: config.baseURL + "/admin/upload-message",
  fetchMessages: config.baseURL + "/admin/messages",
};
