# 🧠 AI Cache Simulator — Intelligent CPU Cache Modeling & Anomaly Detection

## 📘 Overview
The **AI Cache Simulator** is a Python-based system designed to simulate CPU cache behavior while integrating an **AI-powered anomaly detection** system. It provides an interactive environment to study, analyze, and visualize how caches handle memory access patterns, hit/miss rates, and replacement policies — along with real-time AI insights to detect unusual cache activity.

Traditional cache simulators are static and limited to basic hit/miss calculations. Our version adds **dynamic visualization, adaptive analysis, and AI-based learning** to make cache behavior both **educational** and **intelligent**. This makes it ideal for students, researchers, and developers exploring computer architecture and system performance.

---

## 🎯 Problem Statement
- Raw cache data and binary-level memory traces are hard to interpret manually.  
- Traditional simulators provide no anomaly detection or adaptive learning.  
- An automated system is needed to analyze cache efficiency, visualize internal states, and identify abnormal performance patterns in real time.

---

## 💡 Objectives
- Simulate **Direct Mapped**, **Set Associative**, and **Fully Associative** cache architectures.  
- Allow configuration of **cache size**, **block size**, and **replacement policies** (LRU, FIFO, Random).  
- Implement an **AI module** to automatically detect anomalies (sudden changes in hit/miss rate).  
- Visualize results in real-time using a **Streamlit dashboard**.  
- Help learners connect **hardware-level caching** with **software-level AI analysis**.

---

## 🚀 Motivation
Caches are critical for processor performance — but understanding them is challenging. Traditional tools focus on raw numeric outputs.  
Our project aims to make cache simulation more **interactive, intelligent, and educational** by combining:
- 🧩 **Computer Architecture** (cache design & memory mapping)  
- 🧠 **Artificial Intelligence** (pattern detection & anomaly analysis)  
- 📊 **Data Visualization** (real-time insights)

This approach bridges the gap between **low-level CPU operations** and **high-level data-driven optimization**.

---

## 🧩 Methodology
1. **Input Parsing:** The simulator takes address traces as input.  
2. **Cache Setup:** User selects cache parameters (mapping type, size, policy).  
3. **Simulation Core:** Cache operations are performed — tag checking, block replacement, and hit/miss tracking.  
4. **AI Analysis:** A trained anomaly detector monitors live metrics to detect irregular patterns.  
5. **Visualization:** A Streamlit dashboard displays metrics, charts, and alerts.

### Step-by-Step Decode Flow
- Address breakdown (tag, index, offset)  
- Access evaluation (hit/miss)  
- Policy-based replacement  
- AI anomaly detection  
- Metric update and visualization refresh

---

## ⚙️ Technologies Used
- **Programming Language:** Python 3.10+  
- **Frontend:** Streamlit  
- **Core Libraries:** pandas, numpy, matplotlib  
- **AI Libraries:** scikit-learn, tensorflow/keras (optional)  
- **Development Tools:** VS Code, Git, GitHub  

---

## 🧠 System Architecture
    +-----------------------+
    |     Trace Source      |
    +----------+------------+
               |
               v
    +-----------------------+
    |   Ingestion Module    |
    +----------+------------+
               |
               v
    +-----------------------+
    |  Cache Simulator Core |
    | (LRU/FIFO/Random)     |
    +----------+------------+
               |
    +----------v------------+
    |     AI Analyzer       |
    | (Anomaly Detection)   |
    +----------+------------+
               |
               v
    +-----------------------+
    |   Visualization UI    |
    |  (Streamlit Dashboard)|
    +-----------------------+

---

## 🌟 Features
- 🔹 **Fully Configurable Cache Setup:** Choose cache size, mapping type, and policy.  
- 🔹 **Real-Time Analysis:** See hits, misses, and performance metrics update live.  
- 🔹 **AI Integration:** Detects anomalies in hit/miss behavior and reports them with explanations.  
- 🔹 **Interactive Dashboard:** Visual graphs and system insights via Streamlit.  
- 🔹 **Educational Mode:** Step-by-step visual explanation of cache logic.  
- 🔹 **Extensible Design:** Add new algorithms or AI modules easily.

---

## 📊 Results
✅ Accurate simulation of cache hits/misses for given address streams.  
✅ Real-time AI detection of abnormal cache performance patterns.  
✅ Clear visualization of cache states and metrics.  
✅ Modular codebase for future extensions.

**Example Output:**

Cache Size: 32KB | Policy: LRU
Total Accesses: 5000
Hits: 3820 | Misses: 1180 | Hit Rate: 76.4%
AI Report: No anomalies detected in last 100 cycles.

---

## 🔮 Future Enhancements
- Multi-level cache simulation (L1, L2, L3)  
- Reverse Analyzer (Binary → Trace generation)  
- Predictive prefetching using ML  
- Pipeline visualization  
- GUI-based configuration  

---

## 💻 Installation

### 1️⃣ Clone the Repository
bash
git clone https://github.com/your-username/ai-cache-simulator.git
cd ai-cache-simulator


### 2️⃣ Setup Environment

bash
python -m venv venv
source venv/bin/activate   # macOS/Linux
venv\Scripts\activate      # Windows


### 3️⃣ Install Dependencies

bash
pip install -r requirements.txt


### 4️⃣ Run Simulator

bash
python run_simulation.py


### 5️⃣ Launch Dashboard

bash
streamlit run dashboard.py

---

## 🤖 AI Module Details

The AI module uses statistical and ML-based techniques to analyze cache performance. It continuously monitors:

* Hit rate variance
* Access latency
* Pattern drift

When the AI model detects irregular activity (e.g., sudden miss-rate spikes), it flags an anomaly and highlights affected sets or addresses.

**Example Alert:**

⚠️  ALERT: Set 6 shows abnormal miss rate surge (+40%)
Possible cause: Conflict misses or poor spatial locality

---

## 📈 Sample Output Visualization

| Metric             | Description                                |
| ------------------ | ------------------------------------------ |
| Hit Rate (%)       | Percentage of successful cache lookups     |
| Miss Rate (%)      | Number of cache misses over total accesses |
| Anomalies          | Number of abnormal activity detections     |
| Replacement Policy | LRU / FIFO / Random                        |

*(Dashboard displays bar charts, anomaly timelines, and cache heatmaps.)*

---

## 🧭 Future Scope

* Integration with **RISC-V instruction traces**
* Dynamic reconfiguration of cache at runtime
* Reinforcement Learning (RL) for adaptive policy control
* Multi-threaded simulation for parallel access modeling

---


## 📚 References

* Patterson & Hennessy, *Computer Organization and Design (RISC-V Edition)*
* GeeksforGeeks, Stack Overflow (Cache Simulation Logic)
* scikit-learn, Streamlit Documentation

---

## 📜 License

This project is licensed under the **MIT License** — free to use, modify, and share.

---
