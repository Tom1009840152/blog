type Point = { x: number; y: number };
type TokenNode = Point & { stage: number; row: number };
type AttentionEdge = { from: TokenNode; to: TokenNode; head: number; phase: number };

const colorByDomain: Record<string, string> = {
  'model-foundations': '#748ee6',
  'aesthetic-foundations': '#db8357',
  'development-foundations': '#4faf96',
  'application-practice': '#a47ac9',
  other: '#b89b3e'
};

const stagePositions = [0.4, 0.51, 0.62, 0.73, 0.84];
const tokenRows = 8;

function hexToRgb(hex: string) {
  const value = hex.replace('#', '');
  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16)
  };
}

function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

export function bootNeuralHero() {
  const home = document.querySelector<HTMLElement>('[data-transformer-home]');
  const stage = document.querySelector<HTMLElement>('[data-network-stage]');
  const canvas = stage?.querySelector<HTMLCanvasElement>('[data-neural-canvas]');
  const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-domain-card]'));
  const title = stage?.querySelector<HTMLElement>('[data-network-title-output]');
  const status = stage?.querySelector<HTMLElement>('[data-network-status-output]');
  const indexOutput = stage?.querySelector<HTMLElement>('[data-network-index-output]');
  const englishOutput = stage?.querySelector<HTMLElement>('[data-network-english-output]');

  if (!home || !stage || !canvas || !title || !status || !indexOutput || !englishOutput || !cards.length) return;
  const context = canvas.getContext('2d');
  if (!context) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const random = seededRandom(26082026);
  const nodes: TokenNode[] = [];
  const attentionEdges: AttentionEdge[] = [];
  let width = 0;
  let height = 0;
  let scale = 1;
  let pointerX = 0;
  let pointerY = 0;
  let activeDomain = cards[0].dataset.domainCard || 'model-foundations';
  let activeDomainIndex = 0;
  let raf = 0;
  let destroyed = false;

  stagePositions.forEach((stageX, stageIndex) => {
    for (let row = 0; row < tokenRows; row += 1) {
      const y = 0.27 + row * 0.057;
      nodes.push({ x: stageX, y, stage: stageIndex, row });
    }
  });

  const stageNodes = (stageIndex: number) => nodes.filter(node => node.stage === stageIndex);
  const embeddingNodes = stageNodes(1);
  const attentionNodes = stageNodes(2);

  embeddingNodes.forEach((from, row) => {
    const targets = new Set<number>([
      row,
      (row + 2) % tokenRows,
      (row + 5) % tokenRows,
      Math.floor(random() * tokenRows)
    ]);
    targets.forEach((targetRow, head) => {
      attentionEdges.push({
        from,
        to: attentionNodes[targetRow],
        head: head % 4,
        phase: random()
      });
    });
  });

  function resize() {
    const bounds = stage.getBoundingClientRect();
    width = Math.max(1, bounds.width);
    height = Math.max(1, bounds.height);
    scale = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(scale, 0, 0, scale, 0, 0);
    render(performance.now());
  }

  function project(point: Point, depth = 1): Point {
    const compact = width < 760;
    const xShift = compact ? -width * 0.13 : 0;
    return {
      x: point.x * width + xShift + pointerX * 16 * depth,
      y: point.y * height + pointerY * 11 * depth
    };
  }

  function drawAttentionMatrix(activeRgb: ReturnType<typeof hexToRgb>, time: number) {
    const center = project({ x: stagePositions[2], y: 0.485 }, 0.35);
    const cell = Math.max(8, Math.min(14, width * 0.0085));
    const gap = 2.5;
    const matrixSize = tokenRows * cell + (tokenRows - 1) * gap;
    const startX = -matrixSize / 2;
    const startY = -matrixSize / 2;

    context.save();
    context.translate(center.x - matrixSize * 0.42, center.y);
    context.transform(1, 0.16, -0.08, 0.94, 0, 0);
    for (let row = 0; row < tokenRows; row += 1) {
      for (let column = 0; column < tokenRows; column += 1) {
        const focusRow = (activeDomainIndex * 2 + 1) % tokenRows;
        const distance = Math.abs(row - focusRow) + Math.abs(column - ((focusRow + activeDomainIndex) % tokenRows));
        const wave = reducedMotion ? 0.5 : (Math.sin(time * 0.0018 + row * 0.8 + column * 0.55) + 1) / 2;
        const weight = Math.max(0.05, 0.68 - distance * 0.075) * (0.66 + wave * 0.34);
        context.fillStyle = `rgba(${activeRgb.r},${activeRgb.g},${activeRgb.b},${0.04 + weight * 0.34})`;
        context.fillRect(startX + column * (cell + gap), startY + row * (cell + gap), cell, cell);
      }
    }

    const scan = reducedMotion ? 0.5 : (time * 0.00016) % 1;
    const scanY = startY + matrixSize * scan;
    const scanGradient = context.createLinearGradient(startX, scanY, startX + matrixSize, scanY);
    scanGradient.addColorStop(0, `rgba(${activeRgb.r},${activeRgb.g},${activeRgb.b},0)`);
    scanGradient.addColorStop(0.5, `rgba(${activeRgb.r},${activeRgb.g},${activeRgb.b},0.55)`);
    scanGradient.addColorStop(1, `rgba(${activeRgb.r},${activeRgb.g},${activeRgb.b},0)`);
    context.fillStyle = scanGradient;
    context.fillRect(startX, scanY, matrixSize, 1);
    context.restore();
  }

  function drawArchitecturePanels(activeRgb: ReturnType<typeof hexToRgb>, time: number) {
    const top = height * 0.205;
    const bottom = height * 0.755;
    const panelWidth = Math.max(34, width * 0.035);
    const skew = Math.max(8, width * 0.008);

    stagePositions.forEach((position, index) => {
      const center = project({ x: position, y: 0.48 }, 0.4);
      const repeatCount = index === 2 || index === 4 ? 4 : 1;
      for (let repeat = repeatCount - 1; repeat >= 0; repeat -= 1) {
        const offset = repeat * 6;
        context.beginPath();
        context.moveTo(center.x - panelWidth / 2 + offset, top - skew + offset * 0.35);
        context.lineTo(center.x + panelWidth / 2 + offset, top + skew + offset * 0.35);
        context.lineTo(center.x + panelWidth / 2 + offset, bottom + skew + offset * 0.35);
        context.lineTo(center.x - panelWidth / 2 + offset, bottom - skew + offset * 0.35);
        context.closePath();
        const activePanel = index === 2 || index === 4;
        context.fillStyle = activePanel
          ? `rgba(${activeRgb.r},${activeRgb.g},${activeRgb.b},${0.035 + (repeatCount - repeat) * 0.012})`
          : 'rgba(255,255,255,0.1)';
        context.strokeStyle = activePanel
          ? `rgba(${activeRgb.r},${activeRgb.g},${activeRgb.b},${0.2 + repeat * 0.035})`
          : 'rgba(52,48,42,0.18)';
        context.lineWidth = repeat === 0 ? 1.2 : 0.75;
        context.fill();
        context.stroke();
      }

      const pulse = reducedMotion ? 0.5 : (Math.sin(time * 0.0014 + index) + 1) / 2;
      context.fillStyle = `rgba(${activeRgb.r},${activeRgb.g},${activeRgb.b},${0.22 + pulse * 0.22})`;
      context.fillRect(center.x - panelWidth / 2, top - skew - 7, panelWidth * pulse, 1.4);
    });
  }

  function drawTokenFlow(activeRgb: ReturnType<typeof hexToRgb>, time: number) {
    for (let stageIndex = 0; stageIndex < stagePositions.length - 1; stageIndex += 1) {
      if (stageIndex === 1) continue;
      for (let row = 0; row < tokenRows; row += 1) {
        const from = project(nodes[stageIndex * tokenRows + row]);
        const to = project(nodes[(stageIndex + 1) * tokenRows + row]);
        const activeRow = row === (activeDomainIndex * 2 + 1) % tokenRows;
        context.beginPath();
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        context.strokeStyle = activeRow
          ? `rgba(${activeRgb.r},${activeRgb.g},${activeRgb.b},0.58)`
          : 'rgba(51,47,41,0.16)';
        context.lineWidth = activeRow ? 1.5 : 0.75;
        context.stroke();

        const progress = reducedMotion ? 0.55 : (time * 0.00011 + row * 0.13 + stageIndex * 0.21) % 1;
        const x = from.x + (to.x - from.x) * progress;
        const y = from.y + (to.y - from.y) * progress;
        context.beginPath();
        context.arc(x, y, activeRow ? 2.2 : 1.1, 0, Math.PI * 2);
        context.fillStyle = activeRow
          ? `rgb(${activeRgb.r},${activeRgb.g},${activeRgb.b})`
          : 'rgba(55,51,44,0.38)';
        context.fill();
      }
    }
  }

  function drawAttention(activeRgb: ReturnType<typeof hexToRgb>, time: number) {
    attentionEdges.forEach((edge, edgeIndex) => {
      const from = project(edge.from, 1.1);
      const to = project(edge.to, 1.1);
      const activeHead = edge.head === activeDomainIndex % 4;
      const activeRow = edge.from.row === (activeDomainIndex * 2 + 1) % tokenRows;
      const controlX = (from.x + to.x) / 2;
      const curve = (edge.to.row - edge.from.row) * 3.4 + (edge.head - 1.5) * 5;
      context.beginPath();
      context.moveTo(from.x, from.y);
      context.quadraticCurveTo(controlX, (from.y + to.y) / 2 + curve, to.x, to.y);
      context.strokeStyle = activeHead || activeRow
        ? `rgba(${activeRgb.r},${activeRgb.g},${activeRgb.b},${activeRow ? 0.42 : 0.23})`
          : 'rgba(50,46,40,0.1)';
      context.lineWidth = activeRow ? 1.55 : 0.7;
      context.shadowColor = activeHead ? `rgba(${activeRgb.r},${activeRgb.g},${activeRgb.b},0.7)` : 'transparent';
      context.shadowBlur = activeHead ? 5 : 0;
      context.stroke();
      context.shadowBlur = 0;

      if ((edgeIndex + activeDomainIndex) % 3 === 0) {
        const progress = reducedMotion ? edge.phase : (time * 0.00008 + edge.phase) % 1;
        const oneMinus = 1 - progress;
        const x = oneMinus * oneMinus * from.x + 2 * oneMinus * progress * controlX + progress * progress * to.x;
        const controlY = (from.y + to.y) / 2 + curve;
        const y = oneMinus * oneMinus * from.y + 2 * oneMinus * progress * controlY + progress * progress * to.y;
        context.beginPath();
        context.arc(x, y, activeHead ? 2.1 : 1.2, 0, Math.PI * 2);
        context.fillStyle = activeHead
          ? `rgb(${activeRgb.r},${activeRgb.g},${activeRgb.b})`
          : 'rgba(55,51,44,0.24)';
        context.fill();
      }
    });
  }

  function drawAttentionHeads(activeRgb: ReturnType<typeof hexToRgb>, time: number) {
    const x = (stagePositions[1] + stagePositions[2]) / 2;
    const activeHead = activeDomainIndex % 4;

    for (let head = 0; head < 4; head += 1) {
      const position = project({ x, y: 0.34 + head * 0.095 }, 1.15);
      const active = head === activeHead;
      const pulse = reducedMotion ? 0.5 : (Math.sin(time * 0.003 + head) + 1) / 2;
      const radius = active ? 8.5 + pulse * 1.5 : 6;

      context.beginPath();
      context.arc(position.x, position.y, radius + 5, 0, Math.PI * 2);
      context.strokeStyle = active
        ? `rgba(${activeRgb.r},${activeRgb.g},${activeRgb.b},0.38)`
        : 'rgba(50,46,40,0.12)';
      context.setLineDash(active ? [3, 4] : []);
      context.stroke();
      context.setLineDash([]);

      context.beginPath();
      context.arc(position.x, position.y, radius, 0, Math.PI * 2);
      context.fillStyle = active
        ? `rgba(${activeRgb.r},${activeRgb.g},${activeRgb.b},0.85)`
        : 'rgba(246,243,236,0.82)';
      context.strokeStyle = active
        ? `rgb(${activeRgb.r},${activeRgb.g},${activeRgb.b})`
        : 'rgba(49,45,39,0.22)';
      context.lineWidth = 1;
      context.shadowColor = active ? `rgb(${activeRgb.r},${activeRgb.g},${activeRgb.b})` : 'transparent';
      context.shadowBlur = active ? 12 : 0;
      context.fill();
      context.stroke();
      context.shadowBlur = 0;

      context.fillStyle = active ? 'rgba(255,255,255,0.94)' : 'rgba(49,45,39,0.58)';
      context.font = '500 6px JetBrains Mono, monospace';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(`H${head + 1}`, position.x, position.y + 0.5);
    }
  }

  function drawResidualStream(activeRgb: ReturnType<typeof hexToRgb>, time: number) {
    const start = project({ x: stagePositions[0], y: 0.235 }, 0.8);
    const end = project({ x: stagePositions[4], y: 0.235 }, 0.8);
    const arch = Math.max(46, height * 0.095);
    const controlOne = { x: start.x + (end.x - start.x) * 0.28, y: start.y - arch };
    const controlTwo = { x: start.x + (end.x - start.x) * 0.72, y: end.y - arch };

    context.beginPath();
    context.moveTo(start.x, start.y);
    context.bezierCurveTo(controlOne.x, controlOne.y, controlTwo.x, controlTwo.y, end.x, end.y);
    context.strokeStyle = `rgba(${activeRgb.r},${activeRgb.g},${activeRgb.b},0.44)`;
    context.lineWidth = 1.45;
    context.setLineDash([5, 7]);
    context.stroke();
    context.setLineDash([]);

    const progress = reducedMotion ? 0.58 : (time * 0.00007) % 1;
    const oneMinus = 1 - progress;
    const x = oneMinus ** 3 * start.x
      + 3 * oneMinus ** 2 * progress * controlOne.x
      + 3 * oneMinus * progress ** 2 * controlTwo.x
      + progress ** 3 * end.x;
    const y = oneMinus ** 3 * start.y
      + 3 * oneMinus ** 2 * progress * controlOne.y
      + 3 * oneMinus * progress ** 2 * controlTwo.y
      + progress ** 3 * end.y;
    context.beginPath();
    context.arc(x, y, 2.8, 0, Math.PI * 2);
    context.fillStyle = `rgb(${activeRgb.r},${activeRgb.g},${activeRgb.b})`;
    context.shadowColor = context.fillStyle;
    context.shadowBlur = 12;
    context.fill();
    context.shadowBlur = 0;
  }

  function drawFeedForward(activeRgb: ReturnType<typeof hexToRgb>, time: number) {
    const startX = stagePositions[3] + 0.025;
    const endX = stagePositions[4] - 0.025;
    for (let column = 0; column < 3; column += 1) {
      for (let row = 0; row < 13; row += 1) {
        const position = project({
          x: startX + (endX - startX) * (column / 2),
          y: 0.255 + row * 0.035
        });
        const active = row % 5 === activeDomainIndex;
        const pulse = reducedMotion ? 0 : (Math.sin(time * 0.002 + row + column) + 1) * 0.35;
        context.beginPath();
        context.arc(position.x, position.y, (active ? 1.8 : 0.85) + pulse, 0, Math.PI * 2);
        context.fillStyle = active
          ? `rgba(${activeRgb.r},${activeRgb.g},${activeRgb.b},0.76)`
          : 'rgba(53,49,43,0.25)';
        context.fill();
      }
    }
  }

  function drawProjectionCore(activeRgb: ReturnType<typeof hexToRgb>, time: number) {
    const outputNodes = stageNodes(4);
    const core = project({ x: 0.93, y: 0.485 }, 0.75);
    const activeRowIndex = (activeDomainIndex * 2 + 1) % tokenRows;

    outputNodes.forEach((node, row) => {
      const from = project(node, 0.9);
      const activeRow = row === activeRowIndex;
      const controlX = from.x + (core.x - from.x) * 0.55;
      context.beginPath();
      context.moveTo(from.x, from.y);
      context.quadraticCurveTo(controlX, from.y, core.x, core.y);
      context.strokeStyle = activeRow
        ? `rgba(${activeRgb.r},${activeRgb.g},${activeRgb.b},0.52)`
        : 'rgba(49,45,39,0.09)';
      context.lineWidth = activeRow ? 1.35 : 0.55;
      context.stroke();

      if (activeRow || row % 3 === activeDomainIndex % 3) {
        const progress = reducedMotion ? 0.62 : (time * 0.00012 + row * 0.11) % 1;
        const oneMinus = 1 - progress;
        const x = oneMinus * oneMinus * from.x + 2 * oneMinus * progress * controlX + progress * progress * core.x;
        const y = oneMinus * oneMinus * from.y + 2 * oneMinus * progress * from.y + progress * progress * core.y;
        context.beginPath();
        context.arc(x, y, activeRow ? 2.5 : 1.1, 0, Math.PI * 2);
        context.fillStyle = activeRow
          ? `rgb(${activeRgb.r},${activeRgb.g},${activeRgb.b})`
          : 'rgba(51,47,41,0.25)';
        context.fill();
      }
    });

    const coreGlow = context.createRadialGradient(core.x, core.y, 0, core.x, core.y, 54);
    coreGlow.addColorStop(0, `rgba(${activeRgb.r},${activeRgb.g},${activeRgb.b},0.48)`);
    coreGlow.addColorStop(0.38, `rgba(${activeRgb.r},${activeRgb.g},${activeRgb.b},0.16)`);
    coreGlow.addColorStop(1, `rgba(${activeRgb.r},${activeRgb.g},${activeRgb.b},0)`);
    context.fillStyle = coreGlow;
    context.beginPath();
    context.arc(core.x, core.y, 62, 0, Math.PI * 2);
    context.fill();

    context.save();
    context.translate(core.x, core.y);
    context.rotate(reducedMotion ? -0.3 : time * 0.00022);
    context.strokeStyle = `rgba(${activeRgb.r},${activeRgb.g},${activeRgb.b},0.5)`;
    context.lineWidth = 1.1;
    context.setLineDash([9, 8]);
    context.beginPath();
    context.arc(0, 0, 36, -0.25, Math.PI * 1.45);
    context.stroke();
    context.rotate(reducedMotion ? 0.6 : -time * 0.00047);
    context.strokeStyle = 'rgba(48,44,38,0.22)';
    context.setLineDash([3, 6]);
    context.beginPath();
    context.arc(0, 0, 49, 0.35, Math.PI * 1.8);
    context.stroke();
    context.restore();
    context.setLineDash([]);

    context.beginPath();
    context.arc(core.x, core.y, 9.5, 0, Math.PI * 2);
    context.fillStyle = `rgb(${activeRgb.r},${activeRgb.g},${activeRgb.b})`;
    context.shadowColor = context.fillStyle;
    context.shadowBlur = 18;
    context.fill();
    context.shadowBlur = 0;
    context.beginPath();
    context.arc(core.x, core.y, 2.2, 0, Math.PI * 2);
    context.fillStyle = 'rgba(255,255,255,0.92)';
    context.fill();
  }

  function drawNodes(activeRgb: ReturnType<typeof hexToRgb>, time: number) {
    nodes.forEach(node => {
      const position = project(node);
      const activeRow = node.row === (activeDomainIndex * 2 + 1) % tokenRows;
      const pulse = reducedMotion ? 0 : (Math.sin(time * 0.0024 + node.row + node.stage) + 1) * 0.32;
      context.beginPath();
      context.arc(position.x, position.y, (activeRow ? 3.7 : 1.85) + pulse, 0, Math.PI * 2);
      context.fillStyle = activeRow
        ? `rgb(${activeRgb.r},${activeRgb.g},${activeRgb.b})`
        : 'rgba(43,40,35,0.48)';
      context.shadowColor = activeRow ? context.fillStyle : 'transparent';
      context.shadowBlur = activeRow ? 10 : 0;
      context.fill();
      context.shadowBlur = 0;

      if (node.stage === 0) {
        context.strokeStyle = activeRow
          ? `rgba(${activeRgb.r},${activeRgb.g},${activeRgb.b},0.45)`
          : 'rgba(53,49,43,0.15)';
        context.strokeRect(position.x - 8, position.y - 5, 16, 10);
      }
    });
  }

  function render(time: number) {
    context.clearRect(0, 0, width, height);
    const activeColor = colorByDomain[activeDomain] || colorByDomain['model-foundations'];
    const activeRgb = hexToRgb(activeColor);

    const glowCenter = project({ x: 0.61, y: 0.45 }, 0.5);
    const glow = context.createRadialGradient(
      glowCenter.x,
      glowCenter.y,
      0,
      glowCenter.x,
      glowCenter.y,
      Math.max(260, width * 0.28)
    );
    glow.addColorStop(0, `rgba(${activeRgb.r},${activeRgb.g},${activeRgb.b},0.16)`);
    glow.addColorStop(0.52, `rgba(${activeRgb.r},${activeRgb.g},${activeRgb.b},0.045)`);
    glow.addColorStop(1, `rgba(${activeRgb.r},${activeRgb.g},${activeRgb.b},0)`);
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);

    drawAttentionMatrix(activeRgb, time);
    drawArchitecturePanels(activeRgb, time);
    drawTokenFlow(activeRgb, time);
    drawAttention(activeRgb, time);
    drawAttentionHeads(activeRgb, time);
    drawResidualStream(activeRgb, time);
    drawFeedForward(activeRgb, time);
    drawProjectionCore(activeRgb, time);
    drawNodes(activeRgb, time);
  }

  function tick(time: number) {
    if (destroyed) return;
    render(time);
    raf = window.requestAnimationFrame(tick);
  }

  function animateOutputs() {
    [title, status, indexOutput, englishOutput].forEach(output => {
      output.animate(
        [
          { opacity: 0.2, transform: 'translateY(5px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ],
        { duration: 240, easing: 'cubic-bezier(.2,.8,.2,1)' }
      );
    });
  }

  function activate(card: HTMLElement) {
    const domain = card.dataset.domainCard;
    if (!domain || !colorByDomain[domain]) return;
    activeDomain = domain;
    activeDomainIndex = Math.max(0, cards.indexOf(card));
    cards.forEach(item => item.dataset.active = item === card ? 'true' : 'false');
    title.textContent = card.dataset.networkTitle || '';
    status.textContent = card.dataset.networkStatus || '';
    indexOutput.textContent = card.dataset.networkIndex || '';
    englishOutput.textContent = card.dataset.networkEnglish || '';
    stage.style.setProperty('--network-accent', colorByDomain[domain]);
    document.documentElement.style.setProperty('--home-accent', colorByDomain[domain]);
    animateOutputs();
    if (reducedMotion) render(performance.now());
  }

  cards.forEach(card => {
    card.addEventListener('pointerenter', () => activate(card));
    card.addEventListener('focus', () => activate(card));
  });

  home.addEventListener('pointermove', event => {
    pointerX = event.clientX / Math.max(1, window.innerWidth) - 0.5;
    pointerY = event.clientY / Math.max(1, window.innerHeight) - 0.5;
  });
  home.addEventListener('pointerleave', () => {
    pointerX = 0;
    pointerY = 0;
  });

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(stage);
  activate(cards[0]);
  resize();
  if (!reducedMotion) raf = window.requestAnimationFrame(tick);

  window.addEventListener('pagehide', () => {
    destroyed = true;
    resizeObserver.disconnect();
    window.cancelAnimationFrame(raf);
  }, { once: true });
}
