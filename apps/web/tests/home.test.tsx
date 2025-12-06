import { render, screen } from "@testing-library/react";
import HomePage from "../src/app/page";

test("renders default sections", async () => {
  const ui = await HomePage();
  render(ui as any);
  expect(screen.getByText(/Your Product Headline/i)).toBeInTheDocument();
});
