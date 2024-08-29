import React, { useState, useCallback } from 'react';
import { Scheduler } from "@bitnoi.se/react-scheduler";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween"; // Import the isBetween plugin

dayjs.extend(isBetween); // Extend dayjs with the isBetween plugin

function Schedule({task}) {
  const [filterButtonState, setFilterButtonState] = useState(0);
  const [range, setRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const handleScheduleData=()=>{
    if(!task) return [];
    const data = task.map((item,index)=>{

      return {
        id: index,
        label: {
          icon: "",
          title: `Task ${index+1}`,
          subtitle: item.task,
        },
        data: [
          {
            id: 1,
            startDate: new Date(item.start_date),
            endDate: new Date(item.end_date),
            title: item.task,
            subtitle: item.description,
            bgColor: "rgb(21,128,61)",
            
          },
        ],
      }
    })
    return data;
  }

  const handleRangeChange = useCallback((range) => {
    setRange(range);
  }, []);
  const SchedulerData = handleScheduleData();
  const filteredMockedSchedulerData = SchedulerData.map((person) => ({
    ...person,
    data: person.data.filter(
      (project) =>
        dayjs(project.startDate).isBetween(range.startDate, range.endDate) ||
        dayjs(project.endDate).isBetween(range.startDate, range.endDate) ||
        (dayjs(project.startDate).isBefore(range.startDate, "day") &&
          dayjs(project.endDate).isAfter(range.endDate, "day"))
    ),
  }));
 

  return (
    <section 
      className="h-96  relative top-2 rounded-md border-2 border-gray-200"
      >
      <Scheduler
        data={filteredMockedSchedulerData}
        isLoading={false} // Assuming a loading state; replace as needed
        onRangeChange={handleRangeChange}
        onFilterData={() => {
          setFilterButtonState(1);
        }}
        onClearFilterData={() => {
          setFilterButtonState(0);
        }}
        config={{
          zoom: 0,
          filterButtonState,
          defaultTheme: "dark",
        }}
      />
    </section>
  );
}


export default Schedule;
