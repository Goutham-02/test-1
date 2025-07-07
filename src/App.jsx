import One from './components/One.jsx'

function App() {

    return (
        <div style={{ padding: "20px" }}>
            <One topic={"1"} text={
               `
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import fetch_california_housing
data = fetch_california_housing(as_frame=True)
df = data.frame
numerical_features = df.select_dtypes(include=[np.number]).columns
n_features = len(numerical_features)
print(n_features)
n_cols = 3
n_rows = 3
plt.figure(figsize=(15, 5 * n_rows))
for i, feature in enumerate(numerical_features):
    plt.subplot(n_cols, n_rows, i+1)
    sns.histplot(df[feature], kde=True, color='blue', bins=30)
    plt.title(f"Dist of {feature}")
plt.show()
plt.figure(figsize=(15, 5 * n_rows))
for i, feature in enumerate(numerical_features):
    plt.subplot(n_rows, n_cols, i+1)
    sns.boxplot(x=df[feature], color='orange')
    plt.title(f"Box plot of {feature}")
plt.tight_layout()
plt.show()
print("Outliers:")
outliers_summary = {}
for feature in numerical_features:
    q1 = df[feature].quantile(0.25)
    q3 = df[feature].quantile(0.75)
    iqr = q3 - q1
    lower = q1 - 1.5 * iqr
    higher = q3 + 1.5 * iqr
    outliers = df[(df[feature] < lower) | (df[feature] > higher)]
    outliers_summary[feature] = len(outliers)
    print(f"{feature} : {len(outliers)} outliers")
               `
            } />

            <One topic={"2"} text={
              `
import pandas as pd
import seaborn as sns
from sklearn.datasets import fetch_california_housing
import matplotlib.pyplot as plt
data = fetch_california_housing(as_frame=True)
df = data.frame
corr_mat = df.corr()
plt.figure(figsize=(10,8))
sns.heatmap(corr_mat, annot=True, cmap="coolwarm")
plt.title("Correlation matrix")
plt.show()
sns.pairplot(df, diag_kind='kde', plot_kws={'alpha': 0.5})
plt.show()
              `
            } />

            <One topic={"3"} text={
                `
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.decomposition import PCA
iris = load_iris() 
data = iris.data 
labels = iris.target 
label_names = iris.target_names
iris_df = pd.DataFrame(data, columns=iris.feature_names)
pca = PCA(n_components=2) 
data_reduced = pca.fit_transform(data) 
reduced_df = pd.DataFrame(data_reduced, columns=['Principal Component 1', 'Principal Component 2']) 
reduced_df['Label'] = labels 
plt.figure(figsize=(8, 6)) 
colors = ['r', 'g', 'b'] 
for i, label in enumerate(np.unique(labels)): 
    plt.scatter( 
        reduced_df[reduced_df['Label'] == label]['Principal Component 1'], 
        reduced_df[reduced_df['Label'] == label]['Principal Component 2'], 
        label=label_names[label], 
        color=colors[i] 
    ) 
plt.title('PCA on Iris Dataset') 
plt.xlabel('Principal Component 1') 
plt.ylabel('Principal Component 2') 
plt.legend() 
plt.grid() 
plt.show()
                `
            } />

            <One topic={"4"} text={
               `
import pandas as pd
def find_s_algorithm(file_path):
    data = pd.read_csv(file_path)
    print("Training data:")
    print(data)

    attributes = data.columns[:-1]
    class_label = data.columns[-1]

    hypothesis = ['?' for _ in attributes]

    for index, row in data.iterrows():
        if row[class_label] == 'Yes': 
            for i, value in enumerate(row[attributes]):
                if hypothesis[i] == '?' or hypothesis[i] == value:
                    hypothesis[i] = value
                else:
                    hypothesis[i] = '?'

    return hypothesis
file_path = ''
final_hypothesis = find_s_algorithm(file_path)
print("\\nThe final hypothesis is:", final_hypothesis)
               `
            } />

            <One topic={"5"} text={
              `
import numpy as np
from collections import Counter
def generate_data():
    np.random.seed(0)
    return np.random.rand(100)
def label_data(data):
    return np.where(data > 0.5, 1, 0)
def knn_classify(x_train, y_train, x_test, k):
    predictions = []
    for x in x_test:
        distances = np.abs(x_train - x) 
        nearest_indices = distances.argsort()[:k]  
        nearest_labels = y_train[nearest_indices]  
        majority_class = Counter(nearest_labels).most_common(1)[0][0]  
        predictions.append(majority_class)
    return np.array(predictions
def main():
    x = generate_data()
    print("Generated points:\\n", x)

    x_train = x[:50]
    y_train = label_data(x_train)
    print("\\nLabels of first 50 points:\\n", y_train)

    x_test = x[50:]
    k_values = [1, 2, 3, 4, 5, 20, 30]

    print("\\nKNN Classification Results:")
    for k in k_values:
        if k > len(x_train):
            print(f"k = {k} is larger than the training set size and is skipped.")
            continue
        y_pred = knn_classify(x_train, y_train, x_test, k)
        print(f"k = {k}: Predicted Classes: {y_pred}")
main()
              `
            } />

            <One topic={"6"} text={
               `
import numpy as np 
import matplotlib.pyplot as plt 
def gaussian_kernel(x, xi, tau): 
    return np.exp(-np.sum((x - xi) ** 2) / (2 * tau ** 2))
def locally_weighted_regression(x, X, y, tau): 
    m = X.shape[0] 
    weights = np.array([gaussian_kernel(x, X[i], tau) for i in range(m)]) 
    W = np.diag(weights) 
    X_transpose_W = X.T @ W 
    theta = np.linalg.inv(X_transpose_W @ X) @ X_transpose_W @ y 
    return x @ theta
np.random.seed(42) 
X = np.linspace(0, 2 * np.pi, 100) 
y = np.sin(X) + 0.1 * np.random.randn(100) 
X_bias = np.c_[np.ones(X.shape), X] 
x_test = np.linspace(0, 2 * np.pi, 200) 
x_test_bias = np.c_[np.ones(x_test.shape), x_test] 
tau = 0.5 
y_pred = np.array([locally_weighted_regression(xi, X_bias, y, tau) for xi in x_test_bias]) 
plt.figure(figsize=(10, 6)) 
plt.scatter(X, y, color='red', label='Training Data', alpha=0.7) 
plt.plot(x_test, y_pred, color='blue', label=f'LWR Fit (tau={tau})', linewidth=2) 
plt.xlabel('X', fontsize=12) 
plt.ylabel('y', fontsize=12) 
plt.title('Locally Weighted Regression', fontsize=14) 
plt.legend(fontsize=10) 
plt.grid(alpha=0.3) 
plt.show()
               `
            } />

            <One topic={"7"} text={
               `
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.datasets import fetch_california_housing
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline 
from sklearn.metrics import mean_squared_error, r2_score 
def linear_regression_california(): 
    housing = fetch_california_housing(as_frame=True) 
    X = housing.data[["AveRooms"]] 
    y = housing.target 
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42) 
    model = LinearRegression() 
    model.fit(X_train, y_train) 
    y_pred = model.predict(X_test) 
    plt.scatter(X_test, y_test, color="blue", label="Actual") 
    plt.plot(X_test, y_pred, color="red", label="Predicted") 
    plt.xlabel("Average number of rooms (AveRooms)") 
    plt.ylabel("Median value of homes ($100,000)") 
    plt.title("Linear Regression - California Housing Dataset") 
    plt.legend() 
    plt.show() 
    print("Linear Regression - California Housing Dataset")
def polynomial_regression_auto_mpg(): 
    url = "https://archive.ics.uci.edu/ml/machine-learning-databases/auto-mpg/auto-mpg.data" 
    column_names = ["mpg", "cylinders", "displacement", "horsepower", "weight", "acceleration", "model_year", "origin"] 
    data = pd.read_csv(url, sep='\\s+', names=column_names, na_values="?") 
    data = data.dropna() 
    X = data["displacement"].values.reshape(-1, 1)
    y = data["mpg"].values 
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42) 
    poly_model=make_pipeline(PolynomialFeatures(degree=2), StandardScaler(), LinearRegression()) 
    poly_model.fit(X_train, y_train) 
    y_pred = poly_model.predict(X_test) 
    plt.scatter(X_test, y_test, color="blue", label="Actual") 
    plt.scatter(X_test, y_pred, color="red", label="Predicted") 
    plt.xlabel("Displacement") 
    plt.ylabel("Miles per gallon (mpg)") 
    plt.title("Polynomial Regression - Auto MPG Dataset") 
    plt.legend() 
    plt.show() 
    print("Polynomial Regression - Auto MPG Dataset") 
    print("Mean Squared Error:", mean_squared_error(y_test, y_pred)) 
    print("R^2 Score:", r2_score(y_test, y_pred)) 
if __name__ == "__main__":
    linear_regression_california()
    polynomial_regression_auto_mpg()
               `
            } />

            <One topic={"8"} text={
               `
import numpy as np 
import pandas as pd 
from sklearn.datasets import load_breast_cancer 
from sklearn.model_selection import train_test_split 
from sklearn.tree import DecisionTreeClassifier, plot_tree 
from sklearn.metrics import classification_report, accuracy_score 
import matplotlib.pyplot as plt
data = load_breast_cancer() 
X = pd.DataFrame(data.data, columns=data.feature_names) 
y = pd.Series(data.target) 
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42) 
clf = DecisionTreeClassifier(random_state=42) 
clf.fit(X_train, y_train) 
y_pred = clf.predict(X_test) 
accuracy = accuracy_score(y_test, y_pred)
print("=== Breast Cancer Classification using Decision Tree ===\\n") 
print("Model Accuracy on Test Set: {:.2f}%".format(accuracy * 100)) 
print("\\nClassification Report:\\n", classification_report(y_test, y_pred, 
target_names=data.target_names)) 
plt.figure(figsize=(20, 10)) 
plot_tree(clf, filled=True, feature_names=data.feature_names, class_names=data.target_names) 
plt.title("Decision Tree for Breast Cancer Classification") 
plt.show() 
new_sample = X.mean().values.reshape(1, -1) 
prediction = clf.predict(new_sample) 
print("\\nNew Sample (mean of features) predicted as:", data.target_names[prediction[0]]) 
               `
            } />

            <One topic={"9"} text={
               `
import numpy as np 
from sklearn.datasets import fetch_olivetti_faces 
from sklearn.model_selection import train_test_split, cross_val_score 
from sklearn.naive_bayes import GaussianNB 
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix 
import matplotlib.pyplot as plt 
data = fetch_olivetti_faces(shuffle=True, random_state=42) 
X = data.data 
y = data.target 
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42) 
gnb = GaussianNB() 
gnb.fit(X_train, y_train) 
y_pred = gnb.predict(X_test) 
accuracy = accuracy_score(y_test, y_pred) 
print(f'Accuracy: {accuracy * 100:.2f}%') 
print("\\nClassification Report:") 
print(classification_report(y_test, y_pred, zero_division=1)) 
print("\\nConfusion Matrix:") 
print(confusion_matrix(y_test, y_pred)) 
cross_val_accuracy = cross_val_score(gnb, X, y, cv=5, scoring='accuracy') 
print(f'\\nCross-validation accuracy: {cross_val_accuracy.mean() * 100:.2f}%') 
fig, axes = plt.subplots(3, 5, figsize=(12, 8)) 
for ax, image, label, prediction in zip(axes.ravel(), X_test, y_test, y_pred): 
    ax.imshow(image.reshape(64, 64), cmap=plt.cm.gray) 
    ax.set_title(f"True: {label}, Pred: {prediction}") 
    ax.axis('off') 
plt.tight_layout() 
plt.show()  
               `
            } />

            <One topic={"10"} text={
               `
import numpy as np 
import pandas as pd 
import matplotlib.pyplot as plt 
from sklearn import datasets 
from sklearn.preprocessing import StandardScaler 
from sklearn.decomposition import PCA 
from sklearn.cluster import KMeans 
cancer_data = datasets.load_breast_cancer() 
X = cancer_data.data 
y = cancer_data.target 
scaler = StandardScaler() 
X_scaled = scaler.fit_transform(X) 
kmeans = KMeans(n_clusters=2, random_state=42) 
y_kmeans = kmeans.fit_predict(X_scaled) 
pca = PCA(n_components=2) 
X_pca = pca.fit_transform(X_scaled) 
plt.figure(figsize=(8, 6)) 
plt.scatter(X_pca[:, 0], X_pca[:, 1], c=y_kmeans, cmap='viridis', s=50, 
alpha=0.7) 
plt.scatter(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[:, 1], 
c='red', marker='X', s=200, label='Centroids') 
plt.title('K-means Clustering on Wisconsin Breast Cancer Dataset') 
plt.xlabel('Principal Component 1') 
plt.ylabel('Principal Component 2') 
plt.legend() 
plt.colorbar(label='Cluster Label') 
plt.show() 
               `
            } />

        </div>
    )
}

export default App
