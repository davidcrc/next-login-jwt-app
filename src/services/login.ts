import { apiMocked } from "src/axios";
import endpoints from "src/endpoint";
import handleError from "@/utils/handle-error.util";

const authenticate = async (email: string, password: string) => {
  // console.log("auth", email, password);

  try {
    const { data } = await apiMocked.post(endpoints.auth.login, {
      email,
      password,
    });

    return data;
  } catch (error) {
    throw handleError(error);
  }
};

const logOut = async () => {
  try {
    const { data } = await apiMocked.post(endpoints.auth.logout);

    return data;
  } catch (error) {
    throw handleError(error);
  }
};

const login = {
  authenticate,
  logOut,
};

export default login;
