// import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import { Eventcalendar, getJson, setOptions, Toast } from '@mobiscroll/react';

// // Set Mobiscroll global options
// setOptions({
//   theme: 'ios',
//   themeVariant: 'light',
// });

// const FullCalendarRestro = () => {
//   // State for events and toast notifications
//   const [myEvents, setEvents] = useState([]);
//   const [isToastOpen, setToastOpen] = useState(false);
//   const [toastText, setToastText] = useState('');

//   // Invalid event timings (e.g., Lunch break)
//   const myInvalids = useMemo(
//     () => [
//       {
//         start: '12:00',
//         end: '13:00',
//         title: 'Lunch break',
//         type: 'lunch',
//         recurring: {
//           repeat: 'weekly',
//           weekDays: 'MO,TU,WE,TH,FR',
//         },
//       },
//     ],
//     [],
//   );

//   // Calendar view settings (Weekly schedule from Monday to Friday, 9AM - 6PM)
//   const myView = useMemo(
//     () => ({
//       schedule: {
//         type: 'week',
//         startDay: 1, // Monday
//         endDay: 5, // Friday
//         startTime: '09:00', // 9 AM
//         endTime: '18:00', // 6 PM
//       },
//     }),
//     [],
//   );

//   // Handle failed event creation due to invalid time (e.g., lunch break)
//   const handleEventCreateFailed = useCallback((args) => {
//     if (args.invalid.type === 'lunch') {
//       setToastText("Can't create this task during lunch break.");
//       setToastOpen(true);
//     }
//   }, []);

//   // Handle failed event update due to invalid time (e.g., lunch break)
//   const handleEventUpdateFailed = useCallback((args) => {
//     if (args.invalid.type === 'lunch') {
//       setToastText("Can't schedule this task during lunch break.");
//       setToastOpen(true);
//     }
//   }, []);

//   // Close the toast notification
//   const handleCloseToast = useCallback(() => {
//     setToastOpen(false);
//   }, []);

//   // Fetch events data from a public API
//   useEffect(() => {
//     getJson(
//       'https://trial.mobiscroll.com//workday-events/?vers=5',
//       (events) => {
//         setEvents(events); // Set the events into the state
//       },
//       'jsonp',
//     );
//   }, []);

//   return (
//     <div>
//       {/* Event calendar component with drag-and-drop functionality */}
//       <Eventcalendar
//         dragToCreate={true}
//         dragToMove={true}
//         invalid={myInvalids} // Invalid timing restrictions
//         data={myEvents} // Event data fetched from API
//         view={myView} // Calendar view settings
//         onEventCreateFailed={handleEventCreateFailed} // Handle event creation failure
//         onEventUpdateFailed={handleEventUpdateFailed} // Handle event update failure
//       />

//       {/* Toast notification to display error messages */}
//       <Toast
//         theme="ios"
//         themeVariant="light"
//         message={toastText} // Message for the toast
//         isOpen={isToastOpen} // Control when the toast is open
//         onClose={handleCloseToast} // Close the toast when the user clicks close
//       />
//     </div>
//   );
// }

// export default FullCalendarRestro;
