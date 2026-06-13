import { useState } from "react"
import axios from "axios"

const API = axios.create({ baseURL: "http://localhost:8000" })

function App() {
  const [amount, setAmount] = useState("")
  const [txnType, setTxnType] = useState("P2P")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const check = async () => {
    setLoading(true)
    setResult(null)
    try {
      const { data } = await API.post("/api/predict", {
        transaction_id: "TXN" + Date.now(),
        sender_upi: "anmol@upi",
        receiver_upi: "shop@upi",
        amount: parseFloat(amount),
        transaction_type: txnType,
        timestamp: new Date().toISOString()
      })
      setResult(data)
    } catch (e) {
      alert("Error: " + e.message)
    }
    setLoading(false)
  }

  const riskConfig = {
    LOW:      { color: "#22c55e", bg: "#f0fdf4", label: "✅ LEGITIMATE",      icon: "🛡️" },
    MEDIUM:   { color: "#f59e0b", bg: "#fffbeb", label: "⚠️ SUSPICIOUS",      icon: "🔶" },
    HIGH:     { color: "#f97316", bg: "#fff7ed", label: "🚨 HIGH RISK",        icon: "⚡" },
    CRITICAL: { color: "#ef4444", bg: "#fef2f2", label: "🔴 FRAUD DETECTED",  icon: "💀" },
  }

  const cfg = result ? riskConfig[result.risk_level] : null

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Segoe UI', sans-serif", padding: 20
    }}>
      <div style={{ width: "100%", maxWidth: 480 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 56, marginBottom: 8 }}>🔐</div>
          <h1 style={{ color: "#fff", fontSize: 28, margin: 0, fontWeight: 700, letterSpacing: 1 }}>
            UPI Fraud Detector
          </h1>
          <p style={{ color: "#94a3b8", margin: "8px 0 0", fontSize: 14 }}>
            AI-powered real-time transaction analysis
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)",
          borderRadius: 20,
          padding: 32,
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 25px 50px rgba(0,0,0,0.5)"
        }}>

          {/* Amount Input */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600, letterSpacing: 1, display: "block", marginBottom: 8 }}>
              TRANSACTION AMOUNT (₹)
            </label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#64748b", fontSize: 18 }}>₹</span>
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                style={{
                  width: "100%", padding: "14px 16px 14px 36px",
                  fontSize: 18, fontWeight: 600,
                  borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.08)", color: "#fff",
                  outline: "none", boxSizing: "border-box"
                }}
              />
            </div>
          </div>

          {/* Transaction Type */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600, letterSpacing: 1, display: "block", marginBottom: 8 }}>
              TRANSACTION TYPE
            </label>
            <div style={{ display: "flex", gap: 10 }}>
              {["P2P", "P2M", "BILL"].map(t => (
                <button key={t} onClick={() => setTxnType(t)}
                  style={{
                    flex: 1, padding: "12px 0",
                    borderRadius: 10, border: "1px solid",
                    borderColor: txnType === t ? "#3b82f6" : "rgba(255,255,255,0.1)",
                    background: txnType === t ? "#3b82f6" : "rgba(255,255,255,0.05)",
                    color: txnType === t ? "#fff" : "#94a3b8",
                    fontWeight: 600, fontSize: 14, cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >{t}</button>
              ))}
            </div>
          </div>

          {/* Button */}
          <button onClick={check} disabled={loading || !amount}
            style={{
              width: "100%", padding: 16,
              background: loading || !amount
                ? "rgba(59,130,246,0.3)"
                : "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              color: "#fff", fontSize: 16, fontWeight: 700,
              borderRadius: 12, border: "none", cursor: loading || !amount ? "not-allowed" : "pointer",
              letterSpacing: 1, transition: "all 0.2s",
              boxShadow: loading || !amount ? "none" : "0 8px 20px rgba(59,130,246,0.4)"
            }}
          >
            {loading ? "🔍 Analyzing..." : "🔍 ANALYZE TRANSACTION"}
          </button>

          {/* Result */}
          {result && cfg && (
            <div style={{
              marginTop: 24, padding: 24, borderRadius: 16,
              background: cfg.bg, border: `2px solid ${cfg.color}`,
              textAlign: "center", animation: "fadeIn 0.3s ease"
            }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>{cfg.icon}</div>
              <h2 style={{ color: cfg.color, margin: "0 0 16px", fontSize: 22, fontWeight: 800 }}>
                {cfg.label}
              </h2>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div>
                  <div style={{ color: "#64748b", fontSize: 11, fontWeight: 600, letterSpacing: 1 }}>RISK LEVEL</div>
                  <div style={{ color: cfg.color, fontSize: 20, fontWeight: 800 }}>{result.risk_level}</div>
                </div>
                <div style={{ width: 1, background: "#e2e8f0" }} />
                <div>
                  <div style={{ color: "#64748b", fontSize: 11, fontWeight: 600, letterSpacing: 1 }}>FRAUD PROB</div>
                  <div style={{ color: cfg.color, fontSize: 20, fontWeight: 800 }}>
                    {(result.fraud_probability * 100).toFixed(1)}%
                  </div>
                </div>
                <div style={{ width: 1, background: "#e2e8f0" }} />
                <div>
                  <div style={{ color: "#64748b", fontSize: 11, fontWeight: 600, letterSpacing: 1 }}>AMOUNT</div>
                  <div style={{ color: "#1e293b", fontSize: 20, fontWeight: 800 }}>
                    ₹{parseFloat(amount).toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <p style={{ textAlign: "center", color: "#475569", fontSize: 12, marginTop: 20 }}>
          Powered by XGBoost ML Model • FastAPI • React
        </p>
      </div>
    </div>
  )
}

export default App