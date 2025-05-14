import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import ExplainerContainer from "./ExplainerContainer";

jest.mock("~/core/hooks/useConceptExplainer", () => ({
  useConceptExplainer: () => ({
    exampleSet: ["karma", "dharma", "moksha"],
    explainConceptRequest: jest.fn(() => {
      return Promise.resolve({
        article: "This is an explanation of the concept.",
      });
    }),
  }),
}));

describe("ExplainerContainer", () => {
  it("submits a concept and shows the article", async () => {
    render(<ExplainerContainer />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "karma" } });

    const button = screen.getByRole("button", { name: /explain/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText("This is an explanation of the concept.")
      ).toBeInTheDocument();
    });
  });
});
