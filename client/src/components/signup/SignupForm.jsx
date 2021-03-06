import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Form, Message, Loader } from 'semantic-ui-react'
import validateInput from '../../validations/signup';

class SignupForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			passwordConfirm: '',
			errors: {},
			message: '',
			isLoading: false,
			isValid: false,
			signedUp: false
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	isValid() {
		const { errors, isValid } = validateInput(this.state);

		if (!isValid) {
			this.setState({ errors });
		}

		return isValid;
	}

	onSubmit(e) {
		e.preventDefault();

		if (this.isValid()) {
			this.setState({ errors: {}, isLoading: true });

			this.props.userSignupRequest(this.state)
				.then((res) => {
					console.log(res);
					this.setState({
						isLoading: false,
						message: res.data.message,
						signedUp: true
					})
				},
					(err) => this.setState(
						{
							errors: err.response ?
								err.response.data : {},
							isLoading: false
						}));
		}
	}

	render() {
		const { errors } = this.state;
		return (
			<Form error onSubmit={this.onSubmit}>
				<Message success visible={this.state.signedUp} content={this.state.message} />
				<Message error content={errors.message} />
				<Form.Field>
					<label>First Name</label>
					<input
						type="text"
						name="firstName"
						onChange={this.onChange}
						value={this.state.firstName}
						placeholder="First Name" />
				</Form.Field>
				<Message error content={errors.firstName} />
				<Form.Field>
					<label>Last Name</label>
					<input
						type="text"
						name="lastName"
						onChange={this.onChange}
						value={this.state.lastName}
						placeholder="Last Name" /><br />
				</Form.Field>
				<Message error content={errors.lastName} />
				<Form.Field>
					<label>Email</label>
					<input
						type="text"
						name="email"
						onChange={this.onChange}
						value={this.state.email}
						placeholder="Email" /><br />
				</Form.Field>
				<Message error content={errors.email} />
				<Form.Field>
					<label>Password</label>
					<input
						type="password"
						name="password"
						onChange={this.onChange}
						value={this.state.password}
						placeholder="Password" /><br />
				</Form.Field>
				<Message error content={errors.password} />
				<Form.Field>
					<label>Confirm password</label>
					<input
						type="password"
						name="passwordConfirm"
						onChange={this.onChange}
						value={this.state.passwordConfirm}
						placeholder="Confirm password" /><br />
				</Form.Field>
				<Message error content={errors.passwordConfirm} />
				<Loader active={this.state.isLoading} size='medium'>Loading</Loader>
				<Button disabled={this.state.isLoading} type='submit'>Sign In</Button>
			</Form>
		);
	}
};

SignupForm.propTypes = {
	userSignupRequest: PropTypes.func.isRequired
}

// SignupForm.contextTypes = {
// 	router: PropTypes.object.isRequired
// }

export default SignupForm;