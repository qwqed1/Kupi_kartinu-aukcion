import { describe, expect, it } from "vitest";
import { isDeferredBidAmountValid } from "./bid-utils";

describe("isDeferredBidAmountValid", () => {
  it("accepts the minimum price and exact bid increments", () => {
    expect(isDeferredBidAmountValid(300000, 300000, 50000)).toBe(true);
    expect(isDeferredBidAmountValid(450000, 300000, 50000)).toBe(true);
  });

  it("rejects amounts below the minimum or outside the increment", () => {
    expect(isDeferredBidAmountValid(250000, 300000, 50000)).toBe(false);
    expect(isDeferredBidAmountValid(325000, 300000, 50000)).toBe(false);
    expect(isDeferredBidAmountValid(Number.NaN, 300000, 50000)).toBe(false);
  });
});
