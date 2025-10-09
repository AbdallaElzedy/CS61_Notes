# Harvard CS61 - WeensyOS Notes 




### Commands

```bash
# Default run (allocator test)
make run (in Docker)

# Specific tests
make run-allocator      # Memory allocation test
make run-fork           # Fork/copy process test
make run-exit           # Process exit test

# Console-only mode (in Docker)
make run-console
```

### What Happens When You Run

1. QEMU emulator starts
2. WeensyOS boots
3. Processes start executing
4. Memory viewer displays on screen
5. Processes run until out of memory or you quit

---

## Understanding the Display

WeensyOS shows a split-screen view:

### Top Half: Physical Memory Map

```
PHYSICAL MEMORY
  0x000000  K K K K K K K K K K K K K K K K
  0x040000  K K K K K K K K K K K K K K . .
  0x080000  . . . . . . . . R R R R R R R R
  0x0C0000  R R R R R R R R R R R R R R R R
  0x100000  1 1 1 1 1 . 2 2 2 2 . . 3 3 3 3
  0x140000  3 . . . 4 4 4 4 4 . . . . . . .
```

**Legend:**
- `.` = Free page (available for allocation)
- `K` = Kernel code
- `k` = Kernel data
- `S` = Kernel stack
- `R` = Reserved/I/O memory
- `C` = Console memory (0xB8000)
- `1-9, A-F` = Process pages (by PID in hex)
  - `1` = Process 1's pages
  - `2` = Process 2's pages
  - etc.

### Bottom Half: Virtual Address Space

```
VIRTUAL ADDRESS SPACE FOR PROCESS 1
  0x000000  . . . . . . . . . . . . . . . .
  0x040000  K K K K K K K K K K K K K K K K
  0x080000  . . . . . . . . R R R R R R R R
  0x0C0000  R R R R R R R R R R R R R R R C
  0x100000  1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
  0x140000  . . . . . . . . . . . . . . . .
  0x2C0000  . . . . . . . . . . . . . . . .
  0x300000  S
```

Shows how one process sees memory (virtual addresses → physical mappings).

**What this tells you:**
- Kernel memory (0x40000-0x100000) is mapped
- Process memory starts at 0x100000
- Stack is at high addresses (0x2FF000)
- Different processes have different mappings for same virtual addresses

### Dynamic Updates

The display updates automatically:
- Memory allocations appear in real-time
- Bottom half cycles between processes every ~0.25 seconds
- Watch pages get allocated (`.` → number)
- See when memory runs out (all `.` become filled)

---

## Keyboard Controls

### While OS is Running

| Key | Action |
|-----|--------|
| **`q`** | Quit WeensyOS cleanly |
| **`a`** | Switch to allocator test programs |
| **`f`** | Switch to fork test programs |
| **`e`** | Switch to exit test programs |
| **`Ctrl-C`** | Force quit |



## QEMU Monitor


**Press:** `Alt-2` (Linux/Windows) or `Option-2` (Mac)

You'll see:
```
(qemu)
```

**Return to OS view:** Press `Alt-1` or `Option-1`

### Essential Monitor Commands

```bash
# Exit QEMU
(qemu) quit
(qemu) q              # Short form

# System control
(qemu) system_reset   # Reboot the OS
(qemu) stop           # Pause execution
(qemu) cont           # Continue execution

# View CPU state
(qemu) info registers
(qemu) info mem       # Page table mappings
(qemu) info tlb       # TLB entries
```

### Memory Inspection

```bash
# Get register values
(qemu) info registers          # Shows all registers with their values
# Look for: RIP=0000000000040a10 ...

# Examine memory
(qemu) x/20x 0xB8000           # 20 hex values at console memory
(qemu) x/4gx 0x1000            # 4 giant (64-bit) hex values

# Address translation
(qemu) gva2gpa 0x100000        # Virtual to physical address
```

**For disassembly and advanced debugging:**
- Use **GDB**: `make run-gdb` then `gdb -ix weensyos.gdb`
- Or use `objdump -d obj/kernel` to examine code

### Advanced Monitor Commands

```bash
# Breakpoints (only useful with -s flag)
(qemu) gdbserver               # Wait for GDB connection

# Device info
(qemu) info qtree              # Device tree
(qemu) info mtree              # Memory tree

# Screenshots
(qemu) screendump screen.ppm   # Save screen to file

# Help
(qemu) help                    # List all commands
(qemu) help info               # Help on info commands
```

### Monitor Examples

**Example 1: Check what code is running**
```
(qemu) info registers
RAX=0000000000000000 RBX=0000000000000000 RCX=0000000000000000
RDX=0000000000000000 RSI=0000000000000000 RDI=0000000000000000
RIP=0000000000040a10 RFL=00000202 [-------] CPL=0
        ^^^^^^^^^^^^^^  <-- Use this address!

(qemu) x/5i 0x40a10
0x40a10: mov    %rdi,%rbx
0x40a13: call   0x40b66
0x40a18: test   %rax,%rax
0x40a1b: je     0x40a50
0x40a1d: mov    %rax,%r12
```

**Example 2: Inspect page table**
```
(qemu) info mem
0000000000000000-0000000000001000 0000000000001000 -r-
0000000000040000-0000000000080000 0000000000040000 -rw
0000000000100000-0000000000140000 0000000000040000 urw
```

**Example 3: Check console memory**
```
(qemu) x/40x 0xB8000
0xb8000: 0x07200720 0x07200720 0x07200720 0x07200720
0xb8010: 0x07200720 0x07200720 0x07200720 0x07200720
```

---

## Testing 

### Running Tests

```bash
# Individual tests
make run-allocator    # Phases 1-5
make run-fork         # Phases 1-6, 8
make run-exit         # Phases 1-7


```

---

## Debugging

### GDB Debugging

GDB debugging requires two terminals.

**Terminal 1:**
```bash
make run-gdb
```

**Terminal 2:**
```bash
docker exec -it $(docker ps -q -f ancestor=cs61:latest) /bin/bash
cd pset3
gdb -ix weensyos.gdb
```

**GDB Commands:**
```gdb
# Set breakpoints
(gdb) break syscall_fork
(gdb) break process_setup

# Continue execution
(gdb) continue
(gdb) c

# Step through code
(gdb) step
(gdb) next

# Examine variables
(gdb) print current->pid
(gdb) print/x kernel_pagetable

# Backtrace
(gdb) backtrace
(gdb) bt

# Examine memory
(gdb) x/10x 0xB8000
```

