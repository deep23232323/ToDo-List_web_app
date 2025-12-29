import React, { useState } from "react";
import { GiCrossedSwords } from "react-icons/gi";
import useTaskStore from "../store/useTaskStore";
import useCatagoryStore from "../store/useCatagoryStore";
import { AiTwotoneDelete } from "react-icons/ai";
import Emoji from "./Emoji";
const AddCustom = () => {
  const [category, setCatagory] = useState("");
  const [emoji, setEmoji] = useState("");

  const addCatagory = useCatagoryStore((state) => state.addCatagory);
  const removeCatagory = useCatagoryStore((state) => state.removeCatagory);

  const colours = [
    "#FFE5E5", // Light Pink
    "#FFF2CC", // Light Yellow
    "#E3F6FF", // Soft Sky Blue
    "#E8FFE8", // Light Mint Green
    "#F3E8FF", // Lavender
    "#FFEDE1", // Peach
  ];

  const handleAdd = () => {
    console.log(category, emoji);
    if (!category) {
      alert("catagory name is required");
    } else {
      addCatagory({
        id: Date.now(),
        category,
        color: colours[Math.floor(Math.random() * colours.length)],
        emoji,
      });
    }
    setCatagory("");
  };

  const handleDelete = (id, color) => {
    console.log(id);
    console.log(color);

    removeCatagory(id);
  };

  const catagories = useCatagoryStore((state) => state.catagories);

  return (
    <div>
      <div className=" relative top-15 w-[90vw] flex items-center justify-center text-white  rounded-xl   shadow-xl">
        <div className=" flex flex-col justify-center items-center gap-4">
          <div className="flex  ">
            <div className="md:w-[400px] w-[300px] "></div>
          </div>
          <div className="custom-scrollbar h-[230px] w-[380px] md:w-[450px] bg-white/60 rounded-2xl shadow-md overflow-y-auto flex items-center flex-col">
            <div className="sticky z-50 w-full top-0 bg-white/90 text-black/90 backdrop-blur-md py-3 text-center text-[22px] font-semibold border-b">
              CATEGORIES
            </div>

            {/* List */}
            <div className="w-[90%]">
              <div className="flex flex-col gap-3 relative top-3 px-3">
                {catagories.map((cat, index) => (
                  <div className="w-full " key={cat.id}>
                    <div
                      key={cat.id}
                      style={{ backgroundColor: cat.color }}
                      className="flex h-[30px] rounded-xl shadow-sm px-3 py-2 transition-all hover:brightness-110"
                    >
                      {/* Number */}
                      <div className="w-[30px] text-lg text-gray-700">
                        {index + 1}.
                      </div>

                      {/* Category + Emoji */}
                      <div className="flex-1 flex justify-baseline text-[18px] font-medium">
                        <span className="text-gray-800">{cat.category}</span>
                        <span>{cat.emoji}</span>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(cat.id, cat.color)}
                        className="text-red-600 hover:text-red-700 transition"
                      >
                        <AiTwotoneDelete size={22} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <label className="relative top-3  font-semibold">
            ADD NEW CATEGORY
          </label>
          <input
            required
            type="text"
            value={category}
            onChange={(e) => setCatagory(e.target.value)}
            className="md:w-full relative md:top-0 top-2 h-[40px] text-[20px] text-white  border rounded-md mb-4 focus:outline-none"
            placeholder=" Enter task name"
          />

          {/* Task Description */}

          {/* Category */}
          <label className="relative top-3 font-semibold">Emoji</label>
          <Emoji setEmoji={setEmoji} />
          {/* Buttons */}
          <div className="flex justify-around h-[40px]  relative top-25">
            <button
              onClick={() => handleAdd()}
              className=" bg-blue-500 w-[100px] cursor-pointer text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustom;
