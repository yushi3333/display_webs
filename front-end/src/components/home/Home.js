import React from 'react';
import Hero from "../hero/Hero";

const Home = ({recommends}) => {
  return (
    <Hero recommends={recommends}/>
  )
}
export default Home;