#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

// Node structure for linked list
typedef struct Node {
    int data;
    struct Node* next;
} Node;

Node* head = NULL;  // Global head pointer

// Trims leading and trailing whitespace
void trim(char* str) {
    int i = 0;
    while (isspace((unsigned char)str[i])) i++;
    memmove(str, str + i, strlen(str) - i + 1);
    i = strlen(str) - 1;
    while (i >= 0 && isspace((unsigned char)str[i])) str[i--] = '\0';
}

// Creates a new node with given value
Node* create_node(int value) {
    Node* new_node = (Node*)malloc(sizeof(Node));
    new_node->data = value;
    new_node->next = NULL;
    return new_node;
}

// Inserts node at the end of the list
void insert_node(int value) {
    Node* new_node = create_node(value);
    if (head == NULL) {
        head = new_node;
    } else {
        Node* temp = head;
        while (temp->next) temp = temp->next;
        temp->next = new_node;
    }
    printf("Inserted %d into linked list.\n", value);
}

// Visualizes the current linked list structure
void visualize_list() {
    printf("\nLinked List Visualization:\n");
    Node* temp = head;
    while (temp) {
        printf("[ %d ] -> ", temp->data);
        temp = temp->next;
    }
    printf("NULL\n");
}

// Parses and handles lines like: insert(10);
void parse_insert(char* line) {
    int value;
    if (sscanf(line, "insert(%d);", &value) == 1) {
        insert_node(value);
    } else {
        printf("Invalid insert syntax: %s\n", line);
    }
}