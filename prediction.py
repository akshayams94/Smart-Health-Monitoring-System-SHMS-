# ml-module/health_prediction.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load dataset (for example, user health data)
data = pd.read_csv('health_data.csv')

# Assume we are predicting heart disease risk based on some factors
X = data[['age', 'blood_pressure', 'cholesterol', 'glucose_level']]
y = data['heart_disease']  # 0 for no risk, 1 for risk

# Split data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a Random Forest model
clf = RandomForestClassifier()
clf.fit(X_train, y_train)

# Make predictions
y_pred = clf.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy * 100:.2f}%")

# Save the model for future use
import joblib
joblib.dump(clf, 'heart_disease_model.pkl')
