import React from 'react';
import logo from './brain.png';
import Tilt from 'react-tilt'; 

const Logo = () => {
	return(	
		<Tilt className='Tilt' options={{ max : 25 }} style={{  }} >
			<img src={logo} alt={'logo'} className='Tilt-inner dib w2 h2 br-100 br2 shadow-2 pa2'/>
		</Tilt>
	)
}

export default Logo; 

