import streamlit as st
import joblib
import pandas as pd
from sklearn.preprocessing import LabelEncoder
# Load the saved models
rf_model = joblib.load('random_forest_model.pkl')
svm_model = joblib.load('svm_model.pkl')
# Load the LabelEncoder used during training (adjust as necessary)
le = LabelEncoder()
# Streamlit App
st.title("Quantity Demand Prediction")
st.sidebar.header("Model Selection")
# Sidebar for model selection
model_choice = st.sidebar.selectbox("Choose a model", ["Random Forest", "SVM"])
# Input Form
st.header("Input Features")
category = st.text_input("Product Category Name", "Category A")
stock_level = st.number_input("Stock Level", min_value=0.0, step=1.0)
reorder_point = st.number_input("Reorder Point", min_value=0.0, step=1.0)
order_status = st.selectbox("Order Status", [0, 1])  # 0 = Not Ordered, 1 = Ordered (replace with actual encoding if needed)
# Predict button
if st.button("Predict Quantity"):
    try:
        # Encode the category
        category_encoded = le.fit_transform([category])[0]  # Replace with your pre-trained encoder logic
        # Prepare input data for prediction
        input_data = pd.DataFrame([[category_encoded, stock_level, reorder_point, order_status]],
                                  columns=['Product Cateogy Name', 'StockLevel', 'ReorderPoint', 'Order Status'])
        # Prediction logic
        if model_choice == "Random Forest":
            prediction = rf_model.predict(input_data)
        else:  # SVM model
            prediction = svm_model.predict(input_data)
        # Display the prediction
        st.success(f"Predicted Quantity Demand: {prediction[0]}")
    except Exception as e:
        st.error(f"Error during prediction: {e}")