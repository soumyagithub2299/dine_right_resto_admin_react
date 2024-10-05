import React, { useState } from 'react';
import './AddMenuModal.css';
import { LuImagePlus } from "react-icons/lu";
import { FaCaretDown } from 'react-icons/fa';

const AddMenuModal = ({ isOpen, onClose, onSubmit }) => {
  const [menuType, setMenuType] = useState(""); // State for menu type
  const [beverageType, setBeverageType] = useState(""); // State for beverage type
  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  const beverageOptions = ["Whisky", "Rum", "Vodka", "Gin", "Tequila","Brandy", "White Wine", "Red Wine", "Rose Wine", "Sparkling wine",
    "Champagne", "Dessert Wine", "Beer", "Cider", "Cocktail","Mocktail","Liqueur", "Basics", 
  ]; // Beverage types array

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    onSubmit({
      menuType,
      beverageType: menuType === "Beverages" ? beverageType : null, // Submit beverage type only if "Beverages" is selected
      name: formData.get('name'),
      cost: formData.get('cost'),
      description: formData.get('description'),
      image: formData.get('image'), // Added image to submission data
    });
    onClose(); // Close the modal after submission
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the image preview URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header modal-header-Add-menu">
            <h5 className="modal-title modal-title-Add-menu">Add Menu</h5>
            <button type="button" className="close" onClick={onClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body modal-body-Add-Menu">
            {/* Image Upload Area */}
            <div className="d-flex justify-content-center" style={{ marginBottom: '20px' }}>
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '10px',
                  backgroundColor: '#D9D9D9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '24px', // Adjust icon size if necessary
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <input 
                  type="file" 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                  id="imageUpload" 
                  name="image" // Added name for the image field
                  onChange={handleImageChange} // Added onChange handler
                />
                <label htmlFor="imageUpload" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="Selected" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <LuImagePlus />
                  )}
                </label>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="menuType" className='SubHeading-Add-Menu'>Menu Type:</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    className="form-control"
                    value={menuType}
                    readOnly // Make it read-only to show selected value
                    placeholder="Select Menu Type"
                  />
                  <FaCaretDown style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', pointerEvents: 'none' }} /> {/* Dropdown icon */}
                  <select
                    value={menuType}
                    onChange={(e) => setMenuType(e.target.value)}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0, // Make the dropdown invisible but interactive
                      cursor: 'pointer',
                      zIndex: 10
                    }}
                  >
                    <option value="">Select...</option>
                    <option value="Soup">Soup</option>
                    <option value="Appetizer">Appetizer</option>
                    <option value="Salad">Salad</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Beverages">Beverages</option> {/* Added Beverages option */}
                  </select>
                </div>
              </div>

              {/* Conditionally render Beverage Type dropdown */}
              {menuType === "Beverages" && (
                <div className="form-group">
                  <label htmlFor="beverageType" className='SubHeading-Add-Menu'>Beverage Type:</label>
                  <select
                    className="form-control"
                    value={beverageType}
                    onChange={(e) => setBeverageType(e.target.value)}
                    required
                  >
                    <option value="">Select Beverage Type</option>
                    {beverageOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="name" className='SubHeading-Add-Menu'>Name:</label>
                <input type="text" className="form-control" name="name" placeholder="Name" required /> {/* Added placeholder */}
              </div>
              <div className="form-group">
                <label htmlFor="cost" className='SubHeading-Add-Menu'>Cost:</label>
                <input type="text" className="form-control" name="cost" placeholder="000" required /> {/* Added placeholder */}
              </div>
              <div className="form-group">
                <label htmlFor="description" className='SubHeading-Add-Menu'>Description:</label>
                <textarea className="form-control" name="description" rows="3" required></textarea>
              </div>
              <div className='Main-btn-AddMenuModal'>
                <button type="submit" className="btn-AddMenuModal">Add Menu</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMenuModal;

// import React, { useState } from 'react';
// import './AddMenuModal.css';
// import { LuImagePlus } from "react-icons/lu";
// import { FaCaretDown } from 'react-icons/fa';
// import { toast } from 'react-toastify'; 
// import { AddMenuAPI } from '../../../utils/APIs/MenuApis/MenuApi';

// const AddMenuModal = ({ isOpen, onClose, onSubmit }) => {
//   const [menuType, setMenuType] = useState(""); // State for menu type
//   const [beverageType, setBeverageType] = useState(""); // State for beverage type
//   const [imagePreview, setImagePreview] = useState(null); // State for image preview

//   const beverageOptions = [
//     "Whisky", "Rum", "Vodka", "Gin", "Tequila",
//     "Brandy", "White Wine", "Red Wine", "Rose Wine", 
//     "Sparkling wine", "Champagne", "Dessert Wine", 
//     "Beer", "Cider", "Cocktail", "Mocktail", 
//     "Liqueur", "Basics"
//   ]; // Beverage types array

//   if (!isOpen) return null;

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result); 
//       };
//       reader.readAsDataURL(file); 
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault(); 

//     // validation for all input fields
//     if (!menuType) {
//       toast.error("Please select a menu type.");
//       return;
//     }

//     const name = event.target.name.value.trim(); // Get trimmed value for name
//     const cost = event.target.cost.value.trim(); // Get trimmed value for cost
//     const description = event.target.description.value.trim(); // Get trimmed value for description

//     if (!name) {
//       toast.error("Please enter the name.");
//       return;
//     }

//     if (!cost) {
//       toast.error("Please enter the cost.");
//       return;
//     }

//     if (!description) {
//       toast.error("Please enter the description.");
//       return;
//     }

//     if (menuType === "Beverages" && !beverageType) {
//       toast.error("Please select a beverage type.");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("menuType", menuType);
//       formData.append("beverageType", menuType === "Beverages" ? beverageType : null); // Include beverage type if applicable
//       formData.append("menu_item_name", name);
//       formData.append("menu_item_price", cost);
//       formData.append("menu_item_description", description);
//       formData.append("menu_item_image", event.target.image.files[0]); 

//       const response = await AddMenuAPI(formData); // Call API

//       if (response && response.data) {
//         toast.success("Menu item added successfully."); 
//         onSubmit(); 
//         onClose(); 
//       } else {
//         toast.error("Failed to add menu item."); // Error handling
//       }
//     } catch (error) {
//       toast.error("An error occurred. Please try again."); 
//       console.error("Error submitting menu item:", error); 
//     }
//   };

//   return (
//     <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
//       <div className="modal-dialog">
//         <div className="modal-content">
//           <div className="modal-header modal-header-Add-menu">
//             <h5 className="modal-title modal-title-Add-menu">Add Menu</h5>
//             <button type="button" className="close" onClick={onClose} aria-label="Close">
//               <span aria-hidden="true">&times;</span>
//             </button>
//           </div>
//           <div className="modal-body modal-body-Add-Menu">
//             {/* Image Upload Area */}
//             <div className="d-flex justify-content-center" style={{ marginBottom: '20px' }}>
//               <div
//                 style={{
//                   width: '100px',
//                   height: '100px',
//                   borderRadius: '10px',
//                   backgroundColor: '#D9D9D9',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   cursor: 'pointer',
//                   fontSize: '24px', // Adjust icon size if necessary
//                   position: 'relative',
//                   overflow: 'hidden'
//                 }}
//               >
//                 <input 
//                   type="file" 
//                   accept="image/*" 
//                   style={{ display: 'none' }} 
//                   id="imageUpload" 
//                   name="image" 
//                   onChange={handleImageChange} // Added onChange handler
//                 />
//                 <label htmlFor="imageUpload" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
//                   {imagePreview ? (
//                     <img src={imagePreview} alt="Selected" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//                   ) : (
//                     <LuImagePlus />
//                   )}
//                 </label>
//               </div>
//             </div>

//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label htmlFor="menuType" className='SubHeading-Add-Menu'>Menu Type:</label>
//                 <div style={{ position: 'relative' }}>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={menuType}
//                     readOnly 
//                     placeholder="Select Menu Type"
//                   />
//                   <FaCaretDown style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', pointerEvents: 'none' }} /> {/* Dropdown icon */}
//                   <select
//                     value={menuType}
//                     onChange={(e) => setMenuType(e.target.value)}
//                     style={{
//                       position: 'absolute',
//                       top: 0,
//                       left: 0,
//                       width: '100%',
//                       height: '100%',
//                       opacity: 0, 
//                       cursor: 'pointer',
//                       zIndex: 10
//                     }}
//                   >
//                     <option value="">Select...</option>
//                     <option value="Soup">Soup</option>
//                     <option value="Appetizer">Appetizer</option>
//                     <option value="Salad">Salad</option>
//                     <option value="Main Course">Main Course</option>
//                     <option value="Dessert">Dessert</option>
//                     <option value="Beverages">Beverages</option> 
//                   </select>
//                 </div>
//               </div>

//               {/* Conditionally render Beverage Type dropdown */}
//               {menuType === "Beverages" && (
//                 <div className="form-group">
//                   <label htmlFor="beverageType" className='SubHeading-Add-Menu'>Beverage Type:</label>
//                   <select
//                     className="form-control"
//                     value={beverageType}
//                     onChange={(e) => setBeverageType(e.target.value)}
//                     required
//                   >
//                     <option value="">Select Beverage Type</option>
//                     {beverageOptions.map((option, index) => (
//                       <option key={index} value={option}>{option}</option>
//                     ))}
//                   </select>
//                 </div>
//               )}

//               <div className="form-group">
//                 <label htmlFor="name" className='SubHeading-Add-Menu'>Name:</label>
//                 <input type="text" className="form-control" name="name" placeholder="Name" required /> {/* Added placeholder */}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="cost" className='SubHeading-Add-Menu'>Cost:</label>
//                 <input type="text" className="form-control" name="cost" placeholder="000" required /> {/* Added placeholder */}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="description" className='SubHeading-Add-Menu'>Description:</label>
//                 <textarea className="form-control" name="description" rows="3" required></textarea>
//               </div>
//               <div className='Main-btn-AddMenuModal'>
//                 <button type="submit" className="btn-AddMenuModal">
//                   Add Menu 
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddMenuModal;
