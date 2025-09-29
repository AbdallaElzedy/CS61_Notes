# Assembly Instruction Reference

## Registers

###  x86 Registers and Their Variations

```
┌────────────────────────────────────────────────────────────────────┐
│                        GENERAL PURPOSE REGISTERS                    │
├────────────────────────────────────────────────────────────────────┤
│ 64-bit │ 32-bit │ 16-bit │ 8-bit high │ 8-bit low │ Purpose      │
├────────┼────────┼────────┼────────────┼───────────┼──────────────┤
│  RAX   │  EAX   │   AX   │     AH     │    AL     │ Accumulator  │
│  RBX   │  EBX   │   BX   │     BH     │    BL     │ Base         │
│  RCX   │  ECX   │   CX   │     CH     │    CL     │ Counter      │
│  RDX   │  EDX   │   DX   │     DH     │    DL     │ Data         │
│  RSP   │  ESP   │   SP   │     --     │    SPL*   │ Stack Pointer│
│  RBP   │  EBP   │   BP   │     --     │    BPL*   │ Base Pointer │
│  RSI   │  ESI   │   SI   │     --     │    SIL*   │ Source Index │
│  RDI   │  EDI   │   DI   │     --     │    DIL*   │ Dest Index   │
└────────┴────────┴────────┴────────────┴───────────┴──────────────┘

┌────────────────────────────────────────────────────────────────────┐
│                      EXTENDED REGISTERS (x64 only)                  │
├────────────────────────────────────────────────────────────────────┤
│ 64-bit │ 32-bit │ 16-bit │ 8-bit  │ Purpose                      │
├────────┼────────┼────────┼────────┼──────────────────────────────┤
│   R8   │  R8D   │  R8W   │  R8B   │ 5th function argument        │
│   R9   │  R9D   │  R9W   │  R9B   │ 6th function argument        │
│  R10   │  R10D  │  R10W  │  R10B  │ Scratch (temp use)           │
│  R11   │  R11D  │  R11W  │  R11B  │ Scratch (temp use)           │
│  R12   │  R12D  │  R12W  │  R12B  │ Preserved across calls       │
│  R13   │  R13D  │  R13W  │  R13B  │ Preserved across calls       │
│  R14   │  R14D  │  R14W  │  R14B  │ Preserved across calls       │
│  R15   │  R15D  │  R15W  │  R15B  │ Preserved across calls       │
└────────┴────────┴────────┴────────┴──────────────────────────────┘

* SPL, BPL, SIL, DIL are only available when REX prefix is used
```

### Visual Register Breakdown

```
64-bit RAX: ┌───────────────────────────────────────────────────────┐
            │0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF01234567│
            └───────────────────────────────────────────────────────┘
                                                    ↓
32-bit EAX:                                 ┌───────────────────────┐
                                            │89ABCDEF0123456789ABCDEF│
                                            └───────────────────────┘
                                                        ↓
16-bit  AX:                                         ┌───────────┐
                                                    │89ABCDEF01 │
                                                    └───────────┘
                                                      ↓       ↓
8-bit AH/AL:                                        ┌───┐   ┌───┐
                                                    │89AB│   │CDEF│
                                                    └───┘   └───┘
                                                      AH      AL
```

### Special Purpose Registers

```
┌────────────────────────────────────────────────────────────────────┐
│                        SPECIAL REGISTERS                            │
├────────┬───────────────────────────────────────────────────────────┤
│  RIP   │ Instruction Pointer - Points to next instruction          │
│ RFLAGS │ Status/Flags Register - Stores condition codes           │
│  CS    │ Code Segment - Segment where code is stored              │
│  DS    │ Data Segment - Default segment for data access           │
│  SS    │ Stack Segment - Segment containing the stack             │
│  ES    │ Extra Segment - Additional segment for data              │
│  FS    │ Extra Segment - Often used for thread-local storage      │
│  GS    │ Extra Segment - Often used for CPU-specific data         │
└────────┴───────────────────────────────────────────────────────────┘
```

### RFLAGS Register Breakdown

