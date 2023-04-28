import { apiMocked } from "src/axios";
import endpoints from "src/endpoint";
import handleError from "@/utils/handle-error.util";

const getProfile = async () => {

  try {
    const { data } = await apiMocked.get(endpoints.profile.getProfile);

    return data;
  } catch (error) {
    throw handleError(error);
  }
};

const profile = {
  getProfile,
};

export default profile;
