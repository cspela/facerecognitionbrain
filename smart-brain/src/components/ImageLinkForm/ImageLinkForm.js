import React from 'react';

const ImageLinkForm = (props) => {
	const { onButtonSubmit, onInputChange } = props; 
	return(
		<form className='tc pa4 black-90  '>
			<p>{'This magic brain will detect faces in your pictures. Give it a try.'}</p>
		  	<div className='measure dib w-80'>
		    	<input onChange={onInputChange} id='name' className='input-reset ba b--black-20 pa2 mb2 db w-70 dib' type='text' aria-describedby='name-desc'/>
		    	<button onClick={onButtonSubmit} className='link dim ph3 pv2 mb2 dib white bg-hot-pink w-30 grow'>Detect</button>	
			</div>		
		</form>
	)
}

export default ImageLinkForm; 