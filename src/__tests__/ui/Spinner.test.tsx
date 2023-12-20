import React from "react";
import Spinner from "@/ui/Spinner";
import { render } from "@testing-library/react";

describe('Spinner', () => {
  it('renders correctly', () => {
    const { container } = render(<Spinner />);
    expect(container).toMatchSnapshot();
  });
});