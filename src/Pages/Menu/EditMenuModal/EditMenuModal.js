import React, { useEffect, useState } from "react";
import "./EditMenuModal.css";
import { LuImagePlus } from "react-icons/lu";
import { FaPencilAlt } from "react-icons/fa";
import {
  Modal,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify"; 
import axios from "axios";
import Loader from "../../../Loader/Loader/Loader";

const EditMenuModal = ({ show, handleClose, handleGetAllData,selectedItem }) => {
  const [menuTypeId, setMenuTypeId] = useState("");
  const [beverageTypeId, setBeverageTypeId] = useState("");
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [AllMenuOptions, setAllMenuOptions] = useState([]);
  const [AllBeveragesOptions, setAllBeveragesOptions] = useState([]);

  const handleGetAllMenuOptionsData = async () => {
    const token = sessionStorage.getItem("TokenForDineRightRestoAdmin");
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/getAllMasterMenus`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);
      if (response?.data?.success === true) {
        setAllMenuOptions(response.data.data);
      } else {
        const errorMsg = response.data?.error_msg || "Data fetching failed.";
        toast.error(errorMsg);
      }
    } catch (error) {
      setLoading(false);
      console.error("Verification failed:", error);
      toast.error("An error occurred, please try again.");
    }
  };

  const handleGetAllBeverageOptionsData = async () => {
    const token = sessionStorage.getItem("TokenForDineRightRestoAdmin");
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/getAllBeverages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);
      if (response?.data) {
        setAllBeveragesOptions(response.data);
      } else {
        const errorMsg = response.data?.error_msg || "Data fetching failed.";
        toast.error(errorMsg);
      }
    } catch (error) {
      setLoading(false);
      console.error("Verification failed:", error);
      toast.error("An error occurred, please try again.");
    }
  };






  const handleGetAllPrefilledData = async () => {
    const token = sessionStorage.getItem("TokenForDineRightRestoAdmin");
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/getMenuItemsbyId/${selectedItem?.master_item_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);
      if (response?.data) {

        setAllBeveragesOptions(response.data);


      } else {
        const errorMsg = response.data?.error_msg || "Data fetching failed.";
        toast.error(errorMsg);
      }
    } catch (error) {
      setLoading(false);
      console.error("Verification failed:", error);
      toast.error("An error occurred, please try again.");
    }
  };








  useEffect(() => {
    handleGetAllMenuOptionsData();
    handleGetAllBeverageOptionsData();
    handleGetAllPrefilledData();
  }, []);

  if (!show) return null;

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    // Check if a file is selected
    if (file) {
      // Check if the selected file is an image
      const isImage = file.type.startsWith("image/");

      if (!isImage) {
        // Show error toast if the file is not an image
        toast.error("Please select a valid image file.");
        // Reset the input file field
        event.target.value = null;
        return; // Exit the function
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

  // Check if the menu type ID is empty
  if (!menuTypeId) {
    toast.error("Please select a Menu Type.");
    return;
  }

  // Check if the name field is empty
  if (!name) {
    toast.error("Please enter a Name.");
    return;
  }

  // Check if the cost field is empty
  if (!cost) {
    toast.error("Please enter a Cost.");
    return;
  }

  // Check if the description field is empty
  if (!description) {
    toast.error("Please enter a Description.");
    return;
  }

  // Check if the beverage type ID is required and empty
  if (menuTypeId === 6 && !beverageTypeId) {
    toast.error("Please select a Beverage Type.");
    return;
  }

  // Check if the image file is not uploaded
  if (!image) {
    toast.error("Please upload an Image.");
    return;
  }

    const token = sessionStorage.getItem("TokenForDineRightRestoAdmin");
    try {
      const formData = new FormData();
      formData.append("master_item_id", selectedItem?.master_item_id);

      // formData.append("menu_id", menuTypeId);
      // formData.append("beverage_id", menuTypeId === 6 ? beverageTypeId : null);

      // formData.append("menu_id", menuTypeId);
      formData.append("menu_id", menuTypeId === 6 ? beverageTypeId : null);


      formData.append("menu_type", menuTypeId === 6 ? "beverage" : "menu");
      formData.append("master_item_name", name);
      formData.append("master_item_price", cost);
      formData.append("master_item_description", description);
      formData.append("master_item_image", image);

      setLoading(true);
      const response = await axios.patch(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/updateMenuAndBeverageItems`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setLoading(false);
      if (response?.data?.response === true) {
        handleGetAllData();
        toast.success(
          response.data.success_msg || "Menu Item Updated Successful!"
        );
        handleReset();
        handleClose();
      } else {
        const errorMsg = response.data?.error_msg || "Error in updating.";
        toast.error(errorMsg);
      }
    } catch (error) {
      setLoading(false);
      console.error("Verification failed:", error);
      toast.error("An error occurred, please try again.");
    }
  };

  const handleReset = () => {
    setMenuTypeId("");
    setBeverageTypeId("");
    setName("");
    setCost("");
    setDescription("");
    setImage(null);
    setImagePreview(null);
  };

  return (
    <>
      {loading && <Loader />}
      <Modal
        open={show}
        handleClose={() => {
          handleReset();
          handleClose();
        }}
      >
        <Box
          className="modal-content"
          sx={{
            padding: 3,
            bgcolor: "background.paper",
            borderRadius: 2,
            maxWidth: 500,
            margin: "auto",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxHeight: "90vh", // Set max height for the modal
            overflowY: "auto", // Enable vertical scrolling
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Typography variant="h5" className="modal-title">
              Edit Menu
            </Typography>
            <Button
              onClick={() => {
                handleReset();
                handleClose();
              }}
              style={{ color: "red" }}
            >
              Close
            </Button>
          </div>


          <div
            className="d-flex justify-content-center"
            style={{ marginBottom: "20px", position: "relative" }}
          >
            <div
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "10px",
                backgroundColor: "#D9D9D9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "24px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="imageUpload"
                onChange={handleImageChange}
                required
              />
              <label
                htmlFor="imageUpload"
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  width: "100%",
                }}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Selected"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <LuImagePlus />
                )}
              </label>
              {imagePreview && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "5px",
                    right: "5px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    padding: "5px",
                    cursor: "pointer",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <label htmlFor="imageUpload" style={{ cursor: "pointer" }}>
                    <FaPencilAlt style={{ color: "black", fontSize: "16px" }} />
                  </label>
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
              <InputLabel id="menuType-label">Menu Type</InputLabel>
              <Select
                labelId="menuType-label"
                value={menuTypeId}
                onChange={(e) => setMenuTypeId(e.target.value)}
                label="Menu Type"
                required
              >
                <MenuItem value="">
                  <em>Select...</em>
                </MenuItem>
                {AllMenuOptions.map((menu) => (
                  <MenuItem key={menu.menu_id} value={menu.menu_id}>
                    {menu.menu_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {menuTypeId === 6 && (
              <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                <InputLabel id="beverageType-label">Beverage Type</InputLabel>
                <Select
                  labelId="beverageType-label"
                  value={beverageTypeId}
                  onChange={(e) => setBeverageTypeId(e.target.value)}
                  label="Beverage Type"
                  required
                >
                  <MenuItem value="">
                    <em>Select Beverage Type</em>
                  </MenuItem>
                  {AllBeveragesOptions.map((beverage) => (
                    <MenuItem
                      key={beverage.beverage_id}
                      value={beverage.beverage_id}
                    >
                      {beverage.beverage_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Cost in ₹"
              variant="outlined"
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              sx={{ mb: 2 }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{
                marginTop: "10px",
                backgroundColor: "#6200EA",
                color: "white",
              }}
              fullWidth
            >
              Update Menu
            </Button>
          </form>
        </Box>
      </Modal>


      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />

      
    </>
  );
};

export default EditMenuModal;
