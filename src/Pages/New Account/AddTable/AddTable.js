import React, { useState } from 'react';
import './AddTable.css';
import { HiPlus } from "react-icons/hi";
import { IoMdBackspace } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { HiPlusSmall } from "react-icons/hi2";
import { BiMinus } from "react-icons/bi";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AddTable = () => {
    // Separate state for Main Dining and Bar Area
    const [mainDiningRows, setMainDiningRows] = useState([{ number: 1 }]);
    const [barAreaRows, setBarAreaRows] = useState([{ number: 1 }]);

    // Initialize useNavigate hook
    const navigate = useNavigate();

    // Function to handle increment for a specific row in a specific section
    const handleIncrement = (section, index) => {
        const newRows = section === 'mainDining' ? [...mainDiningRows] : [...barAreaRows];
        newRows[index].number += 1;
        section === 'mainDining' ? setMainDiningRows(newRows) : setBarAreaRows(newRows);
    };

    // Function to handle decrement for a specific row in a specific section
    const handleDecrement = (section, index) => {
        const newRows = section === 'mainDining' ? [...mainDiningRows] : [...barAreaRows];
        if (newRows[index].number > 1) {
            newRows[index].number -= 1;
            section === 'mainDining' ? setMainDiningRows(newRows) : setBarAreaRows(newRows);
        }
    };

    // Function to add a new row to a specific section
    const addRow = (section) => {
        section === 'mainDining'
            ? setMainDiningRows([...mainDiningRows, { number: 1 }])
            : setBarAreaRows([...barAreaRows, { number: 1 }]);
    };

    // Function to remove the last row from a specific section
    const removeRow = (section) => {
        if (section === 'mainDining') {
            if (mainDiningRows.length > 1) {
                setMainDiningRows(mainDiningRows.slice(0, -1));
            }
        } else {
            if (barAreaRows.length > 1) {
                setBarAreaRows(barAreaRows.slice(0, -1));
            }
        }
    };

    // Function to handle confirm button click and navigate to /dashboard
    const handleConfirm = () => {
        navigate('/dashboard');
    };

    return (
        <div className='container Main_AddTable my-5'>
            <p className='Heading_AddTable mb-4'><IoIosArrowBack className='icon_heading_AdTable' />ADD TABLE</p>
            <p className='Paragraph_AddTable mb-3'> &nbsp; Add at least 1 table per dining area. Once you finish creating your account,
                you will be able to add or remove tables in your Floor Map settings.</p>

            {/* Main Dining Section */}
            <div className='MainDining_AddTable mb-5'>
                <p className='Subheading1_AddTable'>Main Dining</p>
                <div className='row'>
                    {mainDiningRows.map((row, index) => (
                        <div key={index} className='row w-100 mb-3' style={{ backgroundColor: '#F6F8F9' }}>
                            <div className='col-12 col-md-6 p-4'>
                                <div>
                                    <div className='Subheading2_AddTable'>TABLE NAME</div>
                                    <div className='component1'>
                                        E.g.: Table {index + 1}
                                    </div>
                                </div>
                            </div>

                            <div className='col-12 col-md-6 p-4'>
                                <div className='Subheading2_AddTable'>SEATING</div>
                                <div className='seating_AddTable'>
                                    <div className='component2'>
                                        {row.number} {/* Display the current number */}
                                        <div className='innerSvg_AddTable'>
                                            <BiMinus className='SubinnerSvg' onClick={() => handleDecrement('mainDining', index)} />
                                            <HiPlusSmall className='SubinnerSvg' onClick={() => handleIncrement('mainDining', index)} />
                                        </div>
                                    </div>
                                    <div>
                                        <HiPlus className='svg_AddTable' onClick={() => addRow('mainDining')} />
                                        <IoMdBackspace className='svg_AddTable' onClick={() => removeRow('mainDining')} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bar Area Section */}
            <div className='BarArea_AddTable'>
                <p className='Subheading1_AddTable'>Bar Area</p>
                <div className='row'>
                    {barAreaRows.map((row, index) => (
                        <div key={index} className='row w-100 mb-3' style={{ backgroundColor: '#F6F8F9' }}>
                            <div className='col-12 col-md-6 p-4'>
                                <div>
                                    <div className='Subheading2_AddTable'>TABLE NAME</div>
                                    <div className='component1'>
                                        E.g.: Table {index + 1}
                                    </div>
                                </div>
                            </div>

                            <div className='col-12 col-md-6 p-4'>
                                <div className='Subheading2_AddTable'>SEATING</div>
                                <div className='seating_AddTable'>
                                    <div className='component2'>
                                        {row.number} {/* Display the current number */}
                                        <div className='innerSvg_AddTable'>
                                            <BiMinus className='SubinnerSvg' onClick={() => handleDecrement('barArea', index)} />
                                            <HiPlusSmall className='SubinnerSvg' onClick={() => handleIncrement('barArea', index)} />
                                        </div>
                                    </div>
                                    <div>
                                        <HiPlus className='svg_AddTable' onClick={() => addRow('barArea')} />
                                        <IoMdBackspace className='svg_AddTable' onClick={() => removeRow('barArea')} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='service-button'>
                <button type="submit" className="addTable-btn" onClick={handleConfirm}>Confirm</button>
            </div>
        </div>
    );
};

export default AddTable;
