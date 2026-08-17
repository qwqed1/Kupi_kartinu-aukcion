import type { Artist, Artwork, Auction, AuctionLot, NewsItem, Order } from "@/lib/domain";

export const artists: Artist[] = [
  { id: "yakovlev", slug: "vladimir-yakovlev", name: "Яковлев Владимир Игоревич", years: "1934–1998", bio: "Один из ключевых художников неофициального искусства. Его работы строятся на редкой ясности жеста и цвета.", imageSrc: "/figma-assets/current-lot.jpg" },
  { id: "gubik", slug: "ivan-gubik", name: "Губик Иван Никол", years: "1978–", bio: "Современный художник, работающий с пейзажем, памятью и наблюдением за повседневной природой.", imageSrc: "/figma-assets/upcoming-lot.jpg" },
  { id: "sokolov", slug: "nikita-sokolov", name: "Соколов Никита Павлович", years: "1962–", bio: "Живописец и график. В центре его практики — свет, воздух и работа с материалом.", imageSrc: "/figma-assets/current-lot.jpg" },
];

export const artworks: Artwork[] = [
  { id: "flower", slug: "tsvetok-na-stole", artistId: "yakovlev", title: "Цветок на столе", imageSrc: "/figma-assets/current-lot.jpg", year: "1894", medium: "Бумага, тушь, кисть", dimensions: "52×64", saleMode: "auction", description: "Работа из частного собрания, представленная в каталоге вечернего аукциона." },
  { id: "sunset", slug: "zakatochnoe-nebo", artistId: "gubik", title: "Закатное небо какое оно красивое", imageSrc: "/figma-assets/upcoming-lot.jpg", year: "2023", medium: "Холст, масло", dimensions: "60×80", saleMode: "auction", description: "Пейзаж с насыщенной, почти театральной работой света." },
  { id: "shore", slug: "bereg-i-more", artistId: "sokolov", title: "Берег и море", imageSrc: "/figma-assets/current-lot.jpg", year: "2011", medium: "Холст, масло", dimensions: "70×90", saleMode: "fixed", price: 185000, description: "Спокойный морской пейзаж, построенный на плотных фактурах." },
  { id: "field", slug: "pole-posle-dozhdya", artistId: "gubik", title: "Поле после дождя", imageSrc: "/figma-assets/upcoming-lot.jpg", year: "2022", medium: "Холст, масло", dimensions: "50×70", saleMode: "fixed", price: 98000, description: "Работа о переменчивой погоде и открытом горизонте." },
  { id: "blue", slug: "sinij-sad", artistId: "yakovlev", title: "Синий сад", imageSrc: "/figma-assets/current-lot.jpg", year: "1979", medium: "Бумага, смешанная техника", dimensions: "42×58", saleMode: "fixed", price: 240000, description: "Лаконичная графическая композиция из частного собрания." },
  { id: "clouds", slug: "oblaka-v-iyule", artistId: "sokolov", title: "Облака в июле", imageSrc: "/figma-assets/upcoming-lot.jpg", year: "2016", medium: "Холст, масло", dimensions: "80×100", saleMode: "auction", description: "Большой летний пейзаж с выразительным небом." },
];

export const auctions: Auction[] = [
  { id: "summer-2026", slug: "letniy-vecherniy-auktsion", title: "Летний вечерний аукцион", status: "live", startsAt: "Сегодня, 19:00", description: "Живопись, графика и скульптура из частных собраний.", coverSrc: "/figma-assets/current-lot.jpg" },
  { id: "september-2026", slug: "russkoe-iskusstvo", title: "Русское искусство XX века", status: "upcoming", startsAt: "12 сентября, 19:00", description: "Отобранные работы художников второй половины XX века.", coverSrc: "/figma-assets/upcoming-lot.jpg" },
  { id: "spring-2026", slug: "vesennyaya-kollektsiya", title: "Весенняя коллекция", status: "past", startsAt: "15 мая, 19:00", description: "Результаты прошедшего сезона и проданные лоты.", coverSrc: "/figma-assets/upcoming-lot.jpg" },
];

export const lots: AuctionLot[] = [
  { id: "lot-1", auctionId: "summer-2026", artworkId: "flower", sequence: 18, state: "live", minimumPrice: 300000, bidStep: 50000, currentBid: 250000 },
  { id: "lot-2", auctionId: "summer-2026", artworkId: "sunset", sequence: 19, state: "upcoming", minimumPrice: 300000, bidStep: 50000 },
  { id: "lot-3", auctionId: "summer-2026", artworkId: "clouds", sequence: 20, state: "upcoming", minimumPrice: 450000, bidStep: 50000 },
  { id: "lot-4", auctionId: "september-2026", artworkId: "sunset", sequence: 1, state: "upcoming", minimumPrice: 200000, bidStep: 25000 },
  { id: "lot-5", auctionId: "spring-2026", artworkId: "blue", sequence: 6, state: "sold", minimumPrice: 200000, bidStep: 25000, currentBid: 450000 },
  { id: "lot-6", auctionId: "spring-2026", artworkId: "shore", sequence: 7, state: "unsold", minimumPrice: 180000, bidStep: 20000 },
];

export const news: NewsItem[] = [
  { id: "n1", slug: "kak-ustroen-auktsion", date: "18 августа 2026", title: "Как устроен аукцион Kupi Kartinu", excerpt: "Рассказываем, как смотреть лоты, участвовать в торгах и оплачивать покупки.", imageSrc: "/figma-assets/auction-stream.jpg" },
  { id: "n2", slug: "novye-raboty-v-kataloge", date: "10 августа 2026", title: "Новые работы в каталоге", excerpt: "В подборке — живопись и графика из новых поступлений.", imageSrc: "/figma-assets/upcoming-lot.jpg" },
  { id: "n3", slug: "intervyu-s-khudozhnikom", date: "2 августа 2026", title: "Разговор с художником", excerpt: "О живописи, материале и внимании к повседневному.", imageSrc: "/figma-assets/current-lot.jpg" },
];

export const demoOrders: Order[] = [
  { id: "order-194", artworkId: "blue", amount: 240000, status: "awaiting-payment", createdAt: "16 августа 2026" },
];

export const rub = new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 });

export function byId<T extends { id: string }>(items: T[], id: string) { return items.find((item) => item.id === id); }
export function artworkForLot(lot: AuctionLot) { return byId(artworks, lot.artworkId); }
export function artistForArtwork(artwork: Artwork) { return byId(artists, artwork.artistId); }
export function lotsForAuction(auctionId: string) { return lots.filter((lot) => lot.auctionId === auctionId).sort((a, b) => a.sequence - b.sequence); }
