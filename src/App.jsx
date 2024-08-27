import One from './components/One.jsx'

function App() {

  return (
    <>
      <One topic={"Selection Sort"} text={
        `
#include <stdio.h>  
void selection(int arr[], int n)  
{  
    int i, j, small;  
    for (i = 0; i < n-1; i++)
    {  
        small = i;
        for (j = i+1; j < n; j++)  
        if (arr[j] < arr[small])  
            small = j; 
    int temp = arr[small];  
    arr[small] = arr[i];  
    arr[i] = temp;  
    }  
}  
void printArr(int a[], int n)
{  
    int i;  
    for (i = 0; i < n; i++)  
        printf("%d ", a[i]);  
} 
int main()  
{  
    int a[] = { 12, 31, 25, 8, 32, 17 };  
    int n = sizeof(a) / sizeof(a[0]);  
    printf("Before sorting array elements are - \n");  
    printArr(a, n);  
    selection(a, n);  
    printf("\nAfter sorting array elements are - \n");    
    printArr(a, n);  
    return 0;  
}
`
      } />

      <One topic={"Knapsack DP"} text={
        `
#include<stdio.j>
#define max 150
int knapsack(int n, int m);
int big(int a,int b);
int w[max],p[max],x[max][max];
int main()
{
    int i, j, profit,n,m;
    printf("Enter the number of items\n");
    scanf("%d",&n);
    printf("Enter the knapsack capacity\n");
    scanf("%d",&m);
    printf("Enter weights and profits: \n");
    for(i=1;i<=n;i++)
    {
        scanf("%d %d",&w[i],&p[i]);
    }
    for(i=0; i<=n; i++) {
        v[i][0] = 0;
    }
    for(j=0; j<=m; j++) {
        v[0][j] = 0;
    }
    profit = knapsack(n,m);
    printf("The optimal profit is %d\n",profit);
}

int knapsack(int n, int m)
{
    int i,j;
    for(i=1;i<=n;i++)
    {
        for(j=1;j<=m;j++)
        {
            if(w[i]>j)
            {
                x[i][j]=x[i-1][j];
            }
            else
            {
                x[i][j]=big(x[i-1][j],x[i-1][j-w[i]]+p[i]);
            }
        }
    }
    return x[n][m];
}
int big(int a, int b) {
    return (a > b) ? a : b;
}
`
      } />

      <One topic={"Knapsack Greedy"} text={
        `
#include <stdio.h>
#include <conio.h>

void knapsack(int n, float weight[], float profit[], float capacity)
{
    float x[20], total_profit;
    int i, j, u;
    u = capacity;
    for (i = 0; i < n; i++)
        x[i] = 0.0;
    total_profit = 0.0;
    for (i = 0; i < n; i++)
    {
        if (weight[i] > u)
            break;
        else
        {
            x[i] = 1.0;
            total_profit = total_profit + profit[i];
            u = u - weight[i];
        }
    }
    if (i < n)
        x[i] = u / weight[i];
    total_profit = total_profit + (x[i] * profit[i]);
    for (i = 0; i < n; i++)
        printf("%f\t", x[i]);
    printf("\nMaximum profit is:- %f", total_profit);
}

void main() {
    float weight[20], profit[20], capacity;
    int num, i, j;
    float ratio[20], temp;
    printf("Enter the no. of objects:- ");
    scanf("%d", &num);
    printf("Enter the weights and profits of each object:- ");
    for (i = 0; i < num; i++)
    {
        scanf("%f %f", &weight[i], &profit[i]);
    }
    printf("Enter the capacity of knapsack:- ");
    scanf("%f", &capacity);
    for (i = 0; i < num; i++)
    {
        ratio[i] = profit[i] / weight[i];
    }
    for (i = 0; i < num; i++)
    {
        for (j = i + 1; j < num; j++)
        {
            if (ratio[i] < ratio[j])
            {
                temp = ratio[j];
                ratio[j] = ratio[i];
                ratio[i] = temp;
                temp = weight[j];
                weight[j] = weight[i];
                weight[i] = temp;
                temp = profit[j];
                profit[j] = profit[i];
                profit[i] = temp;
            }
        }
    }
    knapsack(num, weight, profit, capacity);
}
        `
      } />

      <One topic={"Dijkstras"} text={
        `
#include<stdio.h>
int minimum(int a, int b)
{
    return a<b?a:b;
}
int main() {
    int cost[20][20], s[20], d[20];
    int source, n, mini,u;
    printf("Enter the number of vertices: ");
    scanf("%d", &n);
    printf("Enter the weights of the graphs: ");
    for(int i=1; i<=n; i++)
        for(int j=1; j<=n; j++)
            scanf("%d", &cost[i][j]);
    printf("Enter the source vertex: ");
    scanf("%d", &source);
    for(int i=1; i<=n; i++) {
        s[i] = 0;
        d[i] = cost[source][i];
    }
    s[source] = 1;
    for(int i=1; i<n; i++) {
        mini = 999;
        for(int j=1; j<=n; j++) {
            if(s[j] == 0 && d[j] < mini) {
                mini = d[j];
                u = j;
            }
        }
        s[u] = 1;
        for(int k=1; k<=n; k++) {
            if(s[k] == 0) {
                d[k] = minimum(d[k], d[u] + cost[u][k]);
            }
        }
    }
    printf("The shortest path from the source vertex %d to all other vertices are: \n", source);
}
        `
      } />

      <One topic={"Sum of subsets"} text={
        `
#include <stdio.h>

void printSubset(int subset[], int subsetSize) {
    printf("{ ");
    for (int i = 0; i < subsetSize; i++) {
        printf("%d ", subset[i]);
    }
    printf("}\n");
}

void findSubsets(int arr[], int n, int target, int index, int subset[], int subsetSize) {
    if (target == 0) {
        printSubset(subset, subsetSize);
        return;
    }
    if (index >= n || target < 0) {
        return;
    }
    subset[subsetSize] = arr[index];
    findSubsets(arr, n, target - arr[index], index + 1, subset, subsetSize + 1);
    findSubsets(arr, n, target, index + 1, subset, subsetSize);
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 5;
    
    int subset[n];
    
    printf("Subsets with sum equal to %d are:\n", target);
    findSubsets(arr, n, target, 0, subset, 0);
    
    return 0;
}

`
      } />

      <One topic={"Kruskals"} text={
`
#include<stdio.h>
int parent[10], t[10][3], n[10][10];
int find(int i)
{
    while(parent[i])
        i = parent[i];
    return i;
}
int uni(int i, int j)
{
    if(i != j)
    {
        parent[j] = i;
        return 1;
    }
    return 0;
}
void kruskal(int n) {
    int k,i,j,u,v,min, r,c,sum=0;
    for(k=1; k<n; k++)
    {
        min = 999;
        for(i=1; i<=n; i++)
        {
            for(j=1; j<=n; j++)
            {
                if(i==j) continue;
                if(n[i][j]<min) {
                    v = find(i);
                    u = find(j);
                    if(u!=v) {
                        min = n[i][j];
                        r = i;
                        c = j;
                    }
                }  
            }
            uni(r, find(c));
            t[k][1] = r;
            t[k][2] = c;
            sum += min;
        } 
    }
    printf("cost of spanning tree = %d\n", sum);
    for(i=1; i<n; i++)
        printf("%d %d\n", t[i][1], t[i][2]);
    
}

int main() {
    int i,j,n;
    printf("Enter the number of vertices: ");
    scanf("%d", &n);
    printf("Enter the cost matrix: ");
    for(i=1; i<=n; i++)
    {
        for(j=1; j<=n; j++)
        {
            scanf("%d", &n[i][j]);
            parent[j] = 0;
        }
    }
    kruskal(n);
    return 0;
}
`
      } />

      <One topic={"Prims"} text={
`
#include<stdio.h>
int i,j,k,v,u,n,ne=1;
int min,mincost=0,cost[9][9],visited[9];
int main()
{
    printf("\n Enter the number of nodes:");
    scanf("%d",&n);
    printf("\n Enter the cost matrix:\n");
    for(i=1;i<=n;i++)
    {
        for(j=1;j<=n;j++)
        {
            scanf("%d",&cost[i][j]);
            if(cost[i][j]==0)
                cost[i][j]=999;
        }
    }
    visited[1]=1;
    printf("\n");
    while(ne<n)
    {
        for(i=1,min=999;i<=n;i++)
        {
            for(j=1;j<=n;j++)
            {
                if(cost[i][j]<min)
                {
                    if(visited[i]!=0)
                    {
                        min=cost[i][j];
                        u=i;
                        v=j;
                    }
                }
            }
        }
        if(visited[u]==0 || visited[v]==0)
        {
            printf("\n Edge %d:(%d %d) cost:%d",ne++,u,v,min);
            mincost+=min;
            visited[v]=1;
        }
        cost[u][v]=cost[v][u]=999;
    }
    printf("\n Minimun cost=%d",mincost);
    return 0;
}
`
      } />

      <One topic={"Floyd"} text={
`
#include<stdio.h>
#include<stdlib.h>
#define infinity 999
int min(int a, int b)
{
    return (a<b)?a:b;
}
void floyd(int p[10][10], int n)
{
    int i,j,k;
    for(k=1;k<=n;k++)
        for(i=1;i<=n;i++)
            for(j=1;j<=n;j++)
                p[i][j]=min(p[i][j],p[i][k]+p[k][j]);
}
void main() {
    int a[10][10],n,i,j;
    printf("Enter the number of vertices\n");
    scanf("%d",&n);
    printf("Enter the cost matrix\n");
    for(i=1;i<=n;i++)
        for(j=1;j<=n;j++)
            scanf("%d",&a[i][j]);
    floyd(a,n);
    printf("The all pair shortest path matrix is\n");
    for(i=1;i<=n;i++) {
        for(j=1;j<=n;j++)
            printf("%d\t",a[i][j]);
        printf("\n");
    }
}
`
      } />
    </>
  )
}

export default App

