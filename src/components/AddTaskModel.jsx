import React, { useState } from "react";
import { GiCrossedSwords } from "react-icons/gi";
import useTaskStore from "../store/useTaskStore";
import { useActionStore } from "../store/useActionStore";
import useCatagoryStore from "../store/useCatagoryStore";

const AddTaskModal = ({ onClose, setOpenModal }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [taskDate, setTaskDate] = useState(Date.now())
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [catagory, setCatagory] = useState(null);
  const [Emoji, setEmoji] = useState("");
  const addTask = useTaskStore((state) => state.addTask);
  const colour = [
    "#D34E4E",
    "#B6771D",
    "#628141",
    "#8CE4FF",
    "#62109F",
    "#427A76",
  ];

  const tasks = useTaskStore((state) => state.tasks);
  const catagories = useCatagoryStore((state) => state.catagories);

  const handleAdd = () => {
    if (!taskName || !description || !catagory || !selectedColor) {
      alert("please fill all details");
    } else {
      addTask({
        id: Date.now(),
        taskName,
        description,
        catagory,
        bgColor: selectedColor,
        Emoji,
        taskDate
      });
      setOpenModal(false);
    }
  };
  const handleSelect = (e) => {
  const selected = JSON.parse(e.target.value);

  // Now you get everything
 
  

  // Store them in state if needed
  setCatagory(selected.category);
  setEmoji(selected.emoji);
  
};


  return (
    <div className="w-screen h-screen absolute top-0 inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="md:w-[600px] md:h-[600px] h-[550px] bg-white/10 flex items-center justify-center text-white p-6 rounded-xl w-[90%] md:w-[400px] shadow-xl">
        <div className="w-[80%] flex flex-col gap-4">
          <div className="flex  ">
            <div className="md:w-[600px] w-full flex justify-center relative top-5 md:top-0">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Add New Task
              </h2>
            </div>
            <div className="relative md:flex hidden left-10 ">
              <GiCrossedSwords
                size={30}
                className="cursor-pointer "
                onClick={() => setOpenModal(false)}
              />
            </div>
          </div>
          {/* Task Name */}
          <label className="relative top-3  font-semibold">Task Name</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full h-[35px]  text-white px-2 border rounded-md mb-4 focus:outline-none"
            placeholder=" Enter task name"
          />

          {/* Task Description */}
          <label className="relative top-3 font-semibold">
            Task Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-[60px] border rounded-md mb-4 focus:outline-none"
            placeholder=" Enter description"
          ></textarea>

        
          <label className="relative md:left-[75px]  top-3 font-semibold">Category</label>
         <select
     onChange={handleSelect}
  className="md:w-[300px] w-[250px] relative md:left-[75px] h-[40px] p-2 border rounded-md mb-4 focus:outline-none"
>
  <option className="text-black" value="">Select Category</option>

  {catagories.map((category, index) => (
    <option
    style={{backgroundColor:category.color}}
    className="text-black"
      key={index}
      value={JSON.stringify({
        category: category.category,
        emoji: category.emoji,
        color: category.color
      })}
    >
      {category.category} {category.emoji}
    </option>
  ))}
</select>
<input
            type="date"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
            className="w-full h-[35px]  text-white px-2 border rounded-md mb-4 focus:outline-none"
            placeholder=" Enter task name"
          />



          {/* Background Color */}
          <label className="relative top-3 font-semibold">
            Background Color
          </label>
          <div className="flex gap-4">
            {colour.map((color, index) => (
              <div
                key={index}
                onClick={() => setSelectedColor(color)}
                className={`w-[70px] h-[30px] rounded-2xl cursor-pointer transition-all duration-300
  hover:scale-110
  ${selectedColor === color ? "border-2 border-white scale-110" : ""}`}
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex  justify-around relative top-3">
            <button
              onClick={onClose}
              className=" bg-gray-300 h-[50px] w-[100px] rounded-2xl text-black/90 font-bold cursor-pointer hover:brightness-110 transition-all duration-200"
            >
              Cancel
            </button>

            <button
              onClick={() => handleAdd()}
              className="px-4 py-2 bg-blue-500 h-[50px] w-[100px] rounded-2xl  font-bold cursor-pointer hover:brightness-110 transition-all duration-200 text-white "
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
