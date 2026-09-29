import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Flame, RotateCcw, Target, Timer, Trophy, X } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SnakeWin — É mês de churrasco!" },
      { name: "description", content: "Jogue o desafio da picanha no SnakeWin." },
    ],
  }),
  component: Index,
});

type Position = { left: number; top: number };

function randomTarget(): Position {
  // Keep the collectible inside the artboard and away from the bottom controls.
  return { left: 15 + Math.random() * 68, top: 22 + Math.random() * 49 };
}

function Index() {
  const [amount, setAmount] = useState(1);
  const [credits, setCredits] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [seconds, setSeconds] = useState(15);
  const [score, setScore] = useState(0);
  const [target, setTarget] = useState<Position>({ left: 50, top: 45 });
  const [animationKey, setAnimationKey] = useState(0);
  const [notice, setNotice] = useState("Seus créditos são virtuais. Toque em JOGAR para começar!");
  const [showNotice, setShowNotice] = useState(true);

  const money = (value: number) =>
    value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setIsPlaying(false);
          setNotice(`Fim da rodada! Você acertou ${score} vezes e ganhou ${money(score * amount * 2)} créditos virtuais.`);
          setShowNotice(true);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isPlaying, amount, score]);

  useEffect(() => {
    if (!showNotice) return;
    const timer = window.setTimeout(() => setShowNotice(false), 4500);
    return () => window.clearTimeout(timer);
  }, [showNotice, animationKey]);

  const handlePlay = () => {
    if (isPlaying) return;
    if (credits < amount) {
      setNotice("Créditos insuficientes. Reduza a aposta para iniciar outra rodada.");
      setShowNotice(true);
      return;
    }
    setCredits((value) => value - amount);
    setScore(0);
    setSeconds(15);
    setTarget(randomTarget());
    setAnimationKey((value) => value + 1);
    setIsPlaying(true);
    setNotice("Valendo! Toque na picanha que aparece na tela!");
    setShowNotice(true);
  };

  const handleHit = () => {
    if (!isPlaying) return;
    setScore((value) => value + 1);
    setCredits((value) => value + amount * 2);
    setTarget(randomTarget());
    setAnimationKey((value) => value + 1);
  };

  const resetGame = () => {
    setIsPlaying(false);
    setSeconds(15);
    setScore(0);
    setCredits(100);
    setAmount(1);
    setNotice("Créditos reiniciados para 100. Vamos jogar!");
    setShowNotice(true);
  };

  return (
    <main className="original-design-page">
      <div className={`original-artboard ${isPlaying ? "is-playing" : ""}`}>
        <img
          className="original-design-image"
          src={import.meta.env.BASE_URL + "snakewin-original.jpeg"}
          alt="Arte original SnakeWin com chef churrasqueiro, picanha e botão Jogar."
          fetchPriority="high"
        />

        <div className="game-hud" aria-live="polite">
          <div className="game-hud-stat"><Trophy size={16} /><span><small>PONTOS</small><b>{score}</b></span></div>
          <div className="game-hud-stat"><Timer size={16} /><span><small>TEMPO</small><b>{seconds}s</b></span></div>
          <div className="game-hud-stat"><Target size={16} /><span><small>CRÉDITOS</small><b>{credits}</b></span></div>
        </div>

        {isPlaying && (
          <button
            key={animationKey}
            className="steak-target"
            style={{ left: `${target.left}%`, top: `${target.top}%` }}
            onClick={handleHit}
            aria-label="Capturar picanha"
            title="Toque para pontuar!"
          >
            🥩
            <span>+{amount * 2}</span>
          </button>
        )}

        <button className="image-hotspot play-hotspot" onClick={handlePlay} aria-label={isPlaying ? "Partida em andamento" : "Jogar"} disabled={isPlaying}>
          <span className="sr-only">{isPlaying ? "Partida em andamento" : "Jogar"}</span>
        </button>
        <button
          className="image-hotspot bet-minus-hotspot"
          onClick={() => setAmount((value) => Math.max(1, value - 1))}
          aria-label="Diminuir aposta"
          disabled={isPlaying}
        />
        <span className="amount-overlay" aria-live="polite">R$ {money(amount)}</span>
        <button
          className="image-hotspot bet-plus-hotspot"
          onClick={() => setAmount((value) => Math.min(20, value + 1))}
          aria-label="Aumentar aposta"
          disabled={isPlaying}
        />

        <button className="game-reset" onClick={resetGame} aria-label="Reiniciar créditos virtuais" title="Reiniciar créditos">
          <RotateCcw size={16} /> Reiniciar
        </button>
      </div>

      {showNotice && (
        <div className="play-toast" role="status">
          <Flame size={20} />
          <span><strong>{isPlaying ? "DESAFIO DA PICANHA!" : "SNAKEWIN"}</strong><small>{notice}</small></span>
          <button className="toast-close" onClick={() => setShowNotice(false)} aria-label="Fechar aviso"><X size={15} /></button>
        </div>
      )}
      <p className="virtual-credits-note">Jogo de demonstração com créditos virtuais — não envolve dinheiro real.</p>
    </main>
  );
}
