import React from 'react';

const Rank = (props) => {
	const { name, rank } = props;
	return(
		<p className='f3 tc'>{name}, you are ranked #{rank}</p>
	)
}

export default Rank; 