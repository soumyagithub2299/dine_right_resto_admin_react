import { authorizeMe } from "../commonHeadApiLogic.js";
import { axiosInstance,axiosInstanceNoAuth } from "../commonHeadApiLogic.js";
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

// for Add Menu modal
// http://localhost:3000/api/auth/menu_item_token
export async function AddMenuAPI(data) {
  return withAuthorization(async () => {
    const response = await axiosInstance.post(
      "/api/auth/menu_item_token",
      data
    );
    return response;
  });
}

// for update/Edit menu 
// http://localhost:3000/api/auth/menu_item_token
export async function updateMenuAPI(data) { 
  return withAuthorization(async () => {
    const response = await axiosInstance.put("/api/auth/menu_item_token", data);
    return response;
  });
}

// for delete modal 
export async function deleteMenuAPI(id) {
  return withAuthorization(async () => {
    const response = await axiosInstance.delete(`/api/auth/menu_item_token/${id}`);
    return response;
  });
}

