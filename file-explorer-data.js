// WeensyOS File Explorer - Complete File Database

// File details database
const fileDatabase = {
    'bootentry': {
        filename: 'bootentry.S',
        icon: '<i class="fas fa-cog" style="color: #f59e0b;"></i>',
        type: 'Assembly',
        category: 'Boot & Startup',
        lines: '120',
        purpose: 'First code executed when the system boots. Sets up the initial processor state and transfers control to the boot loader.',
        description: 'This assembly file contains the entry point code that executes immediately after the BIOS/UEFI firmware hands control to WeensyOS. It initializes the CPU to protected mode or long mode, sets up minimal stack space, and jumps to the C++ boot loader code.',
        keyFunctions: [
            { name: '_start', desc: 'Boot entry point - first instruction executed' },
            { name: 'setup_segments', desc: 'Initialize x86-64 segment registers' },
            { name: 'enable_paging', desc: 'Enable virtual memory support' }
        ],
        responsibilities: [
            'Initialize processor from real mode to long mode (64-bit)',
            'Set up temporary page tables for boot process',
            'Configure segment descriptors (CS, DS, SS)',
            'Create initial stack frame',
            'Transfer control to boot.cc main function'
        ],
        dependencies: ['x86-64.h', 'boot.cc'],
        technicalDetails: 'Uses AT&T assembly syntax. Implements the multiboot header for bootloader compatibility. Sets CR0, CR3, and CR4 registers to enable paging and 64-bit mode.',
        codeSnippet: `.code32
_start:
    cli                     # Disable interrupts
    movl $boot_stack, %esp  # Set up stack
    call boot_main          # Jump to C++ code

boot_stack:
    .space 4096            # 4KB boot stack`
    },

    'boot': {
        filename: 'boot.cc',
        icon: '<i class="fas fa-power-off" style="color: #10b981;"></i>',
        type: 'C++',
        category: 'Boot & Startup',
        lines: '117',
        purpose: 'Boot loader that initializes hardware and loads the kernel into memory.',
        description: 'The boot loader is responsible for setting up the basic system environment, loading the kernel image from disk into memory, and transferring control to the kernel. It handles early hardware initialization and memory map setup.',
        keyFunctions: [
            { name: 'boot_main()', desc: 'Main boot loader entry point' },
            { name: 'boot_load_kernel()', desc: 'Load kernel image from disk' },
            { name: 'boot_setup_memory()', desc: 'Initialize memory map' }
        ],
        responsibilities: [
            'Initialize console for early boot messages',
            'Detect and map physical memory',
            'Load kernel binary from boot medium',
            'Set up kernel page tables',
            'Transfer control to kernel_start()'
        ],
        dependencies: ['bootentry.S', 'x86-64.h', 'kernel.hh'],
        technicalDetails: 'Uses BIOS INT 13h for disk I/O during boot. Creates identity-mapped pages for kernel code and sets up higher-half kernel mapping at 0x40000.',
        codeSnippet: `void boot_main() {
    // Initialize console
    console_clear();
    console_printf("WeensyOS Boot Loader\\n");

    // Load kernel
    boot_load_kernel();

    // Jump to kernel
    ((void(*)()) KERNEL_START)();
}`
    },

    'x86-64': {
        filename: 'x86-64.h',
        icon: '<i class="fas fa-microchip" style="color: #8b5cf6;"></i>',
        type: 'C Header',
        category: 'Boot & Startup',
        lines: '556',
        purpose: 'Complete x86-64 architecture definitions including registers, page tables, and hardware structures.',
        description: 'This header file is the foundation of WeensyOS hardware abstraction. It defines all x86-64 processor structures, page table formats, segment descriptors, interrupt handling, and system call interfaces. Every part of the system that interacts with hardware includes this file.',
        keyFunctions: [
            { name: 'PT_P', desc: 'Page table present bit (0x001)' },
            { name: 'PT_W', desc: 'Page table writable bit (0x002)' },
            { name: 'PT_U', desc: 'Page table user-accessible bit (0x004)' },
            { name: 'PTE_ADDR(pte)', desc: 'Extract physical address from PTE' }
        ],
        responsibilities: [
            'Define x86-64 page table entry format',
            'Declare control register structures (CR0, CR2, CR3, CR4)',
            'Define interrupt descriptor table (IDT) format',
            'Provide segment descriptor structures',
            'Define system call numbers and registers',
            'Declare I/O port access functions'
        ],
        dependencies: [],
        technicalDetails: 'Implements 4-level paging (PML4, PDPT, PD, PT). Each page table entry is 64 bits with flags for present, writable, user-accessible, write-through, cache-disable, accessed, dirty, and no-execute.',
        codeSnippet: `// Page Table Entry flags
#define PT_P    0x001  // Present
#define PT_W    0x002  // Writable
#define PT_U    0x004  // User-accessible
#define PT_A    0x020  // Accessed
#define PT_D    0x040  // Dirty

// Extract address from PTE
#define PTE_ADDR(pte) ((pte) & 0xFFFFFFFFF000UL)`
    },

    'kernel-cc': {
        filename: 'kernel.cc',
        icon: '<i class="fas fa-bolt" style="color: #eab308;"></i>',
        type: 'C++',
        category: 'Kernel Core',
        lines: '721',
        purpose: 'Main kernel implementation containing process management, system calls, scheduling, and memory allocation.',
        description: 'This is the heart of WeensyOS. It implements all core operating system functionality including process creation, scheduling, system call handling, memory management, and exception handling. The kernel manages all 16 process slots and coordinates between user programs and hardware.',
        keyFunctions: [
            { name: 'kernel_start()', desc: 'Kernel entry point, initializes OS' },
            { name: 'kalloc(size_t)', desc: 'Physical page allocator' },
            { name: 'kfree(void*)', desc: 'Physical page deallocator' },
            { name: 'syscall(regstate*)', desc: 'System call dispatcher' },
            { name: 'exception(regstate*)', desc: 'Exception handler' },
            { name: 'schedule()', desc: 'Round-robin scheduler' }
        ],
        responsibilities: [
            'Initialize kernel data structures and process table',
            'Handle system calls (GETPID=1, YIELD=2, PANIC=3, PAGE_ALLOC=4, FORK=5, EXIT=6)',
            'Manage physical memory with reference counting',
            'Implement page fault handler',
            'Schedule processes using round-robin algorithm',
            'Set up and manage process page tables',
            'Handle exceptions and kernel panics'
        ],
        dependencies: ['kernel.hh', 'k-exception.S', 'k-vmiter.hh', 'x86-64.h'],
        technicalDetails: 'Uses stride-3 allocation pattern for physical pages. Implements copy-on-write optimization for fork(). Maintains 16-entry process table with states: P_FREE, P_RUNNABLE, P_BLOCKED, P_FAULTED.',
        codeSnippet: `void* kalloc(size_t sz) {
    static int pageno = 0;

    // Find free page with stride-3 pattern
    for (int i = 0; i < NPAGES; ++i) {
        pageno = (pageno + 3) % NPAGES;
        uintptr_t pa = pageno * PAGESIZE;

        if (allocatable_physical_address(pa)
            && physpages[pageno].refcount == 0) {
            ++physpages[pageno].refcount;
            memset((void*) pa, 0, PAGESIZE);
            return (void*) pa;
        }
    }
    return nullptr;
}`
    },

    'kernel-hh': {
        filename: 'kernel.hh',
        icon: '<i class="fas fa-file-code" style="color: #ec4899;"></i>',
        type: 'C++ Header',
        category: 'Kernel Core',
        lines: '337',
        purpose: 'Kernel data structure definitions and function declarations.',
        description: 'Defines all kernel data structures including process descriptors, register state, page table management classes, and kernel function prototypes. This header is included by all kernel source files.',
        keyFunctions: [
            { name: 'proc', desc: 'Process descriptor structure (lines 170-193)' },
            { name: 'regstate', desc: 'CPU register state for context switching' },
            { name: 'physpageinfo', desc: 'Physical page metadata with refcount' }
        ],
        responsibilities: [
            'Define proc structure with PID, state, registers, page table',
            'Declare process states (P_FREE, P_RUNNABLE, P_BLOCKED, P_FAULTED)',
            'Define regstate for saving/restoring CPU context',
            'Declare kernel function prototypes',
            'Define memory constants (KERNEL_START, MEMSIZE_PHYSICAL)',
            'Declare global kernel variables (ptable, physpages)'
        ],
        dependencies: ['x86-64.h', 'k-vmiter.hh'],
        technicalDetails: 'Process table is a global array ptable[16]. Each process has full CPU context (all registers) and a pointer to its page table root.',
        codeSnippet: `struct proc {
    pid_t pid;                  // Process ID
    regstate regs;              // Saved registers
    proc_state state;           // P_FREE, P_RUNNABLE, etc.
    x86_64_pagetable* pagetable; // Page table root

    void init_user(pid_t p, x86_64_pagetable* pt);
};

extern proc ptable[16];         // Global process table`
    },

    'k-exception': {
        filename: 'k-exception.S',
        icon: '<i class="fas fa-shield-alt" style="color: #3b82f6;"></i>',
        type: 'Assembly',
        category: 'Kernel Core',
        lines: '212',
        purpose: 'Low-level exception and system call entry points in assembly.',
        description: 'Implements the first-level exception handlers and system call entry points. When hardware interrupts, exceptions, or syscall instructions execute, control transfers here. This code saves processor state, calls C++ handlers, and restores state on return.',
        keyFunctions: [
            { name: 'syscall_entry', desc: 'System call entry point from user mode' },
            { name: 'exception_entry_*', desc: 'Exception handlers for each interrupt vector' },
            { name: 'restore_registers', desc: 'Restore CPU state and return to user mode' }
        ],
        responsibilities: [
            'Save all CPU registers (RAX, RBX, RCX, etc.) to regstate',
            'Switch from user stack to kernel stack',
            'Call exception() or syscall() C++ handlers',
            'Restore all registers from regstate',
            'Return to user mode with sysret or iret'
        ],
        dependencies: ['kernel.hh', 'x86-64.h'],
        technicalDetails: 'Uses syscall/sysret instructions for fast system calls. Manually saves/restores all 16 general-purpose registers plus RIP, RFLAGS, and segment registers. Handles interrupt vectors 0-255.',
        codeSnippet: `syscall_entry:
    // Save user context
    pushq %r15
    pushq %r14
    pushq %r13
    // ... save all registers

    movq %rsp, %rdi      # Pass regstate* to C++
    call syscall         # Call syscall(regstate*)

    // Restore and return
    popq %r13
    popq %r14
    popq %r15
    sysretq              # Return to user mode`
    },

    'k-hardware': {
        filename: 'k-hardware.cc',
        icon: '<i class="fas fa-plug" style="color: #f97316;"></i>',
        type: 'C++',
        category: 'Kernel Core',
        lines: '1258',
        purpose: 'Initialize hardware devices including console, timer, and interrupt controller.',
        description: 'Responsible for bringing up all hardware devices during kernel initialization. Sets up the console for output, configures the APIC timer for scheduling interrupts, and initializes the interrupt controller.',
        keyFunctions: [
            { name: 'init_hardware()', desc: 'Initialize all hardware devices' },
            { name: 'init_timer()', desc: 'Configure APIC timer for 100Hz interrupts' },
            { name: 'init_console()', desc: 'Set up CGA text mode console' }
        ],
        responsibilities: [
            'Initialize CGA console at 0xB8000',
            'Configure APIC (Advanced Programmable Interrupt Controller)',
            'Set timer to generate interrupts at 100 Hz',
            'Set up interrupt descriptor table (IDT)',
            'Enable hardware interrupts'
        ],
        dependencies: ['kernel.hh', 'k-apic.hh', 'x86-64.h'],
        technicalDetails: 'Console uses memory-mapped I/O at physical address 0xB8000. Timer interrupts drive the scheduler. APIC is configured in one-shot mode with calculated divisor for 100Hz.',
        codeSnippet: `void init_hardware() {
    // Set up console
    console_clear();

    // Initialize APIC timer for 100Hz
    lapic.enable(100);

    // Enable interrupts
    asm volatile("sti");
}`
    },

    'k-memviewer': {
        filename: 'k-memviewer.cc',
        icon: '<i class="fas fa-eye" style="color: #06b6d4;"></i>',
        type: 'C++',
        category: 'Kernel Core',
        lines: '298',
        purpose: 'Visual memory map display for debugging and monitoring.',
        description: 'Provides a real-time visual representation of physical and virtual memory usage. Displays which pages are allocated, which processes own them, and the state of page tables. This is essential for debugging memory-related issues.',
        keyFunctions: [
            { name: 'memusage::refresh()', desc: 'Update memory usage display' },
            { name: 'show_physical_map()', desc: 'Display physical page allocation' },
            { name: 'show_virtual_map()', desc: 'Display virtual memory for each process' }
        ],
        responsibilities: [
            'Display physical memory map showing allocated/free pages',
            'Show which process owns each physical page',
            'Visualize virtual address space for each process',
            'Indicate page permissions (readable, writable, executable)',
            'Highlight kernel vs user pages',
            'Update display in real-time'
        ],
        dependencies: ['kernel.hh', 'k-vmiter.hh'],
        technicalDetails: 'Uses console buffer to draw colored text representation. Different colors indicate kernel (red), user (different colors per process), and free (black) memory.',
        codeSnippet: `void memusage::refresh() {
    // Show physical memory
    for (int pn = 0; pn < NPAGES; ++pn) {
        if (physpages[pn].refcount) {
            console[...] = 'U' | color;
        } else {
            console[...] = '.' | 0x0700;
        }
    }
}`
    },

    'k-vmiter-cc': {
        filename: 'k-vmiter.cc',
        icon: '<i class="fas fa-map" style="color: #8b5cf6;"></i>',
        type: 'C++',
        category: 'Kernel Core',
        lines: '143',
        purpose: 'Virtual memory iterator implementation for page table traversal.',
        description: 'Implements the vmiter and ptiter classes that provide an elegant interface for walking page tables. These iterators hide the complexity of 4-level page tables and make it easy to map, unmap, and query virtual addresses.',
        keyFunctions: [
            { name: 'vmiter::vmiter()', desc: 'Constructor - initialize iterator' },
            { name: 'vmiter::find()', desc: 'Locate PTE for virtual address' },
            { name: 'vmiter::map()', desc: 'Map virtual to physical address' },
            { name: 'vmiter::next()', desc: 'Advance to next page' },
            { name: 'ptiter::ptiter()', desc: 'Page table-level iterator' }
        ],
        responsibilities: [
            'Traverse 4-level page table structure (PML4 → PDPT → PD → PT)',
            'Map virtual addresses to physical pages',
            'Set page permissions (readable, writable, user-accessible)',
            'Allocate intermediate page tables as needed',
            'Support page table iteration and enumeration'
        ],
        dependencies: ['k-vmiter.hh', 'kernel.hh', 'x86-64.h'],
        technicalDetails: 'Handles all 4 levels of x86-64 paging. Each level uses 9 bits of the virtual address. Automatically allocates page tables when mapping new addresses.',
        codeSnippet: `void vmiter::map(uintptr_t pa, int perm) {
    // Find or create PTE
    find(va_);

    // Set physical address and permissions
    *pep_ = pa | perm | PT_P;
}`
    },

    'k-vmiter-hh': {
        filename: 'k-vmiter.hh',
        icon: '<i class="fas fa-file-code" style="color: #ec4899;"></i>',
        type: 'C++ Header',
        category: 'Kernel Core',
        lines: '345',
        purpose: 'Virtual memory iterator class declarations.',
        description: 'Declares the vmiter and ptiter classes that encapsulate page table operations. These classes provide a clean, object-oriented interface to the complex x86-64 paging structures.',
        keyFunctions: [
            { name: 'class vmiter', desc: 'Virtual address iterator' },
            { name: 'class ptiter', desc: 'Page table iterator' },
            { name: 'vmiter::pa()', desc: 'Get physical address for current VA' },
            { name: 'vmiter::perm()', desc: 'Get permissions for current VA' }
        ],
        responsibilities: [
            'Define vmiter class with VA, page table, and current PTE',
            'Declare methods for mapping, unmapping, querying pages',
            'Define ptiter for iterating page table entries',
            'Provide inline accessor methods',
            'Support range-based iteration over virtual memory'
        ],
        dependencies: ['x86-64.h'],
        technicalDetails: 'vmiter stores current virtual address, page table root pointer, and cached pointer to current PTE for efficiency.',
        codeSnippet: `class vmiter {
public:
    vmiter(x86_64_pagetable* pt, uintptr_t va);

    uintptr_t va() const;         // Current virtual address
    uintptr_t pa() const;         // Physical address
    uint64_t perm() const;        // Page permissions

    void map(uintptr_t pa, int perm);
    void next();
private:
    x86_64_pagetable* pt_;
    uintptr_t va_;
    uint64_t* pep_;
};`
    },

    'k-apic': {
        filename: 'k-apic.hh',
        icon: '<i class="fas fa-clock" style="color: #ef4444;"></i>',
        type: 'C++ Header',
        category: 'Hardware Support',
        lines: '193',
        purpose: 'APIC (Advanced Programmable Interrupt Controller) interface.',
        description: 'Defines the interface to the local APIC, which handles timer interrupts and inter-processor interrupts. The APIC timer is configured to interrupt at 100Hz, driving the scheduler.',
        keyFunctions: [
            { name: 'lapicstate::enable()', desc: 'Enable APIC timer' },
            { name: 'lapicstate::ack()', desc: 'Acknowledge interrupt' },
            { name: 'lapicstate::timer_init()', desc: 'Configure timer frequency' }
        ],
        responsibilities: [
            'Configure local APIC for timer interrupts',
            'Set timer frequency (100 Hz for WeensyOS)',
            'Acknowledge received interrupts (EOI)',
            'Manage interrupt priorities',
            'Support inter-processor interrupts (for future SMP)'
        ],
        dependencies: ['x86-64.h'],
        technicalDetails: 'APIC is memory-mapped at address 0xFEE00000. Timer uses divide-by-16 configuration. Each timer interrupt increments global ticks counter and calls schedule().',
        codeSnippet: `class lapicstate {
    void enable(int hz) {
        // Set timer frequency
        uint32_t divisor = 1000000000 / (hz * 16);
        write(TIMER_INITIAL, divisor);
        write(LVT_TIMER, INT_IRQ_TIMER);
    }

    void ack() {
        write(EOI, 0);  // End of interrupt
    }
};`
    },

    'k-pci': {
        filename: 'k-pci.hh',
        icon: '<i class="fas fa-server" style="color: #3b82f6;"></i>',
        type: 'C++ Header',
        category: 'Hardware Support',
        lines: '118',
        purpose: 'PCI bus interface for device enumeration and configuration.',
        description: 'Provides functions to scan the PCI bus, enumerate devices, and read/write PCI configuration space. Used to detect and initialize PCI devices like network cards or disk controllers.',
        keyFunctions: [
            { name: 'pci_scan()', desc: 'Scan for PCI devices' },
            { name: 'pci_config_read()', desc: 'Read device configuration' },
            { name: 'pci_find_device()', desc: 'Find device by vendor/device ID' }
        ],
        responsibilities: [
            'Scan PCI bus for connected devices',
            'Read PCI configuration space (vendor ID, device ID, BARs)',
            'Enumerate available devices',
            'Configure device base addresses',
            'Support hot-plug detection (basic)'
        ],
        dependencies: ['x86-64.h'],
        technicalDetails: 'Uses I/O ports 0xCF8 (CONFIG_ADDRESS) and 0xCFC (CONFIG_DATA) for configuration access. Supports up to 256 buses, 32 devices per bus, 8 functions per device.',
        codeSnippet: `uint32_t pci_config_read(int bus, int dev, int func, int offset) {
    uint32_t address = (1UL << 31) |
                       (bus << 16) |
                       (dev << 11) |
                       (func << 8) |
                       offset;
    outl(PCI_CONFIG_ADDRESS, address);
    return inl(PCI_CONFIG_DATA);
}`
    },

    'p-allocator': {
        filename: 'p-allocator.cc',
        icon: '<i class="fas fa-memory" style="color: #10b981;"></i>',
        type: 'C++',
        category: 'User Processes',
        lines: '77',
        purpose: 'Test program that stresses heap allocation and deallocation.',
        description: 'A user-space test program that repeatedly allocates and frees heap memory to verify the correctness of the sys_page_alloc system call and heap management. It tests edge cases like allocating all available memory.',
        keyFunctions: [
            { name: 'process_main()', desc: 'Main process loop' },
            { name: 'test_alloc()', desc: 'Test allocation patterns' },
            { name: 'test_free()', desc: 'Test deallocation' }
        ],
        responsibilities: [
            'Allocate pages using sys_page_alloc()',
            'Test heap growth from initial heap_top',
            'Verify memory isolation between processes',
            'Test allocation failure handling',
            'Demonstrate proper memory cleanup'
        ],
        dependencies: ['u-lib.hh'],
        technicalDetails: 'Starts with heap at MEMSIZE_VIRTUAL. Allocates pages upward, writing patterns to verify pages are correctly mapped and writable.',
        codeSnippet: `void process_main() {
    while (1) {
        // Allocate a page
        int r = sys_page_alloc(heap_top);
        if (r < 0) break;

        // Write to page to test it
        *(int*)heap_top = 0xDEADBEEF;
        heap_top += PAGESIZE;

        sys_yield();
    }
}`
    },

    'p-fork': {
        filename: 'p-fork.cc',
        icon: '<i class="fas fa-code-branch" style="color: #8b5cf6;"></i>',
        type: 'C++',
        category: 'User Processes',
        lines: '103',
        purpose: 'Test program that demonstrates process forking and copy-on-write.',
        description: 'Tests the fork system call by creating child processes. Demonstrates how parent and child share read-only pages but get separate copies of writable pages. Verifies process isolation and resource management.',
        keyFunctions: [
            { name: 'process_main()', desc: 'Main process that calls fork' },
            { name: 'child_process()', desc: 'Code run by forked children' }
        ],
        responsibilities: [
            'Call sys_fork() to create child processes',
            'Verify parent and child have different PIDs',
            'Test that children get copy of parent memory',
            'Verify writes in child don\'t affect parent',
            'Demonstrate process tree creation'
        ],
        dependencies: ['u-lib.hh'],
        technicalDetails: 'Fork returns 0 in child, child PID in parent. Child gets copy of parent\'s writable pages. Read-only pages (code) are shared between parent and child for efficiency.',
        codeSnippet: `void process_main() {
    pid_t p = sys_fork();

    if (p == 0) {
        // Child process
        console_printf("I am child %d\\n", sys_getpid());
    } else if (p > 0) {
        // Parent process
        console_printf("I forked child %d\\n", p);
    }
}`
    },

    'p-exit': {
        filename: 'p-exit.cc',
        icon: '<i class="fas fa-sign-out-alt" style="color: #ef4444;"></i>',
        type: 'C++',
        category: 'User Processes',
        lines: '125',
        purpose: 'Test program demonstrating graceful process termination.',
        description: 'Simple test program that exercises the sys_exit() system call. Verifies that exiting processes properly clean up their resources, free all allocated memory, and return their process slot to the free pool.',
        keyFunctions: [
            { name: 'process_main()', desc: 'Main function that exits after work' }
        ],
        responsibilities: [
            'Demonstrate proper use of sys_exit()',
            'Verify process cleanup after exit',
            'Test that process slot becomes P_FREE',
            'Ensure memory is freed on exit',
            'Test interaction with fork and exit'
        ],
        dependencies: ['u-lib.hh'],
        technicalDetails: 'When process calls sys_exit(), kernel frees all its memory pages (by decrementing refcounts), marks process as P_FREE, and calls schedule() to run next process.',
        codeSnippet: `void process_main() {
    console_printf("Process %d starting\\n", sys_getpid());

    // Do some work
    for (int i = 0; i < 5; ++i) {
        console_printf("Tick %d\\n", i);
        sys_yield();
    }

    console_printf("Process %d exiting\\n", sys_getpid());
    sys_exit();
}`
    },

    'u-lib-cc': {
        filename: 'u-lib.cc',
        icon: '<i class="fas fa-book" style="color: #f59e0b;"></i>',
        type: 'C++',
        category: 'User Processes',
        lines: '42',
        purpose: 'User-space library implementing system call wrappers and utilities.',
        description: 'Provides the implementation of user-space library functions including system call wrappers, console I/O, string manipulation, and memory utilities. This is the user-space equivalent of libc.',
        keyFunctions: [
            { name: 'sys_getpid()', desc: 'Wrapper for SYSCALL_GETPID' },
            { name: 'sys_fork()', desc: 'Wrapper for SYSCALL_FORK' },
            { name: 'sys_exit()', desc: 'Wrapper for SYSCALL_EXIT' },
            { name: 'console_printf()', desc: 'Formatted output to console' },
            { name: 'memcpy()', desc: 'Memory copy utility' }
        ],
        responsibilities: [
            'Wrap all 6 system calls with C++ functions',
            'Implement console_printf using SYSCALL_PANIC',
            'Provide string functions (strlen, strcmp, memset)',
            'Implement memory utilities (memcpy, memcmp)',
            'Format conversions (number to string, etc.)'
        ],
        dependencies: ['u-lib.hh', 'x86-64.h'],
        technicalDetails: 'System calls use inline assembly to execute syscall instruction with arguments in registers (RAX=syscall number, RDI, RSI, RDX=arguments).',
        codeSnippet: `pid_t sys_getpid() {
    pid_t result;
    asm volatile("syscall"
                : "=a" (result)
                : "a" (SYSCALL_GETPID)
                : "cc", "rcx", "r11", "memory");
    return result;
}

pid_t sys_fork() {
    pid_t result;
    asm volatile("syscall"
                : "=a" (result)
                : "a" (SYSCALL_FORK)
                : "cc", "rcx", "r11", "memory");
    return result;
}`
    },

    'u-lib-hh': {
        filename: 'u-lib.hh',
        icon: '<i class="fas fa-file-code" style="color: #06b6d4;"></i>',
        type: 'C++ Header',
        category: 'User Processes',
        lines: '135',
        purpose: 'User-space library interface declarations.',
        description: 'Declares all user-space library functions, system call wrappers, and constants. This is the primary header included by all user process programs.',
        keyFunctions: [
            { name: 'System call declarations', desc: 'sys_getpid, sys_fork, sys_exit, etc.' },
            { name: 'Console functions', desc: 'console_printf, console_putc' },
            { name: 'String utilities', desc: 'strlen, strcmp, memset' },
            { name: 'Memory constants', desc: 'MEMSIZE_VIRTUAL, PROC_START_ADDR' }
        ],
        responsibilities: [
            'Declare all system call wrapper functions',
            'Define system call numbers (SYSCALL_GETPID = 1, etc.)',
            'Declare library utility functions',
            'Define user-space memory constants',
            'Provide inline helper functions'
        ],
        dependencies: ['x86-64.h'],
        technicalDetails: 'Defines user virtual address space: code starts at 0x100000, heap starts at 0x300000, stack at 0x300000.',
        codeSnippet: `// System call numbers
#define SYSCALL_GETPID      1
#define SYSCALL_YIELD       2
#define SYSCALL_PAGE_ALLOC  3
#define SYSCALL_FORK        4
#define SYSCALL_EXIT        5

// User memory layout
#define PROC_START_ADDR     0x100000
#define MEMSIZE_VIRTUAL     0x300000

// Function declarations
pid_t sys_getpid();
pid_t sys_fork();
void sys_exit() __attribute__((noreturn));`
    },

    'lib-cc': {
        filename: 'lib.cc',
        icon: '<i class="fas fa-tools" style="color: #64748b;"></i>',
        type: 'C++',
        category: 'Shared Libraries',
        lines: '936',
        purpose: 'Shared utility functions used by both kernel and user space.',
        description: 'Contains common utility functions that are needed by both kernel and user code, including string manipulation, number formatting, memory operations, and console output. Compiled separately for kernel and user space.',
        keyFunctions: [
            { name: 'memset()', desc: 'Fill memory with byte value' },
            { name: 'memcpy()', desc: 'Copy memory regions' },
            { name: 'strlen()', desc: 'Calculate string length' },
            { name: 'strcmp()', desc: 'Compare strings' },
            { name: 'snprintf()', desc: 'Format string to buffer' },
            { name: 'console_vprintf()', desc: 'Console output implementation' }
        ],
        responsibilities: [
            'Implement standard C library string functions',
            'Provide memory manipulation utilities',
            'Format numbers for console output (decimal, hex)',
            'Implement printf-style formatting',
            'Support both kernel and user compilation'
        ],
        dependencies: ['lib.hh', 'x86-64.h'],
        technicalDetails: 'Uses conditional compilation (#ifdef WEENSYOS_KERNEL) to support both kernel and user builds. Optimized for small size and no standard library dependencies.',
        codeSnippet: `void* memset(void* s, int c, size_t n) {
    unsigned char* p = (unsigned char*) s;
    while (n > 0) {
        *p++ = c;
        --n;
    }
    return s;
}

void* memcpy(void* dst, const void* src, size_t n) {
    const char* s = (const char*) src;
    char* d = (char*) dst;
    while (n-- > 0) {
        *d++ = *s++;
    }
    return dst;
}`
    },

    'lib-hh': {
        filename: 'lib.hh',
        icon: '<i class="fas fa-file-code" style="color: #10b981;"></i>',
        type: 'C++ Header',
        category: 'Shared Libraries',
        lines: '504',
        purpose: 'Shared library function declarations.',
        description: 'Declares utility functions that are shared between kernel and user space. These declarations are used during compilation of both kernel and user code.',
        keyFunctions: [
            { name: 'String functions', desc: 'strlen, strcmp, strcpy, memset, memcpy' },
            { name: 'Formatting', desc: 'snprintf, console_printf' },
            { name: 'Type definitions', desc: 'size_t, ssize_t, uintptr_t' }
        ],
        responsibilities: [
            'Declare standard library functions',
            'Define common type aliases',
            'Provide function attributes (inline, noreturn)',
            'Support both C and C++ compilation',
            'Define macros for common operations'
        ],
        dependencies: [],
        technicalDetails: 'Uses extern "C" linkage for C compatibility. Defines types to match x86-64 ABI (size_t is 64-bit).',
        codeSnippet: `#ifdef __cplusplus
extern "C" {
#endif

void* memset(void* s, int c, size_t n);
void* memcpy(void* dst, const void* src, size_t n);
size_t strlen(const char* s);
int strcmp(const char* a, const char* b);
int snprintf(char* s, size_t size, const char* format, ...);

#ifdef __cplusplus
}
#endif`
    },

    'cbyteswap': {
        filename: 'cbyteswap.hh',
        icon: '<i class="fas fa-exchange-alt" style="color: #3b82f6;"></i>',
        type: 'C++ Header',
        category: 'Shared Libraries',
        lines: '57',
        purpose: 'Byte order conversion utilities for endianness handling.',
        description: 'Provides inline functions for converting between little-endian and big-endian byte orders. Essential for network protocols and reading binary formats that may have different endianness than x86-64.',
        keyFunctions: [
            { name: 'bswap_16()', desc: 'Swap bytes in 16-bit value' },
            { name: 'bswap_32()', desc: 'Swap bytes in 32-bit value' },
            { name: 'bswap_64()', desc: 'Swap bytes in 64-bit value' }
        ],
        responsibilities: [
            'Convert between host and network byte order',
            'Support 16-bit, 32-bit, and 64-bit swaps',
            'Provide inline implementations for performance',
            'Use compiler builtins when available'
        ],
        dependencies: [],
        technicalDetails: 'Uses GCC __builtin_bswap* intrinsics for optimal assembly (single bswap instruction). Falls back to manual bit shifting if builtins unavailable.',
        codeSnippet: `static inline uint16_t bswap_16(uint16_t x) {
#ifdef __GNUC__
    return __builtin_bswap16(x);
#else
    return (x >> 8) | (x << 8);
#endif
}

static inline uint32_t bswap_32(uint32_t x) {
#ifdef __GNUC__
    return __builtin_bswap32(x);
#else
    return ((x & 0xFF000000) >> 24) |
           ((x & 0x00FF0000) >> 8) |
           ((x & 0x0000FF00) << 8) |
           ((x & 0x000000FF) << 24);
#endif
}`
    }
};