```
Bit │ Flag │ Name              │ Set When...
────┼──────┼───────────────────┼─────────────────────────────────
 0  │  CF  │ Carry Flag        │ Unsigned arithmetic overflows
 2  │  PF  │ Parity Flag       │ Low byte has even number of 1s
 4  │  AF  │ Auxiliary Flag    │ BCD arithmetic carry
 6  │  ZF  │ Zero Flag         │ Result is zero
 7  │  SF  │ Sign Flag         │ Result is negative (MSB = 1)
 8  │  TF  │ Trap Flag         │ Single-step debugging enabled
 9  │  IF  │ Interrupt Flag    │ Interrupts are enabled
10  │  DF  │ Direction Flag    │ String operations go backwards
11  │  OF  │ Overflow Flag     │ Signed arithmetic overflows
```

### Register Usage Conventions

```
┌─────────────────────────────────────────────────────────────────┐
│                    CALLING CONVENTION (System V x64)             │
├─────────────────────────────────────────────────────────────────┤
│ Purpose          │ Registers        │ Notes                     │
├──────────────────┼──────────────────┼───────────────────────────┤
│ Return Value     │ RAX, RDX         │ RDX for 128-bit returns   │
│ Arguments        │ RDI,RSI,RDX,     │ In this exact order       │
│                  │ RCX,R8,R9        │ Rest go on stack          │
│ Callee-saved     │ RBX,RBP,         │ Function must preserve    │
│                  │ R12-R15          │ these if it uses them     │
│ Caller-saved     │ All others       │ May be destroyed by       │
│                  │                  │ called functions          │
│ Stack Pointer    │ RSP              │ Must be 16-byte aligned   │
│                  │                  │ before CALL               │
└──────────────────┴──────────────────┴───────────────────────────┘
```

### Register Size Operations - Important Rules

```asm
# Rule 1: 32-bit operations ZERO the upper 32 bits
mov $0xFFFFFFFF, %eax    # RAX = 0x00000000FFFFFFFF (upper cleared!)
mov $-1, %rax            # RAX = 0xFFFFFFFFFFFFFFFF (sign extended)

# Rule 2: 16-bit and 8-bit operations DON'T affect upper bits
mov $0xFFFF, %ax         # Only affects lower 16 bits of RAX
mov $0xFF, %al           # Only affects lowest 8 bits of RAX

# Rule 3: REX prefix needed for new 8-bit registers
mov %sil, %dil           # Requires REX prefix (64-bit feature)
mov %ah, %bh             # No REX prefix (legacy registers)

# Rule 4: Can't mix legacy high bytes with REX prefix
# mov %sil, %ah          # ILLEGAL! Can't use SIL with AH
```

### Practical Examples with Different Register Sizes

```asm
# Example 1: Sign extension
movsbq %al, %rax         # Sign-extend AL (8-bit) to RAX (64-bit)
movswq %ax, %rax         # Sign-extend AX (16-bit) to RAX (64-bit)
movslq %eax, %rax        # Sign-extend EAX (32-bit) to RAX (64-bit)
cltq                     # Same as movslq %eax,%rax but 1 byte!

# Example 2: Zero extension
movzbq %al, %rax         # Zero-extend AL to RAX
movzwq %ax, %rax         # Zero-extend AX to RAX
# Note: No movzlq - 32-bit ops automatically zero-extend!

# Example 3: Working with different sizes
mov $0x123456789ABCDEF0, %rax
mov %ax, %bx             # BX = 0xDEF0
mov %eax, %ebx           # EBX = 0x9ABCDEF0, RBX = 0x000000009ABCDEF0
mov %al, %bl             # BL = 0xF0
mov %ah, %bh             # BH = 0xDE
```

### Using Registers Effectively

```asm
# String operations - special register usage
# RSI = source, RDI = destination, RCX = count
rep movsb                # Copy RCX bytes from [RSI] to [RDI]

# Division - specific register requirements
# Dividend in RDX:RAX, divisor in any register/memory
mov $0, %rdx             # Clear high part
mov $100, %rax           # Low part of dividend
div %rcx                 # RAX = quotient, RDX = remainder

# Bit manipulation with CL register
mov $0xFF00, %rax
mov $4, %cl              # Shift count MUST be in CL
shr %cl, %rax            # RAX = 0x0FF0

# CPUID - uses specific registers
mov $0, %eax
cpuid
# EAX = max function, EBX:EDX:ECX = "GenuineIntel" or "AuthenticAMD"
```

