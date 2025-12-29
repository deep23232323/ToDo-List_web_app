import { Link, useNavigate } from "react-router-dom";
import { RiCalendarTodoFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import GlareHover from "../components/GlareHover";
import { useActionStore } from "../store/useActionStore";
import { useEffect } from "react";

export default function Navbar({setOpenModal}) {

   const triggerAction = useActionStore((state) => state.triggerAction);
  const setTriggerAction = useActionStore((state) => state.setTriggerAction);


  useEffect(() => {
    if (triggerAction) {
      console.log("Action from Dashboard triggered!");

     setOpenModal(true);
    }
  }, [triggerAction]);


  const navigate = useNavigate();
  return (
   <div className="flex h-15 w-screen justify-around items-center bg-white">
    <RiCalendarTodoFill className="cursor-pointer" size={30} onClick={()=>navigate("/")}/>
     <nav className=" hidden md:flex gap-[30px]" >
      <Link style={{ textDecoration: "none" }} to="/">Home</Link>
      <Link style={{ textDecoration: "none" }} to="/customize">Customize</Link>
      <Link style={{ textDecoration: "none" }} to="/exports">Exports</Link>
      <Link style={{ textDecoration: "none" }} to="/profile">Profile</Link>
    </nav>
    <button className="flex justify-center items-center gap-2" onClick={()=>setOpenModal(true)}>
        <div style={{ height: '40px', position: 'relative', top:"-3px" }}>
  <GlareHover
    glareColor="#ffffff"
    glareOpacity={0.3}
    glareAngle={-30}
    glareSize={300}
    transitionDuration={800}
    playOnce={false}
  >
    <h2 className="flex gap-2 justify-center items-center" style={{ fontSize: '1rem', fontWeight: '900', color: '#fff', margin: 0 }}>
      Add task <span><IoMdAdd /></span>
    </h2>
  </GlareHover>
</div>
    </button>
   </div>
  );
}
