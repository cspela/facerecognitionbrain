import React from 'react';
import Logo from '../Logo/Logo'; 

const Navigation = ( { onRouteChange, isSignedIn} ) => {
	console.log('hohoho', isSignedIn)
	if(isSignedIn){
		return(
			<nav className='db dt-l w-100 border-box pa3 pt4 ph5-l'>
			  	<div className='db dtc-l v-mid mid-gray dim w-100 w-10-l tc tl-l mb2 mb0-l'title='Home'>
			  		<Logo />
				</div>
			  	<div className='db dtc-l v-mid w-100 w-90-l tc tr-l'>
			  		<p onClick={() => onRouteChange('signout')} className='pointer link dim dark-gray f6 f5-l dib mr3 mr4-l' title='Signout'>Sign out</p>
			  	</div>
			</nav>
		)
	}else{
		return(
			<nav className='db dt-l w-100 border-box pa3 pt4 ph5-l'>
			  	<div className='db dtc-l v-mid mid-gray dim w-100 w-10-l tc tl-l mb2 mb0-l' title='Home'>
			  		<Logo />
				</div>
			  	<div className='db dtc-l v-mid w-100 w-90-l tc tr-l'>
			    	<p onClick={() => onRouteChange('signin')} className='pointer link dim dark-gray f6 f5-l dib mr3 mr4-l' title='Signin'>Sign in</p>
			    	<p onClick={() => onRouteChange('register')} className='pointer link dim dark-gray f6 f5-l dib mr3 mr4-l' title='Register'>Register</p>
			  	</div>
			</nav>
		)		
	}
}

export default Navigation; 