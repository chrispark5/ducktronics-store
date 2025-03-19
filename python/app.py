from flask import Flask, request, jsonify
import pandas as pd
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.neighbors import NearestNeighbors
from pymongo import MongoClient
from flask_cors import CORS
# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['online_store']
collection = db['products']

# Fetch data from MongoDB
products = list(collection.find())
print(products)
# Convert to DataFrame
df = pd.DataFrame(products)

# Convert ObjectId to string if needed
if '_id' in df.columns:
    df['_id'] = df['_id'].astype(str)

# Preprocess the data
label_encoders = {}
for column in ['category', 'material']:
    le = LabelEncoder()
    df[column] = le.fit_transform(df[column])
    label_encoders[column] = le

# Select features for the model
features = ['price', 'category', 'rating', 'material']
X = df[features]

# Standardize the features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train the Nearest Neighbors model
model = NearestNeighbors(n_neighbors=5, algorithm='auto')
model.fit(X_scaled)

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    product_id = data.get('product_id')
    print(str(product_id) + " is the product id")
    # Search for the product using the custom "id" field
    product = df.loc[df['id'] == int(product_id)]
    if product.empty:
        return jsonify({'error': 'Product not found.'}), 404
    
    product_features = product[features]
    product_scaled = scaler.transform(product_features)
    
    distances, indices = model.kneighbors(product_scaled, n_neighbors=6)
    
    recommended_indices = indices[0][1:]  # Exclude the first one as it is the product itself
    recommended_products = df.iloc[recommended_indices]
    
    # Convert any ObjectId fields to strings
    recommended_products['_id'] = recommended_products['_id'].astype(str)
    
    return jsonify(recommended_products.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True, port=8000)
