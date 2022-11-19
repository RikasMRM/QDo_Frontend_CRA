import axios from "axios";
import { BACKEND_API_ENDPOINT } from "./AppConst";

export const checkUserToken = async (token) => {
  await axios
    .get(BACKEND_API_ENDPOINT + "users/token/" + token)
    .then((res) => {
      if (res.status == 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};
