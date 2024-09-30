import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'; // Import both icons
import './Salad.css';

const Salad = () => {
  const [activeKey, setActiveKey] = useState(null); // Manage active accordion state

  const handleToggle = (key) => {
    setActiveKey(activeKey === key ? null : key); // Toggle accordion open/close
  };

  // Array of starter items
  const starters = [
    {
      id: 1,
      name: 'Spinach Salad',
      details: 'Young spinach with cashew and sesame sauce',
      price: '$70',
      image: './assets/images/Starter/starter1.jpg',
    },
    {
      id: 2,
      name: 'Spinach Salad',
      details: 'Classic caesar with croutons and parmesan',
      price: '$65',
      image: './assets/images/Starter/starter2.jpg',
    },
    {
      id: 3,
      name: 'Spinach Salad',
      details: 'Young spinach with cashew and sesame sauce',
      price: '$70',
      image: './assets/images/Starter/starter2.jpg',
    },
    {
      id: 4,
      name: 'Spinach Salad',
      details: 'Young spinach with cashew and sesame sauce',
      price: '$70',
      image: './assets/images/Starter/starter1.jpg',
    },
    // Add more items as necessary
  ];

  return (
    <div className='container'>
      <Accordion activeKey={activeKey}>
        <Accordion.Item eventKey="0">
          <Accordion.Header onClick={() => handleToggle('0')} className='AccordionHeader'>
            Salad
            <span className="icon">
              {activeKey === '0' ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </span>
          </Accordion.Header>
          <hr className='hr-menu-accordian'/>
          <Accordion.Body>
            <div className='container container-main'>
              <div className='row'>
                {/* Map over starters array */}
                {starters.map((starter, index) => (
                  <div key={starter.id} className={`col-12 col-md-6 ${index % 2 === 0 ? 'section-1' : 'section-2'}`}>
                    <div className='container container-starter'>
                      <div className='col-3 col-md-2'>
                        <img className='startter-img' src={starter.image} alt={starter.name} />
                      </div>
                      <div className='col-7 col-md-8'>
                        <div className='row StarterDetails-Starter'>
                          <div className='col-12 col-md-12 starter-name'>{starter.name}</div>
                          <div className='col-12 col-md-12 starter-details'>{starter.details}</div>
                        </div>
                      </div>
                      <div className='col-2 col-md-2 starter-price'>
                        {starter.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Salad;
