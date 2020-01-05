import React, { Component } from 'react';

const users = [
	{ 
		name: 'boo',
		email: 'boo@gmail.com',
		password: '123'
	},
	{ 
		name: 'moo',
		email: 'moo@gmail.com',
		password: '123'
	},
]

class Signin extends Component{
	constructor(props){
		super(props);
		this.state = {
			signInEmail : '',
			signInPassword: ''
		}
	}

	onEmailChange = (event) => {
		console.log('Email', event.target.value); 
		this.setState({signInEmail: event.target.value})
	}

	onPasswordChange = (event) => {
		console.log('Password', event.target.value); 
		this.setState({signInPassword: event.target.value})
	}

	onSubmitSignIn = () => {
		this.props.onRouteChange('home'); 
		const { signInEmail, signInPassword } = this.state; 
		users.map(user => {
			let userExists = false; 
			if(signInEmail === user.email && signInPassword === user.password){
				return userExists = true; 
			}else{
				return userExists = false; 
			} 
			console.log(userExists); 
		}); 
	}

	render(){
		console.log('signin', this.state); 
		return(
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
				<main className="pa4 black-80 center measure">
					<div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f3 fw6 ph0 mh0">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
				      </div>
				      <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
				    </fieldset>
				    <div className="">
				      <input onClick={this.onSubmitSignIn}  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
				    </div>
				    <div className="lh-copy mt3">
				      <p onClick={() => this.props.onRouteChange('register')} className="pointer f6 link dim black db ma0">Register</p>
				      <p className="pointer f6 link dim black db ma0">Forgot your password?</p>
				    </div>
					</div>
				</main>
			</article> 
		); 
	}
}

export default Signin;