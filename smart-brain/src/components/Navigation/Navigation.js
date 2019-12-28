import React from 'react';
import Logo from '../Logo/Logo'; 

const Navigation = () => {
	return(
		<nav className='db dt-l w-100 border-box pa3 pt4 ph5-l'>
		  	<a className='db dtc-l v-mid mid-gray dim w-100 w-10-l tc tl-l mb2 mb0-l' href='#' title='Home'>
		  		<Logo />
			</a>
		  	<div className='db dtc-l v-mid w-100 w-90-l tc tr-l'>
		    	<a className='link dim dark-gray f6 f5-l dib mr3 mr4-l' href='#' title='Signin'>Sign in</a>
		    	<a className='link dim dark-gray f6 f5-l dib mr3 mr4-l' href='#' title='Register'>Register</a>
		  	</div>
		</nav>
	)
}

export default Navigation; 