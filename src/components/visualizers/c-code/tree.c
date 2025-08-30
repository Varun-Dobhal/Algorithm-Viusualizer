#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

// Structure for binary tree node
typedef struct Node {
    int data;
    struct Node* left;
    struct Node* right;
} Node;

Node* root = NULL;  // Global root pointer

// Utility to trim leading and trailing whitespace
void trim(char* str) {
    int i = 0;
    while (isspace((unsigned char)str[i])) i++;
    memmove(str, str + i, strlen(str) - i + 1);
    i = strlen(str) - 1;
    while (i >= 0 && isspace((unsigned char)str[i])) str[i--] = '\0';
}

// Create a new node with given value
Node* create_node(int value) {
    Node* node = (Node*)malloc(sizeof(Node));
    node->data = value;
    node->left = node->right = NULL;
    return node;
}

// Insert a node in the BST
Node* insert_node(Node* node, int value) {
    if (node == NULL) {
        printf("Inserted %d\n", value);
        return create_node(value);
    }
    if (value < node->data)
        node->left = insert_node(node->left, value);
    else if (value > node->data)
        node->right = insert_node(node->right, value);
    return node;
}

// Find the minimum value node in a subtree
Node* min_value_node(Node* node) {
    Node* current = node;
    while (current && current->left != NULL)
        current = current->left;
    return current;
}

// Delete a node from BST
Node* delete_node(Node* node, int value) {
    if (node == NULL) return NULL;

    if (value < node->data)
        node->left = delete_node(node->left, value);
    else if (value > node->data)
        node->right = delete_node(node->right, value);
    else {
        // Node with only one child or no child
        if (node->left == NULL) {
            Node* temp = node->right;
            printf("Deleted %d\n", node->data);
            free(node);
            return temp;
        } else if (node->right == NULL) {
            Node* temp = node->left;
            printf("Deleted %d\n", node->data);
            free(node);
            return temp;
        }

        // Node with two children
        Node* temp = min_value_node(node->right);
        node->data = temp->data;
        node->right = delete_node(node->right, temp->data);
    }
    return node;
}

// In-order traversal (Left, Root, Right)
void inorder(Node* node) {
    if (node == NULL) return;
    inorder(node->left);
    printf("[ %d ] ", node->data);
    inorder(node->right);
}

// Pre-order traversal (Root, Left, Right)
void preorder(Node* node) {
    if (node == NULL) return;
    printf("[ %d ] ", node->data);
    preorder(node->left);
    preorder(node->right);
}

// Post-order traversal (Left, Right, Root)
void postorder(Node* node) {
    if (node == NULL) return;
    postorder(node->left);
    postorder(node->right);
    printf("[ %d ] ", node->data);
}