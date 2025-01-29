import One from './components/One.jsx'

function App() {

  return (
    <>
      <One topic={"Bit Stuffing"} text={
        `
#include<stdio.h>
void main() {
    int i=0, count=0;
    char a[100];
    printf("Enter the frame(0's & 1's) :");
    scanf("%s",a);
    printf("\n After bit stuffing\n");
    for(i=0; a[i]; i++) {
        if(a[i]=='1')
            count++;
        else
            count=0;
        printf("%c",a[i]);
        if(count==5) {
            printf("0");
            count=0;
        }
    }
}
`
      } />

      <One topic={"Character Stuffing"} text={
        `
#include <string.h>
#include <stdio.h>

void main() {
    int i = 0, j = 0, n;
    char a[30], b[60];
    char startFlag[10], endFlag[10];

    printf("\nEnter starting flag characters:\n");
    scanf("%s", startFlag);

    printf("\nEnter ending flag characters:\n");
    scanf("%s", endFlag);

    printf("\nEnter original string:\n");
    scanf("%s", a);
    n = strlen(a);

    for (i = 0; startFlag[i] != 'slash0'; i++) {
        b[j] = startFlag[i];
        j++;
    }

    i = 0;
    while (i < n) {
        if (a[i] == 'd' && a[i + 1] == 'l' && a[i + 2] == 'e') {
            for (int k = 0; k < 3; k++) {
                b[j] = a[i + k];
                j++;
            }
        }
        b[j] = a[i];
        i++;
        j++;
    }

    for (i = 0; endFlag[i] != 'slash0'; i++) {
        b[j] = endFlag[i];
        j++;
    }

    b[j] = 'slash0';

    printf("\nAfter character stuffing:\n");
    printf("%s\n", b);
}

`
      } />

      <One topic={"Distance vector routing"} text={
        `
#include<stdio.h>

struct node {
    unsigned dist[20];
    unsigned from[20];
} rt[10];

int main() {
    int costmat[20][20];
    int nodes, i, j, k;
    

    printf("Enter the number of nodes: ");
    scanf("%d", &nodes);

    // Input: Cost matrix
    printf("\nEnter the cost matrix (use a large value like 999 for infinity):\n");
    for (i = 0; i < nodes; i++) {
        for (j = 0; j < nodes; j++) {
            scanf("%d", &costmat[i][j]);
            if (i == j) costmat[i][j] = 0;
            rt[i].dist[j] = costmat[i][j];
            rt[i].from[j] = j;
        }
    }

    int updated;
    do {
        updated = 0;
        for (i = 0; i < nodes; i++) {
            for (j = 0; j < nodes; j++) {
                for (k = 0; k < nodes; k++) {

                    if (rt[i].dist[j] > costmat[i][k] + rt[k].dist[j]) {
                        rt[i].dist[j] = costmat[i][k] + rt[k].dist[j];
                        rt[i].from[j] = k;
                        updated = 1;
                    }
                }
            }
        }
    } while (updated);


    for (i = 0; i < nodes; i++) {
        printf("\nRouting Table for Router %d:\n", i + 1);
        printf("Destination\tNext Hop\tDistance\n");
        for (j = 0; j < nodes; j++) {
            printf("%d\t\t%d\t\t%d\n", j + 1, rt[i].from[j] + 1, rt[i].dist[j]);
        }
    }

    return 0;
}

        `
      } />

      <One topic={"Link State Routing"} text={
        `
#include<stdio.h>

#define infinity 999

void dij(int n, int v, int cost[10][10], int dist[]) {
    int i, u, count, w, flag[10], min;

    for (i = 1; i <= n; i++) {
        flag[i] = 0;
        dist[i] = cost[v][i];
    }

    flag[v] = 1;
    count = 2;

    while (count <= n) {
        min = infinity;

        for (w = 1; w <= n; w++) {
            if (dist[w] < min && !flag[w]) {
                min = dist[w];
                u = w;
            }
        }
        
        flag[u] = 1;
        count++;

        for (w = 1; w <= n; w++) {
            if ((dist[u] + cost[u][w] < dist[w]) && !flag[w]) {
                dist[w] = dist[u] + cost[u][w];
            }
        }
    }
}


void main() {
    int n, v, i, j, cost[10][10], dist[10];

    printf("Enter the number of nodes: ");
    scanf("%d", &n);

    printf("\nEnter the cost matrix:\n");
    for (i = 1; i <= n; i++) {
        for (j = 1; j <= n; j++) {
            scanf("%d", &cost[i][j]);
            if (cost[i][j] == 0)
                cost[i][j] = infinity;
        }
    }


    printf("\nEnter the source node: ");
    scanf("%d", &v);


    dij(n, v, cost, dist);


    printf("\nShortest paths from node %d:\n", v);
    for (i = 1; i <= n; i++) {
        if (i != v)
            printf("%d -> %d, cost = %d\n", v, i, dist[i]);
    }
}

        `
      } />

      <One topic={"Stop & Wait protocol"} text={
        `
#include <stdio.h>
#include <stdlib.h>
#define TOT_FRAMES 7
#define TIMEOUT 4

enum {NO, YES} ACK;

int main() {
    int i = 1, wait_time;

    ACK = YES;

    for (; i <= TOT_FRAMES;) {
        printf("\nSENDER: Frame %d sent, waiting for ACK...\n", i);

        wait_time = rand() % 4 + 1;

        if (wait_time == TIMEOUT) {
            printf("SENDER: ACK not received for frame %d => TIMEOUT! Resending frame...\n", i);
        } else {
            if (ACK == YES && i != 1) {
                printf("\nSENDER: ACK for frame %d received\n", i - 1);
            }
            printf("\nRECEIVER: Frame %d received, ACK sent\n", i);
            printf("-------------------------------");
            ACK = YES;
            i++;
        }
    }

    return 0;
}


`
      } />

      <One topic={"Leaky Bucket"} text={
`
#include <stdio.h>

int main() {
    int incoming, outgoing, bucket_size, num_inputs, store = 0;

    printf("Enter bucket size: ");
    scanf("%d", &bucket_size);

    printf("Enter outgoing rate: ");
    scanf("%d", &outgoing);

    printf("Enter number of inputs: ");
    scanf("%d", &num_inputs);


    while (num_inputs > 0) {
        printf("Enter incoming packet size: ");
        scanf("%d", &incoming);


        if (incoming <= (bucket_size - store)) {
            store += incoming;
            printf("Bucket buffer size: %d out of %d\n", store, bucket_size);
        } else {
            printf("Dropped %d packets\n", incoming - (bucket_size - store));
            store = bucket_size;
            printf("Bucket buffer size: %d out of %d\n", store, bucket_size);
        }

        store -= outgoing;
        if (store < 0) store = 0;
        printf("After outgoing, %d packets left out of %d in buffer\n", store, bucket_size);

        num_inputs--;
    }

    return 0;
}
 
`
      } />

      <One topic={"Sliding Window"} text={
`
#include <stdio.h>

int main() {
	int window_size, num_frames, frames[50];

	printf("Enter window size: ");
	scanf("%d", &window_size);
	printf("Enter number of frames to transmit: ");
	scanf("%d", &num_frames);

	printf("Enter %d frames: ", num_frames);
	for (int i = 1; i <= num_frames; i++) {
		scanf("%d", &frames[i]);
	}

	printf("\nSending frames in the following manner:\n");
	for (int i = 1; i <= num_frames; i++) {

		printf("%d\t", frames[i]);

		if (i % window_size == 0 || i == num_frames) {
			printf("\nSENDER: waiting for ACK\n");
			printf("RECEIVER: Frames Received, ACK SENT\n");
			printf("SENDER: ACK received, sending next frames\n\n");
		}
	}

	if (num_frames % window_size != 0) {
		printf("\nSENDER: waiting for ACK...\n");
		printf("RECEIVER: Frames Received, ACK SENT\n");
		printf("SENDER: ACK received\n");
	}

	return 0;
}

`
      } />

      <One topic={"Slient - Server"} text={
`
//Server
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>

#define MAX 80
#define PORT 8080
#define SA struct sockaddr


void chat(int connfd) {
    char buff[MAX];
    int n;

    for (;;) {
        bzero(buff, sizeof(buff));
        read(connfd, buff, sizeof(buff));
        printf("From client: %s", buff);

        bzero(buff, sizeof(buff));
        printf("To client: ");
        n = 0;
        while ((buff[n++] = getchar()) != '\n');

        write(connfd, buff, sizeof(buff));

        if (strncmp(buff, "exit", 4) == 0) {
            printf("Server Exit...\n");
            break;
        }
    }
}

int main() {
    int sockfd, connfd;
    struct sockaddr_in servaddr, cli;

    sockfd = socket(AF_INET, SOCK_STREAM, 0);
    if (sockfd == -1) {
        perror("Socket creation failed");
        exit(0);
    }
    printf("Socket created successfully.\n");

    bzero(&servaddr, sizeof(servaddr));

    servaddr.sin_family = AF_INET;
    servaddr.sin_addr.s_addr = htonl(INADDR_ANY);
    servaddr.sin_port = htons(PORT);

    if (bind(sockfd, (SA*)&servaddr, sizeof(servaddr)) != 0) {
        perror("Socket binding failed");
        exit(0);
    }
    printf("Socket successfully binded.\n");

    if (listen(sockfd, 5) != 0) {
        perror("Listen failed");
        exit(0);
    }
    printf("Server listening...\n");

    socklen_t len = sizeof(cli);
    connfd = accept(sockfd, (SA*)&cli, &len);
    if (connfd < 0) {
        perror("Server accept failed");
        exit(0);
    }
    printf("Server connected to client.\n");

    chat(connfd);

    close(sockfd);
    return 0;
}

//Client
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <unistd.h>

#define MAX 80
#define PORT 8080
#define SA struct sockaddr

void chat(int sockfd) {
    char buff[MAX];
    int n;

    for (;;) {
        bzero(buff, sizeof(buff));
        printf("Enter message: ");
        n = 0;
        while ((buff[n++] = getchar()) != '\n');

        write(sockfd, buff, sizeof(buff));

        bzero(buff, sizeof(buff));
        read(sockfd, buff, sizeof(buff));
        printf("From server: %s", buff);

        if (strncmp(buff, "exit", 4) == 0) {
            printf("Client Exit...\n");
            break;
        }
    }
}

int main() {
    int sockfd;
    struct sockaddr_in servaddr;

    sockfd = socket(AF_INET, SOCK_STREAM, 0);
    if (sockfd == -1) {
        perror("Socket creation failed");
        exit(0);
    }
    printf("Socket created successfully.\n");

    bzero(&servaddr, sizeof(servaddr));

    servaddr.sin_family = AF_INET;
    servaddr.sin_addr.s_addr = inet_addr("127.0.0.1");
    servaddr.sin_port = htons(PORT);

    if (connect(sockfd, (SA*)&servaddr, sizeof(servaddr)) != 0) {
        perror("Connection with server failed");
        exit(0);
    }
    printf("Connected to server.\n");
    
    chat(sockfd);

    close(sockfd);
    return 0;
}
`
      } />

        <One topic={"CRC"} text={
`
#include <stdio.h>

#define MAX_LEN 100
#define POLY_LEN 17

int a[MAX_LEN], b[MAX_LEN], len, i, j, count = 0;
int gp[POLY_LEN] = {1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1};

void divide() {
	for (i = 0; i < len - 16; i++) {
		if (a[i] == gp[0]) {
			for (j = 0; j < POLY_LEN; j++) {
				a[i + j] ^= gp[j];
			}
		}
	}
}

int main() {
	printf("Enter the length of Data Frame: ");
	scanf("%d", &len);

	printf("Enter the Message:\n");
	for (i = 0; i < len; i++) {
		scanf("%d", &a[i]);
	}

	for (i = 0; i < 16; i++) {
		a[len++] = 0;
	}

	for (i = 0; i < len; i++) {
		b[i] = a[i];
	}

	divide();

	for (i = 0; i < len; i++) {
		b[i] ^= a[i];
	}

	printf("\nData to be transmitted:\n");
	for (i = 0; i < len; i++) {
		printf("%d ", b[i]);
	}

	printf("\nEnter the Received Data:\n");
	for (i = 0; i < len; i++) {
		scanf("%d", &a[i]);
	}

	divide();

	for (i = 0; i < len; i++) {
		if (a[i] != 0) {
			printf("\nERROR in Received Data\n");
			return 0;
		}
	}

	printf("\nData Received is ERROR FREE\n");
	return 0;
}
`
      } />

      <One topic={"Dist vector CPP"} text={
`
#include <bits/stdc++.h>
using namespace std;

#define INF 0x3f3f3f3f

class Graph {
    int V;
    vector<list<pair<int, int>>> adj;

public:
    Graph(int V) {
        this->V = V;
        adj.resize(V);
    }

    void addEdge(int u, int v, int w) {
        adj[u].push_back({v, w});
        adj[v].push_back({u, w});
    }

    void shortestPath(int src) {
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
        vector<int> dist(V, INF);
        dist[src] = 0;
        pq.push({0, src});

        while (!pq.empty()) {
            int u = pq.top().second;
            pq.pop();

            for (auto& edge : adj[u]) {
                int v = edge.first;
                int weight = edge.second;

                if (dist[v] > dist[u] + weight) {
                    dist[v] = dist[u] + weight;
                    pq.push({dist[v], v});
                }
            }
        }

        cout << "Vertex Distance from Source\n";
        for (int i = 0; i < V; ++i) {
            cout << i << " \t\t " << dist[i] << endl;
        }
    }
};

int main() {
    int V = 7;
    Graph g(V);

    g.addEdge(0, 1, 2);
    g.addEdge(0, 2, 6);
    g.addEdge(1, 3, 5);
    g.addEdge(2, 3, 8);
    g.addEdge(3, 4, 10);
    g.addEdge(3, 5, 15);
    g.addEdge(4, 6, 2);
    g.addEdge(5, 6, 6);

    g.shortestPath(0);

    return 0;
}

`
      } />
    <One topic={"RSA Algorithm"} text={
`
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

unsigned int mod_exp(int base, int exp, int n) {
	unsigned int result = 1;
	for (int i = 0; i < exp; i++) {
		result = (result * base) % n;
	}
	return result;
}

int gcd(int a, int b) {
	while (a != b) {
		if (a > b)
			a -= b;
		else
			b -= a;
	}
	return a;
}

int main() {

	int p = 47, q = 71;

	int n = p * q;
	int phi_n = (p - 1) * (q - 1);

	int e = n - 1;
	while (gcd(e, phi_n) != 1) {
		e--;
	}

	int d = 1;
	while ((e * d) % phi_n != 1) {
		d++;
	}

	char input_str[20];
	printf("\nEnter the input string: ");
	scanf("%s", input_str);
	printf("\nThe entered string is: %s\n", input_str);

	unsigned int encrypted[20] = {0};
	printf("\nThe encrypted string is:\n");
	for (int i = 0; i < strlen(input_str); i++) {
		encrypted[i] = mod_exp(input_str[i], e, n);
		printf("%c = %3d\n", input_str[i], encrypted[i]);
	}

	printf("\nDecrypted string is: ");
	for (int i = 0; i < strlen(input_str); i++) {
		char decrypted_char = (char)mod_exp(encrypted[i], d, n);
		printf("%c", decrypted_char);
	}
	printf("\n");

	return 0;
}

`
      } />
    </>
  )
}

export default App

