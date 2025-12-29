import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import AddTaskModal from "../components/AddTaskModel";
import useTaskStore from "../store/useTaskStore";
import { useActionStore } from "../store/useActionStore";
import useCatagoryStore from "../store/useCatagoryStore";
import { LuAlarmClock } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

const Dashboard = () => {
  const tasks = useTaskStore((state) => state.tasks);
    const removeTask = useTaskStore((state) => state.removeTask);

  const setTriggerAction = useActionStore((state) => state.setTriggerAction);
  const categories = useCatagoryStore((state) => state.catagories);


  const [searchedTask, setSearchedTask] = useState("");
  const [updatedTasks, setUpdatedTasks] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
const [doneTasks, setDoneTasks] = useState([]); // store completed task IDs

  const [task, setTask] = useState("");
  const [error, setError] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    setTask(tasks);
    setUpdatedTasks(tasks);
  }, [tasks]);

  const handleSearch = () => {

    const q = (searchedTask || "").trim();

    if (q.length < 1) {
      setUpdatedTasks(tasks); // keep as an array (not a string)
      setError(""); // clear any previous error
      
      return;
    }

    const updated = tasks.filter((tak) =>
      (tak.taskName || "").toLowerCase().startsWith(q.toLowerCase())
    );

    if (updated.length < 1) {
      setError("no task found");
      setUpdatedTasks([]); // keep empty array when nothing found
    } else {
      setError("");
      setUpdatedTasks(updated);
      console.log(updated);
    }
  };

  const handleCatagory = (get) => {
    
   const updated = tasks.filter((tak) =>
  tak.catagory === get
);
if(updated.length > 0) {
  setError("")
setUpdatedTasks(updated)
}else{
  setUpdatedTasks("")
  setError("No task of this category")
}
    

   
  };

const handleDelete = (id) => {
  removeTask(id);
}

const handleCheck = (id) => {
  setOpenMenuId(openMenuId === id ? null : id);
};


const markAsDone = (id) => {
  if (!doneTasks.includes(id)) {
    setDoneTasks([...doneTasks, id]);
  }
  setOpenMenuId(null); // close the menu
};



  return (
    <div className="absolute text-white z-999 top-20">
      <div className="w-screen  flex ">
        <h1>
          <HeroSection text={1} />
        </h1>
        <div className="absolute w-screen h-[30vh] flex justify-center items-end  ">
          {tasks.length === 0 && (
            <div className="flex flex-col justify-center items-center gap-4">
              <div
                className="cursor-pointer text-[100px] z-100 h-[80px] w-[80px] bg-purple-900 flex justify-center items-center rounded-full"
                onClick={() => setTriggerAction(true)}
              >
                +
              </div>
              <h1 className="text-[30px]">TaskList Is Empty!</h1>
            </div>
          )}
          {tasks.length >= 1 && (
            <div className=" md:w-[600px] flex flex-col">
              <div className=" md:w-[600px] flex  z-50">
                <div>
                  <input
                    type="text"
                    value={searchedTask}
                    onChange={(e) => setSearchedTask(e.target.value)}
                    placeholder=" Enter task name to search"
                    className="md:w-[500px] h-[50px] rounded-l-2xl border border-white/40 
             bg-white/20 backdrop-blur-lg px-4 text-white placeholder-white/70
             focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <button
                  onClick={() => handleSearch()}
                  className="w-[100px] h-[50px] cursor-pointer border border-white/40  bg-blue-500 rounded-r-2xl hover:brightness-110"
                >
                  {searchedTask? "Search" : "X"}
                </button>
              </div>
              <div className="relative w-[300px] md:w-[600px] top-5 z-50">
                {/* Scroll container */}
                <div
                  className="
      flex gap-4 overflow-x-auto custom-scrollbar
      py-2 relative
      scroll-smooth
    "
                >
                  {categories.map((cat, i) => (
                    <div
                      onClick={() => handleCatagory(cat.category)}
                      key={i}
                      className={`
          flex items-center justify-center
          min-w-[100px] min-h-[30px]
          rounded-xl text-white font-medium
          px-3 shrink-0 whitespace-nowrap cursor-pointer
          ${type === cat.category ? "border-5 border-white scale-110" : ""}
        `}
                      style={{ backgroundColor: cat.color, color: "black" }}
                    >
                      {cat.emoji}{" "}
                      {cat.category.length > 10
                        ? cat.category.slice(0, 10) + "..."
                        : cat.category}
                    </div>
                  ))}
                </div>

                {/* Left blur overlay */}
                <div
                  className="
      pointer-events-none
      absolute top-0 left-0 h-full w-8
      bg-gradient-to-r from-white/40 to-transparent
    "
                ></div>

                {/* Right blur overlay */}
                <div
                  className="
      pointer-events-none
      absolute top-0 right-0 h-full w-8
      bg-gradient-to-l from-white/40 to-transparent
    "
                ></div>
              </div>
            </div>
          )}
        </div>
        <div className="absolute w-screen screen justify-center z-10 items-center">
          <div className="w-full h-[50vh] relative top-75  flex justify-center items-end">
          
<div className="md:w-[600px] w-[370px] h-full">
  <div className="flex flex-col gap-5 custom-scrollbar h-full overflow-x-hidden overflow-y-auto px-8 py-4">

    {updatedTasks.length >= 1 &&
      [...updatedTasks].reverse().map((item) => {

        const isDone = doneTasks.includes(item.id);

        return (
          <div
            key={item.id}
            className="relative w-full h-[150px] rounded-xl text-white flex-shrink-0 flex-col p-3"
            style={{ backgroundColor: `${item.bgColor}80` }}
          >
            {/* TOP ROW */}
            <div className="flex relative top-3 right-[-10px] justify-between items-center">
              <div className="flex items-center gap-2">
                <LuAlarmClock size={20} />
                {item.taskDate}
              </div>

              {/* DELETE + MENU */}
              <div className="flex gap-3 items-center relative top-5 right-5">
                <MdDelete
                  size={25}
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 cursor-pointer"
                />

                <BsThreeDotsVertical
                  size={25}
                  className="cursor-pointer"
                  onClick={() => handleCheck(item.id)}
                />

                {/* 3-dot Dialog Box */}
                {openMenuId === item.id && (
                  <div className="absolute right-4 top-10 bg-white text-black rounded-lg shadow-xl p-2 w-[140px] z-50">

                    {/* Mark as Done */}
                    <div
                      onClick={() => markAsDone(item.id)}
                      className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                    >
                      ✔ Mark as Done
                    </div>

                    {/* Close / Cancel */}
                    <div
                      onClick={() => setOpenMenuId(null)}
                      className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                    >
                      ✖ Cancel
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* TASK CONTENT */}
            <div className="mt-2 w-[80%] relative top-5 right-[-30px]">
              <div className={`${isDone ? "line-through opacity-60" : ""} font-bold`}>
                {item.taskName.toUpperCase()}
              </div>

              <div>{item.catagory} {item.Emoji}</div>
            </div>

            {/* DESCRIPTION */}
            <div className="relative right-[-10px] top-8 truncate w-[90%]">
              {item.description}
            </div>
          </div>
        );
      })
    }

    {error && <div className="text-red-500">{error.toUpperCase()}</div>}
  </div>
</div>



          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Dashboard;
