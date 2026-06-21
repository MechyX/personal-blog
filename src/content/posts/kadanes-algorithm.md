---
title: "Kadane's algorithm"
description: "An interactive visualization of the extend-or-fresh decision behind maximum subarray sums."
pubDate: 2026-06-21
section: tech
---

Let $f(i)$ be the maximum subarray sum that ends exactly at index $i$.

$$
f(0) = a_0,\qquad f(i) = \max(a_i, f(i - 1) + a_i)
$$

<div class="kadane-viz" data-kadane-viz>
  <div class="kadane-array" data-array aria-label="Array values"></div>

  <div class="kadane-options" data-options></div>

  <div class="kadane-equations" aria-live="polite">
    <p data-active-equation></p>
  </div>

  <div class="kadane-controls">
    <button type="button" data-prev aria-label="Previous step">&lsaquo;</button>
    <span data-step-label></span>
    <button type="button" data-next aria-label="Next step">&rsaquo;</button>
    <button type="button" data-reset>reset</button>
  </div>
</div>

Now, the answer to the maximum subarray problem is just

$$
\max_i f(i)
$$

## History tidbit

The optimal solution above looks like something one could come up with on the
spot, which does not seem to be the case for most. But that is exactly how the
solution was actually proposed.

In 1977, Ulf Grenander at Brown University formalised this problem when he
encountered it as a step in solving a different problem involving images. He
proposed an $O(n^3)$ solution, later improving it to $O(n^2)$.

When Michael Shamos heard about the problem, he came up with an
$O(n \log n)$ divide-and-conquer solution overnight (at least according to Wikipedia).
When Shamos presented the history of this problem at a lecture at CMU, Jay
Kadane, a statistician in a room full of computer scientists, proposed the
$O(n)$ solution on the spot.

<style>
  .kadane-viz {
    --kadane-line: rgba(79, 71, 60, 0.26);
    --kadane-wash: rgba(182, 106, 43, 0.08);
    --kadane-current-wash: rgba(182, 106, 43, 0.14);
    --kadane-answer: #4f7a3d;
    --kadane-answer-wash: rgba(79, 122, 61, 0.12);

    margin: 1.35rem 0 0;
    color: var(--ink);
  }

  .kadane-viz button {
    border: 0;
    border-radius: 0;
    background: transparent;
    color: var(--muted);
    font: inherit;
    cursor: pointer;
  }

  .kadane-viz button:disabled {
    cursor: default;
    opacity: 0.35;
  }

  .kadane-array {
    display: flex;
    gap: 0.25rem;
    justify-content: center;
    overflow-x: auto;
    padding: 0.65rem 0;
    border-top: 1px solid var(--kadane-line);
    border-bottom: 1px solid var(--kadane-line);
  }

  .kadane-cell {
    position: relative;
    display: grid;
    flex: 0 0 3rem;
    min-height: 4.9rem;
    align-content: center;
    justify-items: center;
  }

  .kadane-cell.is-future {
    color: var(--soft-muted);
    background: transparent;
  }

  .kadane-cell.is-active {
    background: var(--kadane-wash);
  }

  .kadane-cell.is-current {
    background: var(--kadane-current-wash);
  }

  .kadane-cell.is-answer {
    background: var(--kadane-answer-wash);
    box-shadow: inset 0 -2px 0 var(--kadane-answer);
  }

  .kadane-cell.is-current::before {
    position: absolute;
    top: 0.2rem;
    left: 0.65rem;
    right: 0.65rem;
    height: 2px;
    background: var(--highlight);
    content: "";
  }

  .kadane-cell-value {
    font-family: KaTeX_Main, "Times New Roman", serif;
    font-size: 1rem;
    line-height: 1.1;
  }

  .kadane-cell-index {
    margin-top: 0.3rem;
    color: var(--soft-muted);
    font-size: 0.64rem;
    line-height: 1;
  }

  .kadane-cell-solution {
    min-height: 1rem;
    margin-top: 0.45rem;
    color: var(--muted);
    font-family: KaTeX_Main, "Times New Roman", serif;
    font-size: 0.82rem;
    line-height: 1;
  }

  .kadane-cell-solution.is-answer {
    color: var(--ink);
    text-decoration: underline;
    text-decoration-color: var(--kadane-answer);
    text-decoration-thickness: 1px;
    text-underline-offset: 0.18em;
  }

  .kadane-equations {
    margin: 1rem 0 0.7rem;
    padding-bottom: 0.7rem;
    border-bottom: 1px solid var(--kadane-line);
  }

  .kadane-equations p {
    margin: 0.35rem 0;
    line-height: 1.45;
  }

  .kadane-math {
    font-family: KaTeX_Main, "Times New Roman", serif;
    font-size: 1.04rem;
    font-weight: 400;
  }

  .kadane-math-var {
    font-family: KaTeX_Math, KaTeX_Main, "Times New Roman", serif;
    font-style: italic;
  }

  .kadane-options {
    margin: -0.25rem 0 0.7rem;
  }

  .kadane-option {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    min-height: 2.35rem;
    padding: 0.58rem 0 0.48rem;
    border-bottom: 1px solid var(--kadane-line);
    color: var(--soft-muted);
  }

  .kadane-option.is-selected {
    border-bottom-color: var(--highlight);
    color: var(--ink);
  }

  .kadane-option-label {
    flex: 0 0 4rem;
    font-size: 0.86rem;
    line-height: 1.4;
  }

  .kadane-option-formula {
    font-family: KaTeX_Main, "Times New Roman", serif;
    font-size: 0.98rem;
    line-height: 1.4;
    white-space: normal;
  }

  .kadane-winner {
    margin-left: 0.75rem;
    color: var(--soft-muted);
    font-size: 0.9rem;
  }

  .kadane-controls {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin: 0.65rem 0 0;
  }

  .kadane-controls button {
    width: 1.4rem;
    height: 1.4rem;
    padding: 0;
    color: var(--muted);
    font-size: 1.15rem;
    line-height: 1;
  }

  .kadane-controls span {
    color: var(--soft-muted);
    font-size: 0.84rem;
  }

  .kadane-reset {
    margin-left: 0.35rem;
    padding: 0 0 0.12rem;
    border-bottom: 1px solid var(--kadane-line);
    font-size: 0.84rem;
  }

  @media (max-width: 620px) {
    .kadane-cell {
      flex-basis: 2.6rem;
    }

    .kadane-option {
      display: block;
    }

    .kadane-option-formula {
      display: block;
      margin-top: 0.15rem;
    }

  }
