// OrdersModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./OrdersModal.css";

const OrdersModal = ({ show, handleClose, orderDetails }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title className="order-title">Orders</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row">
          <div className="col-12 col-md-6">
          <h5>Order Items :</h5>
          </div>
          <div className="col-12 col-md-6">
          <ul>
            {orderDetails.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          </div>
          </div>
        <div>
          <hr/>
          <div className="row">
          <div className="col-12 col-md-6">
          <h5>Booking Comment :</h5>
          </div>
          <div className="col-12 col-md-6 Sub-Booking-comment">
          <p>{orderDetails.comment}</p>
        </div>
        </div>
        </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-cancel-guest" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrdersModal;



// import React, { useState, useEffect, useRef } from "react";
// import { Modal, Button } from "react-bootstrap";
// import { ToastContainer, toast } from "react-toastify"; 
// import "./OrdersModal.css";
// import { GuestModalAPI } from "../../../utils/APIs/GuestsApis/GuestApi";

// const OrdersModal = ({ show, handleClose, orderDetails }) => {
//   const [fetchedOrderDetails, setFetchedOrderDetails] = useState(null); 
//   const [loading, setLoading] = useState(false); 
//   const toastDisplayedRef = useRef(false); 

  
//   useEffect(() => {
//     if (show) {
//       const fetchOrderData = async () => {
//         setLoading(true); // Start loading
//         toastDisplayedRef.current = false; 
//         try {
//           const response = await GuestModalAPI(); 
//           setFetchedOrderDetails(response.data); 
//         } catch (err) {
//           if (!toastDisplayedRef.current) {
//             toast.error("Error fetching order data"); 
//             toastDisplayedRef.current = true; 
//           }
//           console.error("Error fetching order details:", err);
//         } finally {
//           setLoading(false); 
//         }
//       };

//       fetchOrderData(); // Call the API function
//     }
//   }, [show]); 

//   return (
//     <>
//       <Modal show={show} onHide={handleClose} centered>
//         <Modal.Header>
//           <Modal.Title className="order-title">Orders</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {loading && <div>Loading...</div>} 
//           {!loading && fetchedOrderDetails && ( 
//             <div className="container">
//               <div className="row">
//                 <div className="col-12 col-md-6">
//                   <h5>Order Items :</h5>
//                 </div>
//                 <div className="col-12 col-md-6">
//                   <ul>
//                     {fetchedOrderDetails.items.map((item, index) => (
//                       <li key={index}>{item}</li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//               <div>
//                 <hr />
//                 <div className="row">
//                   <div className="col-12 col-md-6">
//                     <h5>Booking Comment :</h5>
//                   </div>
//                   <div className="col-12 col-md-6 Sub-Booking-comment">
//                     <p>{fetchedOrderDetails.comment}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button className="btn-cancel-guest" onClick={handleClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <ToastContainer />
//     </>
//   );
// };

// export default OrdersModal;
