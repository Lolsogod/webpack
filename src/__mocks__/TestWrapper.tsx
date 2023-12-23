import { ReactNode } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

export const TestWrapper = ({ children, store }: { children: ReactNode, store?: any }) => {
    if (store) return <Provider store={store}><MemoryRouter>{children}</MemoryRouter></Provider >;
    else return <MemoryRouter>{children}</MemoryRouter>
}