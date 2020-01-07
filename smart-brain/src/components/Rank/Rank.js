import React from 'react';

const Rank = (props) => {
	const { name, rank } = props;
	return(
		<p className='f3 tc'>{name}, your current entry count is: #{rank}</p>
	)
}

export default Rank; 