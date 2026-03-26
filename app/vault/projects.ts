export type Project = {
  slug: string;
  title: string;
  description: string[];
  tags: string[];
  features: string[];
  githubUrl: string;
  about: string[];
  projectStructure?: string[];
  installation: string[];
  usage: string[];
  demoType: "terminal" | "mock-ui";
  demoScript: string[];
};

export const projects: Project[] = [
  {
    slug: "byte-brain",
    title: "Byte-Brain",
    description: [
      "Byte-Brain is an offline static PE malware scanner built for high-confidence risk assessment without cloud dependency.",
      "It uses a Random Forest classifier trained on EMBER 2018 features to estimate probability-based maliciousness scores.",
      "The pipeline emphasizes explainable predictions so analysts can understand which static indicators raised risk.",
    ],
    tags: ["Python", "Scikit-learn", "PEfile"],
    features: [
      "Offline PE scanning for privacy-preserving malware triage",
      "Probability-based maliciousness scoring using EMBER-style features",
      "Explainable outputs highlighting high-impact static signals",
    ],
    githubUrl: "https://github.com/Shrey42-dot/Byte-Brain",
    about: [
      "Byte-Brain solves the problem of quick and private malware triage when cloud lookups are unavailable or undesired.",
      "The scanner parses PE files, extracts static features, and feeds those features into a trained Random Forest model to generate a risk estimate.",
      "Its explainable approach helps reverse engineers and blue teams move from a binary verdict to actionable reasoning.",
    ],
    projectStructure: [
      "byte-brain/",
      "├── models/",
      "│   └── random_forest_ember.pkl",
      "├── samples/",
      "│   ├── benign/",
      "│   └── malicious/",
      "├── scanner/",
      "│   ├── feature_extractor.py",
      "│   └── predict.py",
      "└── byte-brain",
    ],
    installation: ["pip install -r requirements.txt"],
    usage: ["./byte-brain samples/benign/strings64.exe"],
    demoType: "terminal",
    demoScript: [
      "$ ./byte-brain samples/suspicious/dropper.exe",
      "[+] Parsing PE headers...",
      "[+] Extracted 148 static features",
      "[+] RandomForest confidence: 0.97 (malicious)",
      "[!] Detected packer signature: UPX-like entropy profile",
      "[*] Explainability: import table anomalies + entropy drift",
      "[*] Report saved: reports/dropper_analysis.json",
    ],
  },
  {
    slug: "secure-secrets",
    title: "Secure Secrets",
    description: [
      "Secure Secrets is a zero-knowledge, end-to-end encrypted secret sharing platform focused on privacy-first communication.",
      "All encryption happens client-side using AES-GCM 256 with the Web Crypto API before any network transmission occurs.",
      "The platform also supports burn-on-read flows and EXIF metadata stripping for safer media and secret exchange.",
    ],
    tags: ["React", "Node.js", "Web Crypto API", "Express.js"],
    features: [
      "Client-side AES-GCM 256 encryption before transport",
      "Burn-on-Read links for one-time secret retrieval",
      "EXIF metadata stripping to reduce accidental data leaks",
    ],
    githubUrl: "https://github.com/Shrey42-dot/Secure-Secrets",
    about: [
      "Secure Secrets addresses the risk of plaintext exposure in transit and at rest by adopting a zero-knowledge design.",
      "Users encrypt content in the browser; the backend only handles ciphertext and metadata needed for delivery and lifecycle controls.",
      "This architecture minimizes trust assumptions while still providing a practical developer and user experience.",
    ],
    projectStructure: [
      "secure-secrets/",
      "├── frontend/",
      "│   ├── src/",
      "│   └── .env",
      "├── backend/",
      "│   ├── src/",
      "│   └── .env",
      "└── package.json",
    ],
    installation: [
      "cd frontend && npm install",
      "cd ../backend && npm install",
      "# Configure frontend/.env and backend/.env",
    ],
    usage: ["cd frontend && npm run dev", "cd backend && npm run dev"],
    demoType: "mock-ui",
    demoScript: [
      "unused-for-mock-ui",
    ],
  },
  {
    slug: "git-sentinel",
    title: "Git-Sentinel",
    description: [
      "Git-Sentinel is a lightweight pre-commit security scanner designed to stop secret leaks before they enter version history.",
      "It hooks into the commit flow, inspects staged diffs, and flags risky patterns using regex-based detections.",
      "By failing unsafe commits early, it improves baseline DevSecOps hygiene across personal and team repositories.",
    ],
    tags: ["Python", "Regex", "DevSecOps"],
    features: [
      "Interception of commit workflow before history is written",
      "Regex signatures for API keys, tokens, and secret patterns",
      "Actionable alerts that block unsafe commits by default",
    ],
    githubUrl: "https://github.com/Shrey42-dot/git_sentinel",
    about: [
      "Git-Sentinel solves accidental credential exposure at the earliest possible stage: before code is committed.",
      "The tool scans staged changes, applies regex-driven checks, and reports suspicious findings with file and line context.",
      "This keeps repositories cleaner and reduces incident response caused by leaked secrets.",
    ],
    projectStructure: [
      "git_sentinel/",
      "├── rules/",
      "│   └── secret_patterns.json",
      "├── hooks/",
      "│   └── pre-commit",
      "├── scanner.py",
      "└── install.py",
    ],
    installation: ["python install.py"],
    usage: ["git add .", "git commit -m \"feat: safe commit with scanner\""],
    demoType: "terminal",
    demoScript: [
      "$ git commit -m \"feat: add auth tokens\"",
      "[git-sentinel] Running pre-commit security checks...",
      "[!] Potential AWS key detected in src/config.ts:14",
      "[!] High-risk regex match: hardcoded bearer token",
      "[-] Commit blocked. Remove secrets before retrying.",
    ],
  },
  {
    slug: "shadow-pixel",
    title: "Shadow-Pixel",
    description: [
      "Shadow-Pixel is a CLI utility for invisible cryptographic steganography in RGB images.",
      "It encrypts secrets with AES-256-GCM and hides ciphertext inside Least Significant Bits (LSB) to preserve visual fidelity.",
      "The entire workflow runs offline, enabling controlled covert communication and secure local experimentation.",
    ],
    tags: ["Python", "Cryptography", "Steganography", "AES-256-GCM"],
    features: [
      "AES-256-GCM encryption before steganographic embedding",
      "LSB-based data hiding with minimal visual distortion",
      "Offline CLI workflow for secure local operation",
    ],
    githubUrl: "https://github.com/Shrey42-dot/Shadow-Pixel",
    about: [
      "Shadow-Pixel solves the need for discreet and encrypted secret exchange through images.",
      "Before embedding, payloads are encrypted and authenticated, then inserted into image LSB channels for stealth.",
      "This combines confidentiality with plausible cover data and supports reproducible CLI automation.",
    ],
    projectStructure: [
      "shadow-pixel/",
      "├── shadow_pixel/",
      "│   ├── crypto.py",
      "│   ├── lsb.py",
      "│   └── cli.py",
      "├── examples/",
      "│   └── orig.png",
      "└── pyproject.toml",
    ],
    installation: ["pip install -r requirements.txt"],
    usage: [
      "shadow-pixel hide --image orig.png --out stego.png --msg 'Secret' --key pass",
    ],
    demoType: "terminal",
    demoScript: [
      "$ shadow-pixel hide --image orig.png --out stego.png --msg 'Secret' --key pass",
      "[+] Encrypting payload with AES-256-GCM...",
      "[+] Embedding encrypted bytes into LSB channels",
      "[+] Capacity check passed (41% usage)",
      "[*] Secret successfully hidden in stego.png",
    ],
  },
  {
    slug: "aura-process-guardian",
    title: "Aura Process Guardian",
    description: [
      "Aura Process Guardian is an unsupervised OS-level anomaly detector for real-time process monitoring.",
      "It learns baseline behavior from runtime telemetry and flags sustained deviations using statistical Z-score modeling.",
      "The system is built for early detection of suspicious process activity without requiring labeled attack datasets.",
    ],
    tags: ["Python", "psutil", "Statistics", "Z-Score Modeling"],
    features: [
      "Real-time process telemetry collection from live systems",
      "Adaptive baseline learning for normal behavior profiles",
      "Sustained anomaly detection via Z-score thresholds",
    ],
    githubUrl: "https://github.com/Shrey42-dot/Aura-Process-Guardian",
    about: [
      "Aura Process Guardian addresses the gap between static defenses and live behavioral anomalies on endpoints.",
      "It continuously measures process-level signals, computes statistical drift from normal ranges, and escalates sustained outliers.",
      "This enables fast triage of suspicious process behavior before it escalates into full compromise.",
    ],
    projectStructure: [
      "Aura-Process-Guardian/",
      "├── collector/",
      "│   └── process_metrics.py",
      "├── detector/",
      "│   └── zscore_engine.py",
      "├── alerts/",
      "│   └── notifier.py",
      "└── run_guardian.py",
    ],
    installation: ["pip install -r requirements.txt"],
    usage: ["python run_guardian.py"],
    demoType: "terminal",
    demoScript: [
      "$ python run_guardian.py",
      "[+] Monitoring active process tree...",
      "[+] Baseline established for CPU, memory, I/O",
      "[!] Sustained anomaly: powershell.exe (z=3.8 for 5 intervals)",
      "[*] Alert emitted to SOC channel",
    ],
  },
  {
    slug: "flood-prediction",
    title: "Flood Prediction ML Model",
    description: [
      "Flood Prediction ML Model estimates flood probability from environmental and hydrological factors.",
      "The project applies feature engineering and compares model behavior across Random Forest and XGBoost regressors.",
      "Its objective is to support risk-aware planning by turning raw variables into interpretable predictive outputs.",
    ],
    tags: ["Python", "Scikit-learn", "Pandas", "XGBoost"],
    features: [
      "Environmental feature engineering for stronger signal extraction",
      "Model comparison between Random Forest and XGBoost",
      "Probability-oriented outputs for flood risk estimation",
    ],
    githubUrl: "https://github.com/Shrey42-dot/Flood-Prediction-ML-model",
    about: [
      "This project solves early flood risk estimation using data-driven modeling rather than static thresholds.",
      "It cleans and engineers environmental datasets, trains multiple regressors, and compares performance to select reliable predictions.",
      "The resulting model can be integrated into alerting or planning workflows to improve preparedness.",
    ],
    projectStructure: [
      "Flood-Prediction-ML-model/",
      "├── data/",
      "│   └── flood_dataset.csv",
      "├── notebooks/",
      "│   └── model_experiments.ipynb",
      "├── src/",
      "│   ├── preprocess.py",
      "│   └── train.py",
      "└── requirements.txt",
    ],
    installation: ["pip install -r requirements.txt"],
    usage: ["python src/train.py"],
    demoType: "terminal",
    demoScript: [
      "$ python src/train.py",
      "[+] Loading environmental dataset...",
      "[+] Feature engineering completed (22 -> 31 features)",
      "[+] Training RandomForestRegressor...",
      "[+] Training XGBoostRegressor...",
      "[*] Best model: XGBoost (RMSE: 0.118)",
      "[*] Predicted flood probability for test sample: 0.74",
    ],
  },
];
