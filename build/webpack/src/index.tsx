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

const propDugmeNaslov = 'P2 Dugme from Var';
const myThirdElement = <MySection.Third ptext={propDugmeNaslov} />;

interface IMyContainerState {
	items: string[];
}
type TResoveFn = (items: IMyContainerState) => void;

const resolveFn = (resolve: TResoveFn) => {
	setTimeout(() => {
		const posaljiItems: IMyContainerState = { items: [ 'First', 'Second', 'Third', 'pet' ] };
		resolve(posaljiItems);
	}, 2000);
};

function fetchData() {
	return new Promise(resolveFn);
}

import reverse from "./reverse";

class MyContainer extends React.Component<{}, IMyContainerState> {
	public state: IMyContainerState = {
		items: [ 'nula' ]
	};

	public onClick = reverse.bind(this);

	// After the component has been rendered, make the
	// call to fetch the component data, and change the
	// state when the data arrives.
	public componentDidMount() {
		fetchData().then((value) => {
			const fetchedItems = value.items;
			this.setState({ items: [ ...this.state.items, ...fetchedItems ] } as IMyContainerState);
		});
	}

	public render() {
		return <React.Fragment>
			    <MySection.MyList {...this.state} />
				<button onClick={this.onClick}>REVERSE</button>
				</React.Fragment>;
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

/*
import { PermissionProvider } from './components/PermissionContext';

const myCompInstance = ReactDOM.render(
	<div>
		<PermissionProvider>
			<MyContainer />
			<MySection.MyList items={[ 'AAA', 'BBB' ]} />
			<MySection>
				<button>btn 1</button>
				<p />
				<button>btn 2</button>
			</MySection>
			<MyButton>
				<label>vako nako</label>
				<p />
				<label>novi label</label>
				<ul>
					<li>item 1</li>
					<li>item 2</li>
				</ul>
			</MyButton>
		</PermissionProvider>
	</div>,
	document.getElementById('example')
);
*/

/*
import MyFeature from './components/MyFeature';
ReactDOM.render(<MyFeature />, document.getElementById('example'));
*/

/*
import InheritedComponent from './components/InheritedComponent';
ReactDOM.render(<InheritedComponent />, document.getElementById('example'));
*/

// import App from './components/BootApp';
// import 'bootstrap/dist/css/bootstrap.css';
// import './components/BootApp.css';


import ApolloClient from 'apollo-boost';

import Forms from './components/BootForms';
import Lists from './components/BootLists';

const client = new ApolloClient({
	// uri: 'http://localhost:5000/graphql'
	uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
});

import gql from "graphql-tag";

/*
ReactDOM.render( 
	<ul>
	   <li>loading....</li>
	</ul>, document.getElementById('example'));
*/

/*
client.query({
	query: gql`
	{
      allKontos{
        nodes {
          id
          naz
        }
      }
	  allRobas{
        nodes {
          id
          naz
        }
      }
	}
    `
  })
  .then(result => { 
	const nodesK = (result as any).data.allKontos.nodes;
	const nodesR = (result as any).data.allRobas.nodes;  
	console.log(nodesK);  
	const kontaElement = Object.keys(nodesK).map(key => 
	    <li key={key}>id={nodesK[key].id} naz={nodesK[key].naz}
	     <p/>
		 <input value={nodesK[key].naz} size={100} />
		</li>);
	const robaElement = Object.keys(nodesR).map(key => <li key={key}>id={nodesR[key].id} naz={nodesR[key].naz}</li>);
	ReactDOM.render( 
		<ul>
		   {kontaElement}
		   <button>======================================================================</button>
		   {robaElement}
		</ul>, document.getElementById('example'));

   });
//  .then(result => console.log((result as any).data.allKontos.nodes));
*/

import {
	Navbar,
	Nav,
	NavItem,
	MenuItem,
	Grid,
	Row,
	Col
  } from 'react-bootstrap';

/*
ReactDOM.render( 
  <Navbar className="navbar-top" fluid={true}>
     <Forms/>,
	 <Lists/>,
	 <ul>
        {Object.keys(konta).map(key => <li key={key}>key={key} val={(konta as any)[key]}</li>)}
     </ul>
  </Navbar>, document.getElementById('example'));
*/



// const domInstance = ReactDOM.findDOMNode(myCompInstance);

import { ApolloProvider } from "react-apollo";

import { Query } from "react-apollo";
// import gql from "graphql-tag";

const ExchangeRates = () => (
  <Query
    query={gql`
      {
        rates(currency: "EUR") {
          currency
          rate
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) { 
		  return <p>Učitavam...</p> 
	  };
      if (error) { 
		  return (<p>Greška</p>) 
	  };

      return data.rates.map(({ currency, rate }) => (
        <div key={currency}>
          <p>{`${currency}: ${rate}`}</p>
        </div>
      ));
    }}
  </Query>
);

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>First Apollo app 🚀</h2>
	  <ExchangeRates/>
    </div>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById("example"));