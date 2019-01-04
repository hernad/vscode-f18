import * as React from 'react';
// import { string } from 'prop-types';

class MySection extends React.Component {

    public static First: typeof First;
    public static MyList: typeof MyList;
    public static Third: typeof Third;

    public render() {
        return (
            <section>
                <h2>My section</h2>
                {this.props.children}
            </section>
        )
    }
}

/*
class First extends React.Component {
    public render() {
        return (
          <p>First</p>
        );
    }
}
*/

interface IFirstProps {
    disabled?: boolean,
    text?: string
}
const First = (props2: IFirstProps) => (
    <button disabled={props2.disabled}>{props2.text}</button>
);

First.defaultProps = {
    disabled: false,
    text: "default Pure button"
}

interface IMyListProps {
   items: string[];
}

import { PermissionConsumer } from "./PermissionContext"

class MyList extends React.Component<IMyListProps> {
    public render() {
        // The "items" property is an array.
        const { items } = this.props;
        // Maps each item in the array to a list item.
        return  <PermissionConsumer name="second" >
                    <ul>{items.map(i => <li key={i}>{i}</li>)}</ul>
                </PermissionConsumer>;
    }
}

interface IObj {
    first: number;
    second: number;
    third: number;
    [key: string]: number;
}

interface IMyState {
    first: boolean,
    second: boolean,
    heading: string,
    content: string
}

interface IMyProps {
    pdisabled: boolean,
    ptext: string
}

class Third extends React.Component<IMyProps, IMyState> {

    public static defaultProps = {
        pdisabled: false,
        ptext: 'My Props Button'
    };

    public state : IMyState = {
        first: false,
        second: true,
        heading: "React (busy)",
        content: "loading ..."
    };


    public render() {
        const enabled = true;
        const text = 'A Button';
        const placeholder = 'input value....';
        const size = 50;
        const array = ["jedan", "dva", "tri"];
        const obj: IObj = { first: 1, second: 2, third: 3};

        const {first, second, heading, content} = this.state;
        const {pdisabled, ptext} = this.props;

        return (
          <section>
              <h2>{heading}</h2>
              <ul>
                  {array.map(item => <li key={item}>{item}</li>)}
              </ul>
              <ul>
                  {Object.keys(obj).map(key => <li key={key}>key={key} val={obj[key]}</li>)}
              </ul>
              <button disabled={!enabled}>{text}</button>
              <input placeholder={placeholder} size={size} />
              <p/>
              <button disabled={first}>First</button>
              <button disabled={second}>MyList</button>
              <pre>{content}</pre>
              <button disabled={pdisabled}>{ptext}</button>

              <MyList items={["item1", "item2", "item3", "item4"]}/>

              <First disabled={false} />
          </section>
        );
    }
}

MySection.First = First;
MySection.MyList = MyList;
MySection.Third = Third;

export default MySection;