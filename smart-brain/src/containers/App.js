import React, { Component, Fragment } from 'react';
import Navigation from '../components/Navigation/Navigation';
import Rank from '../components/Rank/Rank';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Signin from '../components/Signin/Signin';
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
 apiKey: ''
});

class App extends Component{
	constructor(){
		super();
		this.state = {
			input : '', 
			imgUrl: '',
			boxes: []
		}
	}

	componentDidMount(){
		//console.log('componentDidMount');
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value}); 
	}

	onButtonSubmit = () => {
		this.setState({boxes: []})

		const input = this.state.input; 
		this.setState({ imgUrl:input }); 

		app.models.predict("a403429f2ddf4b49b307e318f00e528b", input)
			.then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
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
		}else{
			return "There is no faces";
		}
	}

	displayFaceBox = (boxes) => {
		console.log(boxes);
		this.setState({ boxes: boxes }); 
		//return <div style={{backgroundColor: "red", width:100+"px", height:50+"px", position:"absolute"}}></div>
	}

	render(){		
		console.log(this.state); 
		return (
			<Fragment>
            	<Particles params={particleOptions} className='particles'/>
				<Navigation />
				<Rank name={'Špela'} rank={6}/>
				<ImageLinkForm onButtonSubmit={this.onButtonSubmit} onInputChange={this.onInputChange} />
				{ (this.state.imgUrl.length !== Number(0)) ? 
					(<FaceRecognition imgUrl={this.state.imgUrl} boxes={this.state.boxes}/>) : (console.log('No image'))
				}
			</Fragment>
		)
	}
}

export default App; 