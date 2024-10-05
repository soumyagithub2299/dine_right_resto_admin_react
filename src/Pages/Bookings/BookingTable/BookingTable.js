import React, { useState } from 'react';
import './BookingTable.css';
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { TbCornerUpLeft } from "react-icons/tb";
import EditGuestModal from '../../Guests/EditGuestModal/EditGuestModal';
import ReactPaginate from 'react-paginate';
import OrdersModal from '../../Guests/OrdersModal/OrdersModal'

const initialGuestData = [
  {
    id: 1,
    name: 'Olivia Rhye',
    email: 'olivia@untitledui.com',
    image: './assets/images/Guests/guest-img-1.jpg',
    mobile: '123456789',
    time: '21:00-22:00',
    date: 'Jan 6, 2022',
    status: 'booked',
    statusIcon: <IoMdCheckmark />,
    people: 4,
    table: 'T1',
  },
  {
    id: 2,
    name: 'Olivia Rhye',
    email: 'olivia@untitledui.com',
    image: './assets/images/Guests/guest-img-2.jpg',
    mobile: '923456781',
    time: '10:00-22:00',
    date: 'Jan 7, 2022',
    status: 'cancelled',
    statusIcon: <RxCross2 />,
    people: 2,
    table: 'TM2',
  },
  {
    id: 3,
    name: 'Olivia Rhye',
    email: 'olivia@untitledui.com',
    image: './assets/images/Guests/guest-img-1.jpg',
    mobile: '823456789',
    time: '9:00-22:00',
    date: 'Jan 8, 2022',
    status: 'waiting',
    statusIcon: <TbCornerUpLeft />,
    people: 6,
    table: 'To3',
  },
  {
    id: 4,
    name: 'Olivia Rhye',
    email: 'olivia@untitledui.com',
    image: './assets/images/Guests/guest-img-1.jpg',
    mobile: '823456789',
    time: '9:00-22:00',
    date: 'Jan 8, 2022',
    status: 'waiting',
    statusIcon: <TbCornerUpLeft />,
    people: 6,
    table: 'To3',
  },
  {
    id: 5,
    name: 'Olivia Rhye',
    email: 'olivia@untitledui.com',
    image: './assets/images/Guests/guest-img-1.jpg',
    mobile: '823456789',
    time: '9:00-22:00',
    date: 'Jan 8, 2022',
    status: 'booked',
    statusIcon: <IoMdCheckmark />,
    people: 6,
    table: 'To3',
  },
  {
    id: 6,
    name: 'Olivia Rhye',
    email: 'olivia@untitledui.com',
    image: './assets/images/Guests/guest-img-1.jpg',
    mobile: '823456789',
    time: '9:00-22:00',
    date: 'Jan 8, 2022',
   status: 'booked',
    statusIcon: <IoMdCheckmark />,
    people: 6,
    table: 'To3',
  },
  {
    id: 7,
    name: 'Olivia Rhye',
    email: 'olivia@untitledui.com',
    image: './assets/images/Guests/guest-img-1.jpg',
    mobile: '823456789',
    time: '9:00-22:00',
    date: 'Jan 8, 2022',
    status: 'waiting',
    statusIcon: <TbCornerUpLeft />,
    people: 6,
    table: 'To3',
  },
  {
    id: 8,
    name: 'Olivia Rhye',
    email: 'olivia@untitledui.com',
    image: './assets/images/Guests/guest-img-1.jpg',
    mobile: '823456789',
    time: '9:00-22:00',
    date: 'Jan 8, 2022',
   status: 'booked',
    statusIcon: <IoMdCheckmark />,
    people: 6,
    table: 'To3',
  },
  {
    id: 9,
    name: 'Olivia Rhye',
    email: 'olivia@untitledui.com',
    image: './assets/images/Guests/guest-img-1.jpg',
    mobile: '823456789',
    time: '9:00-22:00',
    date: 'Jan 8, 2022',
   status: 'booked',
    statusIcon: <IoMdCheckmark />,
    people: 6,
    table: 'To3',
  },
  {
    id: 10,
    name: 'Olivia Rhye',
    email: 'olivia@untitledui.com',
    image: './assets/images/Guests/guest-img-1.jpg',
    mobile: '823456789',
    time: '9:00-22:00',
    date: 'Jan 8, 2022',
    status: 'booked',
    statusIcon: <IoMdCheckmark />,
    people: 6,
    table: 'To3',
  },
  {
    id: 11,
    name: 'Olivia Rhye',
    email: 'olivia@untitledui.com',
    image: './assets/images/Guests/guest-img-1.jpg',
    mobile: '823456789',
    time: '9:00-22:00',
    date: 'Jan 8, 2022',
    status: 'booked',
    statusIcon: <IoMdCheckmark />,
    people: 6,
    table: 'To3',
  },
  {
    id: 12,
    name: 'Olivia Rhye',
    email: 'olivia@untitledui.com',
    image: './assets/images/Guests/guest-img-1.jpg',
    mobile: '823456789',
    time: '9:00-22:00',
    date: 'Jan 8, 2022',
    status: 'booked',
    statusIcon: <IoMdCheckmark />,
    people: 6,
    table: 'To3',
  },
];

