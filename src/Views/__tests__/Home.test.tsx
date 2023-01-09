import { expect, test, describe } from "vitest";
import { render } from "@testing-library/react";
import Home from "../Home";

describe("Home", () => {
  test("should render", () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });
});
