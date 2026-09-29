import { useState } from "react";
import {
  Bell,
  Check,
  ChevronRight,
  CircleDollarSign,
  Download,
  Gamepad2,
  Gift,
  Plus,
  ShieldCheck,
  Sparkles,
  Trophy,
  UserRound,
  UsersRound,
  Wallet,
  X,
} from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SnakeWin — diversão que vale prêmios" },
      {
        name: "description",
        content:
          "Entre na SnakeWin, convide amigos e acompanhe seus ganhos em uma experiência de jogo colorida.",
      },
      { property: "og:title", content: "SnakeWin" },
      {
        property: "og:description",
        content: "Convide amigos, jogue e acompanhe seus ganhos.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

const presets = [10, 25, 50, 100, 400, 20];

const winners = [
  { initial: "W", name: "Wesl**", reward: "+200 XP", time: "há 1 min", kind: "xp" },
  { initial: "P", name: "Pris**", reward: "+200 XP", time: "há 3 min", kind: "xp" },
  { initial: "L", name: "Luca**", reward: "+100 XP", time: "há 3 min", kind: "xp" },
  { initial: "C", name: "Cami**", reward: "+2 giros", time: "há 2 min", kind: "spin" },
  { initial: "R", name: "Rafa**", reward: "+150 XP", time: "há 5 min", kind: "xp" },
];

type ModalContent = {
  title: string;
  body: string;
  action?: string;
};

function Index() {
  const [amount, setAmount] = useState("10");
  const [activeNav, setActiveNav] = useState("Jogar");
  const [modal, setModal] = useState<ModalContent | null>(null);
  const [noticeRead, setNoticeRead] = useState(false);

  const openInfo = (title: string, body: string, action = "Entendi") => {
    setModal({ title, body, action });
  };

  const handleDeposit = () => {
    const value = Number(amount);
    if (!Number.isFinite(value) || value < 10) {
      openInfo("Valor inválido", "O valor mínimo de entrada é R$ 10,00.");
      return;
    }
    openInfo(
      "Seu depósito está quase pronto!",
      `Você selecionou R$ ${value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}. Esta versão é uma demonstração visual: conecte um provedor de pagamento antes de receber depósitos reais.`,
      "Voltar para a página",
    );
  };

  const handleNav = (label: string) => {
    setActiveNav(label);
    if (label === "Depositar") {
      document.getElementById("deposit-panel")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (label === "Jogar") {
      document.getElementById("home-top")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const messages: Record<string, string> = {
      Sacar: "A área de saques ficará disponível quando uma carteira e as regras de retirada forem configuradas.",
      Indicar: "Convide seus amigos usando seu link pessoal e acompanhe as recompensas por indicação nesta área.",
      Perfil: "Seu perfil, histórico e configurações da conta aparecerão aqui quando o login estiver conectado.",
    };
    openInfo(label, messages[label] ?? "Esta área está em construção.");
  };

  return (
    <div className="game-shell" id="home-top">
      <div className="jungle-glow" aria-hidden="true" />
      <header className="topbar">
        <button
          className="brand-mark"
          aria-label="SnakeWin início"
          onClick={() => handleNav("Jogar")}
        >
          <span className="brand-snake">🐍</span>
          <span className="brand-word">Snake<span>Win</span></span>
        </button>

        <div className="wallet-pill" aria-label="Saldo atual">
          <span className="coin-badge"><CircleDollarSign size={21} /></span>
          <span className="wallet-value">R$ 0,00</span>
          <button
            className="wallet-add"
            aria-label="Adicionar saldo"
            onClick={() => handleNav("Depositar")}
          >
            <Plus size={25} strokeWidth={3} />
          </button>
        </div>

        <button
          className="top-icon treasure-button"
          aria-label="Recompensas"
          onClick={() => openInfo("Baú de recompensas", "Suas recompensas e bônus aparecerão aqui.")}
        >
          🎁
        </button>
        <button
          className="top-icon notification-button"
          aria-label="Notificações"
          onClick={() => {
            setNoticeRead(true);
            openInfo("Notificações", noticeRead ? "Você está em dia! Não há novas notificações." : "Bem-vindo à SnakeWin! Suas novidades aparecerão aqui.");
          }}
        >
          <Bell size={20} />
          {!noticeRead && <span className="notification-dot" />}
        </button>
        <button
          className="avatar-button"
          aria-label="Abrir perfil"
          onClick={() => handleNav("Perfil")}
        >
          J
        </button>
      </header>

      <main className="main-content">
        <section className="promo-banner" aria-label="Promoção de boas-vindas">
          <div className="banner-leaves" aria-hidden="true">🌿　🍃　🌴　🍃</div>
          <div className="banner-brand">
            <span className="mini-snake">🐍</span>
            <span>Snake<span>Win</span></span>
          </div>
          <div className="banner-coin coin-one" aria-hidden="true">🪙</div>
          <div className="banner-coin coin-two" aria-hidden="true">✨</div>
          <div className="snake-illustration" aria-hidden="true">
            <span className="snake-crown">👑</span>
            <span className="snake-face">🐍</span>
            <span className="snake-coin">🪙</span>
          </div>
          <div className="banner-copy">
            <div className="banner-kicker">ÚNICO</div>
            <div className="banner-title">PARA OS AMIGOS</div>
            <div className="banner-subtitle">E GANHE</div>
            <div className="banner-percent">50<span>%</span></div>
            <div className="banner-footnote">SOBRE O DEPÓSITO</div>
          </div>
          <aside className="invite-mini">
            <div className="online-count"><span /> <b>999</b> online</div>
            <div className="invite-avatar">👩🏻</div>
            <strong>CONVIDE</strong>
            <small>SEUS AMIGOS</small>
            <div className="invite-line">↗ SEU LINK<br />DE INDICAÇÃO</div>
            <div className="share-mini">COMPARTILHAR</div>
            <div className="invite-reward">VOCÊ GANHA <b>50%</b></div>
          </aside>
          <div className="banner-chest" aria-hidden="true">🧰</div>
          <div className="banner-bottom-strip">
            <span>👥 CONVIDE SEUS AMIGOS</span>
            <span>📊 ELES DEPOSITAM E JOGAM</span>
            <span>👑 VOCÊ GANHA 50%</span>
          </div>
        </section>

        <section className="deposit-card" id="deposit-panel">
          <div className="section-heading">
            <span className="heading-coin">🪙</span>
            <h1>VALOR DE ENTRADA</h1>
          </div>

          <div className="amount-grid" role="group" aria-label="Escolha um valor de entrada">
            {presets.map((preset) => (
              <button
                key={preset}
                type="button"
                className={Number(amount) === preset ? "amount-option selected" : "amount-option"}
                onClick={() => setAmount(String(preset))}
              >
                R${preset}
              </button>
            ))}
          </div>

          <label className="amount-input-wrap">
            <span className="sr-only">Valor personalizado em reais</span>
            <span className="currency-symbol">R$</span>
            <input
              type="number"
              min="10"
              step="1"
              inputMode="decimal"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              aria-label="Valor de entrada em reais"
            />
          </label>

          <div className="minimum-reward">
            <div className="reward-copy">
              <span>Recompensa mínima</span>
              <strong>R$ 100,00</strong>
            </div>
            <div className="reward-art" aria-hidden="true">🎡🎁</div>
          </div>

          <button className="deposit-cta" onClick={handleDeposit}>
            <span>Depositar para jogar</span>
            <ChevronRight className="cta-chevron" size={22} />
          </button>
          <div className="secure-note"><ShieldCheck size={14} /> Ambiente demonstrativo · pagamentos ainda não conectados</div>
        </section>

        <section className="winners-card">
          <div className="winners-heading">
            <span className="live-dot" />
            <h2>ÚLTIMOS GANHOS</h2>
            <Sparkles size={17} className="heading-sparkle" />
          </div>
          <div className="winner-list">
            {winners.map((winner, index) => (
              <div className="winner-row" key={winner.name}>
                <span className={`winner-avatar avatar-${index + 1}`}>{winner.initial}</span>
                <span className="winner-name">{winner.name}</span>
                <strong className={winner.kind === "spin" ? "winner-reward spin-reward" : "winner-reward"}>
                  {winner.reward}
                </strong>
                <span className="winner-time">{winner.time}</span>
              </div>
            ))}
          </div>
          <button
            className="see-all"
            onClick={() => openInfo("Últimos ganhos", "O histórico completo de ganhos será exibido aqui quando os dados reais estiverem conectados.")}
          >
            Ver todos os ganhos <ChevronRight size={16} />
          </button>
        </section>

        <section className="community-card">
          <div className="community-icon"><UsersRound size={22} /></div>
          <div>
            <strong>Jogue com seus amigos</strong>
            <p>Convide a galera e descubra as recompensas.</p>
          </div>
          <button
            aria-label="Convidar amigos"
            onClick={() => handleNav("Indicar")}
          >
            <ChevronRight size={20} />
          </button>
        </section>
      </main>

      <nav className="bottom-nav" aria-label="Navegação principal">
        {[
          { label: "Depositar", icon: Wallet },
          { label: "Sacar", icon: Download },
          { label: "Jogar", icon: Gamepad2 },
          { label: "Indicar", icon: Gift },
          { label: "Perfil", icon: UserRound },
        ].map(({ label, icon: Icon }) => (
          <button
            key={label}
            className={activeNav === label ? "nav-item active" : "nav-item"}
            onClick={() => handleNav(label)}
            aria-current={activeNav === label ? "page" : undefined}
          >
            <span className="nav-icon-wrap">
              <Icon size={23} strokeWidth={activeNav === label ? 2.5 : 1.8} />
              {label === "Jogar" && <span className="play-glow" />}
            </span>
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {modal && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setModal(null);
        }}>
          <section className="info-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button className="modal-close" aria-label="Fechar" onClick={() => setModal(null)}>
              <X size={19} />
            </button>
            <div className="modal-icon"><Trophy size={27} /></div>
            <h2 id="modal-title">{modal.title}</h2>
            <p>{modal.body}</p>
            <button className="modal-action" onClick={() => setModal(null)}>
              <Check size={17} /> {modal.action ?? "Entendi"}
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