// Toggle category expansion
function toggleCategory(header) {
    header.classList.toggle('collapsed');
    const filesDiv = header.nextElementSibling;
    filesDiv.classList.toggle('collapsed');
}

// Show file details
function showFileDetails(fileKey) {
    const file = fileDatabase[fileKey];
    if (!file) return;

    // Remove active class from all files
    document.querySelectorAll('.file-item').forEach(item => {
        item.classList.remove('active');
    });

    // Add active class to clicked file
    event.currentTarget.classList.add('active');

    // Build details HTML
    const detailsHTML = `
        <div class="file-details active">
            <div class="details-header">
                <div class="details-title">
                    <span class="details-icon">${file.icon}</span>
                    <span class="details-filename">${file.filename}</span>
                </div>
                <div class="details-meta">
                    <span class="meta-badge type"><i class="fas fa-file-alt" style="color: #3b82f6;"></i> ${file.type}</span>
                    <span class="meta-badge lines"><i class="fas fa-chart-bar" style="color: #10b981;"></i> ${file.lines} lines</span>
                    <span class="meta-badge category"><i class="fas fa-folder-open" style="color: #f59e0b;"></i> ${file.category}</span>
                </div>
            </div>

            <div class="details-section">
                <h2 class="section-title">
                    <span class="section-icon"><i class="fas fa-bullseye" style="color: #ef4444;"></i></span>
                    Purpose
                </h2>
                <div class="section-content">
                    <p><strong>${file.purpose}</strong></p>
                </div>
            </div>

            <div class="details-section">
                <h2 class="section-title">
                    <span class="section-icon"><i class="fas fa-book-open" style="color: #3b82f6;"></i></span>
                    Description
                </h2>
                <div class="section-content">
                    <p>${file.description}</p>
                </div>
            </div>

            ${file.keyFunctions ? `
            <div class="details-section">
                <h2 class="section-title">
                    <span class="section-icon"><i class="fas fa-cogs" style="color: #8b5cf6;"></i></span>
                    Key Functions
                </h2>
                <div class="key-functions">
                    ${file.keyFunctions.map(func => `
                        <div class="function-card">
                            <div class="function-name">${func.name}</div>
                            <div class="function-desc">${func.desc}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}

            <div class="details-section">
                <h2 class="section-title">
                    <span class="section-icon"><i class="fas fa-check-circle" style="color: #10b981;"></i></span>
                    Responsibilities
                </h2>
                <div class="section-content">
                    <ul>
                        ${file.responsibilities.map(resp => `
                            <li>
                                <span class="bullet-icon"><i class="fas fa-chevron-right" style="color: #64748b;"></i></span>
                                <span>${resp}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>

            ${file.dependencies.length > 0 ? `
            <div class="details-section">
                <h2 class="section-title">
                    <span class="section-icon"><i class="fas fa-link" style="color: #06b6d4;"></i></span>
                    Dependencies
                </h2>
                <div class="dependencies">
                    ${file.dependencies.map(dep => `
                        <span class="dependency-tag">${dep}</span>
                    `).join('')}
                </div>
            </div>
            ` : ''}

            <div class="details-section">
                <h2 class="section-title">
                    <span class="section-icon"><i class="fas fa-wrench" style="color: #f59e0b;"></i></span>
                    Technical Details
                </h2>
                <div class="section-content">
                    <p>${file.technicalDetails}</p>
                </div>
            </div>

            ${file.codeSnippet ? `
            <div class="details-section">
                <h2 class="section-title">
                    <span class="section-icon"><i class="fas fa-code" style="color: #8b5cf6;"></i></span>
                    Code Example
                </h2>
                <div class="code-block">${escapeHtml(file.codeSnippet)}</div>
            </div>
            ` : ''}
        </div>
    `;

    // Update details panel
    const detailsPanel = document.getElementById('detailsPanel');
    detailsPanel.innerHTML = detailsHTML;
}

// Utility function to escape HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Search functionality
let searchTimeout;
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();

        if (query.length === 0) {
            searchResults.classList.remove('active');
            searchResults.innerHTML = '';
            return;
        }

        // Debounce search
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 200);
    });

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });

    // Focus on search with Ctrl+F or Cmd+F
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            searchInput.focus();
            searchInput.select();
        }
    });
}

function performSearch(query) {
    const results = [];
    const queryLower = query.toLowerCase();

    // Search through all files
    for (const [key, file] of Object.entries(fileDatabase)) {
        const matches = [];

        // Search in filename
        if (file.filename.toLowerCase().includes(queryLower)) {
            matches.push({ type: 'Filename', text: file.filename });
        }

        // Search in purpose
        if (file.purpose.toLowerCase().includes(queryLower)) {
            matches.push({ type: 'Purpose', text: file.purpose });
        }

        // Search in description
        if (file.description.toLowerCase().includes(queryLower)) {
            matches.push({ type: 'Description', text: truncate(file.description, 100) });
        }

        // Search in key functions
        if (file.keyFunctions) {
            file.keyFunctions.forEach(func => {
                if (func.name.toLowerCase().includes(queryLower) ||
                    func.desc.toLowerCase().includes(queryLower)) {
                    matches.push({ type: 'Function', text: `${func.name} - ${func.desc}` });
                }
            });
        }

        // Search in responsibilities
        file.responsibilities.forEach(resp => {
            if (resp.toLowerCase().includes(queryLower)) {
                matches.push({ type: 'Responsibility', text: truncate(resp, 80) });
            }
        });

        // Search in technical details
        if (file.technicalDetails.toLowerCase().includes(queryLower)) {
            matches.push({ type: 'Technical', text: truncate(file.technicalDetails, 100) });
        }

        // Search in dependencies
        file.dependencies.forEach(dep => {
            if (dep.toLowerCase().includes(queryLower)) {
                matches.push({ type: 'Dependency', text: dep });
            }
        });

        if (matches.length > 0) {
            results.push({ key, file, matches: matches.slice(0, 3) }); // Limit to 3 matches per file
        }
    }

    displaySearchResults(results, query);
}

function displaySearchResults(results, query) {
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-no-results">No results found for "' + escapeHtml(query) + '"</div>';
        searchResults.classList.add('active');
        return;
    }

    let html = '';
    results.forEach(result => {
        result.matches.forEach(match => {
            const highlightedText = highlightMatch(match.text, query);
            html += `
                <div class="search-result-item" onclick="selectSearchResult('${result.key}')">
                    <div class="search-result-file">${result.file.icon} ${result.file.filename}</div>
                    <div class="search-result-match"><strong>${match.type}:</strong> ${highlightedText}</div>
                </div>
            `;
        });
    });

    searchResults.innerHTML = html;
    searchResults.classList.add('active');
}

function selectSearchResult(fileKey) {
    // Hide search results
    searchResults.classList.remove('active');
    searchInput.value = '';

    // Show file details
    showFileDetails(fileKey);

    // Scroll to and highlight the file in tree
    const fileElement = document.querySelector(`[onclick*="${fileKey}"]`);
    if (fileElement && fileElement.classList.contains('file-item')) {
        fileElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function highlightMatch(text, query) {
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return escapeHtml(text).replace(regex, '<span class="search-highlight">$1</span>');
}

function truncate(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Initialize - expand all categories by default
document.addEventListener('DOMContentLoaded', () => {
    console.log('WeensyOS File Explorer Loaded - 20 files ready');
    console.log('Search enabled - Press Ctrl+F or Cmd+F to search');
});
