import * as React from 'react';

class MySection extends React.Component {

    public static First: any;
    public static Second: any;

    public render() {
        return (
            <section>
                <h2>My section</h2>
                {this.props.children}
            </section>
        )
    }
}


class First extends React.Component {
    public render() {
        return (
          <p>First</p>
        );
    }
}

class Second extends React.Component {
    public render() {
        return (
          <p>Second</p>
        );
    }
}

MySection.First = First;
MySection.Second = Second;

export default MySection;