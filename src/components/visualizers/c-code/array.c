#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define MAX_LINE 256
#define MAX_ARRAY_SIZE 100
#define MAX_VARS 10

// Simulated array and size
int simulated_array[MAX_ARRAY_SIZE];
int array_size = 0;
char array_name[32]; // Stores array name (like "arr")

// Struct for loop variable simulation
typedef struct {
    char name[32];
    int value;
} Variable;

Variable variables[MAX_VARS]; // Variable storage
int var_count = 0;             // Number of variables used

// Sets a variable (like i = 5)
void set_variable(const char* name, int value) {
    for (int i = 0; i < var_count; i++) {
        if (strcmp(variables[i].name, name) == 0) {
            variables[i].value = value;
            return;
        }
    }
    strcpy(variables[var_count].name, name);
    variables[var_count].value = value;
    var_count++;
}

// Gets a variable's value (like get value of i)
int get_variable(const char* name) {
    for (int i = 0; i < var_count; i++) {
        if (strcmp(variables[i].name, name) == 0) {
            return variables[i].value;
        }
    }
    return 0;
}

// Trims leading and trailing spaces
void trim(char* str) {
    int i = 0;
    while (isspace((unsigned char)str[i])) i++;
    memmove(str, str + i, strlen(str) - i + 1);

    i = strlen(str) - 1;
    while (i >= 0 && isspace((unsigned char)str[i])) str[i--] = '\0';
}

// Parses lines like: int arr[5];
void parse_array_declaration(char* line) {
    char type[10];
    int size;
    if (sscanf(line, "%s %[^[][%d];", type, array_name, &size) == 3) {
        array_size = size;
        printf("Detected array '%s' of size %d\n", array_name, array_size);
        for (int i = 0; i < array_size; i++) simulated_array[i] = -1; // Initialize with -1
    }
}

// Evaluates expressions like "i + 1", "5", "5 - i"
int evaluate_expression(char* expr) {
    char left[32], op, right[32];
    if (sscanf(expr, "%[^+-*/]%c%s", left, &op, right) == 3) {
        int lval = isdigit(left[0]) ? atoi(left) : get_variable(left);
        int rval = isdigit(right[0]) ? atoi(right) : get_variable(right);
        switch (op) {
            case '+': return lval + rval;
            case '-': return lval - rval;
            case '*': return lval * rval;
            case '/': return rval != 0 ? lval / rval : 0;
        }
    } else {
        return isdigit(expr[0]) ? atoi(expr) : get_variable(expr);
    }
    return 0;
}

// Parses and executes lines like arr[i] = 5 - i;
void simulate_assignment(char* line) {
    char arr[32], index_expr[32], value_expr[64];
    if (sscanf(line, "%[^[][%[^]]%*[^=]=%[^;];", arr, index_expr, value_expr) == 3) {
        trim(index_expr);
        trim(value_expr);
        int idx = evaluate_expression(index_expr);
        int val = evaluate_expression(value_expr);
        if (strcmp(arr, array_name) == 0 && idx >= 0 && idx < array_size) {
            simulated_array[idx] = val;
            printf("Assigned: %s[%d] = %d\n", array_name, idx, val);
        }
    }
}

// Simulates loops like: for (int i=0; i<5; i++)
void parse_and_expand_loop(char* header_line, char* body_line) {
    char var[32];
    int start, end;

    // Only handle loops of type: for (int i=0; i<5; i++)
    if (sscanf(header_line, "for (int %[^=]=%d; %*[^<]<%d; %*[^)])", var, &start, &end) == 3) {
        for (int i = start; i < end; i++) {
            set_variable(var, i);         // Set i = current iteration
            simulate_assignment(body_line); // Execute body line with i
        }
    } else {
        printf("Failed to parse loop: %s\n", header_line);
    }
}

// Sorts the simulated array (Bubble sort)
void sort_array() {
    for (int i = 0; i < array_size - 1; i++) {
        for (int j = 0; j < array_size - i - 1; j++) {
            if (simulated_array[j] > simulated_array[j + 1]) {
                int temp = simulated_array[j];
                simulated_array[j] = simulated_array[j + 1];
                simulated_array[j + 1] = temp;
            }
        }
    }
    printf("Array sorted.\n");
}

// Lets user enter array values manually
void manual_input_array() {
    if (array_size == 0) {
        printf("Array not declared yet.\n");
        return;
    }
    printf("Enter %d integers for array '%s':\n", array_size, array_name);
    for (int i = 0; i < array_size; i++) {
        printf("%s[%d] = ", array_name, i);
        scanf("%d", &simulated_array[i]);
    }
}

// Displays the array in visual table form
void visualize_array() {
    printf("\nArray visualization:\n");

    // Print top border
    for (int i = 0; i < array_size; i++) printf("+-----");
    printf("+\n");

    // Print values or blank if not initialized
    for (int i = 0; i < array_size; i++) {
        if (simulated_array[i] != -1)
            printf("| %3d ", simulated_array[i]);
        else
            printf("|     ");
    }
    printf("|\n");

    // Print bottom border
    for (int i = 0; i < array_size; i++) printf("+-----");
    printf("+\n");
}