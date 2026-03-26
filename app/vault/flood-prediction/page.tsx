import Image from "next/image";
import Link from "next/link";

const techStack = ["Python", "Scikit-learn", "Pandas", "XGBoost"];

export default function FloodPredictionPage() {
  return (
    <section className="space-y-8">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-[0_0_45px_-32px_rgba(34,211,238,1)] md:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-300">
          Project Deep Dive
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-100 md:text-4xl">
          Flood Prediction ML Model
        </h1>
        <div className="mt-4 flex flex-wrap gap-2">
          {techStack.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-xs text-cyan-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="https://github.com/Shrey42-dot/Flood-Prediction-ML-model"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-cyan-300/70 hover:text-cyan-200"
          >
            View GitHub Repository
          </Link>
          <Link
            href="/vault"
            className="rounded-md border border-cyan-400/50 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300 transition hover:bg-cyan-500/20"
          >
            Back to Vault
          </Link>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="font-mono text-xl text-cyan-300">About the Project</h2>
            <div className="mt-3 space-y-3 text-zinc-300">
              <p className="leading-7">
                This project predicts flood probability using supervised machine
                learning on an environmental dataset sourced from Kaggle. The
                workflow focuses on robust preprocessing, domain-aware feature
                engineering, and comparative model evaluation for reliable risk
                estimation.
              </p>
              <p className="leading-7">
                Feature engineering included crafted interaction terms such as
                <span className="font-mono text-cyan-300">
                  {" "}
                  Rainfall × Deforestation
                </span>{" "}
                to capture compounding environmental effects often missed by
                linear assumptions.
              </p>
              <p className="leading-7">
                Evaluation results from the final analysis showed:
                <span className="mt-2 block font-mono text-green-400">
                  Random Forest R2: 0.763
                </span>
                <span className="block font-mono text-green-400">
                  XGBoost R2: 0.938 (Mean CV: 0.984)
                </span>
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="font-mono text-xl text-cyan-300">Project Structure</h2>
            <pre className="mt-4 overflow-x-auto rounded-xl border border-zinc-700 bg-black/70 p-4 font-mono text-sm leading-7 text-zinc-200">
{`Flood-Prediction-ML-model/
├── data/
│   └── flood_dataset.csv
├── notebooks/
│   └── model_experiments.ipynb
├── src/
│   ├── preprocess.py
│   └── train.py
└── requirements.txt`}
            </pre>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="font-mono text-xl text-cyan-300">
              Installation &amp; Usage
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <p className="font-mono text-sm text-zinc-300">Installation</p>
                <pre className="mt-2 overflow-x-auto rounded-xl border border-zinc-700 bg-black/70 p-4 font-mono text-sm leading-7 text-green-400">
                  pip install -r requirements.txt
                </pre>
              </div>
              <div>
                <p className="font-mono text-sm text-zinc-300">Usage</p>
                <pre className="mt-2 overflow-x-auto rounded-xl border border-zinc-700 bg-black/70 p-4 font-mono text-sm leading-7 text-green-400">
                  python src/train.py
                </pre>
              </div>
            </div>
          </section>
        </div>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="font-mono text-xl text-cyan-300">
            Model Performance Visualization
          </h2>
          <p className="mt-3 text-zinc-300">
            Actual vs predicted comparisons for both models from the final
            analysis pipeline.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <div className="rounded-xl border border-zinc-700 bg-black/40 p-3">
              <Image
                src="/assets/rf-graph.png"
                width={500}
                height={500}
                alt="Random Forest Actual vs Predicted"
                className="h-auto w-full rounded-md border border-zinc-800 object-cover"
              />
            </div>
            <div className="rounded-xl border border-zinc-700 bg-black/40 p-3">
              <Image
                src="/assets/xgboost-graph.png"
                width={500}
                height={500}
                alt="XGBoost Actual vs Predicted"
                className="h-auto w-full rounded-md border border-zinc-800 object-cover"
              />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
