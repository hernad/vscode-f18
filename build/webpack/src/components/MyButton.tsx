import * as React from 'react';
import { PermissionConsumer } from './PermissionContext';
// export interface IMyButtonProps { children: any };

export default class MyButton extends React.Component {


    public onClick: any;
    public onClick2: any;

    constructor(props: any) {
       super(props);
    }

    public onClickWithId(id: any) {
        console.log(`clicked ${(new Date).getTime()}`, id);
    }

    public onChange() {
        console.log('changed');
    }

    public onBlur() {
        console.log('blured');
    }

	public render() {
        const id = "dugme1"
        const id2 = "dugme2"
        this.onClick = () => this.onClickWithId(id);
        this.onClick2 = () => this.onClickWithId(id2);
        
		return (
			<PermissionConsumer name="first">
				<button id={id} onClick={this.onClick}>{this.props.children}</button>
                <button id={id2} onClick={this.onClick2}>{this.props.children}</button>
                <p/>
                <input onChange={this.onChange} onBlur={this.onBlur} size={10} />
			</PermissionConsumer>
		);
	}
}