const BookingTable = () => {
  const [guestData, setGuestData] = useState(initialGuestData);
  const [currentPage, setCurrentPage] = useState(0);
  const [guestsPerPage] = useState(10); // Number of guests per page (set to 10)
  const [showModal, setShowModal] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);

  const [showOrdersModal, setShowOrdersModal] = useState(false); // For Orders Modal
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null); // Order Details

  const pageCount = Math.ceil(guestData.length / guestsPerPage);

  // Function to handle page change
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'booked':
        return <IoMdCheckmark />;
      case 'cancelled':
        return <RxCross2 />;
      case 'waiting':
        return <TbCornerUpLeft />;
      default:
        return null;
    }
  };

  const handleEditClick = (guest) => {
    setSelectedGuest(guest);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedGuest(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedGuest = {
      ...selectedGuest,
      statusIcon: getStatusIcon(selectedGuest.status),
    };
    const updatedGuestData = guestData.map((guest) =>
      guest.id === updatedGuest.id ? updatedGuest : guest
    );
    setGuestData(updatedGuestData);
    handleCloseModal();
  };

  const handleOrdersClick = (guest) => {
    // Set order details dynamically (sample data here)
    const orderDetails = {
      items: ['Spinach Salad', 'Red Sauce Pasta', 'Margarita Pizza'],
      comment: 'Birthday Celebration'
    };
    setSelectedOrderDetails(orderDetails);
    setShowOrdersModal(true);
  };

  const handleCloseOrdersModal = () => {
    setShowOrdersModal(false);
    setSelectedOrderDetails(null);
  };

  // Logic for displaying the current guests on the page
  const indexOfLastGuest = (currentPage + 1) * guestsPerPage;
  const indexOfFirstGuest = indexOfLastGuest - guestsPerPage;
  const currentGuests = guestData.slice(indexOfFirstGuest, indexOfLastGuest);

  return (
    <div className='p-3'>
      <div className="table-responsive mb-5">
        <table className="table table-bordered table-guest">
          <thead className='heading_guest'>
            <tr>
              <th scope="col">Sr No.</th>
              <th scope="col">Guest Name</th>
              <th scope="col">Mobile No.</th>
              <th scope="col">Time</th>
              <th scope="col">Date</th>
              <th scope="col">Guest</th>
              <th scope="col">Table</th>
              <th scope="col">Status</th>
              {/* <th scope="col">Edit</th> Commented out Edit column */}
              <th scope="col">Orders</th> {/* New Orders column */}
            </tr>
          </thead>
          <tbody>
            {currentGuests.map((guest, index) => (
              <tr key={guest.id}>
                <th scope="row" className='id-guest'>{indexOfFirstGuest + index + 1}</th>
                <td>
                  <div className='container container-guest'>
                    <div className='pic-email-guest'>
                      <div className='col-6 col-md-2'>
                        <img className='img-guest' src={guest.image} alt={guest.name} />
                      </div>
                      <div className='col-6 col-md-4'>
                        <div className='row name-email-guest'>
                          <div className='name-guest'>{guest.name}</div>
                          <div className='email-guest'>{guest.email}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className='text-guest'>{guest.mobile}</td>
                <td className='text-guest'>{guest.time}</td>
                <td className='text-guest'>{guest.date}</td>
                <td className='text-guest'>{guest.people}</td>
                <td className='text-guest'>{guest.table}</td>
                <td className={`status ${guest.status}`}>
                  <div className={`status-background-${guest.status}`}>
                    {guest.statusIcon} {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
                  </div>
                </td>
               
                {/* <td className='edit_guests' onClick={() => handleEditClick(guest)}>Edit</td> Commented out Edit link */}
                <td className='edit_guests' onClick={() => handleOrdersClick(guest)}>Orders</td> {/* New Orders link */}
              </tr>
            ))}

            {/* Pagination row */}
            <tr>
              <td colSpan="10" className='pagination-row'>
                <ReactPaginate
                  previousLabel={'Previous'}
                  nextLabel={'Next'}
                  breakLabel={'...'}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageClick}
                  containerClassName={'pagination justify-content-center'}
                  pageClassName={'page-item'}
                  pageLinkClassName={'page-link'}
                  previousClassName={'page-item'}
                  previousLinkClassName={'page-link'}
                  nextClassName={'page-item'}
                  nextLinkClassName={'page-link'}
                  breakClassName={'page-item'}
                  breakLinkClassName={'page-link'}
                  activeClassName={'active'}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {selectedGuest && (
        <EditGuestModal
          show={showModal}
          handleClose={handleCloseModal}
          guest={selectedGuest}
          setGuest={setSelectedGuest}
          handleSubmit={handleSubmit}
        />
      )}

      {selectedOrderDetails && (
        <OrdersModal
          show={showOrdersModal}
          handleClose={handleCloseOrdersModal}
          orderDetails={selectedOrderDetails} 
        />
      )}
    </div>
  );
};

export default BookingTable;
  

