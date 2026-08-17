import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { SiteProvider, useSite } from "./site-provider";

function Controls() {
  const { cart, favorites, user, addToCart, toggleFavorite, signIn } = useSite();
  return <>
    <button onClick={() => addToCart("shore")}>cart</button>
    <button onClick={() => toggleFavorite("shore")}>favorite</button>
    <button onClick={() => signIn("anna@example.com", "Анна")}>sign in</button>
    <output data-testid="state">{`${cart.length}/${favorites.length}/${user?.email ?? "guest"}`}</output>
  </>;
}

describe("SiteProvider", () => {
  beforeEach(() => window.localStorage.clear());

  it("keeps cart, favorites and demo sign-in in the local session", async () => {
    const user = userEvent.setup();
    render(<SiteProvider><Controls /></SiteProvider>);
    await waitFor(() => expect(screen.getByTestId("state").textContent).toBe("0/0/guest"));
    await user.click(screen.getByRole("button", { name: "cart" }));
    await user.click(screen.getByRole("button", { name: "favorite" }));
    await user.click(screen.getByRole("button", { name: "sign in" }));
    expect(screen.getByTestId("state").textContent).toBe("1/1/anna@example.com");
    await waitFor(() => expect(window.localStorage.getItem("kupi-kartinu-demo-v1")).toContain("anna@example.com"));
  });
});
