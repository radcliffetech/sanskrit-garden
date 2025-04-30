import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import ExplainerContainer from "../ExplainerContainer";
import { explainConceptRequest } from "~/loader/explain-concept";

jest.mock("~/hooks/concept-explainer", () => ({
  useConceptExplainer: () => ({
    exampleSet: ["karma", "dharma", "moksha"],
  }),
}));

jest.mock("~/loader/explain-concept", () => ({
  explainConceptRequest: jest.fn(),
}));


describe("ExplainerContainer", () => {
  beforeEach(() => {
    (explainConceptRequest as jest.Mock).mockResolvedValue({
      article: "This is an explanation of the concept.",
    });
  });

  it("submits a concept and shows the article", async () => {
    render(<ExplainerContainer />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "karma" } });

    const button = screen.getByRole("button", { name: /explain/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("This is an explanation of the concept.")).toBeInTheDocument();
    });
  });
});