import React, { useEffect, useState } from "react";
import "./AddTable.css";
import { HiPlus } from "react-icons/hi";
import { IoMdBackspace } from "react-icons/io";
import { HiPlusSmall } from "react-icons/hi2";
import { BiMinus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../../../Loader/Loader/Loader";
import SignUpSuccessModal from "../../SignUpSuccessModal";

const AddTable = ({ handleBack }) => {
  const userId = sessionStorage.getItem("newSignUpRestoUserId");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [diningAreas, setDiningAreas] = useState([]); // Store all dining areas from the API
  const [tableRows, setTableRows] = useState([]); // Store tables for each dining area

  const navigate = useNavigate(); // Initialize navigate

  // Fetch dining areas on component mount
  useEffect(() => {
    const fetchDiningAreas = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/dining-areas/${userId}`
        );
        setLoading(false);

        if (response.data.response) {
          setDiningAreas(response.data.diningAreas);
          // Initialize tableRows based on fetched dining areas
          const initialTableRows = response.data.diningAreas.map(area => ({
            dining_area_id: area.dining_area_id,
            tables: [{ table_name: "", table_no_of_seats: 1 }] // Start with one empty table
          }));
          setTableRows(initialTableRows);
        } else {
          console.log(response.data.error_msg || "Failed to fetch dining areas.");
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching dining areas:", error);
        setError("An error occurred. Please try again later.");
      }
    };

    fetchDiningAreas();
  }, [userId]);

  const handleIncrement = (areaIndex, tableIndex) => {
    const updatedRows = [...tableRows];
    updatedRows[areaIndex].tables[tableIndex].table_no_of_seats += 1;
    setTableRows(updatedRows);
  };

  const handleDecrement = (areaIndex, tableIndex) => {
    const updatedRows = [...tableRows];
    if (updatedRows[areaIndex].tables[tableIndex].table_no_of_seats > 1) {
      updatedRows[areaIndex].tables[tableIndex].table_no_of_seats -= 1;
      setTableRows(updatedRows);
    }
  };

  const addRow = (areaIndex) => {
    const updatedRows = [...tableRows];
    updatedRows[areaIndex].tables.push({ table_name: "", table_no_of_seats: 1 }); // Add a new table row
    setTableRows(updatedRows);
  };

  const removeRow = (areaIndex, tableIndex) => {
    const updatedRows = [...tableRows];
    if (updatedRows[areaIndex].tables.length > 1) {
      updatedRows[areaIndex].tables.splice(tableIndex, 1); // Remove the specific table row
      setTableRows(updatedRows);
    }
  };

  const handleTableNameChange = (areaIndex, tableIndex, value) => {
    const updatedRows = [...tableRows];
    updatedRows[areaIndex].tables[tableIndex].table_name = value;
    setTableRows(updatedRows);
  };







  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleSignUp = () => {
    setIsSignedUp(true);
  };


  const handleSubmit = async () => {

    for (let areaIndex = 0; areaIndex < tableRows.length; areaIndex++) {
        const area = diningAreas[areaIndex];
        if (tableRows[areaIndex].tables.length === 0 || tableRows[areaIndex].tables[0].table_name === "") {
          toast.error(`Please add at least one table for: ${area.dining_area_type}.`);
          return;
        }
      }

    const data = {
      userId: userId,
      dining_areas: tableRows,
    };

    try {
      setLoading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/insert-dining-table`,
        data
      );


      if (response.data.response === true) {

        setLoading(false);

        sessionStorage.clear();

        toast.success(response.data.success_msg || "Submitted Successfully!");

        // navigate("/");

        handleSignUp();


      } else {
      setLoading(false);

        toast.error(response.data.error_msg || "Failed to add tables.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error adding tables:", error);
      toast.error("An error occurred while adding tables. Please try again.");
    }
  };

  return (
    <>
    
    {loading && <Loader />}
    
    {isSignedUp && <SignUpSuccessModal />}


    <div className="container Main_AddTable my-5">
      <p className="Heading_AddTable mb-4">ADD TABLE</p>
      <p className="Paragraph_AddTable mb-3">
        &nbsp; Add at least 1 table per dining area. Once you finish creating
        your account, you will be able to add or remove tables in your Floor Map
        settings.
      </p>

      {diningAreas.map((area, areaIndex) => (
        <div key={area.dining_area_id} className="MainDining_AddTable mb-5">
          <p className="Subheading1_AddTable">
            Dining Area Name: {" "}
            <span style={{
              fontWeight: 'bold',
              fontSize: '1.2em',
              color: '#333',
              textShadow: '1px 1px 5px rgba(0, 0, 0, 0.2)',
              fontFamily: 'Arial, sans-serif',
            }}>
              {area.dining_area_type}
            </span>
          </p>

          <div className="row">
            {tableRows[areaIndex].tables.map((table, tableIndex) => (
              <div key={tableIndex} className="row w-100 mb-3" style={{ backgroundColor: "#F6F8F9" }}>
                <div className="col-12 col-md-6 p-4">
                  <div>
                    <div className="Subheading2_AddTable">Table Name <span className="text-danger">*</span> </div>
                    <input
                      type="text"
                      value={table.table_name}
                    //   placeholder={`E.g.: Table ${tableIndex + 1}`}
                      onChange={(e) => handleTableNameChange(areaIndex, tableIndex, e.target.value)}
                      className="form-control"
                      style={{ background: "white", height: '45px' }}
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6 p-4">
                  <div className="Subheading2_AddTable">Seating Capacity <span className="text-danger">*</span> </div>
                  <div className="seating_AddTable">
                    <div className="component2">
                      <BiMinus
                        className="SubinnerSvg"
                        style={{ marginLeft: "10px", fontSize: "25px", cursor: "pointer" }}
                        onClick={() => handleDecrement(areaIndex, tableIndex)}
                      />
                      {table.table_no_of_seats}
                      <HiPlusSmall
                        className="SubinnerSvg"
                        style={{ marginRight: "10px", fontSize: "25px", cursor: "pointer" }}
                        onClick={() => handleIncrement(areaIndex, tableIndex)}
                      />
                    </div>
                    <div>
                      <IoMdBackspace
                        className="svg_AddTable"
                        onClick={() => removeRow(areaIndex, tableIndex)}
                        style={{ marginRight: "10px", fontSize: "25px" }}
                      />
                      {/* Show add button only for the last row */}
                      {tableIndex === tableRows[areaIndex].tables.length - 1 && (
                        <HiPlus
                          className="svg_AddTable"
                          style={{ fontSize: "35px" }}
                          onClick={() => addRow(areaIndex)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="service-button">
        <button type="submit" className="addTable-btn" onClick={handleSubmit}>
          Confirm
        </button>
      </div>
    </div>
    </>
  );
};

export default AddTable;
