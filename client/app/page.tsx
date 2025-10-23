'use client'
import { FC, useState } from "react"
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";


interface Props  {
  title?: string;
}


const Page: FC<Props> = (props) => {
  const [open, setOpen]= useState(false);
  const [activeItem, setActiveItem]= useState(0);

  return (
  <div>
    <Heading 
      title="LMS - Learn from the best"
      description="Learn from the best instructors and experts in the industry. Join our LMS platform to access high-quality courses and enhance your skills."
      keywords="LMS, online learning, courses, education, skills, instructors"
    />

    <Header
    open= {open}
    setOpen={setOpen}
    activeItem={activeItem}/>

    <Hero />
  </div>    
  );

}


export default Page;