### Register Preservation Example

```asm
my_function:
    # Save callee-saved registers we'll use
    push %rbx                # Must preserve
    push %r12                # Must preserve
    push %r13                # Must preserve
    
    # Can freely use caller-saved registers
    mov %rdi, %rax           # Fine - RAX is caller-saved
    mov %rsi, %r10           # Fine - R10 is caller-saved
    
    # Do work with RBX, R12, R13...
    
    # Restore in reverse order
    pop %r13
    pop %r12
    pop %rbx
    ret
```

### Common Register Idioms

```asm
# Zeroing registers efficiently
xor %eax, %eax           # RAX = 0 (2 bytes, preferred)
xor %rax, %rax           # RAX = 0 (3 bytes)
mov $0, %rax             # RAX = 0 (7 bytes, avoid!)

# Testing for zero/negative
test %rax, %rax          # Sets ZF if RAX==0, SF if negative
and %rax, %rax           # Same effect, older style

# Swapping without temp register
xor %rax, %rbx           # RBX = RAX ^ RBX
xor %rbx, %rax           # RAX = (RAX ^ RBX) ^ RBX = RAX
xor %rax, %rbx           # RBX = ((RAX ^ RBX) ^ RBX) ^ (RAX ^ RBX) = RBX

# Fast multiplication by constants
lea (%rax,%rax,2), %rax  # RAX = RAX * 3
lea (%rax,%rax,4), %rax  # RAX = RAX * 5
lea (%rax,%rax,8), %rax  # RAX = RAX * 9
shl $3, %rax             # RAX = RAX * 8
```

### Debug Register Access in GDB

```bash
# View all general registers
(gdb) info registers

# View specific register in different formats
(gdb) p/x $rax           # Hexadecimal
(gdb) p/d $rax           # Decimal
(gdb) p/t $rax           # Binary
(gdb) p/c $al            # Character

# View FLAGS register decoded
(gdb) info registers eflags
      
# Set register values
(gdb) set $rax = 0x1234
(gdb) set $al = 0xFF
```


## Stack Operations - PUSH and POP

### PUSH - Add to Stack
```asm
push %rax    # Put RAX value on stack, decrease RSP by 8
```

**What PUSH actually does:**
```
1. RSP = RSP - 8        # Move stack pointer down
2. Memory[RSP] = RAX    # Store value at new top
```

**Visual Example:**
```
Before PUSH %rax (RAX=0x1234):    After PUSH:
                                  
Address   Value                   Address   Value
0x1000    [old data]             0x1000    [old data]
0x0FF8    [old data] ← RSP       0x0FF8    [old data]
0x0FF0    [garbage]              0x0FF0    0x1234     ← RSP
0x0FE8    [garbage]              0x0FE8    [garbage]
```

### POP - Remove from Stack
```asm
pop %rbx     # Take value from stack top, put in RBX, increase RSP by 8
```

**What POP actually does:**
```
1. RBX = Memory[RSP]    # Get value from top
2. RSP = RSP + 8        # Move stack pointer up
```

**Common Push/Pop Patterns:**
```asm
# Save registers before using them
push %rbx
push %r12
push %r13

# ... use RBX, R12, R13 ...

# Restore in REVERSE order
pop %r13
pop %r12
pop %rbx
```

---

## Jump Instructions - Control Flow

### JMP - Unconditional Jump
```asm
jmp label    # Always jump to label
jmp *%rax    # Jump to address in RAX (indirect)
jmp *(%rax)  # Jump to address stored at memory location RAX points to
```

**Visual Flow:**
```
    mov $5, %rax
    jmp skip_this    ←─────┐
    mov $10, %rax   (never executed)
skip_this:          ←─────┘
    # RAX is still 5
```

### Conditional Jumps - Based on FLAGS

After a comparison like `cmp $10, %rax`:

