import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import "./CalenderComponent.css";

const CalenderComponent = () => {
  const [resources, setResources] = useState([]);
  const calendarRef = useRef(null);

  useEffect(() => {
    // Fetch and modify resources data
    const fetchResources = async () => {
      try {
        const response = await fetch(
          "https://fullcalendar.io/demo-resources.json?with-nesting&with-colors"
        );
        const data = await response.json();

        // Generate new resource names
        const modifiedResources = data.map((resource, index) => ({
          ...resource,
          title: `Table-${index + 1}`,
        }));

        setResources(modifiedResources);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };

    fetchResources();

    // Remove the license message and interact with the calendar instance after rendering
    const intervalId = setInterval(() => {
    //   const resourceLabel = document.querySelector(".fc-resource-header th");
    const resourceLabel = document.querySelector(".fc-datagrid-cell-main");
      const licenseMessage = document.querySelector(".fc-license-message");
      if (resourceLabel) {
        resourceLabel.textContent = "Table"; // Change the label text
      }
      if (licenseMessage) {
        licenseMessage.remove(); // Remove the license message
      }
    }, 100); // Check every 100ms until the elements are found

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  return (
    <div style={{ padding: "0px", marginBottom: "" }}>
      <FullCalendar
        ref={calendarRef}
        plugins={[interactionPlugin, resourceTimelinePlugin]}
        initialView="resourceTimelineDay"
        timeZone="UTC"
        aspectRatio={2.5}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "", // Remove right-side button by setting it to an empty string
        }}
        editable={true}
        resourceLabelText="" // Initial text; will be updated by JavaScript
        resources={resources} // Use the modified resources
        events="https://fullcalendar.io/demo-events.json?single-day&for-resource-timeline"
      />
    </div>
  );
};

export default CalenderComponent;
