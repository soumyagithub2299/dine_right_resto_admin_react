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

// for delete course
// http://localhost:3000/api/auth/courses/8
export async function deleteCourseAPI() {
  return withAuthorization(async () => {
    const response = await axiosInstance.patch("/api/auth/courses/8");
    return response;
  });
}

// for display course by get 
// http://localhost:3000/api/auth/courses/4
export async function displayCourseAPI() {
  return withAuthorization(async () => {
    const response = await axiosInstance.get("/api/auth/courses/4");
    return response;
  });
}


