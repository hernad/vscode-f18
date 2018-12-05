import * as React from 'react';
import { PermissionConsumer } from './PermissionContext';
// export interface IMyButtonProps { children: any };

export default class MyButton extends React.Component {

    public onClick() {
        console.log('clicked');
    }

    public onChange() {
        console.log('changed');
    }

    public onBlur() {
        console.log('blured');
    }

	public render() {
		return (
			<PermissionConsumer name="first">
				<button onClick={this.onClick}>{this.props.children}</button>
                <p/>
                <input onChange={this.onChange} onBlur={this.onBlur} size={10} />
			</PermissionConsumer>
		);
	}
}
