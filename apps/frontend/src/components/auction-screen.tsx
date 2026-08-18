"use client";

import Image from "next/image";
import { FormEvent, type ReactNode, useEffect, useState } from "react";
import styles from "./auction-screen.module.css";

const navigation = ["Каталог", "Художники", "Аукционы", "Контакты", "Услуги", "Новости"];
type IconName = "search" | "bag" | "heart" | "user" | "volume" | "expand" | "eye" | "arrow";

function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true };
  switch (name) {
    case "search": return <svg {...common}><circle cx="10.7" cy="10.7" r="6.7" stroke="currentColor" strokeWidth="1.5" /><path d="m16 16 4.4 4.4" stroke="currentColor" strokeWidth="1.5" /></svg>;
    case "bag": return <svg {...common}><path d="M4 8h16l-1.3 11H5.3L4 8Z" stroke="currentColor" strokeWidth="1.5" /><path d="M8.5 9V6.7a3.5 3.5 0 0 1 7 0V9" stroke="currentColor" strokeWidth="1.5" /></svg>;
    case "heart": return <svg {...common}><path d="M20.7 9.2c0 5.2-8.7 10-8.7 10s-8.7-4.8-8.7-10a4.6 4.6 0 0 1 8.7-2.1A4.6 4.6 0 0 1 20.7 9.2Z" stroke="currentColor" strokeWidth="1.5" /></svg>;
    case "user": return <svg {...common}><circle cx="12" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5" /><path d="M4.8 20c.6-3.5 3.3-5.4 7.2-5.4s6.6 1.9 7.2 5.4" stroke="currentColor" strokeWidth="1.5" /></svg>;
    case "volume": return <svg {...common}><path d="M4 10h4l5-4v12l-5-4H4v-4Z" stroke="currentColor" strokeWidth="1.5" /><path d="M16 9.2c1.4 1.5 1.4 4.1 0 5.6M18.6 6.8c2.8 2.9 2.8 7.5 0 10.4" stroke="currentColor" strokeWidth="1.5" /></svg>;
    case "expand": return <svg {...common}><path d="M9 4H4v5m11-5h5v5M9 20H4v-5m16 0v5h-5" stroke="currentColor" strokeWidth="1.5" /></svg>;
    case "eye": return <svg {...common}><path d="M2.7 12s3.2-5 9.3-5 9.3 5 9.3 5-3.2 5-9.3 5-9.3-5-9.3-5Z" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.5" /></svg>;
    case "arrow": return <svg {...common}><path d="m10 6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" /></svg>;
  }
}

