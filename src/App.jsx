import One from './components/One.jsx'

function App() {

    return (
        <div style={{ padding: "20px" }}>
            <One topic={"storage"} text={
                `
Mapper Program — mapper.py 
#!/usr/bin/env python3 
import sys 
 
# Read input line by line from STDIN 
for line in sys.stdin: 
    line = line.strip() 
    if not line or line.startswith("user_id"):  # skip header 
        continue 
    try: 
        user_id, event_type, value = line.split(",") 
        print(f"{event_type}\\t1") 
    except ValueError: 
        continue 
Reducer Program — reducer.py 
#!/usr/bin/env python3 
import sys 
 
current_event = None 
current_count = 0 
 
for line in sys.stdin: 
    line = line.strip() 
    if not line: 
        continue 
    event_type, count = line.split("\\t") 
    count = int(count) 
     
    if current_event == event_type: 
        current_count += count 
    else: 
        if current_event: 
            print(f"{current_event}\\t{current_count}") 
        current_event = event_type 
        current_count = count 
 
# print last event 
if current_event: 
    print(f"{current_event}\\t{current_count}")

              `
            } />

            <One topic={"application"} text={
                `
Mapper Program — mapper.py 
#!/usr/bin/env python3 
import sys 
# Each input line is: product,price 
for line in sys.stdin: 
    line = line.strip() 
    if not line or line.startswith("product"): 
        continue 
    try: 
        product, price = line.split(",") 
     print(f"{product}\\t{price}") 
    except ValueError: 
        continue 
Reducer Program — reducer.py 
#!/usr/bin/env python3 
import sys 
 
current_product = None 
current_total = 0.0 
 
for line in sys.stdin: 
    line = line.strip() 
    if not line: 
        continue 
    product, price = line.split("\\t") 
    price = float(price) 
 
    if current_product == product: 
        current_total += price 
    else: 
        if current_product: 
            print(f"{current_product}\\t{current_total}") 
        current_product = product 
        current_total = price 
 
# Print the last product total 
if current_product: 
    print(f"{current_product}\\t{current_total}") 
              `
            } />

            <One topic={"mongo"} text={
                `
Mapper Program — mapper.py 
#!/usr/bin/env python3 
import sys 
 
# Input Format: product,category,price 
for line in sys.stdin: 
    line = line.strip() 
    if not line or line.startswith("product"): 
        continue 
    try: 
        product, category, price = line.split(",") 
        price = float(price) 
        # Emit category and price 
        print(f"{category}\\t{price}") 
    except ValueError: 
        continue 
Reducer Program — reducer.py 
#!/usr/bin/env python3 
import sys 
 
current_category = None 
total_sales = 0 
 
for line in sys.stdin: 
    line = line.strip() 
    if not line: 
        continue 
    category, price = line.split("\\t") 
    price = float(price) 
 
    if current_category == category: 
        total_sales += price 
    else: 
        if current_category: 
            print(f"{current_category}\\t{total_sales}") 
        current_category = category 
        total_sales = price 
 
if current_category: 
    print(f"{current_category}\\t{total_sales}")

    Step 1: Start MongoDB 
sudo systemctl start mongod 
Step 2: Open Mongo Shell 
mongo 
Step 3: Create Database and Collection 
use salesdb 
db.createCollection("category_sales") 
Step 4: Insert Output Data 
db.category_sales.insertMany([ 
    { category: "Electronics", total_sales: 222000 }, 
    { category: "Furniture", total_sales: 75000 } 
]) 
Step 5: Verify Data 
db.category_sales.find().pretty()
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
print("\\\\nThe final hypothesis is:", final_hypothesis)
               `
            } />

            <One topic={"mr_calc"} text={
                `
Mapper Program — mapper.py 
#!/usr/bin/env python3 
import sys 
 
# Mapper: reads each line and emits number as key-value 
for line in sys.stdin: 
    line = line.strip() 
    if not line: 
        continue 
    try: 
        num = float(line) 
        # Emit as key-value pair 
        print(f"num\\t{num}") 
    except ValueError: 
        continue 
Reducer Program — reducer.py 
#!/usr/bin/env python3 
import sys 
 
count = 0 
total = 0 
min_val = None 
max_val = None 
 
# Reducer: calculates sum, average, min, max 
for line in sys.stdin: 
    line = line.strip() 
    if not line: 
        continue 
    key, value = line.split("\\t") 
    value = float(value) 
    total += value 
    count += 1 
    if min_val is None or value < min_val: 
        min_val = value 
    if max_val is None or value > max_val: 
        max_val = value 
 
if count > 0: 
    avg = total / count 
    print(f"Total Sum = {total}") 
    print(f"Average = {avg}") 
    print(f"Minimum = {min_val}") 
    print(f"Maximum = {max_val}") 
              `
            } />

            <One topic={"mr_algo"} text={
                `
Mapper Program — mapper.py 
#!/usr/bin/env python3 
import sys 
 
# Mapper: reads each line and splits into words 
for line in sys.stdin: 
    line = line.strip() 
    words = line.split() 
    for word in words: 
        print(f"{word.lower()}\\t1") 
Reducer Program — reducer.py 
#!/usr/bin/env python3 
import sys 
 
current_word = None 
current_count = 0 
word = None 
 
# Reducer: sums counts for each unique word 
for line in sys.stdin: 
    line = line.strip() 
    word, count = line.split('\\t', 1) 
    try: 
        count = int(count) 
    except ValueError: 
        continue 
 
    if current_word == word: 
        current_count += count 
    else: 
        if current_word: 
            print(f"{current_word}\\t{current_count}") 
        current_word = word 
        current_count = count 
 
# Output last word 
if current_word == word: 
    print(f"{current_word}\\t{current_count}") 
               `
            } />

            <One topic={"LR"} text={
                `
i) Linear Regression 
import numpy as np 
import matplotlib.pyplot as plt 
import pandas as pd 
 
dataset = pd.read_csv('salary_Data.csv') 
X = dataset.iloc[:, :-1].values 
y = dataset.iloc[:, 1].values 
 
from sklearn.model_selection import train_test_split 
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 1/3, random_state = 0) 
 
from sklearn.linear_model import LinearRegression 
regressor = LinearRegression() 
regressor.fit(X_train, y_train) 
 
y_pred = regressor.predict(X_test) 
#Visualizing Training set results 
plt.scatter(X_train, y_train, color = 'red') 
plt.plot(X_train, regressor.predict(X_train), color = 'blue') 
plt.title('Salary vs Experience {Training set}') 
plt.xlabel('Years of experience') 
plt.ylabel('Salary') 
plt.show() 
#Visualizing Test set results 
plt.scatter(X_test, y_test, color = 'red') 
plt.plot(X_train, regressor.predict(X_train), color = 'blue') 
plt.title('Salary vs Experience {Test set}') 
plt.xlabel('Years of experience') 
plt.ylabel('Salary') 
plt.show() 

ii) Logistic Regression 
import numpy as np 
import pandas as pd 
import matplotlib.pyplot as plt 
import seaborn as sns 
from sklearn.datasets import load_diabetes 
from sklearn.model_selection import train_test_split 
from sklearn.preprocessing import StandardScaler 
from sklearn.linear_model import LogisticRegression 
from sklearn.metrics import accuracy_score,classification_report,confusion_matrix,roc_curve,auc 
 
diabetes = load_diabetes() 
x,y=diabetes.data,diabetes.target 
 
y_binary=(y>np.median(y)).astype(int) 
x_train,x_test,y_train,y_test = train_test_split(x,y_binary,test_size = 0.2,random_state=42) 
Scaler = StandardScaler() 
x_train=Scaler.fit_transform(x_train) 
x_test=Scaler.transform(x_test) 
 
model=LogisticRegression() 
model.fit(x_train,y_train) 
 
y_pred=model.predict(x_test) 
acc=accuracy_score(y_test,y_pred) 
print("Accuracy :{:.2f} %",format(acc*100)) 
print("Confusion Matrix ;\\n",confusion_matrix(y_test,y_pred)) 
print("Classification Report ;\\n",classification_report(y_test,y_pred)) 
 
plt.figure(figsize=(8,6)) 
sns.scatterplot(x=x_test[:,2],y=x_test[:,8],hue=y_test,palette={0:'blue',1:'red'},marker='o') 
 
plt.xlabel("BMI") 
plt.ylabel("AGC") 
plt.title("LOGISTIC REGRESSION Decision Boundary \\n Accuracy ; ") 
plt.legend(title="Diabetes",loc="upper right") 
plt.show() 

               `
            } />

            <One topic={"Mining"} text={
                `
Mapper Program — mapper.py 
#!/usr/bin/env python3 
import sys 
import re 
 
# Mapper: performs tokenization and emits (word, 1) 
for line in sys.stdin: 
    line = line.strip().lower() 
    words = re.findall(r"[a-zA-Z]+", line) 
    for word in words: 
        print(f"{word}\\t1")
Reducer Program — reducer.py 
#!/usr/bin/env python3 
import sys 
 
current_word = None 
current_count = 0 
 
# Reducer: sums counts for each unique word 
for line in sys.stdin: 
    line = line.strip() 
    word, count = line.split('\\t', 1) 
    try: 
        count = int(count) 
    except ValueError: 
        continue 
 
    if current_word == word: 
        current_count += count 
    else: 
        if current_word: 
            print(f"{current_word}\\t{current_count}") 
        current_word = word 
        current_count = count 
 
if current_word == word: 
    print(f"{current_word}\\t{current_count}") 
               `
            } />

        </div>
    )
}

export default App
