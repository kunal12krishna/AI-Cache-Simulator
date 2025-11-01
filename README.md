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
