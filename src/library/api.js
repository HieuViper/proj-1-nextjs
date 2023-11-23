import axios from "axios";

export const callNon = async (url, med, params) => {
  const options = {
    method: med,
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    data: JSON.stringify(params),
    url: `http://localhost:3000${url}`,
  };
  return axios(options)
    .then((response) => {
      // console.log("res ", response);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
