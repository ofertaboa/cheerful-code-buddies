import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Flame, Trophy, X } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SnakeWin — É mês de churrasco!" },
      { name: "description", content: "SnakeWin — arte original e experiência de churrasco." },
    ],
  }),
  component: Index,
});

function Index() {
  const [amount, setAmount] = useState(1);
  const [modal, setModal] = useState<{ title: string; body: string } | null>(null);
  const money = (value: number) =>
    value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const handlePlay = () =>
    setModal({
      title: "Bora jogar! 🔥",
      body: "Você selecionou uma aposta de R$ " + money(amount) + ". Esta é uma demonstração visual; não há apostas, pagamentos ou prêmios reais conectados.",
    });

  return (
    <main className="original-design-page">
      <div className="original-artboard">
        <img
          className="original-design-image"
          src={import.meta.env.BASE_URL + "snakewin-original.jpeg"}
          alt="Arte original SnakeWin: É mês de churrasco, entra o grosso; chef com picanha, botão Jogar e painel de aposta."
          fetchPriority="high"
        />
        <button className="image-hotspot play-hotspot" onClick={handlePlay} aria-label="Jogar">
          <span className="sr-only">Jogar</span>
        </button>
        <button
          className="image-hotspot bet-minus-hotspot"
          onClick={() => setAmount((value) => Math.max(1, Number((value - 1).toFixed(2))))}
          aria-label="Diminuir aposta"
        />
        <span className="amount-overlay" aria-live="polite">R$ {money(amount)}</span>
        <button
          className="image-hotspot bet-plus-hotspot"
          onClick={() => setAmount((value) => Number((value + 1).toFixed(2)))}
          aria-label="Aumentar aposta"
        />
      </div>

      {modal && (
        <div className="grill-modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setModal(null);
        }}>
          <section className="grill-modal" role="dialog" aria-modal="true" aria-labelledby="grill-modal-title">
            <button className="grill-modal-close" aria-label="Fechar" onClick={() => setModal(null)}>
              <X size={19} />
            </button>
            <div className="grill-modal-icon"><Trophy size={28} /></div>
            <h2 id="grill-modal-title">{modal.title}</h2>
            <p>{modal.body}</p>
            <button className="grill-modal-action" onClick={() => setModal(null)}>
              <Check size={17} /> Entendi
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
