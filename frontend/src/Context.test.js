import React from "react";
import { render} from "@testing-library/react";
import { AuthProvider, useAuthContext } from './context';
import { About } from "./pages";



test('renders contents',() => {
    // const menu = {
    //     content: 'this is a test',
    //     important: true
    // }
    const component = render(<AuthProvider />)
    console.log(component)
})