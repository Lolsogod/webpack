import Spinner from "@/ui/Spinner";
import { render } from "@testing-library/react";

describe('Spinner', () => {
  test('renders correctly', () => {
    const { container } = render(<Spinner />);
    expect(container).toMatchSnapshot();
  });
});