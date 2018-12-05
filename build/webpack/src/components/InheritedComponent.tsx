import * as React from 'react';
import BaseComponent from './BaseComponent';



// Extends "BaseComponent" to inherit the
// initial component state.
export default class InheritedComponent extends BaseComponent {
	// This is our chance to build on the initial state.
	// We change the "placeholder" text and mark it as
	// "enabled".
	public componentDidMount() {
		this.data = this.data.merge({
			placeholder: 'Enter a name...',
			enabled: true
		});
	}



	// public onChange = ({ target: { value } }) => {
    public onChange = ( e: any ) => {    
        this.data = this.data.set('name', e.target.value);
        console.log(this.data);
	};

	public render() {
		const { enabled, name, placeholder } = this.data.toJS();
		return (
			<label htmlFor="my-input">
				Name:
				<input
					type="text"
					id="my-input"
					disabled={!enabled}
					placeholder={placeholder}
					value={name}
					onChange={this.onChange}
				/>
                <p/>
                <label>LABEL: {this.data.get('name')}</label>
			</label>
		);
	}
}
