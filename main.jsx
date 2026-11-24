import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const ideas = [
  { name: 'Turbo Tost', ticker: 'TOAST', emoji: '🍞', color: 'orange', tagline: 'Yanmış olabilir. Ama hâlâ bullish.' },
  { name: 'Panik Panda', ticker: 'PNDA', emoji: '🐼', color: 'pink', tagline: 'Her düşüşte biraz daha sevimli.' },
  { name: 'Uzaylı Simit', ticker: 'SIMET', emoji: '👽', color: 'blue', tagline: 'Galaksiler arası gevrek güç.' },
  { name: 'Doge Dede', ticker: 'DEDE', emoji: '🐕', color: 'yellow', tagline: 'Piyasanın en tecrübeli havlaması.' },
  { name: 'KediCEO', ticker: 'MEOW', emoji: '🐈', color: 'purple', tagline: 'Toplantıda uyuyor, grafikte uyanık.' },
  { name: 'ÇayFi', ticker: 'CAY', emoji: '🫖', color: 'green', tagline: 'Demini alana kadar HODL.' },
];
const short = (n) => Number(n).toLocaleString('en-US');
const passwordHash = import.meta.env.VITE_SITE_PASSWORD_SHA256 || '';

function PasswordGate({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);
  async function submit(event) {
    event.preventDefault();
    if (!passwordHash) { setError('Site sahibi GitHub’da parola secret’ını henüz ayarlamadı.'); return; }
    setChecking(true); setError('');
    try {
      const bytes = new TextEncoder().encode(password);
      const digest = await crypto.subtle.digest('SHA-256', bytes);
      const hash = [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
      if (hash === passwordHash) onUnlock();
      else setError('Parola eşleşmedi. Tekrar dene.');
    } catch { setError('Parola doğrulanamadı. Sayfayı yenileyip tekrar dene.'); }
    finally { setChecking(false); }
  }
  return <main className="gate-page"><div className="gate-card"><a className="brand" href="#"><span className="brand-icon">m</span> memelab<span className="brand-dot">.</span></a><div className="gate-mark">◈</div><div className="eyebrow"><span className="spark">✳</span> ÖZEL ERİŞİM</div><h1>Devam etmek için<br/><span>parolanı gir.</span></h1><p>Bu alan parola korumalıdır. Site sahibinden aldığın parolayı girerek devam et.</p><form onSubmit={submit}><label htmlFor="site-password">ERİŞİM PAROLASI</label><input id="site-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Parolan" required autoFocus/><button type="submit" disabled={checking}>{checking?'Kontrol ediliyor…':'Siteye gir'} <span>→</span></button></form>{error&&<div className="gate-error" role="alert">{error}</div>}<small>Parola bu cihazda saklanmaz.</small></div><span className="gate-foot">MEMELAB · PRIVATE PREVIEW</span></main>;
}

function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [coin, setCoin] = useState(ideas[0]);
  const [supply, setSupply] = useState('1000000000');
  const [liquidity, setLiquidity] = useState(2);
  const [custom, setCustom] = useState('');
  const [notice, setNotice] = useState('');
  const [screen, setScreen] = useState('create');

  function generate() {
    let next = ideas[Math.floor(Math.random() * ideas.length)];
    if (ideas.length > 1 && next.ticker === coin.ticker) next = ideas[(ideas.indexOf(next) + 1) % ideas.length];
    setCoin(next); setCustom(''); setNotice('Yeni fikir hazır. İsmi ve likiditeyi dilediğin gibi düzenle.');
  }
  function customCoin(e) {
    e.preventDefault();
    const name = custom.trim();
    if (!name) return;
    const ticker = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8) || 'MEME';
    setCoin({ name, ticker, emoji: '✨', color: 'purple', tagline: 'Senin fikrin. Senin meme’in.' });
    setNotice('İsmin eklendi. İstersen şimdi rastgele yeni fikir üretebilirsin.');
  }
  function launch() { setNotice('Önizleme modu: cüzdan ve Solana mainnet bağlantısı kurulmadığı için hiçbir işlem gönderilmedi.'); }

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  return <div className="app-shell">
    <div className="topline"><span><i/> SOLANA MAINNET</span><span className="top-note">FİKRİNİ BUL. LİKİDİTEYİ SEN SEÇ.</span><span>0.00 SOL <b>⌄</b></span></div>
    <header className="nav wrap"><a className="brand" href="#home"><span className="brand-icon">m</span> memelab<span className="brand-dot">.</span></a><nav><button className={screen==='create'?'active':''} onClick={()=>setScreen('create')}>Oluştur</button><button className={screen==='portfolio'?'active':''} onClick={()=>setScreen('portfolio')}>Portföyüm <em>0</em></button><a href="#how">Nasıl çalışır</a></nav><button className="wallet" onClick={()=>setNotice('Cüzdan bağlantısı prototipte etkin değil.')}>◈ <span>Cüzdan bağla</span></button></header>

    <main id="home" className="wrap">
      <section className="hero"><div className="hero-copy"><div className="eyebrow"><span className="spark">✳</span> MEME EKONOMİSİNE HOŞ GELDİN</div><h1>Bir fikir.<br/><span>Bir coin.</span><br/>Senin kuralların.</h1><p>Yapay zekâdan rastgele bir meme coin fikri al. Arzını ve likiditeni belirle. Gerisini adım adım birlikte planla.</p><div className="hero-actions"><button className="primary" onClick={()=>document.getElementById('studio').scrollIntoView({behavior:'smooth'})}>Coin’ini tasarla <span>↘</span></button><span className="hero-caption"><span className="avatar-stack"><i>🐸</i><i>🐱</i><i>🐶</i></span> İlk fikrin 10 saniye uzakta</span></div></div>
        <div className="hero-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><span className="float f1">✦</span><span className="float f2">✳</span><span className="float f3">$</span><div className="coin-token">{coin.emoji}</div><div className="hero-token-label"><span><i/> FİKRİN HAZIR</span><b>${coin.ticker}</b><small>{coin.name}</small></div><div className="mini-chart"><div className="chart-head"><span>HAYALİ GRAFİK</span><span>DEMO</span></div><svg viewBox="0 0 190 58" preserveAspectRatio="none"><path d="M0 49 C14 45 14 35 29 39 S47 46 57 28 S72 37 83 27 S99 40 111 20 S126 29 138 18 S155 31 165 9 S180 15 190 2" fill="none" stroke="#9ef263" strokeWidth="2.5"/><path d="M0 49 C14 45 14 35 29 39 S47 46 57 28 S72 37 83 27 S99 40 111 20 S126 29 138 18 S155 31 165 9 S180 15 190 2 L190 58 L0 58Z" fill="url(#area)"/><defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#9ef263" stopOpacity=".2"/><stop offset="1" stopColor="#9ef263" stopOpacity="0"/></linearGradient></defs></svg></div><span className="art-glow"/></div>
      </section>

      <section className="ticker-strip"><div className="strip-label"><span className="live-dot"/> TOPLULUKTAN FİKİRLER</div><div className="ticker-items">{ideas.slice(1,5).map((x,i)=><span key={x.ticker}><i>{x.emoji}</i> ${x.ticker}<small>{['az önce','2 dk','5 dk','8 dk'][i]}</small></span>)}</div><span className="strip-demo">ÖRNEK FİKİRLER · CANLI PİYASA DEĞİL</span></section>

      <section className="studio-section" id="studio"><div className="section-heading"><div><div className="eyebrow"><span className="section-no">01</span> COIN STÜDYOSU</div><h2>Hayal et. <span>Şekillendir.</span></h2><p>Başlangıç fikrini üret, sonra her ayrıntıyı kendine göre ayarla.</p></div><span className="studio-tag">✦ AI FİKİR ÜRETİCİ</span></div>
        {screen==='create' ? <div className="studio-grid"><div className="form-card"><div className="card-top"><div><span className="step-label">ADIM 1 / 3</span><h3>Coin kimliğin</h3></div><span className="step-progress"><i/></span></div>
          <label className="field-label">COIN ADI <span>En fazla 32 karakter</span></label><div className="input-wrap"><span className="input-emoji">{coin.emoji}</span><input maxLength={32} value={coin.name} onChange={e=>setCoin({...coin,name:e.target.value})}/><span className="input-count">{coin.name.length}/32</span></div>
          <div className="two-fields"><div><label className="field-label">TICKER</label><div className="ticker-input"><span>$</span><input maxLength={8} value={coin.ticker} onChange={e=>setCoin({...coin,ticker:e.target.value.toUpperCase().replace(/[^A-Z0-9]/g,'')})}/></div></div><div><label className="field-label">TOPLAM ARZ</label><div className="supply-input"><input inputMode="numeric" value={supply} onChange={e=>setSupply(e.target.value.replace(/[^0-9]/g,''))}/><span>TOKEN</span></div></div></div>
          <div className="ai-box"><div className="ai-icon">✳</div><div className="ai-copy"><b>Rastgele bir coin fikri üret</b><span>Yeni isim, ticker ve karakter. Tek dokunuşla.</span></div><button onClick={generate} className="shuffle">⤨ <span>Üret</span></button></div><form onSubmit={customCoin} className="custom-row"><input value={custom} onChange={e=>setCustom(e.target.value)} placeholder="Ya da kendi coin adını yaz…"/><button type="submit" aria-label="Coin adını uygula">↗</button></form>
          <div className="divider"/><div className="card-top liquidity-head"><div><span className="step-label">ADIM 2 / 3</span><h3>Likiditeni belirle</h3></div><span className="solana-mark">◎ SOL</span></div><p className="field-hint">Havuzuna eklemek istediğin SOL miktarını sen seç.</p><div className="liquidity-box"><div className="liquidity-value"><input type="number" min="0.1" max="10000" step="0.1" value={liquidity} onChange={e=>setLiquidity(e.target.value)}/><span>SOL</span></div><span className="liquidity-est">≈ ${(Number(liquidity||0)*148).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})} USD <i>tahmini</i></span></div><input className="range" type="range" min="0.1" max="100" step="0.1" value={Math.min(Number(liquidity)||.1,100)} onChange={e=>setLiquidity(e.target.value)}/><div className="range-labels"><span>0.1 SOL</span><button onClick={()=>setLiquidity(5)} type="button">5 SOL</button><button onClick={()=>setLiquidity(25)} type="button">25 SOL</button><span>100+ SOL</span></div>
          <div className="notice"><span>ⓘ</span><p>Likidite havuza eklenir ve işlem riski taşır. Miktarı yalnızca gerçekten kullanmak istediğin seviyede belirle.</p></div><button className="launch-button" onClick={launch}>Başlatma önizlemesine geç <span>→</span></button><div className="secure-note">♢ Cüzdan onayı olmadan işlem gönderilmez</div>
        </div><aside className="preview-card"><div className="preview-head"><span>CANLI ÖNİZLEME</span><span className="preview-live"><i/> GÜNCELLENİYOR</span></div><div className={`preview-art ${coin.color}`}><div className="preview-spark ps1">✦</div><div className="preview-spark ps2">✳</div><div className="preview-emoji">{coin.emoji}</div><span className="preview-symbol">${coin.ticker}</span></div><div className="preview-name"><div><span>MEME COIN</span><h3>{coin.name}</h3><p>{coin.tagline}</p></div><span className="network-chip">◎ SOLANA</span></div><div className="preview-stats"><div><span>TOPLAM ARZ</span><b>{short(supply||0)}</b></div><div><span>BAŞLANGIÇ LİKİDİTESİ</span><b>{Number(liquidity||0).toLocaleString()} <small>SOL</small></b></div><div><span>ARZ KONTROLÜ</span><b className="pending"><i/> Ayarlanıyor</b></div></div><div className="preview-bottom"><span>✳</span><p>Fikir aşamasında<br/><b>Henüz zincirde değil</b></p><span className="preview-arrow">↗</span></div><div className="dex-card"><div className="dex-icon">📊</div><div><b>DEX Screener görünümü</b><span>Token ve likidite oluşturulduktan sonra</span></div><span className="dex-lock">🔒</span></div></aside></div> : <div className="portfolio-empty"><span>◈</span><h3>Cüzdanını bağla, coin’lerini gör.</h3><p>Henüz bir cüzdan veya oluşturulmuş token bağlı değil. Cüzdan entegrasyonu tamamlandığında portföyün burada listelenecek.</p><button className="primary" onClick={()=>setScreen('create')}>Coin stüdyosuna dön <span>↗</span></button></div>}
        {notice&&<div className="toast" role="status"><span>✳</span>{notice}<button onClick={()=>setNotice('')} aria-label="Kapat">×</button></div>}
      </section>

      <section className="steps-section" id="how"><div className="eyebrow"><span className="section-no">02</span> BASİT TUTTUK</div><div className="steps-heading"><h2>Şakadan grafiğe.<br/><span>Üç küçük adım.</span></h2><p>Önce fikrini bul. Sonra coin’ini kişiselleştir. Yayınlama adımı hazır olduğunda bütün kontroller sende.</p></div><div className="steps-grid"><article><span className="step-index">01 <i>✳</i></span><div className="step-emoji">🎨</div><h3>Fikrini bul</h3><p>Yapay zekâ tarzı rastgele üreticiyle isim, ticker ve karakter fikri al.</p></article><article><span className="step-index">02 <i>◎</i></span><div className="step-emoji">🌊</div><h3>Sen şekillendir</h3><p>Arzı düzenle. Likidite miktarını gir. Önizlemede seçimlerini gör.</p></article><article><span className="step-index">03 <i>↗</i></span><div className="step-emoji">📈</div><h3>Yayınlamaya hazırlan</h3><p>Cüzdan onayı ve ağ entegrasyonuyla token ve likidite havuzu oluşturulur; DEX Screener veriyi algılar.</p></article></div></section>
    </main>
    <footer className="footer wrap"><a className="brand" href="#home"><span className="brand-icon">m</span> memelab<span className="brand-dot">.</span></a><span>Biraz mizah. Gerçek kararlar senin.</span><span>PROTOTİP · İŞLEM GÖNDERMEZ</span></footer>
    {notice&&<div className="mobile-toast" role="status">{notice}</div>}
  </div>;
}
createRoot(document.getElementById('root')).render(<App/>);

