import React, { Component } from 'react';

class Register extends Component{
	constructor(props){
		super(props);
		this.state = {
			userEmail: '',
			userPassword: '',
			userName: '',
			message: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({userEmail: event.target.value, message: ''})
	}

	onPasswordChange = (event) => {
		this.setState({userPassword: event.target.value, message: ''})
	}

	onNameChange = (event) => {
		this.setState({userName: event.target.value, message: ''})
	}

	onSubmitRegister = () => {
		const { userEmail, userPassword, userName } = this.state; 
		if(userEmail && userPassword && userName){
			fetch('http://localhost:3003/register', {
				method: 'post',
				headers: { 'Content-Type' : 'application/json' },
				body: JSON.stringify({
					name: userName,
					email: userEmail,
					password: userPassword,
				})
			}).then(res => res.json())
			.then(user => {
				if(user.id){
					this.props.loadUser(user); 
					this.props.onRouteChange('home')
				}else{
					this.setState({message: 'Unable to join our awesome page...'})
				}
			})
		}else{
			this.setState({message: 'Imput fields can not be empty'})
		}
	}

	render(){
		console.log(this.state)
		const { onRouteChange } = this.props;
		return(
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
				<main className="pa4 black-80 center">
				  <div className="measure">
				    <fieldset id="register" className="ba b--transparent ph0 mh0">
				      <legend className="f3 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
				        <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
				      </div>
				      <p className='f6'>{this.state.message}</p>
				      <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
				    </fieldset>
				    <div className="">
				      <input onClick={this.onSubmitRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
				    </div>
				    <div className="lh-copy mt3">
				      <p onClick={() => onRouteChange('signin')} className="pointer f6 link dim black db ma0">Sign in</p>
				      <p className="pointer f6 link dim black db ma0">Forgot your password?</p>
				    </div>
				  </div>
				</main>
			</article>
		);
	}
}

// const Register = ({ onRouteChange }) => {
	// return(
	// 	<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
	// 		<main className="pa4 black-80 center">
	// 		  <div className="measure">
	// 		    <fieldset id="register" className="ba b--transparent ph0 mh0">
	// 		      <legend className="f3 fw6 ph0 mh0">Register</legend>
	// 		      <div className="mt3">
	// 		        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
	// 		        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
	// 		      </div>
	// 		      <div className="mt3">
	// 		        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
	// 		        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
	// 		      </div>
	// 		      <div className="mv3">
	// 		        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
	// 		        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
	// 		      </div>
	// 		      <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
	// 		    </fieldset>
	// 		    <div className="">
	// 		      <input onClick={() => onRouteChange('home')} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
	// 		    </div>
	// 		    <div className="lh-copy mt3">
	// 		      <p onClick={() => onRouteChange('signin')} className="pointer f6 link dim black db ma0">Sign in</p>
	// 		      <p className="pointer f6 link dim black db ma0">Forgot your password?</p>
	// 		    </div>
	// 		  </div>
	// 		</main>
	// 	</article>
	// );
// }

export default Register;