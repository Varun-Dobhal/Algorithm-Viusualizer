#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define MAX_VERTICES 100

int adj[MAX_VERTICES][MAX_VERTICES];  // Adjacency matrix
int visited[MAX_VERTICES];            // Visited array for DFS/BFS
int num_vertices = 0;                 // Track number of vertices

void trim(char* str) {
    int i = 0;
    while (isspace((unsigned char)str[i])) i++;
    memmove(str, str + i, strlen(str) - i + 1);
    i = strlen(str) - 1;
    while (i >= 0 && isspace((unsigned char)str[i])) str[i--] = '\0';
}

void add_vertex(int v) {
    if (v >= num_vertices) {
        num_vertices = v + 1;
    }
    printf("Vertex %d added.\n", v);
}

void add_edge(int u, int v) {
    adj[u][v] = 1;
    adj[v][u] = 1; // Undirected graph
    printf("Edge added between %d and %d\n", u, v);
}

void delete_edge(int u, int v) {
    adj[u][v] = 0;
    adj[v][u] = 0;
    printf("Edge deleted between %d and %d\n", u, v);
}

void dfs_util(int v) {
    visited[v] = 1;
    printf("%d ", v);
    for (int i = 0; i < num_vertices; i++) {
        if (adj[v][i] && !visited[i]) {
            dfs_util(i);
        }
    }
}

void dfs(int start) {
    memset(visited, 0, sizeof(visited));
    printf("DFS from %d: ", start);
    dfs_util(start);
    printf("\n");
}

void bfs(int start) {
    memset(visited, 0, sizeof(visited));
    int queue[MAX_VERTICES], front = 0, rear = 0;
    queue[rear++] = start;
    visited[start] = 1;

    printf("BFS from %d: ", start);
    while (front < rear) {
        int v = queue[front++];
        printf("%d ", v);
        for (int i = 0; i < num_vertices; i++) {
            if (adj[v][i] && !visited[i]) {
                visited[i] = 1;
                queue[rear++] = i;
            }
        }
    }
    printf("\n");
}