import One from './components/One.jsx'

function App() {

    return (
        <div style={{ padding: "20px" }}>
            <One topic={"socket server"} text={
                `
/ Server.c 
#include <stdio.h> 
#include <stdlib.h> 
#include <string.h> 
#include <unistd.h> 
#include <sys/types.h>  
#include <sys/socket.h> 
#include <netinet/in.h> 
void error(const char *msg) 
{ 
perror(msg); 
exit(1); 
} 
int main(int argc, char *argv[]) 
{ 
int sockfd, newsockfd, portno; 
socklen_t clilen; 
char buffer[256]; 
struct sockaddr_in serv_addr, cli_addr; 
int n; 
if (argc < 2) 
{ 
fprintf(stderr,"You have'nt provided port Number, please enter port number\\n"); 
exit(1); 
} 
sockfd = socket(AF_INET, SOCK_STREAM, 0); 
if (sockfd < 0)  
error("Server : error at port opening"); 
bzero((char *) &serv_addr, sizeof(serv_addr)); 
portno = atoi(argv[1]); 
serv_addr.sin_family = AF_INET; 
serv_addr.sin_addr.s_addr = INADDR_ANY; 
serv_addr.sin_port = htons(portno); 
if (bind(sockfd, (struct sockaddr *) &serv_addr, 
sizeof(serv_addr)) < 0)  
error("Server : Error at binding"); 
listen(sockfd,5); 
clilen = sizeof(cli_addr); 
newsockfd = accept(sockfd,  
(struct sockaddr *) &cli_addr,  
&clilen); 
if (newsockfd < 0)  
error("Server : Error while accepting"); 
bzero(buffer,256); 
n = read(newsockfd,buffer,255); 
if (n < 0) error("Server : ERROR reading from socket"); 
printf("MY message is : %s\\n",buffer); 
n = write(newsockfd,"I Have Recieved your message",30); 
if (n < 0) error("Server : Error while writing to server"); 
close(newsockfd); 
close(sockfd); 
return 0;  
 
} 
                `
            } />

            <One topic={"Socket Client"} text={
                `
{// Client.c 
#include <stdio.h> 
#include <stdlib.h> 
#include <unistd.h> 
#include <string.h> 
#include <sys/types.h> 
#include <sys/socket.h> 
#include <netinet/in.h> 
#include <netdb.h>  
Void error(const char *msg) 
{ 
Perror(msg); 
Exit(0); 
} 
Int main(int argc, char *argv[]) 
{ 
Int sockfd, portno, n; 
Struct sockaddr_in serv_addr; 
Struct hostent *server; 
Char buffer[256]; 
If (argc < 3) { 
Fprintf(stderr,”usage %s Enter your hostname & port number \\n”,  
Argv[0]); 
Exit(0); 
} 
Portno = atoi(argv[2]); 
Sockfd = socket(AF_INET, SOCK_STREAM, 0); 
If (sockfd < 0)  
Error(“Client : Error While opening socket”); 
Server = gethostbyname(argv[1]); 
If (server == NULL) { 
Fprintf(stderr,”Client : Error, host not found\\n”); 
Exit(0); 
} 
Bzero((char *) &serv_addr, sizeof(serv_addr)); 
Serv_addr.sin_family = AF_INET; 
Bcopy((char *)server->h_addr,  
(char *)&serv_addr.sin_addr.s_addr, 
Server->h_length); 
Serv_addr.sin_port = htons(portno); 
if (connect(sockfd,(struct sockaddr *)  
&serv_addr,sizeof(serv_addr)) < 0)  
error("Client : Error while connecting to server"); 
printf("Please enter your message: "); 
bzero(buffer,256); 
fgets(buffer,255,stdin); 
n = write(sockfd,buffer,strlen(buffer)); 
if (n < 0)  
error("Client : Error while writing to socket"); 
bzero(buffer,256); 
n = read(sockfd,buffer,255); 
if (n < 0)  
error(" Client : Error while reading from socket"); 
printf("%s\\n",buffer); 
close(sockfd); 
return 0; 
}
                `
            } />

            <One topic={"exp01.CRC"} text={
                `
#include <stdio.h>

#define DEGREE 16
#define MAX_BITS 128  // Increased to avoid overflow

int mod2add(int, int);
int getnext(int*, int, int);
void calc_crc(int*, int);
int result[MAX_BITS];

void calc_crc(int* result_array, int length) {
    int ccitt[] = {1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1}; // 17 bits
    int i = 0, pos = 0, newpos;

    while (pos < length - DEGREE) {
        if (result_array[pos] == 1) {
            for (i = 0; i < DEGREE + 1; ++i)
                result_array[pos + i] = mod2add(result_array[pos + i], ccitt[i]);
        }
        newpos = getnext(result_array, pos + 1, length);
        if (newpos <= pos) break;
        pos = newpos;
    }
}

int getnext(int array[], int pos, int length) {
    while (pos < length && array[pos] == 0)
        ++pos;
    return pos;
}

int mod2add(int x, int y) {
    return (x == y ? 0 : 1);
}

int main() {
    int array[MAX_BITS], length = 0, i = 0;
    char ch;

    printf("Enter the data (Message) stream (only 0s and 1s): ");
    while ((ch = getchar()) != '\\n' && ch != EOF) {
        if (ch == '0' || ch == '1') {
            array[length++] = ch - '0';
        }
    }

    if (length + DEGREE > MAX_BITS) {
        printf("Error: Input too long.\\n");
        return 1;
    }

    // Append DEGREE zeros
    for (i = 0; i < DEGREE; ++i)
        array[length + i] = 0;

    int total_length = length + DEGREE;

    for (i = 0; i < total_length; ++i)
        result[i] = array[i];

    calc_crc(result, total_length);

    printf("\\nThe transmitted frame is: ");
    for (i = 0; i < length; ++i)
        printf("%d", array[i]);
    for (i = length; i < total_length; ++i)
        printf("%d", result[i]);

    // Decoding
    printf("\\nEnter the stream for which CRC has to be checked: ");
    length = 0;
    while ((ch = getchar()) != '\\n' && ch != EOF) {
        if (ch == '0' || ch == '1') {
            array[length++] = ch - '0';
        }
    }

    if (length > MAX_BITS) {
        printf("Error: Input too long.\\n");
        return 1;
    }

    for (i = 0; i < length; ++i)
        result[i] = array[i];

    calc_crc(result, length);

    printf("\\nCalculated Checksum: ");
    for (i = length - DEGREE; i < length; ++i)
        printf("%d", result[i]);

    // Optional: Check if all zeros
    int error = 0;
    for (i = length - DEGREE; i < length; ++i)
        if (result[i] != 0)
            error = 1;

    printf("\\nCRC Check: %s\\n", error ? "ERROR DETECTED" : "NO ERROR");

    return 0;
}

                        `
            } />

            <One topic={"exp02.substitution"} text={
                `
#include <stdio.h>
#include <string.h>
#include <ctype.h>
#define MAX_LEN 100

// Substitution sequence
char seq[36] = "qwertyuiopasdfghjklzxcvbnm1234567890";

void encrypt(const char *data, char *encoded) {
    int len = strlen(data);
    for (int i = 0; i < len; i++) {
        if (isupper(data[i]))
            encoded[i] = seq[data[i] - 'A'];
        else if (islower(data[i]))
            encoded[i] = toupper(seq[data[i] - 'a']);
        else if (isdigit(data[i]))
            encoded[i] = seq[data[i] - '0' + 26];
        else
            encoded[i] = data[i];
    }
    encoded[len] = '\\0';
}

void decrypt(const char *data, char *decoded) {
    int len = strlen(data);
    int present;
    for (int i = 0; i < len; i++) {
        present = 0;
        for (int j = 0; j < 36; ++j) {
            if (seq[j] == tolower(data[i])) {
                if (isupper(data[i]))
                    decoded[i] = 'A' + j;
                else if (islower(data[i]))
                    decoded[i] = 'a' + j;
                else
                    decoded[i] = '0' + (j - 26);
                present = 1;
                break;
            }
        }
        if (!present)
            decoded[i] = data[i];
    }
    decoded[len] = '\\0';
}

int main() {
    char data[MAX_LEN], encoded[MAX_LEN], decoded[MAX_LEN];

    printf("Enter data to encrypt (max %d characters): ", MAX_LEN - 1);
    fgets(data, MAX_LEN, stdin);
    
    // Remove trailing newline if present
    data[strcspn(data, "\\n")] = '\\0';

    encrypt(data, encoded);
    printf("Encoded string: %s\\n", encoded);

    decrypt(encoded, decoded);
    printf("Decoded string: %s\\n", decoded);

    return 0;
}

                        `
            } />

            <One topic={"exp02.transposition"} text={
                `
#include <stdio.h>
#include <string.h>

#define MAX 100
#define COLS 8

// Keyword
const char keyword[] = "MEGABUCK";

// Generate the column sequence for transposition based on the keyword
void generate_sequence(int seq[]) {
    for (int i = 0; i < COLS; i++) {
        int count = 0;
        for (int j = 0; j < COLS; j++) {
            if (keyword[i] > keyword[j])
                count++;
        }
        seq[i] = count;
    }
}

// Encrypt data using columnar transposition
void encrypt(const char *data, char *output) {
    int seq[COLS];
    generate_sequence(seq);

    int len = strlen(data);
    int rows = len / COLS;
    if (len % COLS != 0)
        rows++;

    char matrix[rows][COLS];

    // Fill matrix row-wise
    int k = 0;
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < COLS; j++) {
            if (k < len)
                matrix[i][j] = data[k++];
            else
                matrix[i][j] = '.';  // Padding character
        }
    }

    // Read column-wise in sequence order
    k = 0;
    for (int s = 0; s < COLS; s++) {
        int col = 0;
        for (int j = 0; j < COLS; j++) {
            if (seq[j] == s) {
                col = j;
                break;
            }
        }
        for (int i = 0; i < rows; i++) {
            output[k++] = matrix[i][col];
        }
    }
    output[k] = '\\0';
}

// Decrypt data using columnar transposition
void decrypt(const char *data, char *output) {
    int seq[COLS];
    generate_sequence(seq);

    int len = strlen(data);
    int rows = len / COLS;

    char matrix[rows][COLS];

    // Fill columns in sequence order
    int k = 0;
    for (int s = 0; s < COLS; s++) {
        int col = 0;
        for (int j = 0; j < COLS; j++) {
            if (seq[j] == s) {
                col = j;
                break;
            }
        }
        for (int i = 0; i < rows; i++) {
            matrix[i][col] = data[k++];
        }
    }

    // Read matrix row-wise
    k = 0;
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < COLS; j++) {
            if (matrix[i][j] != '.')
                output[k++] = matrix[i][j];
        }
    }
    output[k] = '\\0';
}

int main() {
    char data[MAX], encrypted[MAX], decrypted[MAX];

    printf("Enter data to encrypt (max %d chars): ", MAX - 1);
    fgets(data, MAX, stdin);
    data[strcspn(data, "\\n")] = '\\0';  // Remove newline

    encrypt(data, encrypted);
    printf("\\nEncrypted data: %s\\n", encrypted);

    decrypt(encrypted, decrypted);
    printf("Decrypted data: %s\\n", decrypted);

    return 0;
}

                        `
            } />

            <One topic={"exp03.kruskal_MST"} text={
                `
#include <stdio.h>
#include <string.h>

struct node {
    int set;
} node[100];

struct edge {
    int first_node, second_node, selected, distance;
} e[100];

int edge_count = 0;

void getdata(int index, int total) {
    for (int i = index; i < total; i++) {
        if (i != index) {
            printf("Enter distance between Vertex %c and %c: ", index + 65, i + 65);
            scanf("%d", &e[edge_count].distance);
            e[edge_count].first_node = index;
            e[edge_count].second_node = i;
            ++edge_count;
        }
    }
}

void init(int total) {
    for (int i = 0; i < total; i++)
        node[i].set = i;
    for (int i = 0; i < edge_count; i++)
        e[i].selected = -1;
}

void sort() {
    int i, j;
    struct edge temp;
    for (i = 0; i < edge_count - 1; i++) {
        for (j = 0; j < edge_count - i - 1; j++) {
            if (e[j].distance > e[j + 1].distance) {
                temp = e[j];
                e[j] = e[j + 1];
                e[j + 1] = temp;
            }
        }
    }
}

int main() {
    int i, total, j, k, m, n, edgeselected = 0, nodel, noder;

    printf("Enter the number of nodes: ");
    scanf("%d", &total);

    for (i = 0; i < total; i++)
        getdata(i, total);

    init(total);
    sort();

    printf("\\nThe Sorted order of edges:\\n");
    for (i = 0; i < edge_count; i++)
        printf("Edge: %d, First node: %c, Second node: %c, Distance: %d\\n",
               i, e[i].first_node + 65, e[i].second_node + 65, e[i].distance);

    i = 0;
    while (edgeselected < total - 1) {
        nodel = e[i].first_node;
        noder = e[i].second_node;
        if (node[nodel].set != node[noder].set) {
            e[i].selected = 1;
            edgeselected++;
            m = node[nodel].set;
            k = node[noder].set;
            for (n = 0; n < total; n++) {
                if (node[n].set == k)
                    node[n].set = m;
            }
        }
        i++;
    }

    printf("\\nMinimum Spanning Tree is:\\n");
    for (i = 0; i < edge_count; ++i) {
        if (e[i].selected == 1) {
            printf("%c <--> %c\\tDistance: %d\\n",
                   e[i].first_node + 65, e[i].second_node + 65, e[i].distance);
        }
    }

    return 0;
}

                        `
            } />

            <One topic={"exp03.prims_algo"} text={
                `
#include <stdio.h>
#define INFINITY 999

int prim(int cost[10][10], int source, int n) {
    int i, j, sum = 0, visited[10], cmp[10], vertex[10];
    int min, u = 0, v;

    for (i = 1; i <= n; i++) {
        vertex[i] = source;
        visited[i] = 0;
        cmp[i] = cost[source][i];
    }
    visited[source] = 1;

    for (i = 1; i <= n - 1; i++) {
        min = INFINITY;

        for (j = 1; j <= n; j++) {
            if (!visited[j] && cmp[j] < min) {
                min = cmp[j];
                u = j;
            }
        }

        visited[u] = 1;
        sum += cmp[u];
        printf("\\n %d -> %d  (weight = %d)", vertex[u], u, cmp[u]);

        for (v = 1; v <= n; v++) {
            if (!visited[v] && cost[u][v] < cmp[v]) {
                cmp[v] = cost[u][v];
                vertex[v] = u;
            }
        }
    }

    return sum;
}

int main() {
    int a[10][10], n, i, j, total_cost, source;
    int valid = 1;

    printf("Enter the number of vertices: ");
    scanf("%d", &n);

    printf("Enter the cost matrix (0 = self-loop, 999 = no edge):\\n");
    for (i = 1; i <= n; i++) {
        for (j = 1; j <= n; j++) {
            scanf("%d", &a[i][j]);
        }
    }

    // Validate symmetry and diagonal
    for (i = 1; i <= n; i++) {
        for (j = 1; j <= n; j++) {
            if (a[i][j] != a[j][i] || a[i][i] != 0) {
                valid = 0;
            }
        }
    }

    if (!valid) {
        printf("\\nInvalid cost matrix! It must be symmetric with 0s on the diagonal.\\n");
        return 1;
    }

    printf("Enter the source vertex (1 to %d): ", n);
    scanf("%d", &source);

    total_cost = prim(a, source, n);
    printf("\\n\\nTotal cost of Minimum Spanning Tree = %d\\n", total_cost);

    return 0;
}

                        `
            } />

            {/* <One topic={"exp08.RSA"} text={
                `
#include <stdio.h>

long gcd(long a, long b) {
    return b ? gcd(b, a % b) : a;
}

long ext(long a, long b, long *x, long *y) {
    if (!b) {
        *x = 1;
        *y = 0;
        return a;
    }
    long x1, y1, g = ext(b, a % b, &x1, &y1);
    *x = y1;
    *y = x1 - (a / b) * y1;
    return g;
}

long inv(long e, long phi) {
    long x, y;
    ext(e, phi, &x, &y);
    return (x % phi + phi) % phi;
}

long modexp(long b, long e, long m) {
    long r = 1;
    while (e) {
        if (e & 1) r = r * b % m;
        b = b * b % m;
        e >>= 1;
    }
    return r;
}

int main() {
    long p, q, m;
    printf("Enter two primes p and q, and the message m to encrypt:\\n");
    if (scanf("%ld%ld%ld", &p, &q, &m) != 3) {
        printf("Invalid input!\\n");
        return 1;
    }

    long n = p * q;
    long phi = (p - 1) * (q - 1);
    long e = 3;

    // Pick smallest odd e that is co-prime to phi
    while (gcd(e, phi) > 1) {
        e += 2;
        if (e >= phi) {
            printf("No valid e found.\\n");
            return 1;
        }
    }

    long d = inv(e, phi);
    long c = modexp(m, e, n);  // encryption
    long decrypted = modexp(c, d, n);  // decryption

    printf("Public key (e, n): (%ld, %ld)\\n", e, n);
    printf("Private key (d, n): (%ld, %ld)\\n", d, n);
    printf("Encrypted message: %ld\\n", c);
    printf("Decrypted message: %ld\\n", decrypted);

    return 0;
}

                        `
            } />  */}

        </div>
    )
}

export default App
