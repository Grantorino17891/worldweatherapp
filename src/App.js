import React, { Component } from 'react';
import Weather from './Components/Weather/Weather';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const apiKey = '8ddceeacaf8b95fe943c88fc8389dee0';

const Title = () => {
	return (
		<div>
			<div className="title-container">
				<div className="title">
					<h1>World</h1>
					<h1>Weather</h1>
					<h1>App</h1>
				</div>
			</div>
			<div className="subtitle-container">
				<h3 className="subtitle">Your Right Now Weather Forecast</h3>
			</div>
		</div>
	);
};

const Footer = () => {
	return (
		<div className="footerContainer">
			<div className="footerText">
				<p>Built with React</p>
			</div>
			<div className="reactLogo" />
		</div>
	);
};

const Form = ({ onWeather }) => {
	return (
		<form className="form-start" onSubmit={(e) => onWeather(e)}>
			<input type="text" name="city" placeholder="City..." />
			<input type="text" name="country" placeholder="Country..." />
			<button className="form-button">get Weather</button>
		</form>
	);
};

class App extends Component {
	state = {
		temperature : undefined,
		city        : undefined,
		country     : undefined,
		humidity    : undefined,
		description : undefined,
		error       : undefined
	};
	getWeather = async (e) => {
		e.preventDefault();
		const city = e.currentTarget.elements.city.value;
		const country = e.currentTarget.elements.country.value;
		if (city && country) {
			try {
				const apiCall = await fetch(
					`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=imperial`
				);
				const { main, sys, name, weather } = await apiCall.json();
				this.setState({
					temperature : main.temp,
					city        : name,
					country     : sys.country,
					humidity    : main.humidity,
					description : weather[0].description,
					error       : ''
				});
			} catch (ex) {
				console.log(ex.message);
			}
		} else {
			this.setState({
				temperature : undefined,
				city        : undefined,
				country     : undefined,
				humidity    : undefined,
				description : undefined,
				error       : 'please enter a valid values.'
			});
		}
	};
	render() {
		return (
			<div>
				<Title />
				<div>
					<div className="container" style={{ width: '100%' }}>
						<div className="row">
							<div className="col-md-6 col-xs-12 form-container">
								<Form onWeather={this.getWeather} />
							</div>
							<div className="col-md-6 col-xs-12 form-container2">
								<Weather
									temperature={this.state.temperature}
									city={this.state.city}
									country={this.state.country}
									humidity={this.state.humidity}
									description={this.state.description}
									error={this.state.error}
								/>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default App;
