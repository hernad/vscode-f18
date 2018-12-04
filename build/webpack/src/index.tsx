import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Hello } from './components/Hello';
import MyButton from './components/MyButton';
import MySection from './components/MySection';


class MyCompoment extends React.Component {
	public render() {
		return (
			<section>
				<h1>my component</h1>
				<p>content in my comp</p>
				<footer>
					<small>&copy; hernad 2018</small>
				</footer>
                <button>BTN</button>
			</section>
		);
	}
}

/*    
const numbers = [1, 2, 3];
for (const num of numbers) {
    console.log(num);
}
*/

// const mySection : React.ReactElement<any> = <MySection.Third />;


/*

var helloWorld = <div>Hello World!</div>;

// And this is what the JSX syntax compiles into in JavaScript:
var helloWorld = React.createElement(
  "div",
  null,
  "Hello World!"
);

*/

// And this is what the JSX syntax compiles into in JavaScript:
/*
const myThirdElement = React.createElement(
	"MySection.Third",
	null
  );
*/

const propDugmeNaslov = "P2 Dugme from Var"; 
const myThirdElement = <MySection.Third ptext={propDugmeNaslov} />

interface  IMyContainerState {
	items: string[];
}
type TResoveFn = (items: IMyContainerState) => void;

const resolveFn = (resolve: TResoveFn) => {
	setTimeout(() => {
	   const posaljiItems: IMyContainerState = {items: ['First', 'Second', 'Third', 'pet']};
	   resolve(posaljiItems);
	}, 2000);
}


function fetchData() {
	return new Promise( resolveFn );
}



class MyContainer extends React.Component<{}, IMyContainerState> {

	public state: IMyContainerState = {
		items: [ "nula" ]
	};

	// After the component has been rendered, make the
	// call to fetch the component data, and change the
	// state when the data arrives.
	public componentDidMount() {
		fetchData().then( value => {
			const fetchedItems = value.items;
			this.setState( {items: [...this.state.items, ...fetchedItems]} as IMyContainerState )
		});
	}

	public render() {
		return <MySection.MyList {...this.state} />;
	}
}

/*
const myCompInstance = ReactDOM.render(
    myThirdElement,
	document.getElementById('example')
);

setTimeout(() => {
	(myCompInstance as React.Component).setState({
		heading: "React OK",
		content: "Done"
	});
}, 1000);
*/

const myCompInstance = ReactDOM.render(
    <MyContainer/>,
	document.getElementById('example')
);

// const domInstance = ReactDOM.findDOMNode(myCompInstance);
