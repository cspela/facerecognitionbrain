import React, { Fragment } from 'react';
import './facerecognition.css'

const FaceRecognition = (props) => {
	const { imgUrl, img, boxes } = props;  

	const renderBoxes = () => {
		const faces = boxes.map(box => {
			return <div className='bounding-box' style={{top:`${box.top}px`, left:`${box.left}px`, bottom:`${box.bottom}px`, right:`${box.right}px`}}></div>
		}); 

		return <Fragment> {faces} </Fragment>
	}

	return(
		<div className='center ma'>
			<div className='absolute mt2 mb5'> 
				{ renderBoxes() }
				<img id='inputImage' src={imgUrl} alt='img' className='' width='500' height='auto'/>
			</div>
		</div>
	)
}

export default FaceRecognition; 