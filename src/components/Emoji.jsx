import React, { useState } from 'react'
import EmojiPicker from "emoji-picker-react";



const Emoji = ({setEmoji}) => {
  const [showPicker, setShowPicker] = useState(false);
const [emoji2, setEmoji2] = useState("😊");

const handleSetEmoji =(e) => {
    
setEmoji2(e.emoji)
setShowPicker(!showPicker)
setEmoji(e.emoji);
}



  return (
     <div className='absolute z-999 text-white top-100'>
        <div className='w-screen h-[100px] flex justify-center items-center'>
             <div className="flex items-center gap-3">
    
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="border h-[80px] w-[80px] text-[50px] rounded-full px-3 py-1 bg-purple-950"
      >
        {emoji2}
      </button>
    </div>

    {showPicker && (
      <div className="mt-2 absolute top-[-300px]">
        <EmojiPicker onEmojiClick={(e) => handleSetEmoji(e)} />
      </div>
    )}
        </div>
          
    </div>
  )
}

export default Emoji