```
┌─────────────────────────────────────────────────────┐
│ Instruction │ Jump if...          │ Condition      │
├─────────────────────────────────────────────────────┤
│ je/jz      │ Equal/Zero          │ ZF = 1         │
│ jne/jnz    │ Not Equal/Not Zero  │ ZF = 0         │
│ jg/jnle    │ Greater (signed)    │ ZF=0 && SF=OF  │
│ jge/jnl    │ Greater or Equal    │ SF = OF        │
│ jl/jnge    │ Less (signed)       │ SF ≠ OF        │
│ jle/jng    │ Less or Equal       │ ZF=1 || SF≠OF  │
│ ja/jnbe    │ Above (unsigned)    │ CF=0 && ZF=0   │
│ jae/jnb    │ Above or Equal      │ CF = 0         │
│ jb/jnae    │ Below (unsigned)    │ CF = 1         │
│ jbe/jna    │ Below or Equal      │ CF=1 || ZF=1   │
│ js         │ Sign (negative)     │ SF = 1         │
│ jns        │ No Sign (positive)  │ SF = 0         │
│ jo         │ Overflow            │ OF = 1         │
│ jno        │ No Overflow         │ OF = 0         │
└─────────────────────────────────────────────────────┘
```

### Jump Examples
```asm
# Example 1: Simple comparison
    cmp $10, %rax
    je equal_to_10      # Jump if RAX == 10
    jg greater_than_10  # Jump if RAX > 10
    # If here, RAX < 10

# Example 2: Loop counter
loop_start:
    dec %rcx            # Decrease counter
    jnz loop_start      # Jump if RCX != 0

# Example 3: Checking for NULL pointer
    test %rdi, %rdi     # AND RDI with itself
    jz null_pointer     # Jump if RDI == 0
```

---

## CALL and RET - Function Mechanics

### CALL - Call a Function
```asm
call function_name
```

**What CALL actually does:**
```
1. PUSH return_address    # Save where to come back
2. JMP function_name      # Jump to function
```

**Detailed Example:**
```asm
0x1000:  mov $5, %rdi
0x1007:  call add_one     # This instruction is at 0x1007
0x100C:  mov %rax, %rbx   # Return here after function

add_one:
0x2000:  mov %rdi, %rax
0x2003:  inc %rax
0x2005:  ret
```

**Stack during CALL:**
```
Before CALL:          After CALL (inside add_one):
[stack data] ← RSP    [stack data]
                      [0x100C]     ← RSP (return address)
```

### RET - Return from Function
```asm
ret         # Pop return address and jump there
ret $16     # Pop return address, jump there, then add 16 to RSP
```

**What RET actually does:**
```
1. POP %rip    # Get return address from stack and jump
```

---

## LEA - Load Effective Address

### LEA vs MOV
```asm
# MOV gets the VALUE at an address
mov (%rax), %rbx       # RBX = value at address in RAX

# LEA gets the ADDRESS itself
lea (%rax), %rbx       # RBX = RAX (just copies the address)
```

### LEA for Arithmetic (Clever Trick!)
```asm
# LEA can do arithmetic without accessing memory
lea 1(%rax), %rbx           # RBX = RAX + 1
lea (%rax,%rax,2), %rbx     # RBX = RAX + RAX*2 = RAX*3
lea 4(%rax,%rbx,8), %rcx    # RCX = RAX + RBX*8 + 4
```

**Why use LEA for math?**
- Doesn't affect FLAGS
- Can do complex arithmetic in one instruction
- Originally for address calculation, but useful for general math

---

## TEST and CMP - Setting FLAGS

### CMP - Compare
```asm
cmp $10, %rax    # Compute RAX - 10, set FLAGS, discard result
```

**FLAGS after CMP:**
- ZF = 1 if operands equal
- SF = sign of (RAX - 10)
- CF = 1 if unsigned borrow
- OF = 1 if signed overflow

### TEST - Logical AND Test
```asm
test %rax, %rax    # Compute RAX & RAX, set FLAGS, discard result
test $1, %al       # Check if lowest bit is set
```

**Common TEST patterns:**
```asm
# Check if zero
test %rax, %rax
jz is_zero

# Check if negative
test %rax, %rax
js is_negative

# Check if even/odd
test $1, %al
jz is_even
```

---

## Complete Instruction Categories

