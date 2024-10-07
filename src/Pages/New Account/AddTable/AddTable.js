import React, { useState } from 'react';
import './AddTable.css';
import { HiPlus } from "react-icons/hi";
import { IoMdBackspace } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { HiPlusSmall } from "react-icons/hi2";
import { BiMinus } from "react-icons/bi";
import { useNavigate } from 'react-router-dom'; 

const AddTable = ({ handleBack }) => { 
    const [mainDiningRows, setMainDiningRows] = useState([{ number: 1, name: '' }]); 
    const [barAreaRows, setBarAreaRows] = useState([{ number: 1, name: '' }]);

    const navigate = useNavigate();

    const handleIncrement = (section, index) => {
        const newRows = section === 'mainDining' ? [...mainDiningRows] : [...barAreaRows];
        newRows[index].number += 1;
        section === 'mainDining' ? setMainDiningRows(newRows) : setBarAreaRows(newRows);
    };

    const handleDecrement = (section, index) => {
        const newRows = section === 'mainDining' ? [...mainDiningRows] : [...barAreaRows];
        if (newRows[index].number > 1) {
            newRows[index].number -= 1;
            section === 'mainDining' ? setMainDiningRows(newRows) : setBarAreaRows(newRows);
        }
    };

    const addRow = (section) => {
        section === 'mainDining'
            ? setMainDiningRows([...mainDiningRows, { number: 1, name: '' }])
            : setBarAreaRows([...barAreaRows, { number: 1, name: '' }]);
    };

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

    const handleConfirm = () => {
        navigate('/dashboard');
    };

    const handleBackClick = () => {
        handleBack(); 
    };

    const handleTableNameChange = (section, index, value) => {
        const newRows = section === 'mainDining' ? [...mainDiningRows] : [...barAreaRows];
        newRows[index].name = value; 
        section === 'mainDining' ? setMainDiningRows(newRows) : setBarAreaRows(newRows);
    };

    
    const handleLoginClick = () => {
        navigate('/'); 
    };

    return (
        <div className='container Main_AddTable my-5'>
            <p className='Heading_AddTable mb-4'>
                <IoIosArrowBack onClick={handleBackClick} style={{ cursor: 'pointer' }} /> 
                ADD TABLE
            </p>
            <p className='Paragraph_AddTable mb-3'>
                &nbsp; Add at least 1 table per dining area. Once you finish creating your account,
                you will be able to add or remove tables in your Floor Map settings.
            </p>

            <div className='MainDining_AddTable mb-5'>
                <p className='Subheading1_AddTable'>Main Dining</p>
                <div className='row'>
                    {mainDiningRows.map((row, index) => (
                        <div key={index} className='row w-100 mb-3' style={{ backgroundColor: '#F6F8F9' }}>
                            <div className='col-12 col-md-6 p-4'>
                                <div>
                                    <div className='Subheading2_AddTable'>TABLE NAME</div>
                                    <div className='component1'>
                                        <input
                                            type='text'
                                            value={row.name}
                                            placeholder={`E.g.: Table ${index + 1}`} 
                                            onChange={(e) => handleTableNameChange('mainDining', index, e.target.value)} 
                                            className='table-name-input' 
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='col-12 col-md-6 p-4'>
                                <div className='Subheading2_AddTable'>SEATING</div>
                                <div className='seating_AddTable'>
                                    <div className='component2'>
                                        {row.number} 
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

            <div className='BarArea_AddTable'>
                <p className='Subheading1_AddTable'>Bar Area</p>
                <div className='row'>
                    {barAreaRows.map((row, index) => (
                        <div key={index} className='row w-100 mb-3' style={{ backgroundColor: '#F6F8F9' }}>
                            <div className='col-12 col-md-6 p-4'>
                                <div>
                                    <div className='Subheading2_AddTable'>TABLE NAME</div>
                                    <div className='component1'>
                                        <input
                                            type='text'
                                            value={row.name}
                                            placeholder={`E.g.: Table ${index + 1}`} 
                                            onChange={(e) => handleTableNameChange('barArea', index, e.target.value)} 
                                            className='table-name-input' 
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='col-12 col-md-6 p-4'>
                                <div className='Subheading2_AddTable'>SEATING</div>
                                <div className='seating_AddTable'>
                                    <div className='component2'>
                                        {row.number} 
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
            <p 
                className="Rendering-Login-newAccount mt-2" 
                style={{ cursor: 'pointer', textAlign:'center'}} 
                onClick={handleLoginClick} 
            >
                Already have an account? Login
            </p>
        </div>
    );
};

export default AddTable;



// import React, { useState } from 'react';
// import './AddTable.css';
// import { HiPlus } from "react-icons/hi";
// import { IoMdBackspace } from "react-icons/io";
// import { IoIosArrowBack } from "react-icons/io";
// import { HiPlusSmall } from "react-icons/hi2";
// import { BiMinus } from "react-icons/bi";
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify'; 
// import { AddTableAPI } from './../../../utils/APIs/credentialsApis'; 

// const AddTable = ({ handleBack }) => { 
//     const [mainDiningRows, setMainDiningRows] = useState([{ number: 1, name: '' }]); 
//     const [barAreaRows, setBarAreaRows] = useState([{ number: 1, name: '' }]);
//     const navigate = useNavigate();

//     const handleIncrement = (section, index) => {
//         const newRows = section === 'mainDining' ? [...mainDiningRows] : [...barAreaRows];
//         newRows[index].number += 1;
//         section === 'mainDining' ? setMainDiningRows(newRows) : setBarAreaRows(newRows);
//     };

//     const handleDecrement = (section, index) => {
//         const newRows = section === 'mainDining' ? [...mainDiningRows] : [...barAreaRows];
//         if (newRows[index].number > 1) {
//             newRows[index].number -= 1;
//             section === 'mainDining' ? setMainDiningRows(newRows) : setBarAreaRows(newRows);
//         }
//     };
   
//     const handleLoginClick = () => {
//                 navigate('/'); 
//             };

//     const addRow = (section) => {
//         section === 'mainDining'
//             ? setMainDiningRows([...mainDiningRows, { number: 1, name: '' }])
//             : setBarAreaRows([...barAreaRows, { number: 1, name: '' }]);
//     };

//     const removeRow = (section) => {
//         if (section === 'mainDining') {
//             if (mainDiningRows.length > 1) {
//                 setMainDiningRows(mainDiningRows.slice(0, -1));
//             }
//         } else {
//             if (barAreaRows.length > 1) {
//                 setBarAreaRows(barAreaRows.slice(0, -1));
//             }
//         }
//     };

//     const handleBackClick = () => {
//         handleBack(); 
//     };

//     const handleTableNameChange = (section, index, value) => {
//         const newRows = section === 'mainDining' ? [...mainDiningRows] : [...barAreaRows];
//         newRows[index].name = value; 
//         section === 'mainDining' ? setMainDiningRows(newRows) : setBarAreaRows(newRows);
//     };

   
//     const handleSubmit = async () => {
        
//         const data = {
//             mainDining: mainDiningRows,
//             barArea: barAreaRows,
//         };

        
//         if (!data.mainDining.length || !data.barArea.length) {
//             toast.error("Please add at least one table in each area.");
//             return;
//         }

//         try {
//             const response = await AddTableAPI(data);
            
//             if (response && response.data && response.data.response) {
//                 toast.success("Tables added successfully.");
//                 navigate('/dashboard'); 
//             } else {
//                 toast.error(response.data.error_msg || "Failed to add tables.");
//             }
//         } catch (error) {
//             console.error("Error adding tables:", error);
//             toast.error("An error occurred while adding tables. Please try again.");
//         }
//     };

//     return (
//         <div className='container Main_AddTable my-5'>
//             <p className='Heading_AddTable mb-4'>
//                 <IoIosArrowBack onClick={handleBackClick} style={{ cursor: 'pointer' }} /> 
//                 ADD TABLE
//             </p>
//             <p className='Paragraph_AddTable mb-3'>
//                 &nbsp; Add at least 1 table per dining area. Once you finish creating your account,
//                 you will be able to add or remove tables in your Floor Map settings.
//             </p>

//             <div className='MainDining_AddTable mb-5'>
//                 <p className='Subheading1_AddTable'>Main Dining</p>
//                 <div className='row'>
//                     {mainDiningRows.map((row, index) => (
//                         <div key={index} className='row w-100 mb-3' style={{ backgroundColor: '#F6F8F9' }}>
//                             <div className='col-12 col-md-6 p-4'>
//                                 <div>
//                                     <div className='Subheading2_AddTable'>TABLE NAME</div>
//                                     <div className='component1'>
//                                         <input
//                                             type='text'
//                                             value={row.name}
//                                             placeholder={`E.g.: Table ${index + 1}`} 
//                                             onChange={(e) => handleTableNameChange('mainDining', index, e.target.value)} 
//                                             className='table-name-input' 
//                                         />
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className='col-12 col-md-6 p-4'>
//                                 <div className='Subheading2_AddTable'>SEATING</div>
//                                 <div className='seating_AddTable'>
//                                     <div className='component2'>
//                                         {row.number} 
//                                         <div className='innerSvg_AddTable'>
//                                             <BiMinus className='SubinnerSvg' onClick={() => handleDecrement('mainDining', index)} />
//                                             <HiPlusSmall className='SubinnerSvg' onClick={() => handleIncrement('mainDining', index)} />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <HiPlus className='svg_AddTable' onClick={() => addRow('mainDining')} />
//                                         <IoMdBackspace className='svg_AddTable' onClick={() => removeRow('mainDining')} />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className='BarArea_AddTable'>
//                 <p className='Subheading1_AddTable'>Bar Area</p>
//                 <div className='row'>
//                     {barAreaRows.map((row, index) => (
//                         <div key={index} className='row w-100 mb-3' style={{ backgroundColor: '#F6F8F9' }}>
//                             <div className='col-12 col-md-6 p-4'>
//                                 <div>
//                                     <div className='Subheading2_AddTable'>TABLE NAME</div>
//                                     <div className='component1'>
//                                         <input
//                                             type='text'
//                                             value={row.name}
//                                             placeholder={`E.g.: Table ${index + 1}`} 
//                                             onChange={(e) => handleTableNameChange('barArea', index, e.target.value)} 
//                                             className='table-name-input' 
//                                         />
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className='col-12 col-md-6 p-4'>
//                                 <div className='Subheading2_AddTable'>SEATING</div>
//                                 <div className='seating_AddTable'>
//                                     <div className='component2'>
//                                         {row.number} 
//                                         <div className='innerSvg_AddTable'>
//                                             <BiMinus className='SubinnerSvg' onClick={() => handleDecrement('barArea', index)} />
//                                             <HiPlusSmall className='SubinnerSvg' onClick={() => handleIncrement('barArea', index)} />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <HiPlus className='svg_AddTable' onClick={() => addRow('barArea')} />
//                                         <IoMdBackspace className='svg_AddTable' onClick={() => removeRow('barArea')} />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className='service-button'>
//                 <button type="submit" className="addTable-btn" onClick={handleSubmit}>Confirm</button>
//             </div>
//             <p 
//                 className="Rendering-Login-newAccount mt-2" 
//                 style={{ cursor: 'pointer', textAlign:'center'}} 
//                 onClick={handleLoginClick} 
//             >
//                 Already have an account? Login
//             </p>
//         </div>
//     );
// };

// export default AddTable;
