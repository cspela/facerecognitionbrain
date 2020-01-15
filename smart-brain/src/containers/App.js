import React, { Component, Fragment } from 'react';
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navigation from '../components/Navigation/Navigation';
import Rank from '../components/Rank/Rank';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Signin from '../components/Signin/Signin';
import Register from '../components/Register/Register';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import 'tachyons'; 
import './app.css';

const particleOptions = {
  particles: {
    number:{
      value: 170,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const app = new Clarifai.App({
 apiKey: '01131eb18c31484aaf6f23880c675c1a'
});

const initialState = {
	input: '', 
	imgUrl: '',
	boxes: [],
	route: 'signin',
	isSignedIn: false,
	user: {
		id: '', 
		name: '',
		email: '',
		entries: 0,
		joined: ''
	}
}

class App extends Component{
	constructor(){
		super();
		this.state = initialState; 
	}

	// componentDidMount(){
	// 	//console.log('componentDidMount');
	// 	fetch('http://localhost:3003/users')
	// 		.then(res => res.json())
	// 		.then(data => console.log(data)); 
	// }

	loadUser = (user) => {
		const { id, name, email, entries, joined} = user; 
		this.setState({user: {
			id: id, 
			name: name,
			email: email,
			entries: entries,
			joined: joined
		}})
	}

	onRouteChange = (route) => {
		if(route === 'signout'){
			this.setState(initialState)
		}else if(route === 'home'){
			this.setState({isSignedIn: true})
		}
		this.setState({route: route}); 
	}

	onInputChange = (event) => {
		event.preventDefault();
		this.setState({input: event.target.value}); 
	}

	onPictureSubmit = () => {
		this.setState({boxes: []})
		const input = this.state.input; 
		this.setState({ imgUrl:input }); 

		app.models.predict("a403429f2ddf4b49b307e318f00e528b", input)
			.then(response => {
				if(response){			
					fetch('http://localhost:3003/image', {
						method: 'put',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify({ id: this.state.user.id })
					})
						.then(res => res.json())
						.then(count => {
							this.setState(Object.assign(this.state.user, {entries: count}))
						})
						.catch(console.log); 
				}
				this.displayFaceBox(this.calculateFaceLocation(response))
			})
			.catch(err => console.log('No faces')) 
	}

	calculateFaceLocation = (data) => {
		//console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
		const clarifaiFace = data.outputs[0].data.regions;
		const image = document.getElementById('inputImage');
		const width = Number(image.width);
		const height = Number(image.height); 
		if(clarifaiFace !== null){
		 	let boxes = []; 
			clarifaiFace.map(region => {
				let boundingBox = region.region_info.bounding_box; 
				let topRow = boundingBox.top_row * height; 
				let leftCol = boundingBox.left_col * width;
				let bottomRow = height - (boundingBox.bottom_row * height); 
				let rightCol = width - (boundingBox.right_col * width);  
				let faceBox = {
					top: topRow,
					left: leftCol,
					bottom : bottomRow,
					right: rightCol
				}
				return boxes.push(faceBox);
			});
			return boxes; 
		}
	}

	displayFaceBox = (boxes) => {
		//console.log(boxes);
		this.setState({ boxes: boxes }); 
		//return <div style={{backgroundColor: "red", width:100+"px", height:50+"px", position:"absolute"}}></div>
	}

	render(){		
		//console.log(this.state); 
		const { imgUrl, boxes, route, isSignedIn, user } = this.state; 
		return (
			<Fragment>
            	<Particles params={particleOptions} className='particles'/>
				<Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
				{
					(route === 'home') ? 
						(
							<Fragment>
								<Rank name={user.name} rank={user.entries}/>
								<ImageLinkForm onPictureSubmit={this.onPictureSubmit} onInputChange={this.onInputChange} />
								{ (imgUrl.length !== Number(0)) ? 
									(<FaceRecognition imgUrl={imgUrl} boxes={boxes}/>) : (console.log('No image'))
								}
							</Fragment>
						) : (
							(route === 'register') ? 
							(<Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>) : (<Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>)
						)
				}
			</Fragment>
		)
	}
}

export default App; 