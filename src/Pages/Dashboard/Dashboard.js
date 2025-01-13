
import React, { useEffect, useState } from "react";
import "../../Template/LayoutMain/LayoutMain/Layout.css";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../../Loader/Loader/Loader";

const Dashboard = () => {
  const token = sessionStorage.getItem("TokenForDineRightRestoAdmin");
  const [loading, setLoading] = useState(false);
  const [TotalAPI_Data, setTotalAPI_Data] = useState(null);

    const [value, setValue] = useState(() => {
      const storedValue = sessionStorage.getItem('isSidebarOpen');
      return storedValue !== null ? JSON.parse(storedValue) : true;
    });

    
      // Effect to poll sessionStorage value repeatedly
      useEffect(() => {
        const checksessionStorage = () => {
          const storedValue = sessionStorage.getItem('isSidebarOpen');
          const parsedValue = storedValue !== null ? JSON.parse(storedValue) : true;
          
          if (parsedValue !== value) {
            setValue(parsedValue);
            console.log('sessionStorage value updated:', parsedValue); // Log the updated value
          }
        };
    
        // Polling interval in milliseconds (e.g., 10ms)
        const intervalId = setInterval(checksessionStorage, 10);
    
        // Cleanup function to clear the interval
        return () => {
          clearInterval(intervalId);
        };
      }, [value]);
    
      useEffect(() => {
        // console.log('Component updated, current value:', value);
      }, [value]);

      

  useEffect(() => {
    const handleGetAllData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/restaurantDashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoading(false);
        if (response?.data) {
          setTotalAPI_Data(response?.data?.total);
        } else {
          toast.info("No data available");
          setTotalAPI_Data({});
        }
      } catch (error) {
        setLoading(false);
        toast.error("An error occurred, please try again.");
      }
    };

    handleGetAllData();
  }, [token]);

  return (
    <>
      <div className={`content-container ${value ? "sidebar-open" : "sidebar-closed"}`}>
        {loading && <Loader />}
        <div className="dashboard-container">
          {/* Bookings Section */}
          <div className="section" style={{ backgroundColor: "#e8f5e9" }}>
            <h4>Bookings</h4>
            <div className="info-card">
              <h6>Total Bookings</h6>
              <p>{TotalAPI_Data?.total_bookings || 0}</p>
            </div>
            <div className="info-card">
              <h6>Online Bookings</h6>
              <p>{TotalAPI_Data?.total_online_bookings || 0}</p>
            </div>
            <div className="info-card">
              <h6>COD Bookings</h6>
              <p>{TotalAPI_Data?.total_cod_bookings || 0}</p>
            </div>
            <div className="info-card">
              <h6>Upcoming Bookings</h6>
              <p>{TotalAPI_Data?.total_upcoming_bookings || 0}</p>
            </div>
            <div className="info-card">
              <h6>In-progress Bookings</h6>
              <p>{TotalAPI_Data?.total_inprogress_bookings || 0}</p>
            </div>
            <div className="info-card">
              <h6>Completed Bookings</h6>
              <p>{TotalAPI_Data?.total_completed_bookings || 0}</p>
            </div>
            <div className="info-card">
              <h6>Cancelled Bookings</h6>
              <p>{TotalAPI_Data?.total_cancelled_bookings || 0}</p>
            </div>
          </div>

          {/* Payment Section */}
          <div className="section" style={{ backgroundColor: "#fffde7" }}>
            <h4>Payment</h4>
            <div className="info-card">
              <h6>Total Payout Balance</h6>
              <p>₹ {TotalAPI_Data?.total_payout_balance || 0}</p>
            </div>
            <div className="info-card">
              <h6>Total Commission Amount</h6>
              <p>₹ {TotalAPI_Data?.total_commition_amount || 0}</p>
            </div>
            <div className="info-card">
              <h6>Total Billing Amount</h6>
              <p>₹ {TotalAPI_Data?.total_billing_amount || 0}</p>
            </div>
            <div className="info-card">
              <h6>Total Withdrawal</h6>
              <p>₹ {TotalAPI_Data?.total_withdrawal || 0}</p>
            </div>
            <div className="info-card">
              <h6>Pending Withdrawal</h6>
              <p>₹ {TotalAPI_Data?.total_pending_withdrawal || 0}</p>
            </div>
            <div className="info-card">
              <h6>Approved Withdrawal</h6>
              <p>₹ {TotalAPI_Data?.total_approved_withdrawal || 0}</p>
            </div>
            <div className="info-card">
              <h6>Rejected Withdrawal</h6>
              <p>₹ {TotalAPI_Data?.total_rejected_withdrawal || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for styling */}
      <style jsx>{`
        .dashboard-container {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          padding: 10px;
        }

        .section {
          flex: 1;
          padding: 15px;
          border-radius: 8px;
        }

        .info-card {
          margin-bottom: 10px;
          padding: 10px;
          background: #ffffff;
          border: 1px solid #ddd;
          border-radius: 8px;
          text-align: center;
        }

        .info-card h6 {
          margin: 0;
          font-weight: normal;
          color: #333;
        }

        .info-card p {
          margin: 5px 0 0;
          font-size: 1.1rem;
          color: #555;
        }

        h4 {
          margin-bottom: 10px;
          color: #555;
        }
      `}</style>
    </>
  );
};

export default Dashboard;
