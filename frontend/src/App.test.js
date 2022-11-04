import React from "react";
import { render} from "@testing-library/react";

import { App } from "./App";



test('renders contents',() => {
    // const menu = {
    //     content: 'this is a test',
    //     important: true
    // }
    const component = render(<App />)
    console.log(component)
})