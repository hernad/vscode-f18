import * as React from 'react';

const {Provider, Consumer} = React.createContext('permissions');

interface IPermissionState {
    first: boolean,
    second: boolean,
    third: boolean
}

export class PermissionProvider extends React.Component<{}, IPermissionState> {
    public state : IPermissionState = {
        first: true,
        second: true,
        third: true
    }

    public render() {
        return (
            // @ts-ignore
            <Provider value={this.state}>{this.props.children}</Provider>
        )
    }
}

/*

interface IFirstProps {
    disabled?: boolean,
    text?: string
}
const First = (props2: IFirstProps) => (
    <button disabled={props2.disabled}>{props2.text}</button>
);
*/

interface IPermissionConsumerParams {
    name: any
    children: any
}


const PermissionConsumer = (params: IPermissionConsumerParams) => (
    <Consumer>
        { permissions => 
            permissions[params.name] ?
            <div>{params.children}<p/><button>XXX</button></div>
            :
            <div><button>YYYYY</button></div>
        }
    </Consumer>

);


export { PermissionConsumer };