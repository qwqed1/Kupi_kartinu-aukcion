export function isDeferredBidAmountValid(amount: number, minimumPrice: number, bidStep: number) {
  return Number.isFinite(amount) && amount >= minimumPrice && (amount - minimumPrice) % bidStep === 0;
}
