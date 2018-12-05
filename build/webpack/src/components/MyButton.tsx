import * as React from 'react';
import { PermissionConsumer } from './PermissionContext';
// export interface IMyButtonProps { children: any };

export default class MyButton extends React.Component {
	public render() {
		return (
			<PermissionConsumer name="first">
				<button>{this.props.children}</button>
			</PermissionConsumer>
		);
	}
}