</style>

<script>
  (() => {
    const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

    function computeSteps(arr) {
      const steps = [];
      let activeSum = arr[0];
      let activeStart = 0;

      steps.push({
        i: 0,
        val: arr[0],
        activeSum,
        activeStart,
        activeEnd: 0,
        chose: "base",
        prevActive: null,
        candidates: null
      });

      for (let i = 1; i < arr.length; i += 1) {
        const val = arr[i];
        const prevActive = activeSum;
        const extend = prevActive + val;
        const fresh = val;

        if (extend >= fresh) {
          activeSum = extend;
        } else {
          activeSum = fresh;
          activeStart = i;
        }

        steps.push({
          i,
          val,
          activeSum,
          activeStart,
          activeEnd: i,
          chose: extend >= fresh ? "extend" : "fresh",
          prevActive,
          candidates: { extend, fresh }
        });
      }

      return steps;
    }

    function renderViz(root) {
      const steps = computeSteps(arr);
      const answerStep = steps.reduce((best, step) =>
        step.activeSum > best.activeSum ? step : best
      );
      const frames = steps.flatMap((step, index) => {
        if (index === 0) {
          return [{ phase: "take", step, view: step }];
        }

        return [
          { phase: "compare", step, view: steps[index - 1] },
          { phase: "take", step, view: step }
        ];
      }).concat({
        phase: "answer",
        step: answerStep,
        view: answerStep
      });
      let frameIdx = 0;

      const arrayMount = root.querySelector("[data-array]");
      const activeEquation = root.querySelector("[data-active-equation]");
      const options = root.querySelector("[data-options]");
      const prevButton = root.querySelector("[data-prev]");
      const nextButton = root.querySelector("[data-next]");
      const resetButton = root.querySelector("[data-reset]");
      const stepLabel = root.querySelector("[data-step-label]");

      function mathVar(value) {
        return `<span class="kadane-math-var">${value}</span>`;
      }

      function renderArray(frame) {
        const { step, view } = frame;
        const solvedUntil = frame.phase === "answer"
          ? arr.length - 1
          : frame.phase === "take"
            ? step.i
            : step.i - 1;
        const isAnswerFrame = frame.phase === "answer";

        arrayMount.innerHTML = arr.map((value, index) => {
          const inActive = index >= view.activeStart && index <= view.activeEnd;
          const inAnswer = isAnswerFrame && index >= answerStep.activeStart && index <= answerStep.activeEnd;
          const solution = index <= solvedUntil ? steps[index].activeSum : "";
          const isAnswerSolution = isAnswerFrame && index === answerStep.i;
          const classes = [
            "kadane-cell",
            index > step.i ? "is-future" : "",
            inActive ? "is-active" : "",
            inAnswer ? "is-answer" : "",
            index === step.i && !isAnswerFrame ? "is-current" : ""
          ].filter(Boolean).join(" ");
          const solutionClasses = [
            "kadane-cell-solution",
            isAnswerSolution ? "is-answer" : ""
          ].filter(Boolean).join(" ");

          return `
            <div class="${classes}">
              <span class="kadane-cell-value">${value}</span>
              <span class="kadane-cell-index">${index}</span>
              <span class="${solutionClasses}">${solution}</span>
            </div>
          `;
        }).join("");
      }

      function renderEquations(frame) {
        const { phase, step, view } = frame;

        if (phase === "answer") {
          activeEquation.innerHTML = `
            <span class="kadane-math">
              answer = ${step.activeSum}
            </span>
            <span class="kadane-winner">starts at ${step.activeStart}, ends at ${step.activeEnd}</span>
          `;
          options.innerHTML = "";
          return;
        }

        if (!step.candidates) {
          activeEquation.innerHTML = `<span class="kadane-math">${mathVar("f")}(0) = ${step.activeSum}</span>`;
          options.innerHTML = `
            <div class="kadane-option is-selected">
              <span class="kadane-option-label">start</span>
              <span class="kadane-option-formula">${mathVar("a")}<sub>0</sub> = ${step.activeSum}</span>
            </div>
          `;
          return;
        }

        const choseExtend = step.chose === "extend";
        const selectedExtend = phase === "take" && choseExtend;
        const selectedFresh = phase === "take" && !choseExtend;
        const activeResult = phase === "take" ? ` = ${step.activeSum}` : "";
        const winnerText = phase === "take" ? `${step.chose} wins` : "";

        activeEquation.innerHTML = `
          <span class="kadane-math">
            ${mathVar("f")}(${step.i}) =
            max(extend, fresh)${activeResult}
          </span>
          ${winnerText ? `<span class="kadane-winner">${winnerText}</span>` : ""}
        `;
        options.innerHTML = `
          <div class="kadane-option ${selectedExtend ? "is-selected" : ""}">
            <span class="kadane-option-label">extend</span>
            <span class="kadane-option-formula">${mathVar("f")}(${step.i - 1}) + ${mathVar("a")}<sub>${step.i}</sub> = ${step.prevActive} + ${step.val} = ${step.candidates.extend}</span>
          </div>
          <div class="kadane-option ${selectedFresh ? "is-selected" : ""}">
            <span class="kadane-option-label">fresh</span>
            <span class="kadane-option-formula">${mathVar("a")}<sub>${step.i}</sub> = ${step.candidates.fresh}</span>
          </div>
        `;
      }

      function render() {
        const frame = frames[Math.min(frameIdx, frames.length - 1)];

        renderArray(frame);
        renderEquations(frame);

        stepLabel.textContent = frame.phase === "answer" ? "answer" : `i = ${frame.step.i}`;
        prevButton.disabled = frameIdx <= 0;
        nextButton.disabled = frameIdx >= frames.length - 1;
      }

      prevButton.addEventListener("click", () => {
        frameIdx = Math.max(0, frameIdx - 1);
        render();
      });

      nextButton.addEventListener("click", () => {
        frameIdx = Math.min(frames.length - 1, frameIdx + 1);
        render();
      });

      resetButton.classList.add("kadane-reset");
      resetButton.addEventListener("click", () => {
        frameIdx = 0;
        render();
      });

      render();
    }

    document.querySelectorAll("[data-kadane-viz]").forEach(renderViz);
  })();
</script>
