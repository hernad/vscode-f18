import * as React from 'react';

// export interface IMyButtonProps { children: any };

export default class MyButton extends React.Component {
   public render() {
       return (
           <button>
            {this.props.children}
           </button>
       );
   }

}