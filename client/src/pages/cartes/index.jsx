import React, {useState } from "react";
import Card from "../../components/carte/creerCarte";
import './index.css'

const home = () => {
    const [count, setCount] = useState(0)
    
    return (
        <>
            <Card /> 
      </>        
    );
};

export default home