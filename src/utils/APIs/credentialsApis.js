import { axiosInstance, axiosInstanceNoAuth } from "./commonHeadApiLogic.js";
import { authorizeMe } from "./commonHeadApiLogic.js"; // Ensure you import this function

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

// export async function createNewAccountAPI(data) {
//   return withAuthorization(async () => {
//     const response = await axiosInstanceNoAuth.post(
//       "/user/create_an_account",
//       data
//     );
//     return response;
//   });
// }

// for create Account
// http://localhost:3000/api/auth/step-one
export async function SignUpStepOneAPI(data) {
  return withAuthorization(async () => {
    const response = await axiosInstanceNoAuth.post("/api/auth/createOrUpdate", data);
    return response;
  });
}

// for add restaurant
// http://localhost:3000/api/auth/step-two
export async function SignUpRestroDetailsStepTwo(data) {
  return withAuthorization(async () => {
    const response = await axiosInstanceNoAuth.post("/api/auth/step-two", data);
    return response;
  });
}

// for send otp
// http://localhost:3000/api/auth/send-otp
export async function SignUpSendOTPApi(data) {
  return withAuthorization(async () => {
    const response = await axiosInstanceNoAuth.post("https://dineright.techfluxsolutions.com/api/auth/send-otp", data);
    return response;
  });
}

// for verify otp/account
// http://localhost:3000/api/auth/verify-otp
export async function OTPVerificationAPI(data) {
  return withAuthorization(async () => {
    const response = await axiosInstanceNoAuth.post(
      "/api/auth/verify-otp",
      data
    );
    return response;
  });
}

// for create password
// http://localhost:3000/api/auth/set-password
export async function CreatePasswordAPI(data) {
  return withAuthorization(async () => {
    const response = await axiosInstanceNoAuth.post(
      "/api/auth/set-password",
      data
    );
    return response;
  });
}

// for add service hours
// http://localhost:3000/api/auth/insert-service
export async function AddServiceHoursOTP(data) {
  return withAuthorization(async () => {
    const response = await axiosInstanceNoAuth.post(
      "/api/auth/insert-service",
      data
    );
    return response;
  });
}

// for dining areas
// http://localhost:3000/api/auth/insert-dining-area
export async function DiningAreasAPI(data) {
  return withAuthorization(async () => {
    const response = await axiosInstanceNoAuth.post(
      "/api/auth/insert-dining-area",
      data
    );
    return response;
  });
}

//for add table
export async function AddTableAPI(data) {
  return withAuthorization(async () => {
    const response = await axiosInstanceNoAuth.post(
      "/api/auth/insert-dining-area",
      data
    );
    return response;
  });
}

// for login
// http://localhost:3000/api/auth/login
export async function UserLoginAPI(data) {
  return withAuthorization(async () => {
    const response = await axiosInstanceNoAuth.post("https://dineright.techfluxsolutions.com/api/auth/login", data);
    return response;
  });
}

// for SignIn forget password
export async function SignInforgotPasswordAPI(data) {
  return withAuthorization(async () => {
    const response = await axiosInstanceNoAuth.post(
      "/user/user_Forgot_Password_check_api",
      data
    );
    return response;
  });
}

// for SignIn OTP
export async function SignInOTPAPI(data) {
  return withAuthorization(async () => {
    const response = await axiosInstanceNoAuth.post(
      "/user/user_Forgot_Password_check_api",
      data
    );
    return response;
  });
}
