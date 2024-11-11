import React, { useEffect, useState } from "react";
import "../Profile.css";
import { IoMdCheckmark } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { ProfileEditAPI } from "../../../utils/APIs/ProfileApis/ProfileApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loader from "../../../Loader/Loader/Loader";

const Owner = () => {
  const token = sessionStorage.getItem("TokenForDineRightRestoAdmin");

  const [isApproved, setIsApproved] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    pan: "",
    gstin: "",
    fssai: "",
    restaurantName: "",
    address: "",
    description: "",
    bank: "",
    account: "",
    ifsc: "",
    restaurant_branch_name: "",
    commission: "",
  });
  const [loading, setLoading] = useState(false);

  const handleGetAllPrefilledData = async () => {
    try {
      setLoading(true);

      const url = `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/getRestrauntProfileDetails`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLoading(false);
      if (response?.data?.response) {
        const details = response.data.resaturantProfileDetails;

        // Prefill form with data from API
        setFormData({
          name: details.username || "",
          mobile: details.phone || "",
          email: details.email || "",
          pan: details.pancard || "",
          gstin: details.gst_no || "",
          fssai: details.fassai_licence_no || "",
          restaurantName: details.restaurantName || "",
          address: details.restaurantAddress || "",
          description: details.resataurantDescription || "",
          bank: details.restaurant_bank_name || "",
          account: details.restaurant_bank_account_no || "",
          ifsc: details.restaurant_ifsc_code || "",
          commission: details.commission || "",
          restaurant_branch_name: details.restaurant_branch_name || "",
        });

        setIsApproved(details?.status === "Activated");
      } else {
        const errorMsg = response.data?.error_msg || "Data fetching failed.";
        toast.error(errorMsg);
      }
    } catch (error) {
      setLoading(false);
      console.error("Data fetching failed:", error);
      toast.error("An error occurred, please try again.");
    }
  };

  useEffect(() => {
    handleGetAllPrefilledData();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    const {
      name,
      mobile,
      email,
      pan,
      gstin,
      restaurantName,
      address,
      bank,
      account,
      ifsc,
      restaurant_branch_name,
    } = formData;

    if (!name) {
      toast.error("Name is required.");
      return false;
    }
    if (!mobile) {
      toast.error("Mobile number is required.");
      return false;
    }
    if (!/^\d{10}$/.test(mobile)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return false;
    }
    if (!email) {
      toast.error("Email address is required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (!pan) {
      toast.error("PAN Card number is required.");
      return false;
    }
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)) {
      toast.error("Please enter a valid PAN Card number (e.g., ABCDE1234F).");
      return false;
    }
    if (!gstin) {
      toast.error("GSTIN number is required.");
      return false;
    }
    if (
      !/^[0-9]{2}[A-Z]{4}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[0-9A-Z]{1}$/.test(
        gstin
      )
    ) {
      toast.error("Please enter a valid GSTIN number (e.g., 22ABCDE1234Z1Z).");
      return false;
    }
    if (!restaurantName) {
      toast.error("Restaurant Name is required.");
      return false;
    }
    if (!address) {
      toast.error("Restaurant Address is required.");
      return false;
    }
    if (!bank) {
      toast.error("Bank Name is required.");
      return false;
    }
    if (!account) {
      toast.error("Account Number is required.");
      return false;
    }
    if (!/^\d{9,18}$/.test(account)) {
      toast.error("Please enter a valid Account Number (9 to 18 digits).");
      return false;
    }
    if (!ifsc) {
      toast.error("IFSC Code is required.");
      return false;
    }
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)) {
      toast.error("Please enter a valid IFSC Code (e.g., ABCD0123456).");
      return false;
    }
    if (!restaurant_branch_name) {
      toast.error("Restaurant Branch Name is required.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const url = `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/updateRestraurantProfileDetails`;

      const response = await axios.post(
        url,
        {
          username: formData.name,
          email: formData.email,
          phone: formData.mobile,
          pancard: formData.pan,
          restaurantName: formData.restaurantName,
          restaurantAddress: formData.address,
          resataurantDescription: formData.description,
          fassai_licence_no: formData.fssai,
          gst_no: formData.gstin,
          restaurant_bank_account_no: formData.account,
          restaurant_ifsc_code: formData.ifsc,
          restaurant_bank_name: formData.bank,
          restaurant_branch_name: formData.restaurant_branch_name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);
      if (response?.data?.response) {
        toast.success(
          response.data.success_msg || "Information updated successfully!"
        );
        handleGetAllPrefilledData();
      } else {
        const errorMsg =
          response.data?.error_msg || "Failed to update information.";
        toast.error(errorMsg);
      }
    } catch (error) {
      setLoading(false);
      console.error("Data failed:", error);
      toast.error("Error updating information.");
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="container">
        <ToastContainer />
        <div className="MainInfo-Owner">
          <div className="heading-Profile">PERSONAL INFORMATION</div>
          <div className="CommisionField-Owner">
            Commission to DineRight : {formData.commission}%
          </div>

          {isApproved ? (
            <div className="Approved-Owner">
              <IoMdCheckmark /> Approved
            </div>
          ) : (
            <div className="Unapproved-Owner">
              <IoMdClose /> Unapproved
            </div>
          )}
        </div>
        <hr className="hr-menu-accordian" />

        <div className="row">
          <div className="col-12 col-md-6">
            <div className="SubHeading-Profile mb-2">Personal Details :</div>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">
                  Mobile No
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled
                />
              </div>
            </form>
          </div>

          <div className="col-12 col-md-6">
            <div className="SubHeading-Profile mb-2">Documentation :</div>
            <form>
              <div className="mb-3">
                <label htmlFor="pan" className="form-label">
                  PAN Card Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="pan"
                  value={formData.pan}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="gstin" className="form-label">
                  GSTIN
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="gstin"
                  value={formData.gstin}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="fssai" className="form-label">
                  FSSAI License No
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fssai"
                  value={formData.fssai}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-6">
            <div className="SubHeading-Profile mb-2">Restaurant Details :</div>
            <form>
              <div className="mb-3">
                <label htmlFor="restaurantName" className="form-label">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="restaurantName"
                  value={formData.restaurantName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Restaurant Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Restaurant Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                ></textarea>
              </div>
            </form>
          </div>

          <div className="col-12 col-md-6">
            <div className="SubHeading-Profile mb-2">Bank Details :</div>
            <form>
              <div className="mb-3">
                <label htmlFor="bank" className="form-label">
                  Bank Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="bank"
                  value={formData.bank}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="account" className="form-label">
                  Account Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="account"
                  value={formData.account}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="ifsc" className="form-label">
                  IFSC Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ifsc"
                  value={formData.ifsc}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="restaurant_branch_name" className="form-label">
                  Restaurant Branch Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="restaurant_branch_name"
                  value={formData.restaurant_branch_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </form>
          </div>
        </div>

        <div className="row">
          <div className="container container-savebtn">
            <button onClick={handleSubmit} className="SaveBtn">
              Update Information
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Owner;
