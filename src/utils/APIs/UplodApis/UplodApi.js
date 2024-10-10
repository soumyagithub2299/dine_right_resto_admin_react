import { authorizeMe } from "../commonHeadApiLogic.js";
import { axiosInstance, axiosInstanceNoAuth } from "../commonHeadApiLogic.js";
// import { authorizeMe } from "../commonHeadApiLogic.js";

// Ensure authorization header is set before making authenticated requests
const withAuthorization = async (apiFunction, ...args) => {
  try {
    await authorizeMe(); // Ensure the Authorization header is set
    return await apiFunction(...args);
  } catch (error) {
    // Handle errors as necessary
    console.error("Error in API request:", error);
    throw error;
  }
};

export async function updateProfileAPI(data) {
  return withAuthorization(async () => {
    const response = await axiosInstance.post("/user/account_update_", data);
    return response;
  });
}

export async function updatePasswordAPI(data) {
  return withAuthorization(async () => {
    const response = await axiosInstanceNoAuth.post(
      "/user/account_update_pass_reset",
      data
    );
    return response;
  });
}

export async function dashboardDataAPI() {
  return withAuthorization(async () => {
    const response = await axiosInstance.get("/user/get_dashboard_data_api");
    return response;
  });
}

// for uplad featcherd images
// http://localhost:3000/api/auth/gallery 
export async function uploadFeatcherImagesAPI(data) {
    return withAuthorization(async () => {
      const response = await axiosInstance.post("/api/auth/gallery ", data);
      return response;
    });
  }

// for uploding the background image (post)
// http://localhost:3000/api/auth/banner_image
  export async function uploadBackgroundImagesAPI(data) {
    return withAuthorization(async () => {
      const response = await axiosInstance.post("/api/auth/banner_image", data);
      return response;
    });
  }

// for get the backgroundimag 
//   http://localhost:3000/api/auth/banner_image
export async function displayBackgroundImagesAPI(data) {
    return withAuthorization(async () => {
      const response = await axiosInstance.get("/api/auth/banner_image", data);
      return response;
    });
  }


  // for delete the backgroundima
//   http://localhost:3000/api/auth/banner_image/2
export async function deleteBackgroundImagesAPI(data) {
    return withAuthorization(async () => {
      const response = await axiosInstance.delete("/api/auth/banner_image/2", data);
      return response;
    });
  }