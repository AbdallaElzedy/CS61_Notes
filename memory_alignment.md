# Bitwise Operations and Memory Alignment in C++

## Table of Contents
1. [Introduction to Bitwise Operations](#introduction-to-bitwise-operations)
2. [Understanding Memory Alignment](#understanding-memory-alignment)
3. [The Magic of `& ~15u`](#the-magic-of--15u)
4. [Struct Memory Layout and Padding](#struct-memory-layout-and-padding)
5. [Mathematical Intuition](#mathematical-intuition)
6. [Power of Two Detection](#power-of-two-detection)
7. [Practical Applications](#practical-applications)

## Introduction to Bitwise Operations

Bitwise operations manipulate individual bits in binary numbers. They're fundamental for low-level programming, optimization, and memory management.

### Basic Bitwise Operators

| Operator | Name | Description | Example |
|----------|------|-------------|---------|
| `&` | AND | Both bits must be 1 | `5 & 3 = 1` |
| `\|` | OR | At least one bit must be 1 | `5 \| 3 = 7` |
| `^` | XOR | Bits must be different | `5 ^ 3 = 6` |
| `~` | NOT | Flips all bits | `~5 = -6` |
| `<<` | Left Shift | Moves bits left | `5 << 1 = 10` |
| `>>` | Right Shift | Moves bits right | `10 >> 1 = 5` |

### Visual Examples

```
AND (&):          OR (|):           XOR (^):
  0101 (5)          0101 (5)          0101 (5)
& 0011 (3)        | 0011 (3)        ^ 0011 (3)
-------           -------           -------
  0001 (1)          0111 (7)          0110 (6)
```

## Understanding Memory Alignment

### What is Memory Alignment?

Memory alignment refers to arranging data at memory addresses that are multiples of certain values (typically powers of 2). This is crucial for CPU performance and sometimes required for correctness.

### Why Alignment Matters

CPUs read memory in chunks (e.g., 4 or 8 bytes at once). Misaligned data requires multiple reads:

#### Misaligned Access (Slow)
Reading 4-byte integer at address 3:

| Address | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---------|---|---|---|---|---|---|---|---|
| Memory  | □ | □ | □ | ▓ | ▓ | ▓ | ▓ | □ |
| Read #1 | ← | ← | ← | ← |   |   |   |   |
| Read #2 |   |   |   |   | ← | ← | ← | ← |

**Result:** 2 memory accesses + combining data = SLOW

#### Aligned Access (Fast)
Reading 4-byte integer at address 4:

| Address | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---------|---|---|---|---|---|---|---|---|
| Memory  | □ | □ | □ | □ | ▓ | ▓ | ▓ | ▓ |
| Read #1 |   |   |   |   | ← | ← | ← | ← |

**Result:** 1 memory access = FAST

### Alignment Requirements

| Data Type | Size | Typical Alignment | Valid Addresses |
|-----------|------|-------------------|-----------------|
| `char` | 1 byte | 1 | Any address |
| `short` | 2 bytes | 2 | 0, 2, 4, 6, ... |
| `int` | 4 bytes | 4 | 0, 4, 8, 12, ... |
| `double` | 8 bytes | 8 | 0, 8, 16, 24, ... |
| SSE vectors | 16 bytes | 16 | 0, 16, 32, 48, ... |
| AVX vectors | 32 bytes | 32 | 0, 32, 64, 96, ... |

## The Magic of `& ~15u`

### How It Works

The expression `& ~15u` rounds DOWN to the nearest 16-byte boundary.

#### Step 1: Understanding the Mask

| Value | Binary | Description |
|-------|--------|-------------|
| 15 | `0000 1111` | Last 4 bits set |
| ~15 | `1111 0000` | Last 4 bits cleared |

#### Step 2: The AND Operation

| Bit Position | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
|--------------|---|---|---|---|---|---|---|---|
| Any Address  | X | X | X | X | X | X | X | X |
| Mask (~15)   | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 |
| Result       | X | X | X | X | 0 | 0 | 0 | 0 |

**Effect:** Clears the last 4 bits, making the result divisible by 16.

### Examples

| Address | Binary | `& ~15u` | Result | Aligned? |
|---------|--------|----------|--------|----------|
| 0 | `0000 0000` | `0000 0000` | 0 | ✓ |
| 7 | `0000 0111` | `0000 0000` | 0 | ✓ |
| 16 | `0001 0000` | `0001 0000` | 16 | ✓ |
| 25 | `0001 1001` | `0001 0000` | 16 | ✓ |
| 32 | `0010 0000` | `0010 0000` | 32 | ✓ |
| 47 | `0010 1111` | `0010 0000` | 32 | ✓ |

### Visual Memory Layout

Before alignment (data at address 25):

| Address | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 |
|---------|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|
| Content | □  | □  | □  | □  | □  | □  | □  | □  | □  | ▓  | ▓  | ▓  | ▓  | □  | □  | □  |

After `25 & ~15u = 16`:

| Address | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 |
|---------|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|
| Content | ▓  | ▓  | ▓  | ▓  | □  | □  | □  | □  | □  | □  | □  | □  | □  | □  | □  | □  |

## Struct Memory Layout and Padding

### Why Structs Need Padding

Compilers add padding bytes to ensure each member is properly aligned. This affects the total size of the struct.

### Example 1: Poor Layout

```cpp
struct PoorLayout {
    char a;     // 1 byte
    int b;      // 4 bytes
    char c;     // 1 byte
    short d;    // 2 bytes
};
```

Memory layout:

| Offset | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
|--------|---|---|---|---|---|---|---|---|---|---|----|-----|
| Data   | a | ❌ | ❌ | ❌ | b | b | b | b | c | ❌ | d  | d   |
| Type   | char | pad | pad | pad | int | int | int | int | char | pad | short | short |

**Total size: 12 bytes** (4 bytes of padding wasted!)

### Example 2: Optimized Layout

```cpp
struct OptimizedLayout {
    int b;      // 4 bytes
    short d;    // 2 bytes
    char a;     // 1 byte
    char c;     // 1 byte
};
```

Memory layout:

| Offset | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|--------|---|---|---|---|---|---|---|---|
| Data   | b | b | b | b | d | d | a | c |
| Type   | int | int | int | int | short | short | char | char |

**Total size: 8 bytes** (no padding needed!)

### Example 3: Complex Struct

```cpp
struct ComplexExample {
    char flag;          // 1 byte
    double value;       // 8 bytes (needs 8-byte alignment)
    short count;        // 2 bytes
    int* ptr;          // 8 bytes on 64-bit system
    char status;       // 1 byte
};
```

Memory layout on 64-bit system:

| Offset | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
|--------|---|---|---|---|---|---|---|---|---|---|----|----|----|----|----|----|
| Data   | flag | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | value | value | value | value | value | value | value | value |

| Offset | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 |
|--------|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|
| Data   | count | count | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ptr | ptr | ptr | ptr | ptr | ptr | ptr | ptr |

| Offset | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 |
|--------|----|----|----|----|----|----|----|-----|
| Data   | status | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

**Total size: 40 bytes** (15 bytes of padding!)

### Alignment Rules for Structs

1. **Member Alignment**: Each member is aligned to its natural boundary
2. **Struct Alignment**: The struct itself is aligned to the largest member's alignment
3. **Total Size**: Must be a multiple of the struct's alignment

### Using `alignas` Specifier

```cpp
struct alignas(16) AlignedStruct {
    char data[13];  // 13 bytes
};  // Total size: 16 bytes (3 bytes padding)
```

Memory layout:

| Offset | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
|--------|---|---|---|---|---|---|---|---|---|---|----|----|----|----|----|----|----|
| Data   | d | d | d | d | d | d | d | d | d | d | d  | d  | d  | ❌  | ❌  | ❌  |

### Checking Struct Layout

```cpp
#include <iostream>
#include <cstddef>

struct Example {
    char a;
    int b;
    char c;
    short d;
};

int main() {
    std::cout << "Size of struct: " << sizeof(Example) << " bytes\n";
    std::cout << "Offset of a: " << offsetof(Example, a) << "\n";
    std::cout << "Offset of b: " << offsetof(Example, b) << "\n";
    std::cout << "Offset of c: " << offsetof(Example, c) << "\n";
    std::cout << "Offset of d: " << offsetof(Example, d) << "\n";
}
```

Output:
```
Size of struct: 12 bytes
Offset of a: 0
Offset of b: 4
Offset of c: 8
Offset of d: 10
```

### Packed Structs (No Padding)

```cpp
#pragma pack(1)
struct PackedStruct {
    char a;     // offset 0
    int b;      // offset 1 (unaligned!)
    char c;     // offset 5
    short d;    // offset 6
};  // Total size: 8 bytes
#pragma pack()
```

Memory layout:

| Offset | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|--------|---|---|---|---|---|---|---|---|
| Data   | a | b | b | b | b | c | d | d |

**Warning**: Packed structs can be slower due to unaligned access!

## Mathematical Intuition

### Expression: `u - (u & 15)`

This expression also rounds DOWN to the nearest multiple of 16. Here's why:

1. `u & 15` extracts the last 4 bits (remainder when divided by 16)
2. `u - (u & 15)` subtracts this remainder, leaving a multiple of 16

#### Proof of Equivalence

```
u - (u & 15) = u & ~15

Example with u = 25:
• u & 15 = 25 & 15 = 9 (the remainder)
• u - 9 = 25 - 9 = 16
• u & ~15 = 25 & ~15 = 16 ✓
```

#### Why It's Like `(u / 16) * 16`

| Expression | Operation | Result for u=25 |
|------------|-----------|-----------------|
| `(u / 16) * 16` | Integer division then multiply | `(25 / 16) * 16 = 1 * 16 = 16` |
| `u & ~15` | Clear last 4 bits | `16` |
| `u - (u & 15)` | Subtract remainder | `25 - 9 = 16` |

**Advantage:** Bitwise operations are typically faster than division!

### Common Alignment Patterns

| Align to | Mask | Operation | Example |
|----------|------|-----------|---------|
| 2 | `& ~1` | Clear last 1 bit | `5 & ~1 = 4` |
| 4 | `& ~3` | Clear last 2 bits | `7 & ~3 = 4` |
| 8 | `& ~7` | Clear last 3 bits | `13 & ~7 = 8` |
| 16 | `& ~15` | Clear last 4 bits | `25 & ~15 = 16` |
| 32 | `& ~31` | Clear last 5 bits | `50 & ~31 = 32` |

## Power of Two Detection

### Expression: `u & (u - 1)`

This clever expression detects if a number is a power of 2.

#### How It Works

When you subtract 1 from a number:
- It flips all trailing zeros to ones
- It flips the rightmost 1 to 0

```
u     = 1000 (8 in binary)
u - 1 = 0111 (7 in binary)
u & (u-1) = 0000 (result is 0!)
```

#### Examples

| Number | Binary | u - 1 | Binary | u & (u-1) | Is Power of 2? |
|--------|--------|-------|--------|-----------|----------------|
| 0 | `0000` | -1 | N/A | 0 | Special case ✓ |
| 1 | `0001` | 0 | `0000` | 0 | ✓ |
| 2 | `0010` | 1 | `0001` | 0 | ✓ |
| 3 | `0011` | 2 | `0010` | 2 | ✗ |
| 4 | `0100` | 3 | `0011` | 0 | ✓ |
| 5 | `0101` | 4 | `0100` | 4 | ✗ |
| 8 | `1000` | 7 | `0111` | 0 | ✓ |
| 15 | `1111` | 14 | `1110` | 14 | ✗ |
| 16 | `10000` | 15 | `01111` | 0 | ✓ |

#### Visual Explanation

For powers of 2:
```
16:     10000
16 - 1: 01111
    &   -----
        00000 (Always 0!)
```

For non-powers of 2:
```
12:     1100
12 - 1: 1011
    &   ----
        1000 (Not 0!)
```

## Practical Applications

### 1. Memory Allocation

```cpp
// Allocate 16-byte aligned memory
void* allocate_aligned(size_t size) {
    void* ptr = malloc(size + 15);
    return (void*)((uintptr_t)(ptr + 15) & ~15u);
}
```

### 2. SIMD Operations

```cpp
// Ensure data is aligned for SSE instructions
float* data = get_data();
float* aligned_data = (float*)((uintptr_t)data & ~15u);
__m128* vec = (__m128*)aligned_data;  // Safe to use
```

### 3. Power of 2 Check

```cpp
bool isPowerOfTwo(unsigned int n) {
    return n && !(n & (n - 1));
}
```

### 4. Round Up to Alignment

```cpp
// Round up to nearest 16-byte boundary
size_t roundUp16(size_t n) {
    return (n + 15) & ~15u;
}
```

### 5. Structure Optimization

```cpp
// Before: 24 bytes
struct Before {
    char a;      // 1 + 7 padding
    double b;    // 8
    char c;      // 1 + 7 padding
};

// After: 16 bytes
struct After {
    double b;    // 8
    char a;      // 1
    char c;      // 1 + 6 padding
};
```

### 6. Cache Line Alignment

```cpp
// Align to 64-byte cache line
struct alignas(64) CacheAligned {
    int data[16];  // Fits exactly in one cache line
};
```

## Summary

- **Alignment** improves performance and is sometimes required for correctness
- **Struct padding** can significantly increase memory usage - organize members by size
- **`& ~15u`** efficiently rounds down to 16-byte boundaries
- **`u & (u-1)`** detects powers of 2
- Bitwise operations are faster than arithmetic for alignment
- Understanding these patterns helps write efficient low-level code