export function AuctionScreen() {
  const [secondsToStart, setSecondsToStart] = useState(15);
  const [isDeferredOpen, setDeferredOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [tracked, setTracked] = useState(false);
  const [bid, setBid] = useState("");
  const [message, setMessage] = useState("");
  const [muted, setMuted] = useState(false);
  const [isLotsOpen, setLotsOpen] = useState(false);
  const showPlaceholder = (label: string) => setNotice(`${label} — раздел скоро появится.`);
  const placeBid = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice(bid ? `Ставка ${bid} ₽ подготовлена. Подключение к аукциону появится позже.` : "Введите сумму ставки.");
  };

  useEffect(() => {
    if (secondsToStart === 0) return;
    const timer = window.setTimeout(() => setSecondsToStart((seconds) => Math.max(0, seconds - 1)), 1000);
    return () => window.clearTimeout(timer);
  }, [secondsToStart]);

  if (secondsToStart > 0) return <AuctionCountdown seconds={secondsToStart} isDeferredOpen={isDeferredOpen} onOpenDeferred={() => setDeferredOpen(true)} onCloseDeferred={() => setDeferredOpen(false)} />;

  return <main className={styles.page}>
    <header className={styles.header}>
      <button aria-label="На главную" className={styles.logoButton} onClick={() => showPlaceholder("Главная")}><Image src="/figma-assets/logo.svg" alt="KUPIT KARTINU.RU" width={172} height={43} priority /></button>
      <nav className={styles.navigation} aria-label="Основная навигация">{navigation.map((item) => <button key={item} onClick={() => showPlaceholder(item)}>{item}</button>)}</nav>
      <div className={styles.headerActions}><label className={styles.search}><span>Андерграунд, море, лес...</span><Icon name="search" size={30} /></label><button aria-label="Корзина" onClick={() => showPlaceholder("Корзина")}><Icon name="bag" size={32} /></button><button aria-label="Избранное" onClick={() => showPlaceholder("Избранное")}><Icon name="heart" size={32} /></button><button aria-label="Профиль" onClick={() => showPlaceholder("Профиль")}><Icon name="user" size={32} /></button></div>
    </header>
    <div className={styles.breadcrumbs}><button onClick={() => showPlaceholder("Аукционы")}>Аукционы</button><span>›</span><b>Цветок на столе</b></div>
    <section className={styles.auctionGrid} aria-label="Онлайн-аукцион">
      <aside className={styles.queue}>
        <div className={styles.stream}><Image src="/figma-assets/auction-stream-clean.png" alt="Прямая трансляция ведущего аукциона" width={272} height={177} priority /><div className={styles.streamControls}><button aria-label={muted ? "Включить звук" : "Выключить звук"} onClick={() => setMuted(!muted)}><Icon name="volume" size={24} /></button><span className={styles.volumeLine} /><button aria-label="Развернуть видео" onClick={() => showPlaceholder("Полноэкранный режим")}><Icon name="expand" size={24} /></button></div></div>
        <div className={styles.queueBody}><p className={styles.liveMark}>• Идёт сейчас</p><article className={styles.queueLot}><div className={styles.queueImage}><Image src="/figma-assets/upcoming-lot.jpg" alt="Закатное небо" fill sizes="194px" /></div><p>Губик Иван Никол</p><h2>ЗАКАТНОЕ НЕБО<br />КАКОЕ ОНО КРАСИВОЕ</h2></article><p className={styles.nextLots}>• Следующие лоты <span>(63)</span></p><button type="button" className={`${styles.queueLot} ${styles.futureLot}`} onClick={() => setDeferredOpen(true)} aria-label="Поставить отложенную ставку на следующий лот"><div className={styles.queueImage}><Image src="/figma-assets/upcoming-lot.jpg" alt="Следующий лот" fill sizes="194px" /></div></button></div>
        <button className={styles.showAll} onClick={() => setLotsOpen(true)}>Показать все <Icon name="eye" size={24} /></button>
      </aside>
      <article className={styles.lot}><div className={styles.artwork}><Image src="/figma-assets/current-lot.jpg" alt="Владимир Яковлев, Цветок на столе" fill sizes="(max-width: 850px) 100vw, 630px" priority /></div><div className={styles.lotCaption}><p>«Цветок на столе»</p><h1>ЯКОВЛЕВ ВЛАДИМИР<br />ИГОРЕВИЧ</h1><span>52×64 <i /> Бумага, тушь, кисть <i /> Россия <i /> 1894</span></div></article>
      <aside className={styles.sidebar}><section className={styles.bidCard}><p className={styles.price}>250 000 ₽</p><p className={styles.lastBid}>Последняя ставка&nbsp; • &nbsp;#194</p><dl><div><dt>×&nbsp; Минимальная стоимость</dt><dd>300 000 ₽</dd></div><div><dt>Минимальный шаг</dt><dd>50 000 ₽</dd></div></dl><form onSubmit={placeBid}><div className={styles.bidInput}><input value={bid} onChange={(event) => setBid(event.target.value.replace(/[^0-9 ]/g, ""))} placeholder="Введите ставку" inputMode="numeric" aria-label="Сумма ставки" /><button type="submit" aria-label="Подать ставку"><Icon name="arrow" size={18} /></button></div><button type="button" className={styles.trackButton} onClick={() => setTracked(!tracked)}>{tracked ? "Отслеживается" : "Отслеживать"}</button></form></section><section className={styles.chatCard}><div className={styles.chatHeading}><span>• Чат прямого эфира</span><span>83 участника</span></div><div className={styles.message}><span>#851</span><time>18:42</time><p>Можно паузу?</p></div><div className={styles.message}><span>#914</span><time>19:02</time><p>Всё слышно</p></div><form className={styles.messageInput} onSubmit={(event) => { event.preventDefault(); showPlaceholder(message ? "Сообщение отправлено" : "Чат"); setMessage(""); }}><input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Сообщение" aria-label="Сообщение в чат" /><button type="submit" aria-label="Отправить сообщение"><Icon name="arrow" size={18} /></button></form></section></aside>
    </section>
    {isLotsOpen && <LotsDialog onClose={() => setLotsOpen(false)} onOpenDeferred={() => setDeferredOpen(true)} />}
    {isDeferredOpen && <DeferredBidDialog onClose={() => setDeferredOpen(false)} />}
    {notice && <div className={styles.notice} role="status"><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Закрыть">×</button></div>}
  </main>;
}

function AuctionCountdown({ seconds, isDeferredOpen, onOpenDeferred, onCloseDeferred }: { seconds: number; isDeferredOpen: boolean; onOpenDeferred: () => void; onCloseDeferred: () => void }) {
  const lots = Array.from({ length: 8 }, (_, index) => index + 1);
  const time = `00:${String(seconds).padStart(2, "0")}`;

  return <main className={styles.page}>
    <header className={styles.header}>
      <div className={styles.logoButton}><Image src="/figma-assets/logo.svg" alt="KUPIT KARTINU.RU" width={172} height={43} priority /></div>
      <nav className={styles.navigation} aria-label="Основная навигация">{navigation.map((item) => <span key={item}>{item}</span>)}</nav>
      <div className={styles.headerActions}><div className={styles.search}><span>Андерграунд, море, лес...</span><Icon name="search" size={30} /></div><span><Icon name="bag" size={32} /></span><span><Icon name="heart" size={32} /></span><span><Icon name="user" size={32} /></span></div>
    </header>
    <div className={styles.countdownBreadcrumbs}><span>Аукционы</span><b>›</b><strong>Цветок на столе</strong></div>
    <section className={styles.countdownContent} aria-label="Аукцион начнётся скоро">
      <div className={styles.countdownBanner}>ДО НАЧАЛА АУКЦИОНА: <b>{time}</b><span aria-hidden="true">◴</span></div>
      <aside className={styles.deferredInfo}><h1>ОБ ОТЛОЖЕННЫХ СТАВКАХ</h1><p>Вы можете поставить отложенную ставку до начала аукциона — просто нажмите на любую картину.</p><p>Отложенная ставка будет ставиться без вашего участия, пока вы не выиграете или пока не закончится выбранный баланс.</p><p>Её можно отменить только до начала аукциона или за пять лотов до выбранного лота</p></aside>
      <p className={styles.countdownLotsTitle}>• Лоты участвующие в аукционе</p>
      <div className={styles.countdownLots}>{lots.map((lot) => <button type="button" key={lot} className={styles.countdownLot} onClick={onOpenDeferred}><div><Image src="/figma-assets/current-lot.jpg" alt="Закатное небо какое оно красивое" fill sizes="(max-width: 640px) 45vw, 318px" /></div><p>Губик Иван Никол</p><h2>ЗАКАТНОЕ НЕБО КАКОЕ<br />ОНО КРАСИВОЕ</h2><span>52×64 • Бумага, тушь, кисть • Россия • 1894</span></button>)}</div>
    </section>
    {isDeferredOpen && <DeferredBidDialog onClose={onCloseDeferred} />}
  </main>;
}

function LotsDialog({ onClose, onOpenDeferred }: { onClose: () => void; onOpenDeferred: () => void }) {
  const upcomingLots = Array.from({ length: 6 }, (_, index) => index + 1);
  const pastLots = Array.from({ length: 6 }, (_, index) => index + 1);

  return <div className={styles.modalOverlay} role="presentation" onMouseDown={onClose}>
    <section className={styles.lotsDialog} role="dialog" aria-modal="true" aria-labelledby="all-lots-title" onMouseDown={(event) => event.stopPropagation()}>
      <div className={styles.dialogHeader}><h2 id="all-lots-title">ВСЕ КАРТИНЫ</h2><button onClick={onClose} aria-label="Закрыть окно">×</button></div>
      <LotsSection label="Идёт сейчас" tone="live"><LotTile /></LotsSection>
      <LotsSection label="Следующие лоты" tone="next">{upcomingLots.map((lot) => <LotTile key={lot} onOpenDeferred={onOpenDeferred} />)}</LotsSection>
      <LotsSection label="Прошедшие лоты" tone="past">{pastLots.map((lot) => <LotTile key={lot} status={lot === 3 ? "НЕ ПРОДАНА" : "Продано"} />)}</LotsSection>
    </section>
  </div>;
}

function LotsSection({ children, label, tone }: { children: ReactNode; label: string; tone: "live" | "next" | "past" }) {
  return <section className={`${styles.lotsSection} ${styles[`lotsSection${tone[0].toUpperCase()}${tone.slice(1)}`]}`}><p>• {label}</p><div className={styles.lotsGrid}>{children}</div></section>;
}

function LotTile({ status, onOpenDeferred }: { status?: string; onOpenDeferred?: () => void }) {
  const content = <><div className={styles.lotTileImage}><Image src="/figma-assets/upcoming-lot.jpg" alt="Закатное небо какое оно красивое" fill sizes="230px" /></div>{status && <div className={styles.lotStatus}><span>{status}</span>{status === "Продано" && <b>450 000 ₽</b>}</div>}<p>Губик Иван Никол</p><h3>ЗАКАТНОЕ НЕБО КАКОЕ<br />ОНО КРАСИВОЕ</h3></>;
  return onOpenDeferred ? <button type="button" className={`${styles.lotTile} ${styles.futureLot}`} onClick={onOpenDeferred}>{content}</button> : <article className={styles.lotTile}>{content}</article>;
}

function DeferredBidDialog({ onClose }: { onClose: () => void }) {
  const [amount, setAmount] = useState("");
  return <div className={styles.deferredOverlay} role="presentation" onMouseDown={onClose}>
    <section className={styles.deferredDialog} role="dialog" aria-modal="true" aria-labelledby="deferred-bid-title" onMouseDown={(event) => event.stopPropagation()}>
      <header><h2 id="deferred-bid-title">ОТЛОЖЕННАЯ СТАВКА</h2><button type="button" onClick={onClose} aria-label="Закрыть окно">×</button></header>
      <article className={styles.deferredLot}><div><Image src="/figma-assets/current-lot.jpg" alt="Закатное небо какое оно красивое" fill sizes="336px" /></div><p>Губик Иван Никол</p><h3>ЗАКАТНОЕ НЕБО КАКОЕ<br />ОНО КРАСИВОЕ</h3><span>52×64 • Бумага, тушь, кисть • Россия • 1894</span></article>
      <form className={styles.deferredForm} onSubmit={(event) => { event.preventDefault(); onClose(); }}><dl><div><dt>Минимальная стоимость</dt><dd>300 000 ₽</dd></div><div><dt>Минимальный шаг</dt><dd>50 000 ₽</dd></div></dl><input value={amount} onChange={(event) => setAmount(event.target.value.replace(/[^0-9 ]/g, ""))} placeholder="Сумма отложенной ставки" inputMode="numeric" aria-label="Сумма отложенной ставки" /><button type="submit">Сохранить</button></form>
    </section>
  </div>;
}
