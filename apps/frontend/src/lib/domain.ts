export type SaleMode = "fixed" | "auction";
export type AuctionStatus = "upcoming" | "live" | "past";
export type LotState = "upcoming" | "live" | "sold" | "unsold";
export type DeferredBidState = "active" | "locked" | "cancelled" | "won" | "exhausted";

export interface Artist {
  id: string;
  slug: string;
  name: string;
  years: string;
  bio: string;
  imageSrc: string;
}

export interface Artwork {
  id: string;
  slug: string;
  artistId: string;
  title: string;
  imageSrc: string;
  year: string;
  medium: string;
  dimensions: string;
  saleMode: SaleMode;
  price?: number;
  description: string;
}

export interface Auction {
  id: string;
  slug: string;
  title: string;
  status: AuctionStatus;
  startsAt: string;
  description: string;
  coverSrc: string;
}

export interface AuctionLot {
  id: string;
  auctionId: string;
  artworkId: string;
  sequence: number;
  state: LotState;
  minimumPrice: number;
  bidStep: number;
  currentBid?: number;
}

export interface DeferredBid {
  lotId: string;
  maxAmount: number;
  state: DeferredBidState;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Order {
  id: string;
  artworkId: string;
  amount: number;
  status: "awaiting-payment" | "completed";
  createdAt: string;
}

export interface NewsItem {
  id: string;
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  imageSrc: string;
}
