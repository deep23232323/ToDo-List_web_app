import React from "react";
import HeroSection from "../components/HeroSection";
import useTaskStore from "../store/useTaskStore";

const Exports = () => {
  const tasks = useTaskStore((state) => state.tasks);

  const handleExport = () => {
    if(tasks.length <1){
      alert("no tasks in a list");
      return;
    }
    const headers = ["Task Name", "Category", "Date", "Description"];
    const rows = tasks.map((t) =>
      [t.taskName, t.catagory, t.taskDate, t.description].join(",")
    );

    const csv = [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "my_tasks.csv";
    link.click();
  };

  return (
    <div className="absolute top-20 left-0 w-screen h-[90vh] flex flex-col items-center justify-center text-white z-[999]">
  <h1 className="mr-4 absolute left-10 top-0">
    <HeroSection text={3} />
  </h1>

  <div className="w-[300px] h-[300px] md:w-[500px] md:h-[300px] bg-blue-950/50 rounded-lg shadow-lg flex border-2 justify-center items-center">
 <div className="w-[70%] h-[70%] flex justify-center items-center bg-blue-950/90 rounded-2xl border-2">
   <button
  onClick={handleExport}
  className="cursor-pointer  h-[70px] md:w-[200px] w-[150px] bg-blue-600 text-white rounded-lg hover:bg-blue-700"
>
  Export Tasks
</button>
 </div>

  </div>
</div>

  );
};

export default Exports;
