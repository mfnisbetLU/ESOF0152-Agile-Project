import React from "react";
import logo from './logorcp.png'

function Header(){

    return(
        
        <section className="header_center" >
           
            <img src={logo} className="logo" alt="" height="" width="" style={{
            resizeMode: 'center',
            height: 300,
            width: 300,
          }}/>
        
        </section>
       
    )
}

export default Header;