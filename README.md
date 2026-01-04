
# 📊 Telecom Customer Churn Prediction & Segmentation

This project is an end-to-end machine learning and business intelligence solution designed to predict customer churn, segment customers into meaningful groups, and provide actionable insights through dashboards and deployment-ready APIs.

---

## 🚀 Project Objective

The goal of this project is to:
- Predict the probability of customer churn.
- Identify high-risk customers early for proactive retention.
- Segment customers based on behavior and value.
- Visualize churn patterns using Power BI.
- Deploy the model as a scalable API using FastAPI, Docker, and AWS.

---

## 📁 Dataset

- Telecom customer dataset (~7,000 records)
- Features include:
  - Demographics
  - Service subscriptions
  - Contract and payment details
  - Billing information
- Target: `Churn` (converted into churn probability)

---

## 🔧 Workflow

1. **Data Cleaning**
   - Converted numeric fields and handled missing values.
   - Standardized categorical values.

2. **Feature Engineering**
   - Encoded binary and categorical variables.
   - Created engagement and service-count features.
   - Generated churn probability scores.

3. **Exploratory Data Analysis**
   - Identified churn patterns across contract types, services, and billing.
   - Discovered high-risk customer profiles.

4. **Modeling**
   - Trained Logistic Regression, Random Forest, and XGBoost.
   - Selected Logistic Regression for stability and interpretability.
   - Optimized recall using a 0.35 threshold.

5. **Customer Segmentation**
   - Used K-Means to segment customers into 4 behavioral groups.

6. **Business Intelligence**
   - Built interactive dashboards in Power BI using churn probability and clusters.

7. **Deployment**
   - Built API with FastAPI.
   - Containerized using Docker.
   - Deployed on AWS EC2.

---

## 📊 Key Insights

- Month-to-month contracts have the highest churn.
- Customers without support services churn more.
- Electronic check payment users churn more.
- New and low-engagement customers have higher churn risk.

---

## 💡 Business Value

- Enables proactive churn prevention.
- Helps target retention campaigns effectively.
- Supports data-driven decision-making.

---

## 🛠 Technologies Used

- Python, Pandas, NumPy
- Scikit-learn, XGBoost
- Power BI
- FastAPI, Docker, AWS EC2
- SQLAlchemy

---

## 📌 Conclusion

This project demonstrates how machine learning, customer segmentation, and business intelligence can be combined into a production-ready solution to reduce churn and improve customer retention strategies.

