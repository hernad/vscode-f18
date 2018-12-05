import { Component } from 'react';
// Uses the componentDidCatch() method to set the
// error state of this component. When rendering,
// if there's an error it gets logged and nothing
// is rendered.


interface IState {
    error: any;
}
export default class ErrorBoundary extends Component<{},IState> {
    
    public state : IState = { 
        error: null 
    };
    
	public componentDidCatch(error: any) {
		this.setState({ error });
	}
    
    public render() {
		if (this.state.error === null) {
			return this.props.children;
		} else {
			console.error(this.state.error);
			return null;
		}
	}
}