### Data Movement
```asm
# Basic moves
mov src, dst         # dst = src
movzx src, dst       # Move with zero extension
movsx src, dst       # Move with sign extension
xchg op1, op2        # Swap values

# Stack operations
push src             # Push onto stack
pop dst              # Pop from stack
pusha/pushad         # Push all registers (32-bit only)

# Conditional moves (avoid branches!)
cmove src, dst       # Move if equal
cmovne src, dst      # Move if not equal
cmovg src, dst       # Move if greater
```

### Arithmetic Operations
```asm
# Basic arithmetic
add src, dst         # dst += src
sub src, dst         # dst -= src
inc dst              # dst++
dec dst              # dst--
neg dst              # dst = -dst

# Multiplication/Division
mul src              # Unsigned: RDX:RAX = RAX * src
imul src             # Signed: RDX:RAX = RAX * src
div src              # Unsigned: RAX = RDX:RAX / src, RDX = remainder
idiv src             # Signed division

# Bit operations
and src, dst         # dst &= src
or src, dst          # dst |= src
xor src, dst         # dst ^= src
not dst              # dst = ~dst
shl count, dst       # dst <<= count (shift left)
shr count, dst       # dst >>= count (logical shift right)
sar count, dst       # dst >>= count (arithmetic shift right)
rol count, dst       # Rotate left
ror count, dst       # Rotate right
```

### Control Flow
```asm
# Jumps
jmp target           # Unconditional jump
j[condition] target  # Conditional jump

# Function calls
call function        # Call function
ret                  # Return from function
leave               # mov %rbp,%rsp; pop %rbp

# Loops
loop target          # Dec RCX, jump if RCX != 0
loope target         # Dec RCX, jump if RCX != 0 AND ZF=1
loopne target        # Dec RCX, jump if RCX != 0 AND ZF=0
```

---

## Special Instructions

### NOP - No Operation
```asm
nop                  # Do nothing (1 byte)
nopl (%rax)         # Multi-byte NOP for alignment
```

**Why NOP?**
- Padding for alignment
- Space for runtime patching
- Timing delays

### INT - Software Interrupt
```asm
int $0x80           # Linux 32-bit system call
syscall             # Linux 64-bit system call
```

### CPUID - CPU Information
```asm
mov $0, %eax
cpuid               # Get CPU vendor string in EBX:EDX:ECX
```

---

## Memory Addressing Modes

### All Addressing Formats
```asm
# Direct addressing
mov 0x401000, %rax           # RAX = value at address 0x401000

# Register indirect
mov (%rbx), %rax             # RAX = value at address in RBX

# Register + displacement
mov 8(%rbx), %rax            # RAX = value at (RBX + 8)

# Scaled index
mov (%rbx,%rcx,8), %rax      # RAX = value at (RBX + RCX*8)

# Full format: displacement(base,index,scale)
mov 0x10(%rbx,%rcx,4), %rax  # RAX = value at (RBX + RCX*4 + 0x10)
```

### Common Array Access Patterns
```asm
# Accessing array[i] where each element is 8 bytes
# RDI = array base, RSI = index i
mov (%rdi,%rsi,8), %rax      # RAX = array[i]

# 2D array access: array[i][j]
# RDI = base, RSI = i, RDX = j, RCX = row_width
imul %rcx, %rsi              # RSI = i * row_width
add %rdx, %rsi               # RSI = i * row_width + j
mov (%rdi,%rsi,8), %rax      # RAX = array[i][j]
```

---

## Practice: Reading Complex Instructions

### Example 1: Conditional Move
```asm
cmp $0, %rdi
cmove %rsi, %rax    # If RDI == 0, then RAX = RSI
```
Equivalent to: `RAX = (RDI == 0) ? RSI : RAX`

### Example 2: Complex LEA
```asm
lea 5(%rdi,%rdi,4), %rax    # RAX = RDI*5 + 5
```
This computes `RAX = 5 * (RDI + 1)` efficiently!

### Example 3: Loop with String
```asm
find_char:
    movb (%rdi), %al         # AL = current char
    test %al, %al            # Check for null terminator
    jz not_found             # If null, end of string
    cmp %sil, %al            # Compare with search char
    je found                 # If match, we found it
    inc %rdi                 # Move to next char
    jmp find_char            # Continue loop
```

This searches for a character (in SIL) in a string (pointed to by RDI).

