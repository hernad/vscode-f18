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

ReactDOM.render(
	<MySection>
        <MyButton>Button 1</MyButton>
        <MyButton>Button 2</MyButton>
        <MyButton>Button 3</MyButton>
        <MyButton>Button 4</MyButton>
    </MySection>,
	document.getElementById('example')
);
