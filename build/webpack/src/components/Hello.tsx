import * as React from "react";

export interface HelloProps { compiler: string; framework: string; }

export const Hello = (props: HelloProps) => <div><h1>Hello 10 from {props.compiler} and {props.framework}!</h1><button>OK</button></div>;
