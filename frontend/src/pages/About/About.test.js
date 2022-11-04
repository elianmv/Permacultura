import React from "react";
import { render} from "@testing-library/react";

import { About } from "./About";



test('renders contents',() => {
    // const menu = {
    //     content: 'this is a test',
    //     important: true
    // }
    const component = render(<About />)
    console.log(component)
})