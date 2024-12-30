import React, { useEffect, useState } from "react";
import "./CommissionTable.css";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../../Loader/Loader/Loader";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrdersModal from "../../Guests/OrdersModal/OrdersModal";
import { Modal, Button } from "react-bootstrap"; // Import Bootstrap Modal for popups
import { FaTimes } from "react-icons/fa";
import RazorpayPayment from "./RazorpayPayment";

const CommissionTable = () => {
  const token = sessionStorage.getItem("TokenForDineRightRestoAdmin");

  const [loading, setLoading] = useState(false);
  const [guestData, setGuestData] = useState([]);




  const [PreviousWithdrawHistoryData, setPreviousWithdrawHistoryData] = useState([]);
  const [PreviousPaidCommissionHistoryData, setPreviousPaidCommissionHistoryData] = useState([]);




  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const [callRazorPay, setCallRazorPay] = useState(false);
  const [BookingData, setBookingData] = useState();


  // Modal states
  const [showWithdrawRequestModal, setShowWithdrawRequestModal] = useState(false);
  const [showWithdrawHistoryModal, setShowWithdrawHistoryModal] = useState(false);


  const [showPayCommmissionRequestModal, setShowPayCommmissionRequestModal] = useState(false);
  const [showPaidCommissionHistoryModal, setShowPaidCommissionHistoryModal] = useState(false);



  const [WalletTab, setWalletTab] = useState("");
  const [TotalCommission, setTotalCommission] = useState("");
  const [TotalWithdrawRequestAmount, setTotalWithdrawRequestAmount] = useState("");
  const [TotalNetSell, setTotalNetSell] = useState("");

  const [PayCommission, setPayCommission] = useState("Pay Commission");
  const [DoWithdrawRequest, setDoWithdrawRequest] = useState("Withdraw Request");
  const [WithdrawHistoey, setWithdrawHistoey] = useState("Withdraw History");
  const [PaidCommissionHistoey, setPaidCommissionHistoey] = useState("Paid Commission History");



  const handleGetAllData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/getMyPayments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);


      if (response?.data) {


        setGuestData(response?.data?.data);


        setTotalNetSell(response?.data?.total?.total_billing_amount);
        setTotalCommission(response?.data?.total?.total_commition_amount);
        setWalletTab(response?.data?.total?.total_payout_balance);
        setTotalWithdrawRequestAmount(response?.data?.total?.total_withdrawal);

        


      } else {
        const errorMsg = response?.data?.error_msg || "No Commission Made";
        toast.info(errorMsg);
        setGuestData([]);

      }
    } catch (error) {
      setLoading(false);
      console.error("Data fetch failed:", error);
      toast.error("An error occurred, please try again.");
    }
  };

  useEffect(() => {
    handleGetAllData();
  }, []);





















  
  const handleGetWithdrwalHistoryData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/getAllWithdrawals`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);


      if (response?.data) {


        setPreviousWithdrawHistoryData(response?.data?.data);

      } else {
        const errorMsg = response?.data?.error_msg || "No Withdrwal Made";
        toast.info(errorMsg);
        setPreviousWithdrawHistoryData([]);

      }
    } catch (error) {
      setLoading(false);
      console.error("Data fetch failed:", error);
      toast.error("An error occurred, please try again.");
    }
  };









  

  
  const handleGetPaidCommissionHistoryData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/getPaymentHistory`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);


      if (response?.data) {


        setPreviousPaidCommissionHistoryData(response?.data?.data);
    handleGetAllData();


      } else {
        const errorMsg = response?.data?.error_msg || "No Withdrwal Made";
        toast.info(errorMsg);
        setPreviousPaidCommissionHistoryData([]);
    handleGetAllData();


      }
    } catch (error) {
      setLoading(false);
      console.error("Data fetch failed:", error);
      toast.error("An error occurred, please try again.");
    }
  };



  const handleOrdersClick = (guest) => {
    setSelectedOrderDetails(guest);
    setShowOrdersModal(true);
  };

  const handleCloseOrdersModal = () => {
    setShowOrdersModal(false);
    setSelectedOrderDetails(null);
  };

  const handleWithdrawRequestClick = () => {
    setShowWithdrawRequestModal(true);
  };

  const handleWithdrawHistoryClick = () => {
    setShowWithdrawHistoryModal(true);
    handleGetWithdrwalHistoryData();
  };




  const handleWithdrawRequest =async () => {



    try {
      // const body = {
      //   userId: "5",
      //   booking_date: "sdijfj",
      //   booking_no_of_guest: "snjdf",
      //   payment_mod: "bh",
      // };

      setLoading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/withdrawalPayment`,

        // body,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setLoading(false);

      if (response.status === 200) {

        setShowWithdrawRequestModal(false);
        toast.success("Withdraw request submitted successfully.");
    handleGetAllData();

    
 
      } else {
        toast.error(response.data.error_msg || "Please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }





  };










  const handlePayCommissionRequestClick = () => {
    setShowPayCommmissionRequestModal(true);
    handlePayment();
  };  

  const handlePaidCommissionHistoryClick = () => {
    setShowPaidCommissionHistoryModal(true);
    handleGetPaidCommissionHistoryData();
  };



  const handlePayment = async () => {
    try {
      // const body = {
      //   userId: "5",
      //   booking_date: "sdijfj",
      //   booking_no_of_guest: "snjdf",
      //   payment_mod: "bh",
      // };

      setLoading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/PayMyUnpaidCommission`,

        // body,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setLoading(false);

      if (response.status === 200) {
        
        // toast.success(response?.data?.message || "Successful!");

        if (response?.data?.order) {
          setBookingData(response?.data?.order);
          setCallRazorPay(true);
          
        } else {
          setBookingData();
          setCallRazorPay(false);
    handleGetAllData();

        }

 
      } else {
        toast.error(response.data.error_msg || "Please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };






  return (
    <>
      {loading && <Loader />}
      <div className="p-3">
        {/* Tabs with custom inline styles */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
          {/* First row of tabs */}








       <div style={{ display: "flex", gap: "10px" }}>
  <div
    style={{
      backgroundColor: "#ffe0e0",
      padding: "5px",
      flex: "1",
      textAlign: "center",
      cursor: "not-allowed",
      border: "1px solid #ddd",
      borderRadius: "8px"
    }}
  >
   Wallet Balance : <strong style={{ color: WalletTab < 0 ? 'red' : '#006400' }}>
  ₹ {WalletTab}
</strong>

  </div>
  <div
    style={{
      backgroundColor: "#d1c4e9",
      padding: "5px",
      flex: "1",
      textAlign: "center",
      cursor: "not-allowed",
      border: "1px solid #ddd",
      borderRadius: "8px"
    }}
  >
     Total Withdrawl : <strong>₹ {TotalWithdrawRequestAmount}</strong> 
  </div>
  <div
    style={{
      backgroundColor: "#e0f7fa",
      padding: "5px",
      flex: "1",
      textAlign: "center",
      cursor: "not-allowed",
      border: "1px solid #ddd",
      borderRadius: "8px"
    }}
  >
   Total Commission : <strong>₹ {TotalCommission}</strong> 
  </div>
  

  
  <div
    style={{
      backgroundColor: "#e8f5e9",
      padding: "5px",
      flex: "1",
      textAlign: "center",
      cursor: "not-allowed",
      border: "1px solid #ddd",
      borderRadius: "8px"
    }}
  >
    Total Net Sell: <strong>₹ {TotalNetSell}</strong> 
  </div>
</div>





          {/* Second row of tabs */}


      <div style={{ display: "flex", gap: "10px" }}>
      <div
  style={{
    backgroundColor: "#ffecb3",
    padding: "15px",
    flex: "1",
    textAlign: "center",
    cursor: WalletTab < 0 ? "pointer" : "not-allowed",
    border: "1px solid #ddd",
    borderRadius: "25px",
    transition: "transform 0.2s ease-in-out",
    opacity: WalletTab < 0 ? 1 : 0.5,
    pointerEvents: WalletTab < 0 ? "none" : "auto",
  }}
  onClick={() => {
    if (WalletTab >= 0) {
      console.log("first");
    } else {
      handleWithdrawRequestClick();

    }
  }}
  
  onMouseEnter={(e) => {
    if (WalletTab > 0) e.currentTarget.style.transform = "scale(1.05)";
  }}
  onMouseLeave={(e) => {
    if (WalletTab > 0) e.currentTarget.style.transform = "scale(1)";
  }}
  
>
  {DoWithdrawRequest}
</div>

  <div
    style={{
      backgroundColor: "#ffecb3",
      padding: "15px",
      flex: "1",
      textAlign: "center",
      cursor: "pointer",
      border: "1px solid #ddd",
      borderRadius: "25px",
      transition: "transform 0.2s ease-in-out",
    }}
    onClick={handleWithdrawHistoryClick}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    {WithdrawHistoey}
  </div>

  <div
  style={{
    backgroundColor: "#ffcdd2",
    padding: "15px",
    flex: "1",
    textAlign: "center",
    cursor: WalletTab < 0 ? "pointer" : "not-allowed",
    border: "1px solid #ddd",
    borderRadius: "25px",
    transition: "transform 0.2s ease-in-out",
    opacity: WalletTab < 0 ? 1 : 0.5,
    pointerEvents: WalletTab < 0 ? "auto" : "none",
  }}
  onClick={() => {
    if (WalletTab < 0) handlePayCommissionRequestClick();
  }}
  onMouseEnter={(e) => {
    if (WalletTab < 0) e.currentTarget.style.transform = "scale(1.05)";
  }}
  onMouseLeave={(e) => {
    if (WalletTab < 0) e.currentTarget.style.transform = "scale(1)";
  }}
>
  {PayCommission}
</div>



  { callRazorPay && showPayCommmissionRequestModal && BookingData &&  (
                        <RazorpayPayment
                          BookingData={BookingData}
                          callRazorPay={callRazorPay}
                          handleGetAllData={handleGetAllData}
     
                        />
                      )}



  <div
    style={{
      backgroundColor: "#ffcdd2",
      padding: "15px",
      flex: "1",
      textAlign: "center",
      cursor: "pointer",
      border: "1px solid #ddd",
      borderRadius: "25px",
      transition: "transform 0.2s ease-in-out",
    }}
    onClick={handlePaidCommissionHistoryClick}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    {PaidCommissionHistoey}
  </div>
</div>








        </div>






















<div >

{/* Withdraw Request Confirmation Modal */}
<Modal
  show={showWithdrawRequestModal}
  onHide={() => setShowWithdrawRequestModal(false)}
  centered
  style={{
    borderRadius: "10px",
  }}
>
  <Modal.Header style={{ position: "relative", padding: "20px" }}>
    <Modal.Title>Confirm Withdraw Request</Modal.Title>
    <FaTimes
      onClick={() => setShowWithdrawRequestModal(false)}
      style={{
        fontSize: "1.5em",
        position: "absolute",
        top: "15px",
        right: "15px",
        cursor: "pointer",
        color: "#6c757d",
      }}
    />
  </Modal.Header>
  <Modal.Body>
    Are you sure you want to proceed with the withdraw request for ₹ {WalletTab}?
  </Modal.Body>
  <Modal.Footer>
    <Button
      variant="secondary"
      onClick={() => setShowWithdrawRequestModal(false)}
      style={{
        backgroundColor: "#6c757d",
        color: "#fff",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        fontSize: "1em",
      }}
    >
      Cancel
    </Button>
    <Button
      variant="primary"
      onClick={handleWithdrawRequest}
      style={{
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        fontSize: "1em",
        marginLeft: "10px",
      }}
    >
      Confirm
    </Button>
  </Modal.Footer>
</Modal>


</div>















      






        {/* Withdraw History Modal with Table */}
        <Modal
          show={showWithdrawHistoryModal}
          onHide={() => setShowWithdrawHistoryModal(false)}
          centered
          style={{ borderRadius: "10px" }}
        >
          <Modal.Header style={{ position: "relative", padding: "20px" }}>
            <Modal.Title>Withdraw History</Modal.Title>
            <FaTimes
              onClick={() => setShowWithdrawHistoryModal(false)}
              style={{
                fontSize: "1.5em",
                position: "absolute",
                top: "15px",
                right: "15px",
                cursor: "pointer",
                color: "#6c757d"
              }}
            />
          </Modal.Header>
          <Modal.Body>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr>
        <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Sr. No</th>
        <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Transaction ID</th>
        <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Date</th>
        <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Deposit Amount</th>
        <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Withdraw Status</th>
      </tr>
    </thead>
    <tbody>
      {PreviousWithdrawHistoryData.map((entry, index) => {
        const formattedDate = new Date(entry.created_at).toLocaleDateString("en-GB");

        return (
          <tr key={entry.id}>
            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{index + 1}.</td>
            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
  {entry.transaction_id ? entry.transaction_id : <span style={{ color: "red", fontWeight: "bold" }}>TBA</span>}
</td>

            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{formattedDate}</td>
            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>₹ {entry.account_no}</td>
            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{entry.status}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowWithdrawHistoryModal(false)}
              style={{
                backgroundColor: "#6c757d",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                fontSize: "1em",
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>







        <Modal
          show={showPaidCommissionHistoryModal}
          onHide={() => setShowPaidCommissionHistoryModal(false)}
          centered
          style={{ borderRadius: "10px" }}
        >
          <Modal.Header style={{ position: "relative", padding: "20px" }}>
            <Modal.Title>Online Paid Commission History</Modal.Title>
            <FaTimes
              onClick={() => setShowPaidCommissionHistoryModal(false)}
              style={{
                fontSize: "1.5em",
                position: "absolute",
                top: "15px",
                right: "15px",
                cursor: "pointer",
                color: "#6c757d"
              }}
            />
          </Modal.Header>
          <Modal.Body>
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr>
        <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Sr. No</th>
        <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Payment ID</th>
        <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Date</th>
        <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Deposit Amount</th>
        <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Payment Status</th>
      </tr>
    </thead>
    <tbody>
      {PreviousPaidCommissionHistoryData.map((entry, index) => {
        const formattedDate = new Date(entry.created_at).toLocaleDateString("en-GB");

        return (
          <tr key={entry.id}>
            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{index + 1}.</td>
            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{entry.razorpay_payment_id}</td>
            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{formattedDate}</td>
            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>₹ {entry.deposit_amount}</td>
            <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{entry.razorpay_status}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
</Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowPaidCommissionHistoryModal(false)}
              style={{
                backgroundColor: "#6c757d",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                fontSize: "1em",
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>







        

        <div className="table-responsive mb-5">
          <table className="table table-bordered table-guest">
            <thead className="heading_guest">
              <tr>

                <th scope="col">Sr No.</th>
                <th scope="col">Booking ID</th>
                <th scope="col">Payment Mode</th>
                <th scope="col">Billing Amount ( in ₹ )</th>
                <th scope="col">Commission ( in ₹  )</th>
                <th scope="col">Payment Balance ( in ₹ )</th>
                <th scope="col">Booking Status</th>

              </tr>
            </thead>
            <tbody>
              {guestData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No results found.
                  </td>
                </tr>
              ) : (
                guestData.map((guest, index) => (
                  <tr key={guest.customer_id}>

                    <th scope="row">{index + 1}.</th>
                    <td>{guest?.booking_id}</td>
                  <td>  <strong>{guest?.payment_mod}</strong>  </td>
                    <td>{guest?.billing_amount}</td>
                    <td>{guest?.commition_amount}</td>


                    <td>
  <strong style={{ color: guest?.payout_balance < 0 ? 'red' : '#006400' }}>
    {guest?.payout_balance}
  </strong>
</td>




                    <td>{guest?.status}</td>

                    {/* <td>
                      <Button variant="link" onClick={() => handleOrdersClick(guest)}>
                        Orders
                      </Button>
                    </td> */}

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* {showOrdersModal && selectedOrderDetails && (
          <OrdersModal
            show={showOrdersModal}
            onHide={handleCloseOrdersModal}
            guest={selectedOrderDetails}
          />
        )} */}


      </div>
      <ToastContainer />
    </>
  );
};

export default CommissionTable;
