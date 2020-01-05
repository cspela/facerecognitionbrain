import React from 'react';

const Register = () => {
	return(
		<main className="pa4 black-80 center">
		  <form className="measure">
		    <fieldset id="register" className="ba b--transparent ph0 mh0">
		      <legend className="f4 fw6 ph0 mh0">Register</legend>
		      <div className="mt3">
		        <label className="db fw6 lh-copy f6" for="email-address">Email</label>
		        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
		      </div>
		      <div className="mv3">
		        <label className="db fw6 lh-copy f6" for="password">Password</label>
		        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
		      </div>
		      <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
		    </fieldset>
		    <div className="">
		      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
		    </div>
		    <div class="lh-copy mt3">
		      <a href="#0" class="f6 link dim black db">Sign in</a>
		      <a href="#0" class="f6 link dim black db">Forgot your password?</a>
		    </div>
		  </form>
		</main>
	);
}

export default Register;