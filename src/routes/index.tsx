import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Menu, Search, MapPin, UserCircle, ShoppingCart, Star, ChevronRight, ChevronDown, Heart, ArrowRight, Minus, Plus, FileText, BookOpen, MessageSquare, Store, CircleDollarSign, Accessibility, Check, X, CreditCard } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Aspirador de Pó Vertical WAP Power Speed Max | Havan" },
    { name: "description", content: "Aspirador de Pó Vertical WAP Power Speed Max 3 em 1 1600W." }
  ]}),
  component: StoreProductPage,
});

function VacuumArt({ compact = false }: { compact?: boolean }) {
  return <svg className={compact ? "vacuum-art compact" : "vacuum-art"} viewBox="0 0 180 520" role="img" aria-label="Aspirador vertical preto e cinza">
    <defs>
      <linearGradient id="tube" x1="0" x2="1"><stop stopColor="#44484a"/><stop offset=".3" stopColor="#e1e2e2"/><stop offset=".65" stopColor="#85898b"/><stop offset="1" stopColor="#35393b"/></linearGradient>
      <linearGradient id="body" x1="0" x2="1"><stop stopColor="#0c0d0e"/><stop offset=".4" stopColor="#55595b"/><stop offset=".7" stopColor="#222527"/><stop offset="1" stopColor="#080909"/></linearGradient>
      <linearGradient id="base" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#d4d5d5"/><stop offset=".5" stopColor="#55595a"/><stop offset="1" stopColor="#191b1c"/></linearGradient>
    </defs>
    <ellipse cx="90" cy="493" rx="48" ry="7" fill="#dfe2e5"/>
    <path d="M84 22Q84 14 90 14T96 22V275H84Z" fill="url(#tube)" stroke="#666"/>
    <path d="M87 24H89V263H87Z" fill="#fff" opacity=".65"/>
    <rect x="81" y="126" width="18" height="18" rx="3" fill="#292c2e" stroke="#999"/>
    <path d="M79 158H101L104 184H76Z" fill="#1b1d1e" stroke="#777"/>
    <path d="M73 180H107L111 205H69Z" fill="url(#body)" stroke="#333"/>
    <path d="M83 218H97L100 300Q100 314 112 326L115 352H65L68 326Q80 314 80 300Z" fill="url(#tube)" stroke="#737779" strokeWidth="2"/>
    <path d="M73 350H107L116 390L110 448Q90 465 70 448L64 390Z" fill="url(#body)" stroke="#55595b" strokeWidth="2"/>
    <path d="M72 365H108L105 403H75Z" fill="#303436" stroke="#777"/>
    <rect x="78" y="375" width="24" height="18" rx="4" fill="#8d2827" stroke="#aaa" strokeWidth="2"/>
    <path d="M74 411H106L102 441Q90 449 78 441Z" fill="#111314" stroke="#666"/>
    <path d="M84 448H96V474H84Z" fill="url(#tube)" stroke="#555"/>
    <path d="M78 469H102L109 481H71Z" fill="#444849" stroke="#222"/>
    <path d="M50 480H130L137 494H43Z" fill="url(#base)" stroke="#555" strokeWidth="2"/>
    <path d="M39 491H141L145 501H35Z" fill="#252729" stroke="#888"/>
    <path d="M45 495H135" stroke="#b84c4a" strokeWidth="3"/>
    <path d="M71 224L53 218V205L66 202L74 211ZM109 224L126 218V205L114 202L106 211Z" fill="#101112" stroke="#4c4f50"/>
    <circle cx="90" cy="332" r="7" fill="#181a1b" stroke="#aaa" strokeWidth="2"/>
    <text x="90" y="358" fill="#ddd" fontSize="6" textAnchor="middle">WAP</text>
  </svg>;
}

const related = [
  { name: "Robô Aspirador 3 em 1 WAP Robot W310", price: "1.099,90", old: "1.299,90", kind: "robot", rating: "108" },
  { name: "Aspirador de Pó e Água Electrolux Lite", price: "299,90", old: "399,90", kind: "canister", rating: "69" },
  { name: "Aspirador de Pó Vertical WAP Eco", price: "199,90", old: "", kind: "stick", rating: "627" },
  { name: "Aspirador de Pó 2 em 1 WAP Eco Rapid", price: "699,90", old: "", kind: "stick2", rating: "439" },
  { name: "Aspirador de Pó e Água WAP GTW 10", price: "419,90", old: "", kind: "shopvac", rating: "248" },
  { name: "Aspirador de Pó Robô Philco 3 em 1", price: "1.099,90", old: "", kind: "robot2", rating: "581" },
];

function StoreProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [voltage, setVoltage] = useState("127V");
  const [cep, setCep] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [notice, setNotice] = useState("");
  const [expanded, setExpanded] = useState<"details" | "specs" | null>(null);
  const [activeThumb, setActiveThumb] = useState(0);
  const notify = (message: string) => setNotice(message);
  const addToCart = () => { setCartCount((n) => n + quantity); notify(`${quantity} item(ns) adicionado(s) ao carrinho.`); };
  const formatCep = (value: string) => value.replace(/\D/g, "").slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2");

  return <main className="havan-page">
    <header className="havan-header"><div className="havan-header-inner">
      <button className="icon-button menu-button" aria-label="Menu" onClick={() => notify("Menu de categorias")}><Menu size={21}/></button>
      <a className="havan-logo" href="#" aria-label="Havan">HAVAN</a>
      <form className="search-form" onSubmit={(e) => { e.preventDefault(); notify("Busca pronta para conectar ao catálogo."); }}><input aria-label="Buscar na Havan" placeholder="Buscar na Havan"/><button aria-label="Buscar"><Search size={18}/></button></form>
      <button className="account-link" onClick={() => notify("Área de conta e cadastro")}><UserCircle size={21}/><span>Olá, entre na conta ou<br/> cadastre-se</span></button>
      <button className="cart-link" onClick={() => notify(`Seu carrinho tem ${cartCount} item(ns).`)} aria-label="Carrinho"><ShoppingCart size={22}/>{cartCount > 0 && <b>{cartCount}</b>}</button>
    </div></header>
    <div className="delivery-strip"><div className="store-container"><MapPin size={14}/><strong>Enviar para</strong><span>Digite o CEP</span></div></div>
    <div className="store-container">
      <nav className="breadcrumbs" aria-label="Caminho"><a href="#">Início</a><ChevronRight/><a href="#">Eletro</a><ChevronRight/><a href="#">Eletroportáteis</a><ChevronRight/><a href="#">Aspiradores de pó</a><ChevronRight/><span>Aspirador De Pó Vertical Wap Power Speed Max 3 em 1 1600W</span></nav>
      <h1 className="product-title">Aspirador De Pó Vertical Wap Power Speed Max 3 em 1 1600W <span className="title-rating"><Star size={14} fill="currentColor"/> 4.8 <a href="#reviews">(52)</a></span></h1>
      <section className="product-main-card">
        <div className="gallery-column">
          <div className="thumbnail-list">{[0,1,2,3,4,5].map((n) => <button key={n} className={activeThumb === n ? "thumbnail active" : "thumbnail"} onClick={() => setActiveThumb(n)} aria-label={`Ver imagem ${n + 1}`}>
            {n < 2 ? <div className={n === 1 ? "thumb-scene" : ""}><VacuumArt compact/></div> : n === 2 ? <span className="thumb-label">3 em 1</span> : <span className="thumb-detail">{n === 3 ? "WAP Power" : n === 4 ? "1600W" : "Potência e praticidade"}</span>}
          </button>)}<button className="thumb-down" onClick={() => setActiveThumb((n) => (n + 1) % 6)} aria-label="Próximas imagens"><ChevronDown size={16}/></button></div>
          <div className="main-product-visual">{activeThumb === 2 ? <div className="feature-photo"><b>3 EM 1</b><span>Versatilidade para sua casa</span><VacuumArt/></div> : <VacuumArt/>}
            <button className="gallery-next" onClick={() => setActiveThumb((n) => (n + 1) % 6)} aria-label="Próxima imagem"><ArrowRight size={19}/></button>
            <button className={favorite ? "favorite-button selected" : "favorite-button"} onClick={() => { setFavorite(!favorite); notify(favorite ? "Produto removido dos favoritos." : "Produto salvo nos favoritos."); }} aria-label="Favoritar"><Heart size={19} fill={favorite ? "currentColor" : "none"}/></button>
          </div>
        </div>
        <div className="product-info"><div className="sku">Cód. 440824</div>
          <div className="price-line"><span className="old-price">R$ 299,90</span><span className="discount">-50%</span></div>
          <div className="product-price">R$ 149,90</div><p className="installment">ou 10x de R$ 14,99 sem juros&nbsp; <a href="#payment">Ver opções</a></p>
          <div className="option-label">Escolha a voltagem:</div><div className="voltage-options">{["127V","220V"].map((v) => <button key={v} className={voltage === v ? "voltage-option chosen" : "voltage-option"} onClick={() => setVoltage(v)}>{v}</button>)}</div>
          <div className="quantity-label">Quantidade</div><div className="quantity-control"><button onClick={() => setQuantity((n) => Math.max(1, n - 1))} aria-label="Diminuir"><Minus size={16}/></button><b>{quantity}</b><button onClick={() => setQuantity((n) => Math.min(99, n + 1))} aria-label="Aumentar"><Plus size={16}/></button></div>
          <div className="promo-strip"><span className="promo-badge">HAVAN<br/>+ vantagens</span><span>Ganhe 3 bilhetes e concorra a uma BMW X1 comprando esse produto</span><ChevronRight size={16}/></div>
          <p className="points-note"><CircleDollarSign size={13}/> Você pode acumular até 1.250 bilhetes para concorrer</p>
          <button className="primary-buy" onClick={addToCart}>Adicionar ao carrinho</button><button className="secondary-buy" onClick={() => { addToCart(); notify("Produto adicionado. Continue para finalizar sua compra."); }}>Comprar agora</button>
          <div className="product-about"><h2>Sobre o produto</h2>
            <button className="about-row" onClick={() => setExpanded(expanded === "details" ? null : "details")}><BookOpen size={17}/><span>Detalhes</span>{expanded === "details" ? <ChevronDown/> : <ArrowRight/>}</button>
            {expanded === "details" && <p className="expanded-copy">Aspirador vertical WAP Power Speed Max: praticidade e potência para a limpeza do dia a dia. Confira acessórios e modos de uso antes da compra.</p>}
            <button className="about-row" onClick={() => setExpanded(expanded === "specs" ? null : "specs")}><FileText size={17}/><span>Ficha Técnica</span>{expanded === "specs" ? <ChevronDown/> : <ArrowRight/>}</button>
            {expanded === "specs" && <p className="expanded-copy">Marca: WAP · Potência: 1600W · Tipo: vertical 3 em 1 · Voltagem: {voltage}.</p>}
          </div>
        </div>
      </section>
      <section className="below-grid">
        <div className="reviews-card" id="reviews"><div className="reviews-heading"><div><strong>4.8</strong><span className="stars">★★★★★</span><small>(52 avaliações)</small></div><button onClick={() => notify("Todas as avaliações serão exibidas aqui.")} aria-label="Ver avaliações"><ArrowRight size={18}/></button></div>
          <article className="review"><div><b>Priscila</b><time>24/09/2026</time><span className="stars">★★★★★</span></div><p>Excelente</p></article>
          <article className="review"><div><b>Janaina</b><time>20/09/2026</time><span className="stars">★★★★★</span></div><p>Maravilhoso</p></article>
          <button className="all-reviews" onClick={() => notify("Área de avaliações")}>Ver todas as avaliações</button>
        </div>
        <div className="shipping-card"><h2>Forma de entrega</h2><p>Calcule frete, prazo de entrega e retirada</p>
          <form className="cep-form" onSubmit={(e) => { e.preventDefault(); notify(cep.replace(/\D/g, "").length === 8 ? `Consulta de entrega para o CEP ${cep}.` : "Informe um CEP válido com 8 dígitos."); }}><input aria-label="CEP" placeholder="CEP" value={cep} onChange={(e) => setCep(formatCep(e.target.value))} inputMode="numeric" maxLength={9}/><button>Calcular</button></form>
          <button className="unknown-cep" onClick={() => notify("Consulte seu CEP no site dos Correios.")}>Não sei meu CEP</button>
        </div>
      </section>
      <section className="related-section"><h2>Outras opções:</h2><div className="related-grid">{related.map((item) => <article className="related-card" key={item.name}>
        <button className="related-fav" onClick={() => notify(`${item.name} salvo nos favoritos.`)} aria-label={`Favoritar ${item.name}`}><Heart size={15}/></button>
        <div className={`related-image ${item.kind}`}>{item.kind.startsWith("robot") ? <span className="robot-vac">◉<small>WAP</small></span> : item.kind === "shopvac" ? <span className="shop-vac">▰</span> : item.kind === "canister" ? <span className="canister-vac">◉</span> : <VacuumArt compact/>}</div>
        <div className="related-name">{item.name}</div><div className="related-rating"><span>★★★★☆</span> ({item.rating})</div>
        {item.old && <small className="related-old">R$ {item.old}</small>}<strong className="related-price">R$ {item.price}</strong><small className="related-installments">10x sem juros</small>
        <button className="related-cart" onClick={() => { setCartCount((n) => n + 1); notify("Produto adicionado ao carrinho."); }} aria-label={`Adicionar ${item.name} ao carrinho`}><ShoppingCart size={18}/></button>
      </article>)}</div><div className="related-scrollbar"><span/></div></section>
    </div>
    <footer className="havan-footer"><div className="footer-actions">
      <button onClick={() => notify("Atendimento Havan")}><MessageSquare/>Atendimento</button><button onClick={() => notify("Localizador de lojas")}><Store/>Nossas lojas</button><button onClick={() => notify("Blog Havan")}><Accessibility/>Blog Havan</button><button onClick={() => notify("Opções de crédito")}><CreditCard/>Negociar dívida</button>
    </div>
    <nav className="footer-links"><a href="#history">Nossa história</a><a href="#gifts">Lista de presentes</a><a href="#jobs">Vagas Havan</a><a href="#partners">Painel do colaborador</a><a href="#insurance">Seguros</a><a href="#card">Cartão Havan</a><a href="#equality">Igualdade salarial</a><a href="#solidarity">Troco solidário</a><a href="#projects">Projetos e patrocínios</a></nav>
    <div className="footer-legal"><a href="#privacy">Políticas e segurança</a><span>✦ Acessibilidade</span><a href="#lgpd">LGPD</a><span>Todos os direitos reservados</span><span>Havan Labs © 1986 - 2026 · Brusque, SC</span></div></footer>
    {notice && <div className="store-toast" role="status"><Check size={18}/><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Fechar aviso"><X size={16}/></button></div>}
  </main>;
}
