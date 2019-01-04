import * as React from 'react';
import { PermissionConsumer } from './PermissionContext';
// export interface IMyButtonProps { children: any };

interface IState {
    first: number,
    second: number,
    [key: string]: number
}
export default class MyButton extends React.Component {


    public onClick: any;
    public onClick2: any;

    public state : IState = {
        first: 0,
        second: 0
    }

    constructor(props: any) {
        super(props);
     }

    public arrow1 = ( name: string ) => {
        this.setState( state => ({
            ...state,
            [name]: this.state[name] + 1
        }));
    }

    public onClickHO = (name: string) => {
        this.arrow1(name);
    };

    public onClickWithId(e: React.MouseEvent) {
        console.log(`clicked ${(new Date).getTime()}`, e.type, e.target, e.clientX, e.clientY);
    }
    

    public onChange() {
        console.log('changed');
    }

    public onBlur() {
        console.log('blured');
    }

	public render() {
        const id = "dugme1"
        // const id2 = "dugme2"
        // this.onClick = () => this.onClickWithId(id);
        // this.onClick2 = () => this.onClickWithId(id2);

		return (
			<PermissionConsumer name="first">
				<button id={id} onClick={this.onClickWithId}>{this.props.children}</button>
                <p/>
                <input onChange={this.onChange} onBlur={this.onBlur} size={10} />
			</PermissionConsumer>
		);
	}
}
