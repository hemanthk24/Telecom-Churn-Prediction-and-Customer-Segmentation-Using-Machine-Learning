document.getElementById("predictForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    gender: document.getElementById("gender").value,
    InternetService: document.getElementById("InternetService").value,
    Contract: document.getElementById("Contract").value,
    PaymentMethod: document.getElementById("PaymentMethod").value,

    SeniorCitizen: parseInt(document.getElementById("SeniorCitizen").value),
    Partner: parseInt(document.getElementById("Partner").value),
    Dependents: parseInt(document.getElementById("Dependents").value),
    PhoneService: parseInt(document.getElementById("PhoneService").value),
    MultipleLines: parseInt(document.getElementById("MultipleLines").value),
    OnlineSecurity: parseInt(document.getElementById("OnlineSecurity").value),
    OnlineBackup: parseInt(document.getElementById("OnlineBackup").value),
    DeviceProtection: parseInt(document.getElementById("DeviceProtection").value),
    TechSupport: parseInt(document.getElementById("TechSupport").value),
    StreamingTV: parseInt(document.getElementById("StreamingTV").value),
    StreamingMovies: parseInt(document.getElementById("StreamingMovies").value),
    PaperlessBilling: parseInt(document.getElementById("PaperlessBilling").value),

    tenure: parseInt(document.getElementById("tenure").value),
    MonthlyCharges: parseFloat(document.getElementById("MonthlyCharges").value),
    TotalCharges: parseFloat(document.getElementById("TotalCharges").value)
  };

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "⏳ Predicting...";

  try {
    const response = await fetch("/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error("Prediction failed. Please check input values.");
    }

    const result = await response.json();

    let color = "green";
    if (result.risk_level === "High") color = "red";
    else if (result.risk_level === "Medium") color = "orange";
    else if (result.risk_level === "Low") color = "gold";
    else if (result.risk_level === "Very Low") color = "green";

    resultDiv.innerHTML = `
      <span style="color:${color}">
        🧠 ${result.message}<br>
        📈 Churn Probability: <b>${result.churn_probability}%</b><br>
        ⚠️ Risk Level: <b>${result.risk_level}</b>
      </span>
    `;

  } catch (error) {
    resultDiv.innerHTML = `<span style="color:red">❌ ${error.message}</span>`;
  }
});
