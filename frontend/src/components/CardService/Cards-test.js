import React from "react";
import { screen, render} from "@testing-library/react";

import { CardService } from "./CardService";


// beforeEach(() => render(<CardService />));

    describe("CardService", () => {
        it("must display a title of type a person", () => {
            render(<CardService />)
            expect(screen.queryAllByText(/beto/i).toBeInTheDocument())
        })
    })