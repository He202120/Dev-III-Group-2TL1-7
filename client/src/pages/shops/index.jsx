import React, { useState } from "react";
import Magasin from "../../components/shopComd/order"; 
import'./index.css'

const Shop = () => { 
    const [count, setCount] = useState(0);
    
    return (
        <>
            <Magasin/> 
        </>        
    );
};

export default Shop;