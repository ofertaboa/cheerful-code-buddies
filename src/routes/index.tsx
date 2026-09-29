import { useState } from "react";
import {
  Bell, Check, ChefHat, ChevronRight, CircleDollarSign, Crown, Download,
  Flame, Gift, Minus, Plus, ShieldCheck, Star, ThumbsUp, Trophy, UserRound,
  Wallet, X, Gamepad2, UsersRound,
} from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SnakeWin — É mês de churrasco!" },
      { name: "description", content: "Entre na diversão SnakeWin: churrasco, desafios e prêmios." },
      { property: "og:title", content: "SnakeWin — É mês de churrasco!" },
      { property: "og:description", content: "Aposte, jogue e entre na brincadeira." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

type ModalContent = { title: string; body: string; action?: string };

function Index() {
  const [amount, setAmount] = useState(1);
  const [balance] = useState(0);
  const [activeNav, setActiveNav] = useState("Jogar");
  const [modal, setModal] = useState<ModalContent | null>(null);
  const [noticeRead, setNoticeRead] = useState(false);

  const openInfo = (title: string, body: string, action = "Entendi") => setModal({ title, body, action });
  const money = (value: number) => value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const handleNav = (label: string) => {
    setActiveNav(label);
    if (label === "Jogar") {
      document.getElementById("home-top")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (label === "Depositar") {
      openInfo("Adicionar saldo", "Esta versão é uma demonstração visual. Conecte um provedor de pagamento seguro antes de receber depósitos reais.");
      return;
    }
    const messages: Record<string, string> = {
      Sacar: "A área de saques estará disponível quando uma carteira segura e as regras de retirada forem configuradas.",
      Indicar: "A área de convites e recompensas por indicação será ativada quando o sistema de contas estiver conectado.",
      Perfil: "Seu perfil e histórico aparecerão aqui quando o login estiver configurado.",
    };
    openInfo(label, messages[label] ?? "Esta área está em construção.");
  };
  const handlePlay = () => openInfo(
    "Bora jogar! 🔥",
    "Você selecionou uma aposta de R$ " + money(amount) + ". Esta é uma demonstração visual; não há apostas, pagamentos ou prêmios reais conectados.",
    "Fechar"
  );

  return (
    <div className="grill-shell" id="home-top">
      <div className="party-lights" aria-hidden="true" />
      <header className="grill-topbar">
        <button className="mini-brand" onClick={() => handleNav("Jogar")} aria-label="SnakeWin início">
          <span>🐍</span><b>Snake<span>Win</span></b>
        </button>
        <div className="balance-pill">
          <span className="gold-coin"><Star size={19} fill="currentColor" /></span>
          <span className="balance-text">R$ {money(balance)}</span>
          <button className="balance-plus" aria-label="Adicionar saldo" onClick={() => handleNav("Depositar")}><Plus size={24} strokeWidth={3} /></button>
        </div>
        <button className="top-action" aria-label="Presentes" onClick={() => openInfo("Presentes", "Os bônus e presentes aparecerão aqui.")}><Gift size={22} /></button>
        <button className="top-action" aria-label="Notificações" onClick={() => { setNoticeRead(true); openInfo("Notificações", noticeRead ? "Você está em dia!" : "Bem-vindo à SnakeWin! Novidades aparecerão aqui."); }}><Bell size={20} />{!noticeRead && <i />}</button>
        <button className="user-bubble" aria-label="Perfil" onClick={() => handleNav("Perfil")}>J</button>
      </header>

      <main className="grill-content">
        <section className="hero-sign" aria-label="Promoção de churrasco">
          <div className="wood-sign top-sign">
            <span className="sign-star"><Star fill="currentColor" size={28} /></span>
            <div className="sign-title"><span>ÉM SETEMBRO</span><strong>ENTRA O GROSSO</strong></div>
          </div>
          <div className="side-sign side-sign-left"><Star fill="currentColor" size={18} /><span>FAZOL</span><Star fill="currentColor" size={18} /></div>
          <div className="side-sign side-sign-right"><span>👑</span><b>PAINHO</b></div>
          <div className="chef-stage">
            <div className="steak-art" aria-label="Pedaço de picanha">🥩</div>
            <div className="chef-portrait" aria-label="Chef churrasqueiro ilustrado">
              <div className="chef-hat"><ChefHat size={70} strokeWidth={1.8} /></div>
              <div className="chef-face">👨🏻‍🍳</div>
              <div className="chef-glasses"><span>O PAI</span><span>TÁ ON</span></div>
              <div className="chef-apron"><Crown size={26} /><strong>PICANHA<br/>É CULTURA</strong><span>★</span></div>
            </div>
            <div className="floating-sparks"><Flame /><Star fill="currentColor" /><Flame /></div>
          </div>
          <div className="wood-sign right-banner"><span>FAZOL</span><Star fill="currentColor" /><b>PAINHO</b></div>
          <div className="feature-tiles" aria-label="Destaques">
            <div className="feature-tile chef-tile"><span>👨🏻‍🍳</span><small>O PAI TÁ ON</small></div>
            <div className="feature-tile steak-tile"><span>🥩</span><small>PICANHA</small></div>
            <div className="feature-tile"><Star fill="currentColor" /><small>DESAFIO</small></div>
            <div className="feature-tile"><span className="tile-coin"><Star fill="currentColor" /></span><small>PRÊMIOS</small></div>
            <div className="feature-tile"><ThumbsUp fill="currentColor" /><small>É NÓIS</small></div>
          </div>
        </section>

        <button className="play-cta" onClick={handlePlay}><Flame fill="currentColor" /> JOGAR <Flame fill="currentColor" /></button>

        <section className="bet-panel" aria-label="Controles da aposta">
          <div className="bet-cell bet-amount">
            <div className="panel-label"><span className="tiny-coin"><Star fill="currentColor" size={15} /></span> APOSTA</div>
            <div className="bet-controls">
              <button aria-label="Diminuir aposta" onClick={() => setAmount((value) => Math.max(1, Number((value - 1).toFixed(2))))}><Minus size={21} /></button>
              <strong>R$ {money(amount)}</strong>
              <button aria-label="Aumentar aposta" onClick={() => setAmount((value) => Number((value + 1).toFixed(2)))}><Plus size={21} /></button>
            </div>
          </div>
          <div className="bet-cell balance-cell">
            <div className="panel-label">SALDO</div>
            <div className="balance-total"><span className="tiny-coin"><Star fill="currentColor" size={17} /></span><strong>R$ {money(balance)}</strong></div>
          </div>
          <div className="bet-cell prize-cell">
            <div className="prize-crown"><Crown size={23} /></div>
            <strong>PAINHO</strong><span>SEMPRE</span><b>GANHA</b>
          </div>
        </section>
        <p className="demo-note"><ShieldCheck size={14} /> Demonstração visual · sem apostas ou pagamentos reais</p>
      </main>

      <nav className="grill-bottom-nav" aria-label="Navegação principal">
        {[
          { label: "Depositar", icon: Wallet },
          { label: "Sacar", icon: Download },
          { label: "Jogar", icon: Gamepad2 },
          { label: "Indicar", icon: Gift },
          { label: "Perfil", icon: UserRound },
        ].map(({ label, icon: Icon }) => (
          <button key={label} className={activeNav === label ? "grill-nav-item active" : "grill-nav-item"} onClick={() => handleNav(label)} aria-current={activeNav === label ? "page" : undefined}>
            <span className="grill-nav-icon"><Icon size={22} strokeWidth={activeNav === label ? 2.6 : 1.8} />{label === "Jogar" && <i />}</span>
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {modal && (
        <div className="grill-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setModal(null); }}>
          <section className="grill-modal" role="dialog" aria-modal="true" aria-labelledby="grill-modal-title">
            <button className="grill-modal-close" aria-label="Fechar" onClick={() => setModal(null)}><X size={19} /></button>
            <div className="grill-modal-icon"><Trophy size={28} /></div>
            <h2 id="grill-modal-title">{modal.title}</h2><p>{modal.body}</p>
            <button className="grill-modal-action" onClick={() => setModal(null)}><Check size={17} /> {modal.action ?? "Entendi"}</button>
          </section>
        </div>
      )}
    </div>
  );
}
