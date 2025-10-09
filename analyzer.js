// x86-64 Register Knowledge Base
const REGISTERS = {
    // General Purpose 64-bit
    'rax': { size: 64, purpose: 'Accumulator, return value', type: 'general', arg: false, volatile: true, callingConv: 'caller-saved' },
    'rbx': { size: 64, purpose: 'Base register', type: 'general', arg: false, volatile: false, callingConv: 'callee-saved' },
    'rcx': { size: 64, purpose: '4th function argument', type: 'general', arg: true, argNum: 4, volatile: true, callingConv: 'caller-saved' },
    'rdx': { size: 64, purpose: '3rd function argument', type: 'general', arg: true, argNum: 3, volatile: true, callingConv: 'caller-saved' },
    'rsi': { size: 64, purpose: '2nd function argument, source index', type: 'general', arg: true, argNum: 2, volatile: true, callingConv: 'caller-saved' },
    'rdi': { size: 64, purpose: '1st function argument, destination index', type: 'general', arg: true, argNum: 1, volatile: true, callingConv: 'caller-saved' },
    'rbp': { size: 64, purpose: 'Base pointer', type: 'pointer', arg: false, volatile: false, callingConv: 'callee-saved' },
    'rsp': { size: 64, purpose: 'Stack pointer', type: 'pointer', arg: false, volatile: false, callingConv: 'special' },
    'r8': { size: 64, purpose: '5th function argument', type: 'general', arg: true, argNum: 5, volatile: true, callingConv: 'caller-saved' },
    'r9': { size: 64, purpose: '6th function argument', type: 'general', arg: true, argNum: 6, volatile: true, callingConv: 'caller-saved' },
    'r10': { size: 64, purpose: 'Temporary', type: 'general', arg: false, volatile: true, callingConv: 'caller-saved' },
    'r11': { size: 64, purpose: 'Temporary', type: 'general', arg: false, volatile: true, callingConv: 'caller-saved' },
    'r12': { size: 64, purpose: 'Callee-saved', type: 'general', arg: false, volatile: false, callingConv: 'callee-saved' },
    'r13': { size: 64, purpose: 'Callee-saved', type: 'general', arg: false, volatile: false, callingConv: 'callee-saved' },
    'r14': { size: 64, purpose: 'Callee-saved', type: 'general', arg: false, volatile: false, callingConv: 'callee-saved' },
    'r15': { size: 64, purpose: 'Callee-saved', type: 'general', arg: false, volatile: false, callingConv: 'callee-saved' },

    // 32-bit variants
    'eax': { size: 32, purpose: 'Lower 32 bits of RAX', type: 'general', parent: 'rax', volatile: true },
    'ebx': { size: 32, purpose: 'Lower 32 bits of RBX', type: 'general', parent: 'rbx', volatile: false },
    'ecx': { size: 32, purpose: 'Lower 32 bits of RCX', type: 'general', parent: 'rcx', volatile: true },
    'edx': { size: 32, purpose: 'Lower 32 bits of RDX', type: 'general', parent: 'rdx', volatile: true },
    'esi': { size: 32, purpose: 'Lower 32 bits of RSI', type: 'general', parent: 'rsi', volatile: true },
    'edi': { size: 32, purpose: 'Lower 32 bits of RDI', type: 'general', parent: 'rdi', volatile: true },
    'ebp': { size: 32, purpose: 'Lower 32 bits of RBP', type: 'pointer', parent: 'rbp', volatile: false },
    'esp': { size: 32, purpose: 'Lower 32 bits of RSP', type: 'pointer', parent: 'rsp', volatile: false },

    // 16-bit variants
    'ax': { size: 16, purpose: 'Lower 16 bits of RAX', type: 'general', parent: 'rax', volatile: true },
    'bx': { size: 16, purpose: 'Lower 16 bits of RBX', type: 'general', parent: 'rbx', volatile: false },
    'cx': { size: 16, purpose: 'Lower 16 bits of RCX', type: 'general', parent: 'rcx', volatile: true },
    'dx': { size: 16, purpose: 'Lower 16 bits of RDX', type: 'general', parent: 'rdx', volatile: true },
    'si': { size: 16, purpose: 'Lower 16 bits of RSI', type: 'general', parent: 'rsi', volatile: true },
    'di': { size: 16, purpose: 'Lower 16 bits of RDI', type: 'general', parent: 'rdi', volatile: true },
    'bp': { size: 16, purpose: 'Lower 16 bits of RBP', type: 'pointer', parent: 'rbp', volatile: false },
    'sp': { size: 16, purpose: 'Lower 16 bits of RSP', type: 'pointer', parent: 'rsp', volatile: false },

    // 8-bit variants
    'al': { size: 8, purpose: 'Lower 8 bits of RAX', type: 'general', parent: 'rax', volatile: true },
    'bl': { size: 8, purpose: 'Lower 8 bits of RBX', type: 'general', parent: 'rbx', volatile: false },
    'cl': { size: 8, purpose: 'Lower 8 bits of RCX', type: 'general', parent: 'rcx', volatile: true },
    'dl': { size: 8, purpose: 'Lower 8 bits of RDX', type: 'general', parent: 'rdx', volatile: true },
    'ah': { size: 8, purpose: 'Bits 8-15 of RAX', type: 'general', parent: 'rax', volatile: true },
    'bh': { size: 8, purpose: 'Bits 8-15 of RBX', type: 'general', parent: 'rbx', volatile: false },
    'ch': { size: 8, purpose: 'Bits 8-15 of RCX', type: 'general', parent: 'rcx', volatile: true },
    'dh': { size: 8, purpose: 'Bits 8-15 of RDX', type: 'general', parent: 'rdx', volatile: true },

    // Special
    'rip': { size: 64, purpose: 'Instruction pointer', type: 'special', arg: false, volatile: false },
    'rflags': { size: 64, purpose: 'Flags register', type: 'special', arg: false, volatile: true },

    // 6186 Architecture Registers (Educational/Custom ISA)
    'ra': { size: 64, purpose: '6186 register A (general purpose)', type: 'general', arg: false, volatile: true },
    'rb': { size: 64, purpose: '6186 register B (general purpose)', type: 'general', arg: false, volatile: true },
    'rc': { size: 64, purpose: '6186 register C (general purpose)', type: 'general', arg: false, volatile: true },
    'rd': { size: 64, purpose: '6186 register D (general purpose)', type: 'general', arg: false, volatile: true },
    're': { size: 64, purpose: '6186 register E (general purpose)', type: 'general', arg: false, volatile: true },
    'rf': { size: 64, purpose: '6186 register F (general purpose)', type: 'general', arg: false, volatile: true },
    'rr': { size: 64, purpose: '6186 return value register', type: 'general', arg: false, volatile: true },
    'rx': { size: 64, purpose: '6186 index/temporary register', type: 'general', arg: false, volatile: true },
    'ry': { size: 64, purpose: '6186 index/temporary register', type: 'general', arg: false, volatile: true },
    'rz': { size: 64, purpose: '6186 zero/temporary register', type: 'general', arg: false, volatile: true },
};

// Assembler Directives
const DIRECTIVES = {
    '.globl': 'Make symbol globally visible',
    '.global': 'Make symbol globally visible',
    '.align': 'Align next item to boundary',
    '.type': 'Set symbol type',
    '.size': 'Set symbol size',
    '.section': 'Change to different section',
    '.text': 'Code section',
    '.data': 'Initialized data section',
    '.bss': 'Uninitialized data section',
    '.rodata': 'Read-only data section',
    '.ascii': 'ASCII string (no null terminator)',
    '.asciz': 'ASCII string (null terminated)',
    '.string': 'String constant',
    '.byte': '8-bit integer value',
    '.word': '16-bit integer value',
    '.long': '32-bit integer value',
    '.quad': '64-bit integer value',
    '.zero': 'Reserve zeroed bytes',
    '.space': 'Reserve space',
    '.comm': 'Common symbol',
    '.lcomm': 'Local common symbol',
    '.file': 'Source file name',
    '.loc': 'Source location',
    '.cfi_startproc': 'Start of procedure (CFI)',
    '.cfi_endproc': 'End of procedure (CFI)',
    '.cfi_def_cfa_offset': 'Define CFA offset',
    '.cfi_offset': 'Save register to stack',
    '.p2align': 'Align to power of 2',
};

// Instruction Database
const INSTRUCTIONS = {
    // Data Movement
    'mov': { category: 'data', desc: 'Move data from source to destination. Copies source value to destination register/memory.', affects: ['dest'] },
    'movq': { category: 'data', desc: 'Move 64-bit value from source to destination. Full quad-word transfer.', affects: ['dest'] },
    'movl': { category: 'data', desc: 'Move 32-bit value from source to destination. Zero-extends to 64 bits, clearing upper 32 bits of destination.', affects: ['dest'] },
    'movw': { category: 'data', desc: 'Move 16-bit value from source to destination. Preserves upper bits of destination.', affects: ['dest'] },
    'movb': { category: 'data', desc: 'Move 8-bit value from source to destination. Preserves upper bits of destination.', affects: ['dest'] },
    'movabs': { category: 'data', desc: 'Move absolute quad word', affects: ['dest'] },
    'movabsq': { category: 'data', desc: 'Move absolute quad word', affects: ['dest'] },
    'movzx': { category: 'data', desc: 'Move with zero extension', affects: ['dest'] },
    'movzbl': { category: 'data', desc: 'Move zero-extended byte to long', affects: ['dest'] },
    'movzbw': { category: 'data', desc: 'Move zero-extended byte to word', affects: ['dest'] },
    'movzbq': { category: 'data', desc: 'Move zero-extended byte to quad', affects: ['dest'] },
    'movzwl': { category: 'data', desc: 'Move zero-extended word to long', affects: ['dest'] },
    'movzwq': { category: 'data', desc: 'Move zero-extended word to quad', affects: ['dest'] },
    'movsx': { category: 'data', desc: 'Move with sign extension', affects: ['dest'] },
    'movsbl': { category: 'data', desc: 'Move sign-extended byte to long', affects: ['dest'] },
    'movsbw': { category: 'data', desc: 'Move sign-extended byte to word', affects: ['dest'] },
    'movsbq': { category: 'data', desc: 'Move sign-extended byte to quad', affects: ['dest'] },
    'movswl': { category: 'data', desc: 'Move sign-extended word to long', affects: ['dest'] },
    'movswq': { category: 'data', desc: 'Move sign-extended word to quad', affects: ['dest'] },
    'movslq': { category: 'data', desc: 'Move sign-extended long to quad (movsxd)', affects: ['dest'] },
    'movsxd': { category: 'data', desc: 'Move sign-extended dword to quad', affects: ['dest'] },
    'lea': { category: 'data', desc: 'Load Effective Address. Calculates memory address and stores result in destination (no memory access). dest = &(memory_expression).', affects: ['dest'] },
    'leaq': { category: 'data', desc: 'Load Effective Address (64-bit). Computes address from operands, stores in destination register. Common for arithmetic: dest = base + index*scale + offset.', affects: ['dest'] },
    'leal': { category: 'data', desc: 'Load Effective Address (32-bit). Computes address, stores in 32-bit destination. dest = base + index*scale + offset.', affects: ['dest'] },

    // Arithmetic
    'add': { category: 'arithmetic', desc: 'Add source to destination. dest = dest + src. Sets flags (ZF, SF, CF, OF, PF, AF).', affects: ['dest', 'flags'] },
    'addq': { category: 'arithmetic', desc: 'Add 64-bit source to 64-bit destination. dest = dest + src (quad). Sets overflow, carry, sign, zero flags.', affects: ['dest', 'flags'] },
    'addl': { category: 'arithmetic', desc: 'Add 32-bit source to 32-bit destination. dest = dest + src (long). Zero-extends if destination is 64-bit register.', affects: ['dest', 'flags'] },
    'sub': { category: 'arithmetic', desc: 'Subtract source from destination. dest = dest - src. Sets flags (ZF, SF, CF, OF, PF, AF).', affects: ['dest', 'flags'] },
    'subq': { category: 'arithmetic', desc: 'Subtract 64-bit source from 64-bit destination. dest = dest - src (quad). Sets overflow, borrow, sign, zero flags.', affects: ['dest', 'flags'] },
    'subl': { category: 'arithmetic', desc: 'Subtract 32-bit source from 32-bit destination. dest = dest - src (long). Zero-extends if destination is 64-bit register.', affects: ['dest', 'flags'] },
    'imul': { category: 'arithmetic', desc: 'Signed multiply. Two-operand form: dest = dest * src. One-operand form: (RDX:RAX) = RAX * src.', affects: ['dest', 'flags'] },
    'imulq': { category: 'arithmetic', desc: 'Signed multiply 64-bit. Two-operand: dest = dest * src. One-operand: (RDX:RAX) = RAX * src. 128-bit result in register pair.', affects: ['dest', 'flags'] },
    'imull': { category: 'arithmetic', desc: 'Signed multiply 32-bit. Two-operand: dest = dest * src. One-operand: (EDX:EAX) = EAX * src. Result in high:low pair.', affects: ['dest', 'flags'] },
    'imulw': { category: 'arithmetic', desc: 'Signed multiply 16-bit. Two-operand: dest = dest * src. One-operand: (DX:AX) = AX * src. 32-bit result in register pair.', affects: ['dest', 'flags'] },
    'mul': { category: 'arithmetic', desc: 'Unsigned multiply. (RDX:RAX) = RAX * src for 64-bit. High bits in RDX, low bits in RAX.', affects: ['rax', 'rdx', 'flags'] },
    'mulq': { category: 'arithmetic', desc: 'Unsigned multiply 64-bit. (RDX:RAX) = RAX * src. 128-bit result: high 64 bits in RDX, low 64 bits in RAX.', affects: ['rax', 'rdx', 'flags'] },
    'mull': { category: 'arithmetic', desc: 'Unsigned multiply 32-bit. (EDX:EAX) = EAX * src. Result split: high 32 bits in EDX, low 32 bits in EAX.', affects: ['rax', 'rdx', 'flags'] },
    'idiv': { category: 'arithmetic', desc: 'Signed divide. Divides (RDX:RAX) by src. Quotient → RAX, remainder → RDX.', affects: ['rax', 'rdx', 'flags'] },
    'idivq': { category: 'arithmetic', desc: 'Signed divide 64-bit. Divides (RDX:RAX) by src. Quotient → RAX, remainder → RDX.', affects: ['rax', 'rdx', 'flags'] },
    'idivl': { category: 'arithmetic', desc: 'Signed divide 32-bit. Divides (EDX:EAX) by src. Quotient → EAX, remainder → EDX.', affects: ['rax', 'rdx', 'flags'] },
    'div': { category: 'arithmetic', desc: 'Unsigned divide. Divides (RDX:RAX) by src. Quotient → RAX, remainder → RDX.', affects: ['rax', 'rdx', 'flags'] },
    'divq': { category: 'arithmetic', desc: 'Unsigned divide 64-bit. Divides (RDX:RAX) by src. Quotient → RAX, remainder → RDX.', affects: ['rax', 'rdx', 'flags'] },
    'divl': { category: 'arithmetic', desc: 'Unsigned divide 32-bit. Divides (EDX:EAX) by src. Quotient → EAX, remainder → EDX.', affects: ['rax', 'rdx', 'flags'] },
    'inc': { category: 'arithmetic', desc: 'Increment destination by 1. dest = dest + 1. Sets flags except carry flag (CF unchanged).', affects: ['dest', 'flags'] },
    'incq': { category: 'arithmetic', desc: 'Increment 64-bit destination by 1. dest = dest + 1 (quad). Sets overflow, sign, zero flags.', affects: ['dest', 'flags'] },
    'incl': { category: 'arithmetic', desc: 'Increment 32-bit destination by 1. dest = dest + 1 (long). Zero-extends if 64-bit register.', affects: ['dest', 'flags'] },
    'incw': { category: 'arithmetic', desc: 'Increment 16-bit destination by 1. dest = dest + 1 (word). Upper bits unchanged.', affects: ['dest', 'flags'] },
    'incb': { category: 'arithmetic', desc: 'Increment 8-bit destination by 1. dest = dest + 1 (byte). Upper bits unchanged.', affects: ['dest', 'flags'] },
    'dec': { category: 'arithmetic', desc: 'Decrement destination by 1. dest = dest - 1. Sets flags except carry flag (CF unchanged).', affects: ['dest', 'flags'] },
    'decq': { category: 'arithmetic', desc: 'Decrement 64-bit destination by 1. dest = dest - 1 (quad). Sets overflow, sign, zero flags.', affects: ['dest', 'flags'] },
    'decl': { category: 'arithmetic', desc: 'Decrement 32-bit destination by 1. dest = dest - 1 (long). Zero-extends if 64-bit register.', affects: ['dest', 'flags'] },
    'decw': { category: 'arithmetic', desc: 'Decrement 16-bit destination by 1. dest = dest - 1 (word). Upper bits unchanged.', affects: ['dest', 'flags'] },
    'decb': { category: 'arithmetic', desc: 'Decrement 8-bit destination by 1. dest = dest - 1 (byte). Upper bits unchanged.', affects: ['dest', 'flags'] },
    'neg': { category: 'arithmetic', desc: 'Negate destination (two\'s complement). dest = -dest = 0 - dest. Inverts bits and adds 1.', affects: ['dest', 'flags'] },
    'negq': { category: 'arithmetic', desc: 'Negate 64-bit destination. dest = -dest (quad). Two\'s complement negation.', affects: ['dest', 'flags'] },
    'negl': { category: 'arithmetic', desc: 'Negate 32-bit destination. dest = -dest (long). Two\'s complement negation.', affects: ['dest', 'flags'] },

    // Logical
    'and': { category: 'arithmetic', desc: 'Bitwise AND source with destination. dest = dest & src. Each bit: result is 1 only if both bits are 1. Clears OF/CF, sets SF/ZF/PF.', affects: ['dest', 'flags'] },
    'andq': { category: 'arithmetic', desc: 'Bitwise AND 64-bit source with destination. dest = dest & src (quad). Result has 1-bits only where both operands have 1-bits.', affects: ['dest', 'flags'] },
    'andl': { category: 'arithmetic', desc: 'Bitwise AND 32-bit source with destination. dest = dest & src (long). Zero-extends if 64-bit register.', affects: ['dest', 'flags'] },
    'or': { category: 'arithmetic', desc: 'Bitwise OR source with destination. dest = dest | src. Each bit: result is 1 if either bit is 1. Clears OF/CF, sets SF/ZF/PF.', affects: ['dest', 'flags'] },
    'orq': { category: 'arithmetic', desc: 'Bitwise OR 64-bit source with destination. dest = dest | src (quad). Result has 1-bits where either operand has 1-bits.', affects: ['dest', 'flags'] },
    'orl': { category: 'arithmetic', desc: 'Bitwise OR 32-bit source with destination. dest = dest | src (long). Zero-extends if 64-bit register.', affects: ['dest', 'flags'] },
    'xor': { category: 'arithmetic', desc: 'Bitwise XOR source with destination. dest = dest ^ src. Each bit: result is 1 if bits differ. Clears OF/CF, sets SF/ZF/PF. Common idiom: xor %reg,%reg sets register to 0.', affects: ['dest', 'flags'] },
    'xorq': { category: 'arithmetic', desc: 'Bitwise XOR 64-bit source with destination. dest = dest ^ src (quad). Result has 1-bits where operand bits differ. xorq %rax,%rax efficiently zeros RAX.', affects: ['dest', 'flags'] },
    'xorl': { category: 'arithmetic', desc: 'Bitwise XOR 32-bit source with destination. dest = dest ^ src (long). Zero-extends if 64-bit register. xorl %eax,%eax efficiently zeros EAX/RAX.', affects: ['dest', 'flags'] },
    'not': { category: 'arithmetic', desc: 'Bitwise NOT (one\'s complement). dest = ~dest. Inverts all bits: 0→1, 1→0. Does not affect flags.', affects: ['dest'] },
    'notb': { category: 'arithmetic', desc: 'Bitwise NOT 8-bit destination. dest = ~dest (byte). Inverts lower 8 bits, upper bits unchanged.', affects: ['dest'] },
    'notw': { category: 'arithmetic', desc: 'Bitwise NOT 16-bit destination. dest = ~dest (word). Inverts lower 16 bits, upper bits unchanged.', affects: ['dest'] },
    'notl': { category: 'arithmetic', desc: 'Bitwise NOT 32-bit destination. dest = ~dest (long). Inverts all 32 bits. Zero-extends if 64-bit register.', affects: ['dest'] },
    'notq': { category: 'arithmetic', desc: 'Bitwise NOT 64-bit destination. dest = ~dest (quad). Inverts all 64 bits.', affects: ['dest'] },

    // Shifts
    'shl': { category: 'arithmetic', desc: 'Shift left. dest = dest << count. Bits shifted left, zeros fill from right. Last bit shifted out goes to CF. Equivalent to multiply by 2^count.', affects: ['dest', 'flags'] },
    'shlb': { category: 'arithmetic', desc: 'Shift left 8-bit destination. dest = dest << count (byte). Zeros fill from right, leftmost bit → CF.', affects: ['dest', 'flags'] },
    'shlw': { category: 'arithmetic', desc: 'Shift left 16-bit destination. dest = dest << count (word). Zeros fill from right, leftmost bit → CF.', affects: ['dest', 'flags'] },
    'shll': { category: 'arithmetic', desc: 'Shift left 32-bit destination. dest = dest << count (long). Zeros fill from right, leftmost bit → CF. Same as multiply by 2^count.', affects: ['dest', 'flags'] },
    'shlq': { category: 'arithmetic', desc: 'Shift left 64-bit destination. dest = dest << count (quad). Zeros fill from right, leftmost bit → CF. Same as multiply by 2^count.', affects: ['dest', 'flags'] },

    'shr': { category: 'arithmetic', desc: 'Shift right logical. dest = dest >> count. Bits shifted right, zeros fill from left. Last bit shifted out goes to CF. For unsigned divide by 2^count.', affects: ['dest', 'flags'] },
    'shrb': { category: 'arithmetic', desc: 'Shift right logical 8-bit. dest = dest >> count (byte). Zeros fill from left, rightmost bit → CF. Unsigned divide by 2^count.', affects: ['dest', 'flags'] },
    'shrw': { category: 'arithmetic', desc: 'Shift right logical 16-bit. dest = dest >> count (word). Zeros fill from left, rightmost bit → CF. Unsigned divide by 2^count.', affects: ['dest', 'flags'] },
    'shrl': { category: 'arithmetic', desc: 'Shift right logical 32-bit. dest = dest >> count (long). Zeros fill from left, rightmost bit → CF. Unsigned divide by 2^count.', affects: ['dest', 'flags'] },
    'shrq': { category: 'arithmetic', desc: 'Shift right logical 64-bit. dest = dest >> count (quad). Zeros fill from left, rightmost bit → CF. Unsigned divide by 2^count.', affects: ['dest', 'flags'] },

    'sar': { category: 'arithmetic', desc: 'Shift arithmetic right. dest = dest >> count. Bits shifted right, sign bit (MSB) fills from left. For signed divide by 2^count. Preserves sign.', affects: ['dest', 'flags'] },
    'sarb': { category: 'arithmetic', desc: 'Shift arithmetic right 8-bit. dest = dest >> count (byte). Sign bit replicates from left. Signed divide by 2^count, rounds toward -∞.', affects: ['dest', 'flags'] },
    'sarw': { category: 'arithmetic', desc: 'Shift arithmetic right 16-bit. dest = dest >> count (word). Sign bit replicates from left. Signed divide by 2^count, rounds toward -∞.', affects: ['dest', 'flags'] },
    'sarl': { category: 'arithmetic', desc: 'Shift arithmetic right 32-bit. dest = dest >> count (long). Sign bit replicates from left. Signed divide by 2^count, rounds toward -∞.', affects: ['dest', 'flags'] },
    'sarq': { category: 'arithmetic', desc: 'Shift arithmetic right 64-bit. dest = dest >> count (quad). Sign bit replicates from left. Signed divide by 2^count, rounds toward -∞.', affects: ['dest', 'flags'] },

    'sal': { category: 'arithmetic', desc: 'Shift arithmetic left (identical to SHL). dest = dest << count. Zeros fill from right. Multiply by 2^count.', affects: ['dest', 'flags'] },
    'salb': { category: 'arithmetic', desc: 'Shift arithmetic left 8-bit (identical to SHLB). dest = dest << count (byte).', affects: ['dest', 'flags'] },
    'salw': { category: 'arithmetic', desc: 'Shift arithmetic left 16-bit (identical to SHLW). dest = dest << count (word).', affects: ['dest', 'flags'] },
    'sall': { category: 'arithmetic', desc: 'Shift arithmetic left 32-bit (identical to SHLL). dest = dest << count (long).', affects: ['dest', 'flags'] },
    'salq': { category: 'arithmetic', desc: 'Shift arithmetic left 64-bit (identical to SHLQ). dest = dest << count (quad).', affects: ['dest', 'flags'] },

    'rol': { category: 'arithmetic', desc: 'Rotate left. dest bits rotated left by count. Bits shifted out on left reenter on right. No data loss, CF gets last bit rotated out.', affects: ['dest', 'flags'] },
    'ror': { category: 'arithmetic', desc: 'Rotate right. dest bits rotated right by count. Bits shifted out on right reenter on left. No data loss, CF gets last bit rotated out.', affects: ['dest', 'flags'] },
    'rcl': { category: 'arithmetic', desc: 'Rotate through carry left. dest and CF rotated left as unit. Bits: dest[n-1]→CF→dest[0]. Count iterations. Used for multi-precision shifts.', affects: ['dest', 'flags'] },
    'rcr': { category: 'arithmetic', desc: 'Rotate through carry right. dest and CF rotated right as unit. Bits: dest[0]→CF→dest[n-1]. Count iterations. Used for multi-precision shifts.', affects: ['dest', 'flags'] },

    // Stack Operations
    'push': { category: 'memory', desc: 'Push value onto stack. RSP = RSP - 8, then [RSP] = src. Decrements stack pointer, writes value to new top of stack.', affects: ['rsp', 'stack'] },
    'pushq': { category: 'memory', desc: 'Push 64-bit value onto stack. RSP = RSP - 8, then [RSP] = src (quad). Stack grows downward.', affects: ['rsp', 'stack'], stackDelta: -8 },
    'pop': { category: 'memory', desc: 'Pop value from stack. dest = [RSP], then RSP = RSP + 8. Reads value from stack top, increments stack pointer.', affects: ['dest', 'rsp', 'stack'] },
    'popq': { category: 'memory', desc: 'Pop 64-bit value from stack. dest = [RSP], then RSP = RSP + 8 (quad). Reads from stack top, adjusts pointer.', affects: ['dest', 'rsp', 'stack'], stackDelta: 8 },

    // Control Flow
    'jmp': { category: 'control', desc: 'Unconditional jump to target. RIP = target. Always transfers control to specified address or label.', affects: ['rip'] },
    'jmpq': { category: 'control', desc: 'Unconditional jump to 64-bit target. RIP = target (quad). Always jumps.', affects: ['rip'] },
    'je': { category: 'control', desc: 'Jump if equal. Jump to target if ZF=1 (zero flag set). Used after CMP: jumps if operands were equal.', affects: ['rip'] },
    'jne': { category: 'control', desc: 'Jump if not equal. Jump to target if ZF=0 (zero flag clear). Used after CMP: jumps if operands differ.', affects: ['rip'] },
    'jz': { category: 'control', desc: 'Jump if zero. Jump to target if ZF=1 (same as JE). Used after TEST or arithmetic: jumps if result was zero.', affects: ['rip'] },
    'jnz': { category: 'control', desc: 'Jump if not zero. Jump to target if ZF=0 (same as JNE). Used after TEST or arithmetic: jumps if result was non-zero.', affects: ['rip'] },
    'jg': { category: 'control', desc: 'Jump if greater (signed). Jump if ZF=0 AND SF=OF. After CMP dest,src: jumps if dest > src (signed comparison).', affects: ['rip'] },
    'jge': { category: 'control', desc: 'Jump if greater or equal (signed). Jump if SF=OF. After CMP dest,src: jumps if dest >= src (signed).', affects: ['rip'] },
    'jl': { category: 'control', desc: 'Jump if less (signed). Jump if SF≠OF. After CMP dest,src: jumps if dest < src (signed comparison).', affects: ['rip'] },
    'jle': { category: 'control', desc: 'Jump if less or equal (signed). Jump if ZF=1 OR SF≠OF. After CMP dest,src: jumps if dest <= src (signed).', affects: ['rip'] },
    'ja': { category: 'control', desc: 'Jump if above (unsigned). Jump if CF=0 AND ZF=0. After CMP dest,src: jumps if dest > src (unsigned comparison).', affects: ['rip'] },
    'jae': { category: 'control', desc: 'Jump if above or equal (unsigned). Jump if CF=0. After CMP dest,src: jumps if dest >= src (unsigned). Same as JNC.', affects: ['rip'] },
    'jb': { category: 'control', desc: 'Jump if below (unsigned). Jump if CF=1. After CMP dest,src: jumps if dest < src (unsigned comparison). Same as JC.', affects: ['rip'] },
    'jbe': { category: 'control', desc: 'Jump if below or equal (unsigned). Jump if CF=1 OR ZF=1. After CMP dest,src: jumps if dest <= src (unsigned).', affects: ['rip'] },
    'jc': { category: 'control', desc: 'Jump if carry. Jump if CF=1 (carry flag set). Used after arithmetic: jumps if carry/borrow occurred.', affects: ['rip'] },
    'jnc': { category: 'control', desc: 'Jump if no carry. Jump if CF=0 (carry flag clear). Used after arithmetic: jumps if no carry/borrow.', affects: ['rip'] },
    'jo': { category: 'control', desc: 'Jump if overflow. Jump if OF=1 (overflow flag set). Used after signed arithmetic: jumps if overflow occurred.', affects: ['rip'] },
    'jno': { category: 'control', desc: 'Jump if no overflow. Jump if OF=0 (overflow flag clear). Used after signed arithmetic: jumps if no overflow.', affects: ['rip'] },
    'js': { category: 'control', desc: 'Jump if sign. Jump if SF=1 (sign flag set, MSB=1). Jumps if result is negative (signed).', affects: ['rip'] },
    'jns': { category: 'control', desc: 'Jump if no sign. Jump if SF=0 (sign flag clear, MSB=0). Jumps if result is positive or zero (signed).', affects: ['rip'] },
    'jp': { category: 'control', desc: 'Jump if parity. Jump if PF=1 (parity flag set, even parity). Jumps if low byte has even number of 1-bits.', affects: ['rip'] },
    'jnp': { category: 'control', desc: 'Jump if no parity. Jump if PF=0 (parity flag clear, odd parity). Jumps if low byte has odd number of 1-bits.', affects: ['rip'] },
    'call': { category: 'control', desc: 'Call procedure. Push return address (next instruction) onto stack, then jump to target. RSP -= 8, [RSP] = return_addr, RIP = target.', affects: ['rip', 'rsp', 'stack'], stackDelta: -8 },
    'callq': { category: 'control', desc: 'Call procedure (64-bit). Push 64-bit return address onto stack, jump to target. RSP -= 8, [RSP] = next_instr, RIP = target.', affects: ['rip', 'rsp', 'stack'], stackDelta: -8 },
    'ret': { category: 'control', desc: 'Return from procedure. Pop return address from stack and jump to it. RIP = [RSP], RSP += 8. Returns control to caller.', affects: ['rip', 'rsp', 'stack'], stackDelta: 8 },
    'retq': { category: 'control', desc: 'Return from procedure (64-bit). Pops return address from stack and jumps to it. Operations: RIP ← [RSP] (load return address), RSP ← RSP + 8 (pop stack). Returns control to caller.', affects: ['rip', 'rsp', 'stack'], stackDelta: 8 },
    'retn': { category: 'control', desc: 'Return from procedure (near). Same as RET. Pop return address, jump to it. RIP = [RSP], RSP += 8.', affects: ['rip', 'rsp', 'stack'], stackDelta: 8 },

    // Comparison
    'cmp': { category: 'arithmetic', desc: 'Compare operands (subtract without storing). Computes dest - src, sets flags based on result. dest unchanged. Use before conditional jumps.', affects: ['flags'] },
    'cmpb': { category: 'arithmetic', desc: 'Compare 8-bit operands. Computes dest - src (byte), sets flags. dest unchanged. Often followed by Jcc (conditional jump).', affects: ['flags'] },
    'cmpw': { category: 'arithmetic', desc: 'Compare 16-bit operands. Computes dest - src (word), sets flags. dest unchanged. Often followed by Jcc.', affects: ['flags'] },
    'cmpl': { category: 'arithmetic', desc: 'Compare 32-bit operands. Computes dest - src (long), sets flags. dest unchanged. Common before conditional jumps/moves.', affects: ['flags'] },
    'cmpq': { category: 'arithmetic', desc: 'Compare 64-bit operands. Computes dest - src (quad), sets flags. dest unchanged. Sets ZF if equal, CF/SF for magnitude.', affects: ['flags'] },
    'test': { category: 'arithmetic', desc: 'Test operands (bitwise AND without storing). Computes dest & src, sets flags. dest unchanged. Common idiom: test %rax,%rax checks if RAX is zero.', affects: ['flags'] },
    'testb': { category: 'arithmetic', desc: 'Test 8-bit operands. Computes dest & src (byte), sets flags. dest unchanged. Sets ZF if result is zero.', affects: ['flags'] },
    'testw': { category: 'arithmetic', desc: 'Test 16-bit operands. Computes dest & src (word), sets flags. dest unchanged. Checks bit patterns.', affects: ['flags'] },
    'testl': { category: 'arithmetic', desc: 'Test 32-bit operands. Computes dest & src (long), sets flags. dest unchanged. testl %eax,%eax efficiently checks if EAX is zero.', affects: ['flags'] },
    'testq': { category: 'arithmetic', desc: 'Test 64-bit operands. Computes dest & src (quad), sets flags. dest unchanged. testq %rax,%rax checks if RAX is zero.', affects: ['flags'] },

    // Conditional Move
    'cmove': { category: 'data', desc: 'Conditional move if equal. If ZF=1 then dest = src, else dest unchanged. Branchless conditional assignment.', affects: ['dest'] },
    'cmovne': { category: 'data', desc: 'Conditional move if not equal. If ZF=0 then dest = src, else dest unchanged. Avoids branch misprediction.', affects: ['dest'] },
    'cmovg': { category: 'data', desc: 'Conditional move if greater (signed). If ZF=0 AND SF=OF then dest = src, else dest unchanged. After CMP: move if first > second.', affects: ['dest'] },
    'cmovl': { category: 'data', desc: 'Conditional move if less (signed). If SF≠OF then dest = src, else dest unchanged. After CMP: move if first < second.', affects: ['dest'] },

    // Other
    'nop': { category: 'control', desc: 'No operation. Does nothing, takes 1 byte, 1 cycle. Used for alignment, timing, or as placeholder.', affects: [] },
    'leave': { category: 'control', desc: 'Leave stack frame. RSP = RBP (restore stack pointer), then pop RBP (restore base pointer). Efficient function epilogue. Equivalent to: movq %rbp,%rsp; popq %rbp.', affects: ['rsp', 'rbp', 'stack'], stackDelta: 8 },
    'enter': { category: 'control', desc: 'Enter stack frame. Push RBP, set RBP = RSP, allocate local space. Creates function prologue. Rarely used (slower than manual setup).', affects: ['rsp', 'rbp', 'stack'] },
};

function demangleCppName(mangledName) {
    /**
     * Basic C++ name demangling for Itanium ABI
     * Handles common patterns like _Z<length><name><args>
     */

    if (!mangledName.startsWith('_Z')) {
        return null; // Not a mangled name
    }

    try {
        let pos = 2; // Skip '_Z'
        const result = { demangled: '', type: 'function' };

        // Handle nested names (N...E pattern)
        if (mangledName[pos] === 'N') {
            pos++; // Skip 'N'
            const parts = [];

            while (mangledName[pos] !== 'E' && pos < mangledName.length) {
                // Read length
                let len = '';
                while (mangledName[pos] >= '0' && mangledName[pos] <= '9') {
                    len += mangledName[pos];
                    pos++;
                }

                if (len) {
                    const length = parseInt(len);
                    const part = mangledName.substr(pos, length);
                    parts.push(part);
                    pos += length;
                } else {
                    break;
                }
            }

            result.demangled = parts.join('::');
            pos++; // Skip 'E'
        } else {
            // Simple function name
            let len = '';
            while (mangledName[pos] >= '0' && mangledName[pos] <= '9') {
                len += mangledName[pos];
                pos++;
            }

            if (len) {
                const length = parseInt(len);
                result.demangled = mangledName.substr(pos, length);
                pos += length;
            }
        }

        // Parse argument types
        const args = [];
        while (pos < mangledName.length) {
            const typeChar = mangledName[pos];

            if (typeChar === 'v') {
                // void
                args.push('void');
                pos++;
            } else if (typeChar === 'i') {
                args.push('int');
                pos++;
            } else if (typeChar === 'l') {
                args.push('long');
                pos++;
            } else if (typeChar === 'f') {
                args.push('float');
                pos++;
            } else if (typeChar === 'd') {
                args.push('double');
                pos++;
            } else if (typeChar === 'c') {
                args.push('char');
                pos++;
            } else if (typeChar === 'b') {
                args.push('bool');
                pos++;
            } else if (typeChar === 'P') {
                // Pointer
                pos++;
                const nextType = mangledName[pos];
                if (nextType === 'i') {
                    args.push('int*');
                    pos++;
                } else if (nextType === 'c') {
                    args.push('char*');
                    pos++;
                } else if (nextType === 'v') {
                    args.push('void*');
                    pos++;
                } else {
                    args.push('*');
                    pos++;
                }
            } else if (typeChar === 'R') {
                // Reference
                pos++;

                // Check for std::vector or other standard library types
                if (mangledName.substr(pos, 2) === 'St') {
                    pos += 2;

                    // Read length of class name
                    let classLen = '';
                    while (mangledName[pos] >= '0' && mangledName[pos] <= '9') {
                        classLen += mangledName[pos];
                        pos++;
                    }

                    if (classLen) {
                        const length = parseInt(classLen);
                        const className = mangledName.substr(pos, length);
                        pos += length;

                        if (className === 'vector') {
                            // Try to parse template arguments
                            let templateArgs = '<int>';
                            args.push(`std::vector${templateArgs}&`);
                        } else {
                            args.push(`std::${className}&`);
                        }
                    }
                } else {
                    const nextType = mangledName[pos];
                    if (nextType === 'i') {
                        args.push('int&');
                        pos++;
                    } else if (nextType === 'c') {
                        args.push('char&');
                        pos++;
                    } else {
                        args.push('&');
                        pos++;
                    }
                }
            } else {
                // Unknown type, skip
                pos++;
            }
        }

        // Build final demangled name
        if (args.length > 0 && args[0] !== '') {
            result.demangled += '(' + args.join(', ') + ')';
        } else {
            result.demangled += '()';
        }

        return result.demangled;
    } catch (e) {
        // If demangling fails, return null
        return null;
    }
}

function analyzeAssembly() {
    const input = document.getElementById('assemblyInput').value;
    if (!input.trim()) {
        alert('Please enter some assembly code to analyze');
        return;
    }

    const lines = input.split('\n').filter(l => l.trim()); // Keep all non-empty lines including comments

    const analysis = {
        instructions: [],
        registers: new Set(),
        argumentRegisters: new Set(),
        returnRegisters: new Set(),
        returnInfo: {
            usesReturnRegister: false,
            lastModificationBeforeRet: null,
            returnsValue: false,
            returnSize: null,
            confidence: 'none' // none, low, medium, high
        },
        volatileRegs: new Set(),
        nonVolatileRegs: new Set(),
        labels: [],
        directives: [],
        stackOps: [],
        memoryOps: [],
        controlFlow: [],
        totalBytes: 0,
        stackDelta: 0,
        addressedInstructions: 0,
        loops: [],
        jumpTargets: new Map(), // Map of jump sources to targets
        comments: [], // Store comment-only lines
    };

    lines.forEach((line, idx) => {
        const trimmed = line.trim();

        // Check for comment-only lines (lines that start with # or // or ;)
        if (trimmed.startsWith('#') || trimmed.startsWith('//') || trimmed.startsWith(';')) {
            // Extract the comment text
            let commentText = trimmed;
            if (trimmed.startsWith('#')) {
                commentText = trimmed.substring(1).trim();
            } else if (trimmed.startsWith('//')) {
                commentText = trimmed.substring(2).trim();
            } else if (trimmed.startsWith(';')) {
                commentText = trimmed.substring(1).trim();
            }

            analysis.comments.push({
                line: idx + 1,
                text: commentText,
                fullLine: trimmed
            });
            return; // Skip further processing for comment-only lines
        }

        // Check for labels FIRST (including local labels like .L3, .L.str)
        if (trimmed.includes(':') && !trimmed.match(/^\s*[0-9a-fA-F]+:/)) {
            // Not a hex address - it's a label
            const labelName = trimmed.split(':')[0].trim();

            // Check if this is a directive-type label (like .type, .size)
            if (DIRECTIVES[labelName]) {
                // It's a directive, not a label
                analysis.directives.push({
                    line: idx + 1,
                    directive: labelName,
                    content: trimmed,
                    description: DIRECTIVES[labelName]
                });
                return;
            }

            // It's a real label (function or local like .L3)
            if (!analysis.labels.includes(labelName)) {
                analysis.labels.push(labelName);
            }

            // If this line only contains a label (no instruction after), skip further processing
            const afterColon = trimmed.split(':')[1];
            if (!afterColon || afterColon.trim() === '') {
                return;
            }
        }

        // Check for directives (but NOT labels that start with .)
        if (trimmed.startsWith('.') && !trimmed.includes(':')) {
            const directiveName = trimmed.split(/\s+/)[0];
            if (DIRECTIVES[directiveName]) {
                analysis.directives.push({
                    line: idx + 1,
                    directive: directiveName,
                    content: trimmed,
                    description: DIRECTIVES[directiveName]
                });
            }
            return;
        }

        // Parse instruction
        const parsed = parseInstruction(trimmed);
        if (parsed) {
            // Generate dynamic description based on actual operands
            const dynamicDesc = getDynamicDescription(parsed);
            analysis.instructions.push({ line: idx + 1, ...parsed, description: dynamicDesc });
            if (parsed.hasAddress) {
                analysis.addressedInstructions++;
            }

            // Track registers
            parsed.registers.forEach(reg => {
                const cleanReg = reg.replace('%', '').replace('$', '');
                if (REGISTERS[cleanReg]) {
                    analysis.registers.add(cleanReg);

                    const regInfo = REGISTERS[cleanReg];
                    if (regInfo.arg) analysis.argumentRegisters.add(cleanReg);

                    // Track any usage of return registers
                    if (cleanReg === 'rax' || cleanReg === 'eax' || cleanReg === 'ax' || cleanReg === 'al') {
                        analysis.returnRegisters.add(cleanReg);
                        analysis.returnInfo.usesReturnRegister = true;
                    }

                    if (regInfo.volatile) analysis.volatileRegs.add(cleanReg);
                    else analysis.nonVolatileRegs.add(cleanReg);
                }
            });

            // Track stack operations and delta
            // Stack operations for display (push/pop only)
            if (parsed.category === 'memory' && (parsed.instruction.includes('push') || parsed.instruction.includes('pop'))) {
                analysis.stackOps.push({ line: idx + 1, ...parsed, description: dynamicDesc });
            }

            // Track stack delta for ALL instructions that affect the stack (push, pop, call, ret, leave, etc.)
            if (INSTRUCTIONS[parsed.instruction] && INSTRUCTIONS[parsed.instruction].stackDelta) {
                analysis.stackDelta += INSTRUCTIONS[parsed.instruction].stackDelta;
            }

            // Track memory operations
            if (parsed.hasMemoryOperand) {
                analysis.memoryOps.push({ line: idx + 1, ...parsed, description: dynamicDesc });
            }

            // Track control flow
            if (parsed.category === 'control') {
                analysis.controlFlow.push({ line: idx + 1, ...parsed, description: dynamicDesc });
            }

            // Estimate size
            analysis.totalBytes += estimateInstructionSize(parsed);
        }
    });

    // Detect loops and analyze jump targets
    detectLoops(analysis);
    analyzeJumpTargets(analysis);

    // Analyze return value usage
    analyzeReturnValue(analysis);

    // Analyze return conditions
    analyzeReturnConditions(analysis);

    // Analyze calling convention
    analyzeCallingConvention(analysis);

    // Analyze function calls
    analyzeFunctionCalls(analysis);

    // Infer parameter types
    inferParameterTypes(analysis);

    // Detect array accesses
    detectArrayAccesses(analysis);

    // Track register state changes
    trackRegisterState(analysis);

    displayAnalysis(analysis);
}

function analyzeJumpTargets(analysis) {
    // Track all jump/call instructions and their targets
    analysis.controlFlow.forEach(cf => {
        if (cf.operands.length > 0) {
            const target = cf.operands[0];
            // Parse jump targets like "b <f+0xb>" or ".L3" or "40 <f+0x40>"
            let cleanTarget = target;
            let offset = null;

            // Extract label and offset from formats like "b <f+0xb>" or "40 <f+0x40>"
            const labelMatch = target.match(/^([a-zA-Z0-9_.]+)\s*</);
            const offsetMatch = target.match(/<[^+]*\+(0x[0-9a-fA-F]+)>/);

            if (labelMatch) {
                cleanTarget = labelMatch[1];
            }
            if (offsetMatch) {
                offset = offsetMatch[1];
            }

            // Store jump target info
            if (!analysis.jumpTargets.has(cf.address || cf.line)) {
                analysis.jumpTargets.set(cf.address || cf.line, {
                    instruction: cf.instruction,
                    target: cleanTarget,
                    offset: offset,
                    fullTarget: target,
                    line: cf.line
                });
            }
        }
    });
}

function analyzeReturnValue(analysis) {
    /**
     * Intelligent return value detection
     * Analyzes if a function actually returns a value in rax/eax
     *
     * High confidence indicators:
     * - rax/eax is written to (destination) shortly before 'ret'
     * - movl/movq to rax/eax followed by ret
     * - Arithmetic operation with rax/eax as dest before ret
     *
     * Low confidence indicators:
     * - rax/eax used but only as source
     * - rax/eax used early in function but modified by call
     *
     * No return value:
     * - ret without any rax/eax modification
     * - rax/eax not used at all
     * - Only xor %eax,%eax (common void function pattern)
     */

    if (!analysis.returnInfo.usesReturnRegister) {
        analysis.returnInfo.returnsValue = false;
        analysis.returnInfo.confidence = 'none';
        return;
    }

    const instructions = analysis.instructions;
    const returnRegNames = ['rax', 'eax', 'ax', 'al'];

    // Find all 'ret' instructions
    const retInstructions = instructions.filter(inst => inst.instruction === 'ret' || inst.instruction === 'retq');

    if (retInstructions.length === 0) {
        analysis.returnInfo.returnsValue = false;
        analysis.returnInfo.confidence = 'low';
        return;
    }

    let highConfidenceCount = 0;
    let lowConfidenceCount = 0;
    let voidPatternCount = 0;

    retInstructions.forEach(retInst => {
        const retLine = retInst.line;

        // Look backwards up to 10 instructions before ret
        const lookbackStart = Math.max(0, retLine - 11);
        const relevantInsts = instructions.slice(lookbackStart, retLine - 1);

        // Find last modification to rax/eax before ret
        for (let i = relevantInsts.length - 1; i >= 0; i--) {
            const inst = relevantInsts[i];
            const instName = inst.instruction;
            const operands = inst.operands || [];

            // Check if this instruction writes to a return register
            // In AT&T syntax, destination is last operand
            if (operands.length > 0) {
                const destOperand = operands[operands.length - 1];
                const destReg = destOperand.replace('%', '').replace(/[^a-z0-9]/g, '');

                if (returnRegNames.includes(destReg)) {
                    // Found a write to return register!

                    // Check for void function patterns
                    if (instName === 'xorl' || instName === 'xorq') {
                        // xor %eax,%eax is often used to return 0 or for void functions
                        const srcOperand = operands.length > 1 ? operands[0].replace('%', '') : '';
                        if (srcOperand === destReg) {
                            // Self-XOR - could be return 0 or void function zeroing
                            lowConfidenceCount++;
                            analysis.returnInfo.lastModificationBeforeRet = {
                                line: inst.line,
                                instruction: instName,
                                register: destReg,
                                pattern: 'xor_self',
                                note: 'May return 0 or be void function zeroing register'
                            };
                            break;
                        }
                    }

                    // Check for high-confidence patterns
                    if (instName.startsWith('mov') || instName.startsWith('lea') ||
                        instName.startsWith('add') || instName.startsWith('sub') ||
                        instName.startsWith('imul') || instName.startsWith('idiv') ||
                        instName.startsWith('and') || instName.startsWith('or') ||
                        instName.startsWith('shl') || instName.startsWith('shr') ||
                        instName.startsWith('neg') || instName.startsWith('inc') ||
                        instName.startsWith('dec')) {

                        highConfidenceCount++;

                        // Determine size
                        let size = 'unknown';
                        if (destReg === 'rax') size = '64-bit';
                        else if (destReg === 'eax') size = '32-bit';
                        else if (destReg === 'ax') size = '16-bit';
                        else if (destReg === 'al') size = '8-bit';

                        analysis.returnInfo.lastModificationBeforeRet = {
                            line: inst.line,
                            instruction: instName,
                            register: destReg,
                            fullInstruction: inst.fullInstruction || `${instName} ${operands.join(', ')}`,
                            pattern: 'explicit_write',
                            note: `Explicitly writes to return register`
                        };

                        if (!analysis.returnInfo.returnSize) {
                            analysis.returnInfo.returnSize = size;
                        }

                        break;
                    }

                    // Check if it's from a function call (callq)
                    if (instName === 'call' || instName === 'callq') {
                        highConfidenceCount++;
                        analysis.returnInfo.lastModificationBeforeRet = {
                            line: inst.line,
                            instruction: instName,
                            register: 'rax',
                            pattern: 'function_call',
                            note: 'Return value from nested function call'
                        };
                        break;
                    }
                }
            }

            // If we see a 'call', rax might be clobbered, so earlier modifications don't count
            if (instName === 'call' || instName === 'callq') {
                break;
            }
        }
    });

    // Determine overall confidence and return value status
    if (highConfidenceCount > 0) {
        analysis.returnInfo.returnsValue = true;
        analysis.returnInfo.confidence = 'high';
    } else if (lowConfidenceCount > 0) {
        analysis.returnInfo.returnsValue = true;
        analysis.returnInfo.confidence = 'medium';
    } else if (voidPatternCount > 0) {
        analysis.returnInfo.returnsValue = false;
        analysis.returnInfo.confidence = 'medium';
    } else {
        // rax/eax used somewhere but no modification found before ret
        // This likely means it's a void function where rax was only used
        // for intermediate operations (like storing call results)
        analysis.returnInfo.returnsValue = false;
        analysis.returnInfo.confidence = 'high';
        analysis.returnInfo.lastModificationBeforeRet = {
            pattern: 'void_function',
            note: 'No return register modification found before ret - likely void function'
        };
    }

    // Infer return type based on usage patterns
    if (analysis.returnInfo.returnsValue && analysis.returnInfo.lastModificationBeforeRet) {
        const mod = analysis.returnInfo.lastModificationBeforeRet;
        const instName = mod.instruction;
        const reg = mod.register;
        let inferredTypes = [];
        let typeConfidence = 'low';

        // Type inference based on instruction pattern
        if (mod.pattern === 'xor_self') {
            // XOR self = 0
            inferredTypes = ['int (0)', 'bool (false)', 'NULL'];
            typeConfidence = 'high';
        } else if (mod.pattern === 'function_call') {
            // Return value from nested call - type unknown
            inferredTypes = ['return type of called function'];
            typeConfidence = 'low';
        } else if (instName.startsWith('lea')) {
            // LEA returns address
            inferredTypes = ['pointer', 'address', 'void*', 'T*'];
            typeConfidence = 'high';
        } else if (instName.startsWith('mov')) {
            // MOV - need to check source operand
            const fullInst = mod.fullInstruction || '';

            // Check if loading from memory (pointer dereference)
            if (fullInst.match(/\([^)]+\)/)) {
                // Loading from memory - check size
                if (reg === 'rax' || reg === 'eax') {
                    if (instName === 'movq') {
                        inferredTypes = ['long', 'int64_t', 'size_t', 'pointer'];
                    } else if (instName === 'movl') {
                        inferredTypes = ['int', 'int32_t', 'unsigned'];
                    } else if (instName === 'movw') {
                        inferredTypes = ['short', 'int16_t'];
                    } else if (instName === 'movb') {
                        inferredTypes = ['char', 'int8_t', 'bool'];
                    }
                    typeConfidence = 'medium';
                }
            } else if (fullInst.includes('$')) {
                // Moving immediate value
                if (reg === 'rax') {
                    inferredTypes = ['long', 'int64_t', 'pointer'];
                } else if (reg === 'eax') {
                    inferredTypes = ['int', 'int32_t', 'unsigned'];
                }
                typeConfidence = 'medium';
            } else {
                // Register to register move
                if (reg === 'rax') {
                    inferredTypes = ['long', 'int64_t', 'pointer'];
                } else if (reg === 'eax') {
                    inferredTypes = ['int', 'int32_t'];
                } else if (reg === 'ax') {
                    inferredTypes = ['short', 'int16_t'];
                } else if (reg === 'al') {
                    inferredTypes = ['char', 'int8_t', 'bool'];
                }
                typeConfidence = 'low';
            }
        } else if (instName.startsWith('add') || instName.startsWith('sub') ||
                   instName.startsWith('imul') || instName.startsWith('inc') || instName.startsWith('dec')) {
            // Arithmetic result
            if (reg === 'rax') {
                inferredTypes = ['long', 'int64_t', 'size_t'];
            } else if (reg === 'eax') {
                inferredTypes = ['int', 'int32_t', 'unsigned'];
            } else if (reg === 'ax') {
                inferredTypes = ['short', 'int16_t'];
            } else if (reg === 'al') {
                inferredTypes = ['char', 'int8_t'];
            }
            typeConfidence = 'medium';
        } else if (instName.startsWith('and') || instName.startsWith('or') ||
                   instName.startsWith('xor') || instName.startsWith('shl') || instName.startsWith('shr')) {
            // Bitwise/shift result
            if (reg === 'rax') {
                inferredTypes = ['long', 'int64_t', 'unsigned long', 'uint64_t'];
            } else if (reg === 'eax') {
                inferredTypes = ['int', 'unsigned', 'uint32_t'];
            } else if (reg === 'ax') {
                inferredTypes = ['short', 'unsigned short', 'uint16_t'];
            } else if (reg === 'al') {
                inferredTypes = ['char', 'unsigned char', 'uint8_t', 'bool'];
            }
            typeConfidence = 'medium';
        } else if (instName.startsWith('idiv')) {
            // Signed division
            if (reg === 'rax' || reg === 'eax') {
                inferredTypes = ['int', 'long', 'signed'];
            }
            typeConfidence = 'medium';
        } else {
            // Default based on register size
            if (reg === 'rax') {
                inferredTypes = ['long', 'int64_t', 'pointer', 'size_t'];
            } else if (reg === 'eax') {
                inferredTypes = ['int', 'int32_t'];
            } else if (reg === 'ax') {
                inferredTypes = ['short', 'int16_t'];
            } else if (reg === 'al') {
                inferredTypes = ['char', 'int8_t', 'bool'];
            }
            typeConfidence = 'low';
        }

        analysis.returnInfo.returnType = {
            types: inferredTypes,
            confidence: typeConfidence,
            register: reg,
            pattern: mod.pattern
        };
    } else if (!analysis.returnInfo.returnsValue) {
        // No return value - void function
        analysis.returnInfo.returnType = {
            types: ['void'],
            confidence: 'high',
            register: null,
            pattern: 'no_return'
        };
    }

    // Analyze conditions that lead to specific return values
    analyzeReturnConditions(analysis);
}

function analyzeReturnConditions(analysis) {
    /**
     * Detect what input conditions cause the function to return specific values
     * Focuses on: return 0, return non-zero, early returns, conditional returns
     */

    analysis.returnConditions = {
        hasMultipleReturns: false,
        returnPaths: [],
        zeroReturnConditions: [],
        nonZeroReturnConditions: [],
        earlyReturns: []
    };

    const instructions = analysis.instructions;

    // Find all return points
    const retInstructions = instructions.filter(inst =>
        inst.instruction === 'ret' || inst.instruction === 'retq'
    );

    if (retInstructions.length > 1) {
        analysis.returnConditions.hasMultipleReturns = true;
    }

    // Analyze each return point
    retInstructions.forEach(retInst => {
        const retLine = retInst.line;

        // Look back to find what value is being returned
        let returnValue = 'unknown';
        let conditions = [];

        // Check instructions before return (look back up to 15 instructions)
        const lookbackStart = Math.max(0, retLine - 16);
        const relevantInsts = instructions.slice(lookbackStart, retLine - 1);

        // Find last modification to return register
        for (let i = relevantInsts.length - 1; i >= 0; i--) {
            const inst = relevantInsts[i];
            const instName = inst.instruction.toLowerCase();
            const operands = inst.operands || [];

            // Check for xor %eax,%eax or xor %rax,%rax (return 0)
            if ((instName === 'xorl' || instName === 'xorq' || instName === 'xor') && operands.length >= 2) {
                const op1 = operands[0].replace('%', '');
                const op2 = operands[1].replace('%', '');
                if ((op1 === 'eax' || op1 === 'rax') && op1 === op2) {
                    returnValue = '0';
                    break;
                }
            }

            // Check for mov $0, %eax
            if (instName.startsWith('mov') && operands.length >= 2) {
                const src = operands[0];
                const dest = operands[1].replace('%', '');
                if ((dest === 'eax' || dest === 'rax') && src === '$0') {
                    returnValue = '0';
                    break;
                }
            }

            // Check for other values being moved to return register
            if (instName.startsWith('mov') && operands.length >= 2) {
                const dest = operands[1].replace('%', '');
                if (dest === 'eax' || dest === 'rax' || dest === 'ax' || dest === 'al') {
                    returnValue = 'computed';
                    break;
                }
            }
        }

        // Look for conditional jumps and test/cmp leading to this return
        const precedingTests = [];
        const conditionalJumps = [];
        let isXorPattern = false;

        for (let i = relevantInsts.length - 1; i >= 0; i--) {
            const inst = relevantInsts[i];
            const instName = inst.instruction.toLowerCase();

            // Check if this is the xor pattern
            if ((instName === 'xorl' || instName === 'xorq' || instName === 'xor')) {
                const operands = inst.operands || [];
                if (operands.length >= 2) {
                    const op1 = operands[0].replace('%', '');
                    const op2 = operands[1].replace('%', '');
                    if ((op1 === 'eax' || op1 === 'rax') && op1 === op2) {
                        isXorPattern = true;
                    }
                }
            }

            // Look for test/cmp instructions
            if (instName.startsWith('test') || instName.startsWith('cmp')) {
                const operands = inst.operands || [];
                let note = '';

                if (instName.startsWith('test') && operands.length >= 2) {
                    const op1 = operands[0].replace('%', '');
                    const op2 = operands[1].replace('%', '');

                    // test %reg,%reg checks if register is zero
                    if (op1 === op2) {
                        note = `Checks if %${op1} == 0`;
                    } else {
                        note = `Tests ${operands[0]} & ${operands[1]}`;
                    }
                } else if (instName.startsWith('cmp') && operands.length >= 2) {
                    note = `Compares ${operands[1]} with ${operands[0]}`;
                }

                precedingTests.push({
                    line: inst.line,
                    instruction: inst.fullInstruction || `${inst.instruction} ${operands.join(',')}`,
                    note: note
                });
            }

            // Look for conditional jumps
            if (instName.startsWith('j') && instName !== 'jmp' && instName !== 'jmpq') {
                const jumpType = instName.substring(1); // Remove 'j' prefix
                conditionalJumps.push({
                    line: inst.line,
                    instruction: inst.fullInstruction || `${inst.instruction} ${(inst.operands || []).join(',')}`
                });
            }
        }

        // Categorize this return path
        let note = '';
        if (returnValue === '0') {
            note = 'Returns zero (success/false/null)';
        } else if (returnValue === 'computed') {
            note = 'Returns computed value';
        }

        const returnPath = {
            line: retLine,
            returnValue: returnValue,
            precedingTests: precedingTests,
            conditionalJumps: conditionalJumps,
            isXorPattern: isXorPattern,
            isEarlyReturn: retLine < instructions[instructions.length - 1].line - 2,
            instruction: retInst.fullInstruction || 'ret',
            note: note
        };

        analysis.returnConditions.returnPaths.push(returnPath);

        // Categorize by return value
        if (returnValue === '0') {
            analysis.returnConditions.zeroReturnConditions.push(returnPath);
        } else if (returnValue === 'computed') {
            analysis.returnConditions.nonZeroReturnConditions.push(returnPath);
        }

        if (returnPath.isEarlyReturn) {
            analysis.returnConditions.earlyReturns.push(returnPath);
        }
    });
}

function analyzeCallingConvention(analysis) {
    /**
     * Detect caller-saved and callee-saved register usage
     * System V AMD64 ABI (Linux/macOS):
     * - Caller-saved (volatile): %rax, %rcx, %rdx, %rsi, %rdi, %r8-r11
     * - Callee-saved (non-volatile): %rbx, %rbp, %r12-r15
     */

    analysis.callingConvention = {
        calleeSavedRegisters: [],
        callerSavedRegisters: [],
        preservedRegisters: [],
        violations: [],
        stackAlignment: {
            detected: false,
            alignmentOps: [],
            alignedBeforeCalls: true,
            currentOffset: 0
        }
    };

    const instructions = analysis.instructions;

    // Track which callee-saved registers are pushed/saved
    const savedRegisters = new Set();
    const restoredRegisters = new Set();

    // Callee-saved registers that must be preserved
    const calleeSavedRegs = ['rbx', 'rbp', 'r12', 'r13', 'r14', 'r15'];
    const callerSavedRegs = ['rax', 'rcx', 'rdx', 'rsi', 'rdi', 'r8', 'r9', 'r10', 'r11'];

    // Track stack alignment (x86-64 requires 16-byte alignment before calls)
    // At function entry: return address pushed = 8 bytes offset from 16-byte boundary
    let stackOffset = 8; // Start with return address on stack

    // Find all callee-saved registers that are used
    const usedCalleeSaved = new Set();
    const usedCallerSaved = new Set();

    instructions.forEach((inst, idx) => {
        const instName = inst.instruction.toLowerCase();
        const operands = inst.operands || [];

        // Check if instruction uses/modifies any registers
        operands.forEach(op => {
            const cleanOp = op.replace(/[%$(),]*/g, '');
            const regInfo = REGISTERS[cleanOp];

            if (regInfo) {
                const baseReg = regInfo.parent || cleanOp;

                if (calleeSavedRegs.includes(baseReg)) {
                    usedCalleeSaved.add(baseReg);
                } else if (callerSavedRegs.includes(baseReg)) {
                    usedCallerSaved.add(baseReg);
                }
            }
        });

        // Track stack alignment changes
        if (instName === 'push' || instName === 'pushq') {
            stackOffset += 8;
        } else if (instName === 'pop' || instName === 'popq') {
            stackOffset -= 8;
        } else if (instName === 'sub' || instName === 'subq') {
            // subq $N, %rsp - allocates N bytes on stack
            if (operands.length >= 2 && operands[1].includes('rsp')) {
                const immediate = operands[0].replace('$', '');
                const bytes = parseInt(immediate);
                if (!isNaN(bytes)) {
                    stackOffset += bytes;

                    // Check if this is alignment padding (common values: 8, 16, 24...)
                    const alignmentBefore = stackOffset - bytes;
                    const misalignment = alignmentBefore % 16;
                    const isAlignmentOp = (bytes === 8 && misalignment === 8) ||
                                         (bytes === 16) ||
                                         (bytes % 16 === misalignment);

                    if (isAlignmentOp || bytes === 8) {
                        analysis.callingConvention.stackAlignment.detected = true;
                        analysis.callingConvention.stackAlignment.alignmentOps.push({
                            line: inst.line,
                            instruction: inst.fullInstruction || `subq $${bytes}, %rsp`,
                            bytes: bytes,
                            offsetBefore: alignmentBefore,
                            offsetAfter: stackOffset,
                            alignedAfter: (stackOffset % 16 === 0),
                            purpose: isAlignmentOp ? '16-byte alignment for function calls' : 'stack allocation',
                            note: `Stack offset: ${alignmentBefore} → ${stackOffset} bytes (${stackOffset % 16 === 0 ? 'aligned' : 'misaligned by ' + (stackOffset % 16) + ' bytes'})`
                        });
                    }
                }
            }
        } else if (instName === 'add' || instName === 'addq') {
            // addq $N, %rsp - deallocates N bytes from stack
            if (operands.length >= 2 && operands[1].includes('rsp')) {
                const immediate = operands[0].replace('$', '');
                const bytes = parseInt(immediate);
                if (!isNaN(bytes)) {
                    stackOffset -= bytes;
                }
            }
        } else if (instName === 'call' || instName === 'callq') {
            // Check if stack is 16-byte aligned before call
            const aligned = (stackOffset % 16 === 0);
            if (!aligned) {
                analysis.callingConvention.stackAlignment.alignedBeforeCalls = false;
                analysis.callingConvention.violations.push({
                    type: 'misaligned-call',
                    line: inst.line,
                    message: `Stack not 16-byte aligned before call (offset: ${stackOffset} bytes, misalignment: ${stackOffset % 16} bytes)`,
                    severity: 'warning'
                });
            }
        }

        // Detect push/pop patterns for callee-saved registers
        if (instName === 'push' || instName === 'pushq') {
            operands.forEach(op => {
                const reg = op.replace('%', '');
                if (calleeSavedRegs.includes(reg)) {
                    savedRegisters.add(reg);
                    analysis.callingConvention.preservedRegisters.push({
                        register: reg,
                        action: 'saved',
                        line: inst.line,
                        instruction: inst.fullInstruction || `push %${reg}`
                    });
                }
            });
        }

        if (instName === 'pop' || instName === 'popq') {
            operands.forEach(op => {
                const reg = op.replace('%', '');
                if (calleeSavedRegs.includes(reg)) {
                    restoredRegisters.add(reg);
                    analysis.callingConvention.preservedRegisters.push({
                        register: reg,
                        action: 'restored',
                        line: inst.line,
                        instruction: inst.fullInstruction || `pop %${reg}`
                    });
                }
            });
        }

        // Detect mov to/from stack for callee-saved registers
        if (instName.startsWith('mov')) {
            if (operands.length >= 2) {
                const src = operands[0];
                const dest = operands[1];

                // Check for saving to stack: mov %rbx, -8(%rsp)
                const srcReg = src.replace('%', '');
                if (calleeSavedRegs.includes(srcReg) && dest.includes('(%rsp)')) {
                    savedRegisters.add(srcReg);
                    analysis.callingConvention.preservedRegisters.push({
                        register: srcReg,
                        action: 'saved',
                        line: inst.line,
                        instruction: inst.fullInstruction || `${inst.instruction} ${operands.join(',')}`
                    });
                }

                // Check for restoring from stack: mov -8(%rsp), %rbx
                const destReg = dest.replace('%', '');
                if (calleeSavedRegs.includes(destReg) && src.includes('(%rsp)')) {
                    restoredRegisters.add(destReg);
                    analysis.callingConvention.preservedRegisters.push({
                        register: destReg,
                        action: 'restored',
                        line: inst.line,
                        instruction: inst.fullInstruction || `${inst.instruction} ${operands.join(',')}`
                    });
                }
            }
        }
    });

    // Populate callee-saved and caller-saved register lists
    usedCalleeSaved.forEach(reg => {
        const regInfo = REGISTERS[reg];
        analysis.callingConvention.calleeSavedRegisters.push({
            register: reg,
            purpose: regInfo ? regInfo.purpose : 'Unknown',
            saved: savedRegisters.has(reg),
            restored: restoredRegisters.has(reg),
            properlyPreserved: savedRegisters.has(reg) && restoredRegisters.has(reg)
        });

        // Check for violations (used but not properly saved/restored)
        if (!savedRegisters.has(reg) || !restoredRegisters.has(reg)) {
            analysis.callingConvention.violations.push({
                type: 'missing-preservation',
                register: reg,
                message: `Callee-saved register %${reg} is used but not properly preserved`,
                severity: 'warning'
            });
        }
    });

    usedCallerSaved.forEach(reg => {
        const regInfo = REGISTERS[reg];
        analysis.callingConvention.callerSavedRegisters.push({
            register: reg,
            purpose: regInfo ? regInfo.purpose : 'Unknown'
        });
    });
}

function analyzeFunctionCalls(analysis) {
    /**
     * Detect and analyze function calls
     * - Extract function names from call instructions
     * - Demangle C++ names
     * - Track calling context
     */

    analysis.functionCalls = {
        calls: [],
        totalCalls: 0,
        uniqueFunctions: new Set()
    };

    const instructions = analysis.instructions;

    instructions.forEach((inst, idx) => {
        const instName = inst.instruction.toLowerCase();

        if (instName === 'call' || instName === 'callq') {
            const operands = inst.operands || [];
            if (operands.length > 0) {
                const target = operands[0];

                // Extract function name from various formats:
                // - Direct name: _Z1fi
                // - With address: 40 <_Z1fi>
                // - With offset: b <f+0xb>
                let functionName = target;

                // Extract from angle brackets if present
                const bracketMatch = target.match(/<([^>]+)>/);
                if (bracketMatch) {
                    functionName = bracketMatch[1];
                    // Remove offset like "+0xb"
                    functionName = functionName.split('+')[0];
                } else {
                    // Clean up any trailing whitespace or special chars
                    functionName = target.trim();
                }

                // Try to demangle if it's a C++ name
                const demangled = demangleCppName(functionName);

                // Store call info
                const callInfo = {
                    line: inst.line,
                    instruction: inst.fullInstruction,
                    mangledName: functionName,
                    demangledName: demangled,
                    displayName: demangled || functionName,
                    rawTarget: target
                };

                analysis.functionCalls.calls.push(callInfo);
                analysis.functionCalls.totalCalls++;
                analysis.functionCalls.uniqueFunctions.add(functionName);
            }
        }
    });
}

function inferParameterTypes(analysis) {
    /**
     * Infer likely C/C++ parameter types based on how argument registers are used
     *
     * Type inference rules:
     * - Dereferenced as pointer: likely pointer type (int ptr, char ptr, struct ptr, etc.)
     * - Used in arithmetic: likely integer (int, long, size_t)
     * - Compared to 0: could be pointer (NULL check) or integer
     * - Scale factor 4: likely int ptr or int value for int array
     * - Scale factor 8: likely long ptr or int64_t ptr or long value
     * - Scale factor 1: likely char ptr or byte array
     * - Saved immediately: likely preserved for later use
     * - Called: function pointer
     */

    // Map to store inferred types for each argument register
    analysis.parameterTypes = {};

    // Argument register mapping
    const argRegMap = {
        'rdi': { num: 1, register: 'rdi' },
        'edi': { num: 1, register: 'rdi' },
        'rsi': { num: 2, register: 'rsi' },
        'esi': { num: 2, register: 'rsi' },
        'rdx': { num: 3, register: 'rdx' },
        'edx': { num: 3, register: 'rdx' },
        'rcx': { num: 4, register: 'rcx' },
        'ecx': { num: 4, register: 'rcx' },
        'r8': { num: 5, register: 'r8' },
        'r8d': { num: 5, register: 'r8' },
        'r9': { num: 6, register: 'r9' },
        'r9d': { num: 6, register: 'r9' },
        // 6186 registers
        'ra': { num: 1, register: 'ra' },
        'rb': { num: 2, register: 'rb' },
        'rc': { num: 3, register: 'rc' },
        'rd': { num: 4, register: 'rd' },
        're': { num: 5, register: 're' },
        'rf': { num: 6, register: 'rf' }
    };

    // Track usage patterns for each argument register
    const usagePatterns = {};

    analysis.instructions.forEach((inst, idx) => {
        const instName = inst.instruction.toLowerCase();
        const operands = inst.operands || [];

        operands.forEach((op, opIdx) => {
            // Check if operand contains an argument register
            const regMatch = op.match(/%([a-z0-9]+)/);
            if (!regMatch) return;

            const reg = regMatch[1];
            if (!argRegMap[reg]) return;

            const argInfo = argRegMap[reg];
            const baseReg = argInfo.register;

            if (!usagePatterns[baseReg]) {
                usagePatterns[baseReg] = {
                    argNum: argInfo.num,
                    register: baseReg,
                    patterns: [],
                    confidence: 'low'
                };
            }

            // Pattern 1: Memory dereference - likely pointer
            if (op.includes('(') && op.includes(')')) {
                // Check scale factor
                const scaleMatch = op.match(/,%[a-z0-9]+,(\d+)\)/);
                const offsetMatch = op.match(/^(-?\d+)\(/);

                if (scaleMatch) {
                    const scale = parseInt(scaleMatch[1]);
                    if (scale === 8) {
                        usagePatterns[baseReg].patterns.push({ type: 'pointer_deref_8', confidence: 'high', note: 'Used as base for 8-byte access (long*/int64_t*)' });
                    } else if (scale === 4) {
                        usagePatterns[baseReg].patterns.push({ type: 'pointer_deref_4', confidence: 'high', note: 'Used as base for 4-byte access (int*)' });
                    } else if (scale === 2) {
                        usagePatterns[baseReg].patterns.push({ type: 'pointer_deref_2', confidence: 'high', note: 'Used as base for 2-byte access (short*)' });
                    } else if (scale === 1) {
                        usagePatterns[baseReg].patterns.push({ type: 'pointer_deref_1', confidence: 'high', note: 'Used as base for 1-byte access (char*/uint8_t*)' });
                    }
                } else if (offsetMatch || op.match(/\(%[a-z0-9]+\)/)) {
                    // Simple dereference like (%rdi) or 8(%rdi)
                    usagePatterns[baseReg].patterns.push({ type: 'pointer_deref', confidence: 'high', note: 'Dereferenced as pointer' });
                }

                // Check if it's used as index (second register in address calculation)
                const indexMatch = op.match(/\([^,]+,(%[a-z0-9]+)/);
                if (indexMatch && indexMatch[1] === `%${reg}`) {
                    usagePatterns[baseReg].patterns.push({ type: 'array_index', confidence: 'medium', note: 'Used as array index (likely integer)' });
                }
            }

            // Pattern 2: Arithmetic operations - likely integer
            if (instName.startsWith('add') || instName.startsWith('sub') ||
                instName.startsWith('imul') || instName.startsWith('idiv') ||
                instName.startsWith('inc') || instName.startsWith('dec')) {
                usagePatterns[baseReg].patterns.push({ type: 'arithmetic', confidence: 'medium', note: 'Used in arithmetic (likely integer)' });
            }

            // Pattern 3: Shift operations - integer
            if (instName.startsWith('shl') || instName.startsWith('shr') || instName.startsWith('sal') || instName.startsWith('sar')) {
                usagePatterns[baseReg].patterns.push({ type: 'shift', confidence: 'medium', note: 'Used in shift operation (integer)' });
            }

            // Pattern 4: Comparison with 0 - could be NULL check (pointer) or integer check
            if (instName.startsWith('cmp') || instName.startsWith('test')) {
                const otherOp = operands[1 - opIdx];
                if (otherOp === '$0' || (instName.startsWith('test') && operands[0] === operands[1])) {
                    usagePatterns[baseReg].patterns.push({ type: 'null_check', confidence: 'low', note: 'Compared to 0 (NULL check or zero test)' });
                }
            }

            // Pattern 5: LEA - calculating address
            if (instName.startsWith('lea')) {
                if (opIdx === 0) {
                    usagePatterns[baseReg].patterns.push({ type: 'address_calc', confidence: 'high', note: 'Used in address calculation (likely pointer or base address)' });
                }
            }

            // Pattern 6: Function call - might be function pointer if called indirectly
            if (instName === 'call' || instName === 'callq') {
                if (op.includes(reg)) {
                    usagePatterns[baseReg].patterns.push({ type: 'function_ptr', confidence: 'high', note: 'Called as function pointer' });
                }
            }

            // Pattern 7: Immediate save to stack - preserving argument
            if ((instName.startsWith('mov') || instName.startsWith('push')) && idx < 5) {
                usagePatterns[baseReg].patterns.push({ type: 'saved_early', confidence: 'low', note: 'Saved to stack early (preserved for later)' });
            }
        });
    });

    // Synthesize type inference from patterns
    Object.keys(usagePatterns).forEach(reg => {
        const patterns = usagePatterns[reg].patterns;
        let inferredTypes = [];
        let confidence = 'low';

        // Count pattern types
        const pointerDerefs = patterns.filter(p => p.type.includes('pointer_deref'));
        const arithmetic = patterns.filter(p => p.type === 'arithmetic' || p.type === 'shift');
        const arrayIndex = patterns.filter(p => p.type === 'array_index');
        const addressCalc = patterns.filter(p => p.type === 'address_calc');
        const funcPtr = patterns.filter(p => p.type === 'function_ptr');

        // Determine most likely type
        if (funcPtr.length > 0) {
            inferredTypes.push('function pointer');
            confidence = 'high';
        }

        if (pointerDerefs.length > 0) {
            // Determine pointer type based on scale
            const scale8 = patterns.find(p => p.type === 'pointer_deref_8');
            const scale4 = patterns.find(p => p.type === 'pointer_deref_4');
            const scale2 = patterns.find(p => p.type === 'pointer_deref_2');
            const scale1 = patterns.find(p => p.type === 'pointer_deref_1');

            if (scale8) {
                inferredTypes.push('long*', 'int64_t*', 'double*', 'struct*');
            } else if (scale4) {
                inferredTypes.push('int*', 'int32_t*', 'float*');
            } else if (scale2) {
                inferredTypes.push('short*', 'int16_t*');
            } else if (scale1) {
                inferredTypes.push('char*', 'uint8_t*', 'const char*');
            } else {
                inferredTypes.push('void*', 'struct*', 'pointer type');
            }
            confidence = 'high';
        }

        if (addressCalc.length > 0 && pointerDerefs.length === 0) {
            inferredTypes.push('pointer type', 'base address');
            confidence = 'medium';
        }

        if (arrayIndex.length > 0) {
            inferredTypes.push('int', 'size_t', 'long');
            confidence = 'medium';
        }

        if (arithmetic.length > 0 && pointerDerefs.length === 0 && addressCalc.length === 0) {
            inferredTypes.push('int', 'long', 'size_t', 'unsigned');
            confidence = 'medium';
        }

        if (inferredTypes.length === 0) {
            inferredTypes.push('unknown type');
            confidence = 'low';
        }

        analysis.parameterTypes[reg] = {
            argNum: usagePatterns[reg].argNum,
            register: reg,
            types: inferredTypes,
            confidence: confidence,
            patterns: patterns
        };
    });
}

function detectArrayAccesses(analysis) {
    /**
     * Detect array access patterns in assembly code
     *
     * Array patterns:
     * 1. Indexed addressing: base(%reg1,%reg2,scale) - array[index]
     * 2. Scaled addressing: (%base,%index,scale) - array[i]
     * 3. Loop with increment - iterating through array
     * 4. LEA with scale - calculating array element address
     * 5. Multiple accesses with same base/scale - array traversal
     */

    analysis.arrayAccesses = [];
    const arrayPatterns = new Map(); // Track potential arrays

    analysis.instructions.forEach((inst, idx) => {
        const instName = inst.instruction.toLowerCase();
        const operands = inst.operands || [];

        operands.forEach((op) => {
            // Match array access pattern: offset(%base,%index,scale)
            // Examples: (%rdi,%rsi,4), 16(%rdi,%rsi,8), -4(%rbp,%rax,1)
            const arrayMatch = op.match(/(-?\d*)\((%[a-z0-9]+),(%[a-z0-9]+)(?:,(\d+))?\)/);

            if (arrayMatch) {
                const [, offset, baseReg, indexReg, scale] = arrayMatch;
                const off = offset && offset !== '' ? parseInt(offset) : 0;
                const sc = scale ? parseInt(scale) : 1;

                // Determine element type based on scale and instruction
                let elementType = 'unknown';
                let elementSize = sc;
                let accessType = 'read';

                // Determine access type (read vs write)
                if (operands.indexOf(op) === operands.length - 1 &&
                    (instName.startsWith('mov') || instName.startsWith('lea'))) {
                    // Destination operand - might be write
                    if (!instName.startsWith('lea')) {
                        accessType = 'write';
                    }
                } else {
                    accessType = 'read';
                }

                // Infer element type from scale
                if (sc === 8) {
                    elementType = 'long/int64_t/double/pointer';
                    elementSize = 8;
                } else if (sc === 4) {
                    elementType = 'int/int32_t/float';
                    elementSize = 4;
                } else if (sc === 2) {
                    elementType = 'short/int16_t';
                    elementSize = 2;
                } else if (sc === 1) {
                    elementType = 'char/int8_t/byte';
                    elementSize = 1;
                }

                // Check instruction suffix for more precise type
                if (instName.endsWith('q')) {
                    elementSize = 8;
                    if (sc === 8) elementType = 'long/int64_t/pointer';
                } else if (instName.endsWith('l')) {
                    elementSize = Math.min(elementSize, 4);
                    if (sc === 4) elementType = 'int/int32_t';
                } else if (instName.endsWith('w')) {
                    elementSize = Math.min(elementSize, 2);
                    if (sc === 2) elementType = 'short/int16_t';
                } else if (instName.endsWith('b')) {
                    elementSize = 1;
                    if (sc === 1) elementType = 'char/int8_t/byte';
                }

                const arrayKey = `${baseReg}-${sc}`;

                if (!arrayPatterns.has(arrayKey)) {
                    arrayPatterns.set(arrayKey, {
                        baseRegister: baseReg,
                        indexRegister: indexReg,
                        scale: sc,
                        elementType: elementType,
                        elementSize: elementSize,
                        offset: off,
                        accesses: [],
                        confidence: 'medium'
                    });
                }

                const pattern = arrayPatterns.get(arrayKey);
                pattern.accesses.push({
                    line: inst.line,
                    instruction: instName,
                    fullInstruction: `${instName} ${operands.join(', ')}`,
                    indexRegister: indexReg,
                    offset: off,
                    accessType: accessType,
                    operation: instName.startsWith('lea') ? 'address calculation' :
                              instName.startsWith('mov') ? 'data access' :
                              instName.startsWith('add') || instName.startsWith('sub') ? 'arithmetic' :
                              'other'
                });

                // Increase confidence if multiple accesses
                if (pattern.accesses.length >= 2) {
                    pattern.confidence = 'high';
                }
            }
        });
    });

    // Convert map to array and add to analysis
    arrayPatterns.forEach((pattern, key) => {
        // Determine if this is likely a parameter array or local array
        const isParameter = ['rdi', 'rsi', 'rdx', 'rcx', 'r8', 'r9', 'ra', 'rb', 'rc', 'rd', 're', 'rf']
            .includes(pattern.baseRegister.replace('%', ''));

        const isStack = pattern.baseRegister.replace('%', '') === 'rbp' ||
                       pattern.baseRegister.replace('%', '') === 'rsp';

        let arrayLocation = 'unknown';
        let arrayName = 'array';

        if (isParameter) {
            arrayLocation = 'parameter';
            const argNum = {
                'rdi': 1, 'edi': 1,
                'rsi': 2, 'esi': 2,
                'rdx': 3, 'edx': 3,
                'rcx': 4, 'ecx': 4,
                'r8': 5, 'r8d': 5,
                'r9': 6, 'r9d': 6,
                'ra': 1, 'rb': 2, 'rc': 3, 'rd': 4, 're': 5, 'rf': 6
            }[pattern.baseRegister.replace('%', '')] || '?';
            arrayName = `param${argNum}_array`;
        } else if (isStack) {
            arrayLocation = 'stack (local variable)';
            arrayName = 'local_array';
        } else {
            arrayLocation = 'computed address';
            arrayName = 'temp_array';
        }

        // Detect traversal direction by looking at index register modifications
        let traversalDirection = 'unknown';
        let directionConfidence = 'low';
        const indexReg = pattern.indexRegister.replace('%', '');

        // Look for inc/dec/add/sub instructions that modify the index register
        const indexMods = analysis.instructions.filter(inst => {
            const instName = inst.instruction.toLowerCase();
            const operands = inst.operands || [];

            // Check if this instruction modifies the index register
            if (instName === 'inc' || instName === 'incq' || instName === 'incl') {
                return operands.some(op => op.replace('%', '') === indexReg);
            }
            if (instName === 'dec' || instName === 'decq' || instName === 'decl') {
                return operands.some(op => op.replace('%', '') === indexReg);
            }
            if (instName.startsWith('add')) {
                // Check if index register is destination
                const dest = operands[operands.length - 1];
                return dest && dest.replace('%', '') === indexReg;
            }
            if (instName.startsWith('sub')) {
                // Check if index register is destination
                const dest = operands[operands.length - 1];
                return dest && dest.replace('%', '') === indexReg;
            }
            return false;
        });

        if (indexMods.length > 0) {
            let increments = 0;
            let decrements = 0;

            indexMods.forEach(inst => {
                const instName = inst.instruction.toLowerCase();
                if (instName === 'inc' || instName === 'incq' || instName === 'incl' || instName.startsWith('add')) {
                    increments++;
                } else if (instName === 'dec' || instName === 'decq' || instName === 'decl' || instName.startsWith('sub')) {
                    decrements++;
                }
            });

            if (increments > decrements) {
                traversalDirection = 'forward';
                directionConfidence = increments > 1 ? 'high' : 'medium';
            } else if (decrements > increments) {
                traversalDirection = 'backward';
                directionConfidence = decrements > 1 ? 'high' : 'medium';
            } else if (increments === decrements && increments > 0) {
                traversalDirection = 'bidirectional';
                directionConfidence = 'medium';
            }
        }

        analysis.arrayAccesses.push({
            baseRegister: pattern.baseRegister,
            indexRegister: pattern.indexRegister,
            scale: pattern.scale,
            elementType: pattern.elementType,
            elementSize: pattern.elementSize,
            elementCount: pattern.accesses.length,
            offset: pattern.offset,
            accesses: pattern.accesses,
            confidence: pattern.confidence,
            location: arrayLocation,
            suggestedName: arrayName,
            cEquivalent: `${pattern.elementType.split('/')[0]} ${arrayName}[]`,
            traversalDirection: traversalDirection,
            directionConfidence: directionConfidence,
            indexModifications: indexMods.map(m => ({
                line: m.line,
                instruction: m.instruction,
                operands: m.operands
            }))
        });
    });

    // Sort by confidence and number of accesses
    analysis.arrayAccesses.sort((a, b) => {
        if (a.confidence === 'high' && b.confidence !== 'high') return -1;
        if (a.confidence !== 'high' && b.confidence === 'high') return 1;
        return b.elementCount - a.elementCount;
    });
}

function trackRegisterState(analysis) {
    /**
     * Track register contents symbolically through each instruction
     * Shows what each register contains in terms of expressions
     */

    // Initialize register state with function parameters
    const state = {};

    // Get base register name (e.g., 'rax' from 'eax', 'ax', 'al')
    function getBaseReg(reg) {
        const regLower = reg.toLowerCase().replace('%', '');
        const regInfo = REGISTERS[regLower];
        if (regInfo && regInfo.parent) {
            return regInfo.parent;
        }
        return regLower;
    }

    // Initialize argument registers
    const argRegs = {
        'rdi': 'arg1',
        'rsi': 'arg2',
        'rdx': 'arg3',
        'rcx': 'arg4',
        'r8': 'arg5',
        'r9': 'arg6'
    };

    Object.keys(argRegs).forEach(reg => {
        state[reg] = { value: argRegs[reg], type: 'parameter' };
    });

    // Initialize return register as undefined
    state['rax'] = { value: '<undefined>', type: 'undefined' };

    // Storage for state at each line
    analysis.registerStates = [];

    // Process each instruction
    analysis.instructions.forEach((inst, idx) => {
        const before = JSON.parse(JSON.stringify(state)); // Deep copy
        const changed = [];

        const instName = inst.instruction.toLowerCase();
        const operands = inst.operands || [];

        // Simulate instruction effect on registers
        if (operands.length === 0) {
            // No operands (e.g., ret, nop)
            if (instName === 'ret' || instName === 'retq') {
                // ret doesn't change register values (except RIP, RSP which we don't track)
            }
        } else if (operands.length === 1) {
            // Single operand (e.g., push, pop, inc, dec, neg)
            const op = operands[0].replace('%', '');
            const baseReg = getBaseReg(op);

            if (!op.includes('(') && !op.includes('$')) {
                // It's a register
                if (instName.startsWith('inc')) {
                    const oldValue = state[baseReg] ? state[baseReg].value : '<undefined>';
                    state[baseReg] = { value: `${oldValue} + 1`, type: 'expression' };
                    changed.push(baseReg);
                } else if (instName.startsWith('dec')) {
                    const oldValue = state[baseReg] ? state[baseReg].value : '<undefined>';
                    state[baseReg] = { value: `${oldValue} - 1`, type: 'expression' };
                    changed.push(baseReg);
                } else if (instName.startsWith('neg')) {
                    const oldValue = state[baseReg] ? state[baseReg].value : '<undefined>';
                    state[baseReg] = { value: `-${oldValue}`, type: 'expression' };
                    changed.push(baseReg);
                }
            }
        } else if (operands.length >= 2) {
            // Two operands: source, dest (AT&T syntax)
            const srcOp = operands[0];
            const destOp = operands[operands.length - 1];

            const destClean = destOp.replace('%', '');
            const isDestMem = destClean.includes('(');
            const isDestReg = !isDestMem && !destClean.includes('$');

            if (isDestReg) {
                const destReg = getBaseReg(destClean);
                const srcClean = srcOp.replace('%', '');

                // MOV instructions
                if (instName.startsWith('mov') && !instName.includes('z')) {
                    if (srcClean.includes('$')) {
                        // Immediate value
                        const imm = srcClean.replace('$', '');
                        state[destReg] = { value: imm, type: 'constant' };
                    } else if (srcClean.includes('(')) {
                        // Memory read
                        const expr = parseMemoryOperand(srcClean, state);
                        state[destReg] = { value: `*${expr}`, type: 'memory_read' };
                    } else {
                        // Register to register
                        const srcReg = getBaseReg(srcClean);
                        const srcValue = state[srcReg] ? state[srcReg].value : '<undefined>';
                        state[destReg] = { value: srcValue, type: 'copy' };
                    }
                    changed.push(destReg);
                }
                // MOVZX (zero extend)
                else if (instName.includes('movz')) {
                    const srcReg = getBaseReg(srcClean);
                    const srcValue = state[srcReg] ? state[srcReg].value : srcClean;
                    state[destReg] = { value: `zero_extend(${srcValue})`, type: 'zero_extend' };
                    changed.push(destReg);
                }
                // LEA (load effective address)
                else if (instName.startsWith('lea')) {
                    const expr = parseMemoryOperand(srcClean, state);
                    state[destReg] = { value: `&${expr}`, type: 'address' };
                    changed.push(destReg);
                }
                // Arithmetic: ADD
                else if (instName.startsWith('add')) {
                    const destValue = state[destReg] ? state[destReg].value : destClean;
                    if (srcClean.includes('$')) {
                        const imm = srcClean.replace('$', '');
                        state[destReg] = { value: `${destValue} + ${imm}`, type: 'expression' };
                    } else {
                        const srcReg = getBaseReg(srcClean);
                        const srcValue = state[srcReg] ? state[srcReg].value : srcClean;
                        state[destReg] = { value: `${destValue} + ${srcValue}`, type: 'expression' };
                    }
                    changed.push(destReg);
                }
                // Arithmetic: SUB
                else if (instName.startsWith('sub')) {
                    const destValue = state[destReg] ? state[destReg].value : destClean;
                    if (srcClean.includes('$')) {
                        const imm = srcClean.replace('$', '');
                        state[destReg] = { value: `${destValue} - ${imm}`, type: 'expression' };
                    } else {
                        const srcReg = getBaseReg(srcClean);
                        const srcValue = state[srcReg] ? state[srcReg].value : srcClean;
                        state[destReg] = { value: `${destValue} - ${srcValue}`, type: 'expression' };
                    }
                    changed.push(destReg);
                }
                // Arithmetic: IMUL
                else if (instName.startsWith('imul')) {
                    const destValue = state[destReg] ? state[destReg].value : destClean;
                    if (srcClean.includes('$')) {
                        const imm = srcClean.replace('$', '');
                        state[destReg] = { value: `${destValue} * ${imm}`, type: 'expression' };
                    } else {
                        const srcReg = getBaseReg(srcClean);
                        const srcValue = state[srcReg] ? state[srcReg].value : srcClean;
                        state[destReg] = { value: `${destValue} * ${srcValue}`, type: 'expression' };
                    }
                    changed.push(destReg);
                }
                // XOR self (zero idiom)
                else if (instName.startsWith('xor')) {
                    const srcReg = getBaseReg(srcClean);
                    if (srcReg === destReg) {
                        state[destReg] = { value: '0', type: 'constant' };
                        changed.push(destReg);
                    }
                }
                // Shift left
                else if (instName.startsWith('shl') || instName.startsWith('sal')) {
                    const destValue = state[destReg] ? state[destReg].value : destClean;
                    if (srcClean.includes('$')) {
                        const imm = srcClean.replace('$', '');
                        state[destReg] = { value: `${destValue} << ${imm}`, type: 'expression' };
                    } else {
                        state[destReg] = { value: `${destValue} << ${srcClean}`, type: 'expression' };
                    }
                    changed.push(destReg);
                }
                // Shift right
                else if (instName.startsWith('shr') || instName.startsWith('sar')) {
                    const destValue = state[destReg] ? state[destReg].value : destClean;
                    if (srcClean.includes('$')) {
                        const imm = srcClean.replace('$', '');
                        state[destReg] = { value: `${destValue} >> ${imm}`, type: 'expression' };
                    } else {
                        state[destReg] = { value: `${destValue} >> ${srcClean}`, type: 'expression' };
                    }
                    changed.push(destReg);
                }
                // AND
                else if (instName.startsWith('and')) {
                    const destValue = state[destReg] ? state[destReg].value : destClean;
                    if (srcClean.includes('$')) {
                        const imm = srcClean.replace('$', '');
                        state[destReg] = { value: `${destValue} & ${imm}`, type: 'expression' };
                    } else {
                        const srcReg = getBaseReg(srcClean);
                        const srcValue = state[srcReg] ? state[srcReg].value : srcClean;
                        state[destReg] = { value: `${destValue} & ${srcValue}`, type: 'expression' };
                    }
                    changed.push(destReg);
                }
                // OR
                else if (instName.startsWith('or')) {
                    const destValue = state[destReg] ? state[destReg].value : destClean;
                    if (srcClean.includes('$')) {
                        const imm = srcClean.replace('$', '');
                        state[destReg] = { value: `${destValue} | ${imm}`, type: 'expression' };
                    } else {
                        const srcReg = getBaseReg(srcClean);
                        const srcValue = state[srcReg] ? state[srcReg].value : srcClean;
                        state[destReg] = { value: `${destValue} | ${srcValue}`, type: 'expression' };
                    }
                    changed.push(destReg);
                }
            }
        }

        // Store state for this line
        analysis.registerStates.push({
            line: inst.line,
            instruction: inst.rawLine || instName,
            before: before,
            after: JSON.parse(JSON.stringify(state)),
            changed: changed
        });
    });

    // Helper function to parse memory operands like (%rdi,%rsi) or 8(%rax)
    function parseMemoryOperand(memOp, state) {
        // Remove parentheses
        const inner = memOp.match(/\(([^)]+)\)/);
        if (!inner) return memOp;

        const parts = inner[1].split(',');

        if (parts.length === 1) {
            // Simple: (%rax) or 8(%rax)
            const baseReg = getBaseReg(parts[0]);
            const baseValue = state[baseReg] ? state[baseReg].value : parts[0];

            // Check for displacement
            const dispMatch = memOp.match(/(-?\d+)\(/);
            if (dispMatch) {
                const disp = dispMatch[1];
                return `(${baseValue} + ${disp})`;
            }
            return `(${baseValue})`;
        } else if (parts.length === 2) {
            // Two parts: base + index, or base + scale
            const baseReg = getBaseReg(parts[0]);
            const baseValue = state[baseReg] ? state[baseReg].value : parts[0];

            // Check if second part is a register or scale
            const secondPart = parts[1].replace('%', '');
            if (secondPart.match(/^[0-9]+$/)) {
                // It's a scale for index in base
                return `(${baseValue})`;
            } else {
                // It's an index register
                const indexReg = getBaseReg(secondPart);
                const indexValue = state[indexReg] ? state[indexReg].value : secondPart;
                return `(${baseValue} + ${indexValue})`;
            }
        } else if (parts.length === 3) {
            // Three parts: base, index, scale
            const baseReg = getBaseReg(parts[0]);
            const indexReg = getBaseReg(parts[1]);
            const scale = parts[2];

            const baseValue = state[baseReg] ? state[baseReg].value : parts[0];
            const indexValue = state[indexReg] ? state[indexReg].value : parts[1];

            if (scale === '1') {
                return `(${baseValue} + ${indexValue})`;
            } else {
                return `(${baseValue} + ${indexValue} * ${scale})`;
            }
        }

        return memOp;
    }
}

function detectLoops(analysis) {
    // Build address/label to line mapping
    const addressMap = new Map();
    const labelMap = new Map();

    // Map addresses and labels to line numbers
    analysis.instructions.forEach(inst => {
        if (inst.hasAddress) {
            addressMap.set(inst.address, inst.line);
        }
    });

    analysis.labels.forEach(label => {
        // Find the line where this label appears
        const labelLine = analysis.instructions.find(inst =>
            inst.rawLine && inst.rawLine.includes(label + ':')
        );
        if (labelLine) {
            labelMap.set(label, labelLine.line);
        }
    });

    // Detect backward jumps (potential loops)
    analysis.controlFlow.forEach(cf => {
        if (cf.instruction.startsWith('j') && cf.operands.length > 0) {
            const target = cf.operands[0];
            const sourceLine = cf.line;

            // Try to resolve target line
            let targetLine = null;

            // Check if target is a hex address
            const hexMatch = target.match(/^([0-9a-fA-F]+)/);
            if (hexMatch) {
                targetLine = addressMap.get(hexMatch[1]);
            }

            // Check if target is a label
            const labelMatch = target.match(/^([a-zA-Z0-9_.]+)/);
            if (labelMatch && !targetLine) {
                targetLine = labelMap.get(labelMatch[1]);
            }

            // If target line is before source line, it's a backward jump (loop)
            if (targetLine && targetLine < sourceLine) {
                analysis.loops.push({
                    type: 'backward_jump',
                    instruction: cf.instruction,
                    from: sourceLine,
                    to: targetLine,
                    target: target,
                    condition: cf.instruction === 'jmp' || cf.instruction === 'jmpq' ? 'unconditional' : 'conditional'
                });
            }
        }
    });
}

function parseInstruction(line) {
    // Extract and preserve comments (support both # and // styles)
    let comment = null;
    const originalLine = line;

    // Find comment start position (handle both # and //)
    let commentStart = -1;
    let commentChar = '';

    // Check for # comment
    const hashPos = line.indexOf('#');
    // Check for // comment
    const slashPos = line.indexOf('//');

    // Determine which comment style appears first
    if (hashPos !== -1 && (slashPos === -1 || hashPos < slashPos)) {
        commentStart = hashPos;
        commentChar = '#';
    } else if (slashPos !== -1) {
        commentStart = slashPos;
        commentChar = '//';
    }

    // Extract comment if found
    if (commentStart !== -1) {
        comment = line.substring(commentStart + commentChar.length).trim();
        line = line.substring(0, commentStart).trim();
    }

    // Also handle semicolon comments (less common but valid)
    const semicolonPos = line.indexOf(';');
    if (semicolonPos !== -1) {
        if (!comment) {
            comment = line.substring(semicolonPos + 1).trim();
        }
        line = line.substring(0, semicolonPos).trim();
    }

    if (!line) return null;

    // Skip directives
    if (line.startsWith('.')) return null;

    // Skip standalone labels
    if (line.endsWith(':') && !line.includes('\t') && !line.includes(' ')) return null;

    // Handle format: "  40:        pushq   %rax" (address: instruction operands)
    let address = null;
    let hasAddress = false;

    // Check for hex address at start (like "40:" or "0:")
    const addressMatch = line.match(/^\s*([0-9a-fA-F]+):\s+(.+)$/);
    if (addressMatch) {
        address = addressMatch[1];
        line = addressMatch[2];
        hasAddress = true;
    }

    // Remove label if it's on the same line as instruction
    if (line.includes(':')) {
        const colonIndex = line.indexOf(':');
        // Only remove if there's content after the colon
        if (colonIndex < line.length - 1) {
            line = line.substring(colonIndex + 1).trim();
        } else {
            return null; // Just a label, no instruction
        }
    }

    // Extract instruction and operands
    const parts = line.split(/\s+/);
    const instruction = parts[0].toLowerCase();

    // Smart operand splitting - don't split commas inside parentheses
    const operandString = parts.slice(1).join(' ');
    const operands = [];
    let current = '';
    let parenDepth = 0;

    for (let i = 0; i < operandString.length; i++) {
        const char = operandString[i];
        if (char === '(') parenDepth++;
        else if (char === ')') parenDepth--;

        if (char === ',' && parenDepth === 0) {
            operands.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    if (current.trim()) operands.push(current.trim());

    const instInfo = INSTRUCTIONS[instruction];
    if (!instInfo) return null;

    // Find all registers in operands
    const registers = [];
    const memoryPattern = /[(\[]([^)\]]+)[)\]]/g;
    let hasMemoryOperand = false;

    operands.forEach(op => {
        // Check for memory operand
        if (op.includes('(') || op.includes('[')) {
            hasMemoryOperand = true;
            const matches = [...op.matchAll(memoryPattern)];
            matches.forEach(match => {
                const regs = match[1].split(/[+\-*/]/);
                regs.forEach(r => {
                    const reg = r.trim().replace('%', '');
                    if (REGISTERS[reg]) registers.push(reg);
                });
            });
        }

        // Direct register reference
        const reg = op.replace('%', '').replace('$', '');
        if (REGISTERS[reg]) {
            registers.push(reg);
        }
    });

    return {
        instruction,
        operands,
        registers,
        category: instInfo.category,
        description: instInfo.desc,
        hasMemoryOperand,
        hasAddress,
        address,
        rawLine: line,
        comment: comment // Preserve the comment
    };
}

function getDynamicDescription(parsed) {
    const inst = parsed.instruction;
    const ops = parsed.operands;
    const baseDesc = parsed.description;

    // If no operands, return base description
    if (ops.length === 0) return baseDesc;

    // Get operands with AT&T syntax (already have %)
    const src = ops.length > 1 ? ops[0] : ops[0];
    const dest = ops.length > 1 ? ops[1] : ops[0];

    // Generate dynamic descriptions based on instruction patterns

    // MOV instructions
    if (inst.startsWith('mov') && !inst.startsWith('movs') && !inst.startsWith('movz')) {
        if (ops.length === 2) {
            return `Move ${src} to ${dest}. Result: ${dest} = ${src}. ${baseDesc.includes('Zero-extends') ? 'Zero-extends to 64 bits if 32-bit destination.' : ''}`;
        }
    }

    // LEA instructions
    if (inst.startsWith('lea')) {
        if (ops.length === 2) {
            return `Load effective address of ${src} into ${dest}. ${dest} = address(${src}). No memory access, just address calculation.`;
        }
    }

    // Arithmetic: ADD, SUB
    if (inst.startsWith('add')) {
        if (ops.length === 2) {
            return `Add ${src} to ${dest}. Result: ${dest} = ${dest} + ${src}. Sets flags (ZF, SF, CF, OF).`;
        }
    }
    if (inst.startsWith('sub')) {
        if (ops.length === 2) {
            return `Subtract ${src} from ${dest}. Result: ${dest} = ${dest} - ${src}. Sets flags (ZF, SF, CF, OF).`;
        }
    }

    // IMUL
    if (inst.startsWith('imul')) {
        if (ops.length === 2) {
            return `Signed multiply ${dest} by ${src}. Result: ${dest} = ${dest} * ${src}. Sets CF/OF if result doesn't fit.`;
        } else if (ops.length === 1) {
            return `Signed multiply RAX by ${src}. Result in RDX:RAX (128-bit). High bits → RDX, low bits → RAX.`;
        }
    }

    // INC/DEC
    if (inst.startsWith('inc')) {
        return `Increment ${dest} by 1. Result: ${dest} = ${dest} + 1. CF unchanged.`;
    }
    if (inst.startsWith('dec')) {
        return `Decrement ${dest} by 1. Result: ${dest} = ${dest} - 1. CF unchanged.`;
    }

    // Logical operations
    if (inst.startsWith('and')) {
        if (ops.length === 2) {
            return `Bitwise AND ${src} with ${dest}. Result: ${dest} = ${dest} & ${src}. 1-bits only where both have 1-bits.`;
        }
    }
    if (inst.startsWith('or')) {
        if (ops.length === 2) {
            return `Bitwise OR ${src} with ${dest}. Result: ${dest} = ${dest} | ${src}. 1-bits where either has 1-bits.`;
        }
    }
    if (inst.startsWith('xor')) {
        if (ops.length === 2) {
            if (src === dest) {
                return `Bitwise XOR ${dest} with itself. Result: ${dest} = 0. Common idiom to zero register efficiently.`;
            }
            return `Bitwise XOR ${src} with ${dest}. Result: ${dest} = ${dest} ^ ${src}. 1-bits where bits differ.`;
        }
    }
    if (inst.startsWith('not')) {
        return `Bitwise NOT ${dest}. Result: ${dest} = ~${dest}. Inverts all bits (0→1, 1→0).`;
    }

    // Shifts
    if (inst.startsWith('shl') || inst.startsWith('sal')) {
        if (ops.length === 2) {
            return `Shift ${dest} left by ${src} bits. Result: ${dest} = ${dest} << ${src}. Zeros fill from right. Equivalent to multiply by 2^${src}.`;
        }
    }
    if (inst.startsWith('shr')) {
        if (ops.length === 2) {
            return `Shift ${dest} right by ${src} bits (logical). Result: ${dest} = ${dest} >> ${src}. Zeros fill from left. Unsigned divide by 2^${src}.`;
        }
    }
    if (inst.startsWith('sar')) {
        if (ops.length === 2) {
            return `Shift ${dest} right by ${src} bits (arithmetic). Result: ${dest} = ${dest} >> ${src}. Sign bit fills from left. Signed divide by 2^${src}.`;
        }
    }

    // Comparison
    if (inst.startsWith('cmp')) {
        if (ops.length === 2) {
            return `Compare ${dest} with ${src}. Computes ${dest} - ${src}, sets flags. ${dest} unchanged. Use before conditional jump.`;
        }
    }
    if (inst.startsWith('test')) {
        if (ops.length === 2) {
            if (src === dest) {
                return `Test if ${dest} is zero. Computes ${dest} & ${dest}, sets ZF if zero. ${dest} unchanged.`;
            }
            return `Test ${dest} against ${src}. Computes ${dest} & ${src}, sets flags. Both operands unchanged.`;
        }
    }

    // Stack operations
    if (inst.startsWith('push')) {
        return `Push ${src} onto stack. RSP -= 8, [RSP] = ${src}. Stack grows downward.`;
    }
    if (inst.startsWith('pop')) {
        return `Pop from stack into ${dest}. ${dest} = [RSP], RSP += 8. Reads from stack top.`;
    }

    // Control flow
    if (inst.startsWith('call')) {
        return `Call ${src}. Push return address onto stack, jump to ${src}. RSP -= 8, [RSP] = next_instruction, RIP = ${src}.`;
    }
    if (inst === 'jmp' || inst === 'jmpq') {
        return `Unconditional jump to ${src}. RIP = ${src}. Always transfers control.`;
    }

    // Conditional jumps - add target info
    if (inst.startsWith('j') && inst !== 'jmp' && inst !== 'jmpq') {
        const target = ops[0];
        const condition = baseDesc.split('.')[0]; // Get condition part
        return `${condition}. Jump to ${target} if condition met. ${baseDesc.split('.').slice(1).join('.')}`;
    }

    // Conditional moves
    if (inst.startsWith('cmov')) {
        if (ops.length === 2) {
            const condition = baseDesc.split('.')[0];
            return `${condition}: ${dest} = ${src}, else ${dest} unchanged. Branchless conditional assignment.`;
        }
    }

    // Default: return base description
    return baseDesc;
}

function estimateInstructionSize(parsed) {
    /**
     * Improved x86-64 instruction size estimation
     * Target accuracy: 85-90% (improved from 70-75%)
     */
    let size = 1; // Base opcode byte

    const inst = parsed.instruction.toLowerCase();
    const ops = parsed.operands || [];

    // 1. Multi-byte opcodes (2-byte opcode with 0F prefix)
    const twoByteOpcodes = [
        'movzx', 'movsx', 'movzw', 'movzwl', 'movzbl', 'movsbl', 'movswl', 'movsbq', 'movzbq',
        'cmove', 'cmovne', 'cmovg', 'cmovge', 'cmovl', 'cmovle', 'cmova', 'cmovae', 'cmovb', 'cmovbe',
        'sete', 'setne', 'setg', 'setge', 'setl', 'setle', 'seta', 'setae', 'setb', 'setbe',
        'imul' // 3-operand imul uses 0F prefix
    ];

    if (twoByteOpcodes.some(prefix => inst.includes(prefix))) {
        size += 1; // 0F prefix
    }

    // 2. Operand size prefix (66h) for 16-bit operations
    if (inst.endsWith('w') && !inst.includes('mov')) {
        size += 1; // 66 prefix for 16-bit operand size
    }

    // 3. REX prefix for 64-bit operations or r8-r15 registers
    const needs64Bit = inst.endsWith('q') ||
                      parsed.registers.some(r => {
                          const cleanReg = r.replace('%', '');
                          return REGISTERS[cleanReg] && REGISTERS[cleanReg].size === 64;
                      });

    const usesExtendedRegs = parsed.registers.some(r => {
        const cleanReg = r.replace('%', '');
        return cleanReg.match(/^r(8|9|1[0-5])/); // r8-r15
    });

    if (needs64Bit || usesExtendedRegs) {
        size += 1; // REX prefix
    }

    // 4. ModR/M byte (needed for most instructions with operands)
    if (ops.length > 0 && inst !== 'ret' && inst !== 'retq' &&
        inst !== 'leave' && !inst.startsWith('j') && inst !== 'call' && inst !== 'callq') {
        size += 1; // ModR/M byte
    }

    // 5. SIB byte (for indexed/scaled addressing)
    if (parsed.hasMemoryOperand) {
        // Check for SIB patterns: (base,index,scale) or (base,index)
        const hasSIB = ops.some(op => {
            // Patterns: (%rsp), (%r12), or any (base,index) combination
            if (op.match(/\(%r(sp|12)\)/)) return true; // RSP/R12 always need SIB
            if (op.match(/\([^,)]+,[^)]+\)/)) return true; // Has comma = indexed
            return false;
        });

        if (hasSIB) {
            size += 1; // SIB byte
        }

        // 6. Displacement size (0, 1, or 4 bytes)
        let hasDisplacement = false;
        let displacementSize = 0;

        ops.forEach(op => {
            if (op.includes('(')) {
                // Extract displacement: N(%reg) or (%reg,%reg,N)
                const match = op.match(/(-?\d+)\(/);
                if (match) {
                    const disp = parseInt(match[1]);
                    if (disp !== 0) {
                        hasDisplacement = true;
                        // Displacement is 1 byte if in range [-128, 127], else 4 bytes
                        displacementSize = Math.max(displacementSize,
                            (Math.abs(disp) < 128) ? 1 : 4);
                    }
                } else if (op.match(/\([^)]+\)/) && !op.startsWith('(')) {
                    // Has parentheses but no displacement number = disp8 might be needed
                    // For (%rbp) or (%r13), a disp8 of 0 is encoded
                    if (op.match(/\(%(rbp|r13|ebp)\)/)) {
                        hasDisplacement = true;
                        displacementSize = Math.max(displacementSize, 1);
                    }
                }
            }
        });

        size += displacementSize;
    }

    // 7. Immediate operands
    const immOp = ops.find(op => op.includes('$'));
    if (immOp) {
        const immStr = immOp.replace('$', '').replace(/[^0-9-]/g, '');
        const immValue = parseInt(immStr) || 0;

        // Determine immediate size based on instruction and value
        if (inst.includes('mov') && inst.endsWith('q')) {
            // 64-bit mov can use 4-byte immediate (sign-extended)
            size += 4;
        } else if (Math.abs(immValue) <= 127) {
            size += 1; // imm8
        } else if (Math.abs(immValue) <= 32767) {
            size += 2; // imm16
        } else {
            size += 4; // imm32
        }
    }

    // 8. Special cases for specific instructions

    // RET/RETQ/RETN - just opcode
    if (inst === 'ret' || inst === 'retq' || inst === 'retn') {
        return 1;
    }

    // LEAVE - just opcode
    if (inst === 'leave') {
        return 1;
    }

    // Short jumps (conditional jumps are often 2 bytes: opcode + rel8)
    if (inst.startsWith('j') && inst !== 'jmp' && inst !== 'jmpq') {
        return 2; // opcode + rel8 for short jump
    }

    // JMP can be short (2 bytes) or near (5 bytes), assume short
    if (inst === 'jmp' || inst === 'jmpq') {
        return 2; // Usually encoded as short jump
    }

    // CALL is typically 5 bytes (opcode + rel32)
    if (inst === 'call' || inst === 'callq') {
        return 5;
    }

    // NOP is 1 byte
    if (inst === 'nop') {
        return 1;
    }

    return size;
}

function generateRegisterVisual(instruction, operands, registers) {
    /**
     * Generate ASCII-art style visual representation of register operations
     */
    if (!operands || operands.length === 0) return '';

    const inst = instruction.toLowerCase();

    // For LEA - special address calculation visualization
    if (inst.startsWith('lea')) {
        if (operands.length >= 2) {
            const src = operands[0];
            const dest = operands[operands.length - 1];

            // Parse the address calculation
            let addressCalc = '';
            let example = '';
            let baseReg = '';
            let indexReg = '';

            // Match patterns like: offset(%base,%index,scale)
            const memMatch = src.match(/(-?\d*)\((%[a-z0-9]+)(?:,(%[a-z0-9]+)(?:,(\d+))?)?\)/);

            if (memMatch) {
                const [, offset, base, index, scale] = memMatch;
                const off = offset && offset !== '' ? parseInt(offset) : 0;
                const sc = scale ? parseInt(scale) : 1;

                // Store for template literal use
                baseReg = base || '';
                indexReg = index || '';

                // Build readable formula
                let parts = [];
                if (base) parts.push(base);
                if (index) {
                    if (sc > 1) parts.push(`${index}×${sc}`);
                    else parts.push(index);
                }
                if (off > 0) parts.push(`+${off}`);
                else if (off < 0) parts.push(`${off}`);

                addressCalc = parts.join(' ');

                // Generate example with hex addresses
                let exampleParts = [];
                if (base) exampleParts.push('0x7fff8000');
                if (index) {
                    if (sc > 1) exampleParts.push(`+ (5 × ${sc})`);
                    else exampleParts.push('+ 5');
                }
                if (off !== 0) {
                    const offHex = Math.abs(off).toString(16);
                    exampleParts.push(`${off > 0 ? '+ ' : '- '}0x${offHex}`);
                }

                const baseAddr = 0x7fff8000;
                const indexVal = index ? 5 * sc : 0;
                const result = baseAddr + indexVal + off;

                if (!isNaN(result)) {
                    example = `${exampleParts.join(' ')} = 0x${result.toString(16)}`;
                }
            }

            return `
            <div class="register-visual" style="font-family: monospace; background: rgba(255,193,7,0.08); padding: 12px; margin: 5px 0; border-left: 4px solid #e5c07b; border-radius: 4px;">
                <div style="color: #e5c07b; font-weight: bold; font-size: 0.9em; margin-bottom: 8px;">📍 Address Calculation (LEA):</div>
                <div style="background: #1a1f2e; padding: 10px; border-radius: 4px; margin-bottom: 8px;">
                    <div style="color: #9aa5b1; font-size: 0.85em; margin-bottom: 4px;">Formula:</div>
                    <div style="color: #e5c07b; font-weight: bold;">${addressCalc || src}</div>
                </div>
                <div style="display: flex; align-items: center; color: #aabbcc;">
                    <span style="color: #888;">Result:</span>
                    <span style="margin: 0 8px; color: #e5c07b;">→</span>
                    <span class="highlight" style="padding: 3px 8px; background: #4CAF50; font-weight: bold;">${dest}</span>
                </div>
                ${example ? `
                <div style="background: rgba(78,201,176,0.08); padding: 8px; border-radius: 4px; margin-top: 8px; border-left: 2px solid #4ec9b0;">
                    <div style="color: #4ec9b0; font-size: 0.85em; margin-bottom: 4px;">Example (if ${baseReg || 'base'} = 0x7fff8000${indexReg ? `, ${indexReg} = 5` : ''}):</div>
                    <div style="color: #aabbcc; font-family: monospace; font-size: 0.9em;">${example}</div>
                </div>` : ''}
            </div>`;
        }
    }

    // For MOV instructions
    if (inst.startsWith('mov') && !inst.startsWith('movz') && !inst.startsWith('movs')) {
        if (operands.length >= 2) {
            const src = operands[0];
            const dest = operands[operands.length - 1];

            // Check if it's a memory operation
            const isMemoryLoad = src.includes('(') && src.includes(')');
            const isMemoryStore = dest.includes('(') && dest.includes(')');

            if (isMemoryLoad) {
                return `
                <div class="register-visual" style="font-family: monospace; background: rgba(156,39,176,0.08); padding: 10px; margin: 5px 0; border-left: 3px solid #c678dd;">
                    <div style="color: #c678dd; font-size: 0.9em;">📥 Memory Load:</div>
                    <div style="display: flex; align-items: center; margin-top: 5px; color: #aabbcc;">
                        <span style="color: #c678dd;">*</span>
                        <span class="highlight" style="padding: 2px 6px;">${src}</span>
                        <span style="margin: 0 10px; color: #c678dd;">→</span>
                        <span class="highlight" style="padding: 2px 6px; background: #4CAF50;">${dest}</span>
                    </div>
                    <div style="margin-top: 6px; font-size: 0.85em; color: #888;">Dereference address in ${src}, load value into ${dest}</div>
                </div>`;
            } else if (isMemoryStore) {
                return `
                <div class="register-visual" style="font-family: monospace; background: rgba(156,39,176,0.08); padding: 10px; margin: 5px 0; border-left: 3px solid #c678dd;">
                    <div style="color: #c678dd; font-size: 0.9em;">📤 Memory Store:</div>
                    <div style="display: flex; align-items: center; margin-top: 5px; color: #aabbcc;">
                        <span class="highlight" style="padding: 2px 6px;">${src}</span>
                        <span style="margin: 0 10px; color: #c678dd;">→</span>
                        <span style="color: #c678dd;">*</span>
                        <span class="highlight" style="padding: 2px 6px; background: #ff9800;">${dest}</span>
                    </div>
                    <div style="margin-top: 6px; font-size: 0.85em; color: #888;">Store ${src} to memory at address ${dest}</div>
                </div>`;
            } else {
                return `
                <div class="register-visual" style="font-family: monospace; background: rgba(100,150,200,0.1); padding: 10px; margin: 5px 0; border-left: 3px solid #6495ed;">
                    <div style="color: #88bbff; font-size: 0.9em;">Register Transfer:</div>
                    <div style="display: flex; align-items: center; margin-top: 5px; color: #aabbcc;">
                        <span class="highlight" style="padding: 2px 6px;">${src}</span>
                        <span style="margin: 0 10px; color: #6495ed;">→</span>
                        <span class="highlight" style="padding: 2px 6px; background: #4CAF50;">${dest}</span>
                    </div>
                </div>`;
            }
        }
    }

    // For arithmetic operations
    if (inst.startsWith('add') || inst.startsWith('sub') || inst.startsWith('imul') ||
        inst.startsWith('and') || inst.startsWith('or') || inst.startsWith('xor')) {
        if (operands.length >= 2) {
            const src = operands[0];
            const dest = operands[operands.length - 1];
            let op = '?';
            if (inst.startsWith('add')) op = '+';
            else if (inst.startsWith('sub')) op = '-';
            else if (inst.startsWith('imul') || inst.startsWith('mul')) op = '×';
            else if (inst.startsWith('and')) op = '&';
            else if (inst.startsWith('or')) op = '|';
            else if (inst.startsWith('xor')) op = '^';

            // Special case: XOR self (zeroing)
            if (inst.startsWith('xor') && src.replace('%', '') === dest.replace('%', '')) {
                return `
                <div class="register-visual" style="font-family: monospace; background: rgba(255,193,7,0.1); padding: 10px; margin: 5px 0; border-left: 3px solid #FFC107;">
                    <div style="color: #ffcc44; font-size: 0.9em;">Zero Idiom:</div>
                    <div style="display: flex; align-items: center; margin-top: 5px; color: #aabbcc;">
                        <span class="highlight" style="padding: 2px 6px;">${dest}</span>
                        <span style="margin: 0 10px; color: #FFC107;">⊕</span>
                        <span class="highlight" style="padding: 2px 6px;">${dest}</span>
                        <span style="margin: 0 10px; color: #FFC107;">=</span>
                        <span style="padding: 2px 6px; background: #FFC107; color: #000;">0x00000000</span>
                    </div>
                </div>`;
            }

            return `
            <div class="register-visual" style="font-family: monospace; background: rgba(255,152,0,0.1); padding: 10px; margin: 5px 0; border-left: 3px solid #ff9800;">
                <div style="color: #ffaa44; font-size: 0.9em;">Arithmetic Operation:</div>
                <div style="display: flex; align-items: center; margin-top: 5px; color: #aabbcc;">
                    <span class="highlight" style="padding: 2px 6px;">${dest}</span>
                    <span style="margin: 0 10px; color: #ff9800;">${op}=</span>
                    <span class="highlight" style="padding: 2px 6px;">${src}</span>
                    <span style="margin: 0 10px; color: #666;">→</span>
                    <span class="highlight" style="padding: 2px 6px; background: #ff9800;">${dest}</span>
                </div>
            </div>`;
        }
    }

    // For shift operations
    if (inst.startsWith('shl') || inst.startsWith('shr') || inst.startsWith('sal') || inst.startsWith('sar')) {
        if (operands.length >= 2) {
            const amount = operands[0];
            const dest = operands[operands.length - 1];
            const direction = (inst.includes('shl') || inst.includes('sal')) ? '<<' : '>>';
            return `
            <div class="register-visual" style="font-family: monospace; background: rgba(156,39,176,0.1); padding: 10px; margin: 5px 0; border-left: 3px solid #9c27b0;">
                <div style="color: #bb66cc; font-size: 0.9em;">Shift Operation:</div>
                <div style="display: flex; align-items: center; margin-top: 5px; color: #aabbcc;">
                    <span class="highlight" style="padding: 2px 6px;">${dest}</span>
                    <span style="margin: 0 10px; color: #9c27b0;">${direction}</span>
                    <span style="padding: 2px 6px;">${amount}</span>
                    <span style="margin: 0 10px; color: #666;">→</span>
                    <span class="highlight" style="padding: 2px 6px; background: #9c27b0;">${dest}</span>
                </div>
            </div>`;
        }
    }

    // For comparison operations
    if (inst.startsWith('cmp') || inst.startsWith('test')) {
        if (operands.length >= 2) {
            const src = operands[0];
            const dest = operands[operands.length - 1];
            return `
            <div class="register-visual" style="font-family: monospace; background: rgba(33,150,243,0.1); padding: 10px; margin: 5px 0; border-left: 3px solid #2196F3;">
                <div style="color: #66bbff; font-size: 0.9em;">Comparison (Sets Flags):</div>
                <div style="display: flex; align-items: center; margin-top: 5px; color: #aabbcc;">
                    <span class="highlight" style="padding: 2px 6px;">${dest}</span>
                    <span style="margin: 0 10px; color: #2196F3;">⚖</span>
                    <span class="highlight" style="padding: 2px 6px;">${src}</span>
                    <span style="margin: 0 10px; color: #666;">→</span>
                    <span style="padding: 2px 6px; background: #2196F3;">FLAGS</span>
                </div>
            </div>`;
        }
    }

    return '';
}

function displayAnalysis(analysis) {
    const panel = document.getElementById('analysisPanel');

    let html = '<div class="panel-header">Analysis Results</div>';

    // Overview
    html += `
    <div class="analysis-section">
        <div class="section-title"><i class="fas fa-chart-bar"></i> Overview</div>
        <div class="info-grid">
            <div class="info-card">
                <div class="info-label">Total Instructions</div>
                <div class="info-value">${analysis.instructions.length}</div>
            </div>
            <div class="info-card">
                <div class="info-label">Registers Used</div>
                <div class="info-value">${analysis.registers.size}</div>
            </div>
            <div class="info-card">
                <div class="info-label">Estimated Size</div>
                <div class="info-value">${analysis.totalBytes} bytes</div>
            </div>
            <div class="info-card">
                <div class="info-label">Memory Operations</div>
                <div class="info-value">${analysis.memoryOps.length}</div>
            </div>
            <div class="info-card">
                <div class="info-label">Control Flow</div>
                <div class="info-value">${analysis.controlFlow.length}</div>
            </div>
        </div>
    </div>`;

    // Labels - moved to top for better visibility
    if (analysis.labels.length > 0) {
        // Categorize labels
        const functionLabels = analysis.labels.filter(l => !l.startsWith('.'));
        const localLabels = analysis.labels.filter(l => l.startsWith('.L'));
        const dataLabels = analysis.labels.filter(l => l.startsWith('.') && !l.startsWith('.L'));

        html += `
        <div class="analysis-section">
            <div class="section-title"><i class="fas fa-tags"></i> Labels Found (${analysis.labels.length} total)</div>`;

        if (functionLabels.length > 0) {
            html += `<div style="margin-bottom: 15px;"><strong style="color: #e5c07b;">Function Labels:</strong><div style="margin-top: 8px;">`;

            functionLabels.forEach(label => {
                const demangled = demangleCppName(label);
                if (demangled) {
                    html += `
                    <div style="background: rgba(0,0,0,0.3); padding: 10px; margin-bottom: 8px; border-radius: 4px; border-left: 3px solid #4CAF50;">
                        <div style="color: #4ec9b0; font-family: monospace; font-weight: bold; margin-bottom: 5px;">
                            ${demangled}
                        </div>
                        <div style="color: #888; font-size: 0.85em; font-family: monospace;">
                            Mangled: ${label}
                        </div>
                    </div>`;
                } else {
                    html += `<span class="label" style="margin-right: 8px; margin-bottom: 8px; display: inline-block;">${label}</span>`;
                }
            });

            html += `</div></div>`;
        }

        if (localLabels.length > 0) {
            html += `<p style="color: #aabbcc; margin-bottom: 8px;"><strong>Local Labels:</strong> ${localLabels.map(l => `<span class="label">${l}</span>`).join(', ')}</p>`;
        }

        if (dataLabels.length > 0) {
            html += `<p style="color: #aabbcc;"><strong>Data Labels:</strong> ${dataLabels.map(l => `<span class="label">${l}</span>`).join(', ')}</p>`;
        }

        html += `</div>`;
    }

    // Registers - Show used registers first (highlighted in green), with option to expand
    html += `
    <div class="analysis-section">
        <div class="section-title"><i class="fas fa-microchip"></i> Registers Analysis (AT&T Syntax)</div>`;

    // Define ALL register families with all size variants
    const registerFamilies = [
        { base: 'rax', variants: ['%rax (64-bit)', '%eax (32-bit)', '%ax (16-bit)', '%al (8-bit)', '%ah (8-bit high)'] },
        { base: 'rbx', variants: ['%rbx (64-bit)', '%ebx (32-bit)', '%bx (16-bit)', '%bl (8-bit)', '%bh (8-bit high)'] },
        { base: 'rcx', variants: ['%rcx (64-bit)', '%ecx (32-bit)', '%cx (16-bit)', '%cl (8-bit)', '%ch (8-bit high)'] },
        { base: 'rdx', variants: ['%rdx (64-bit)', '%edx (32-bit)', '%dx (16-bit)', '%dl (8-bit)', '%dh (8-bit high)'] },
        { base: 'rsi', variants: ['%rsi (64-bit)', '%esi (32-bit)', '%si (16-bit)', '%sil (8-bit)'] },
        { base: 'rdi', variants: ['%rdi (64-bit)', '%edi (32-bit)', '%di (16-bit)', '%dil (8-bit)'] },
        { base: 'rbp', variants: ['%rbp (64-bit)', '%ebp (32-bit)', '%bp (16-bit)', '%bpl (8-bit)'] },
        { base: 'rsp', variants: ['%rsp (64-bit)', '%esp (32-bit)', '%sp (16-bit)', '%spl (8-bit)'] },
        { base: 'r8', variants: ['%r8 (64-bit)', '%r8d (32-bit)', '%r8w (16-bit)', '%r8b (8-bit)'] },
        { base: 'r9', variants: ['%r9 (64-bit)', '%r9d (32-bit)', '%r9w (16-bit)', '%r9b (8-bit)'] },
        { base: 'r10', variants: ['%r10 (64-bit)', '%r10d (32-bit)', '%r10w (16-bit)', '%r10b (8-bit)'] },
        { base: 'r11', variants: ['%r11 (64-bit)', '%r11d (32-bit)', '%r11w (16-bit)', '%r11b (8-bit)'] },
        { base: 'r12', variants: ['%r12 (64-bit)', '%r12d (32-bit)', '%r12w (16-bit)', '%r12b (8-bit)'] },
        { base: 'r13', variants: ['%r13 (64-bit)', '%r13d (32-bit)', '%r13w (16-bit)', '%r13b (8-bit)'] },
        { base: 'r14', variants: ['%r14 (64-bit)', '%r14d (32-bit)', '%r14w (16-bit)', '%r14b (8-bit)'] },
        { base: 'r15', variants: ['%r15 (64-bit)', '%r15d (32-bit)', '%r15w (16-bit)', '%r15b (8-bit)'] },
    ];

    // Track which registers are actually used
    const usedRegs = new Set();
    analysis.registers.forEach(reg => {
        usedRegs.add(reg);
        const regInfo = REGISTERS[reg];
        if (regInfo && regInfo.parent) {
            usedRegs.add(regInfo.parent);
        }
    });

    // Separate used and unused registers
    const usedFamilies = [];
    const unusedFamilies = [];

    registerFamilies.forEach(family => {
        const isUsed = usedRegs.has(family.base) || family.variants.some(v => {
            const regName = v.split(' ')[0].substring(1);
            return usedRegs.has(regName);
        });

        if (isUsed) {
            usedFamilies.push(family);
        } else {
            unusedFamilies.push(family);
        }
    });

    // Show used registers (highlighted in green)
    html += `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px; margin-bottom: 15px;">`;

    usedFamilies.forEach(family => {
        const baseInfo = REGISTERS[family.base] || { purpose: 'General purpose' };

        html += `
        <div style="background: #2a4030; border: 2px solid #4ec9b0; border-radius: 8px; padding: 12px;">
            <div style="color: #4ec9b0; font-weight: bold; font-size: 16px; margin-bottom: 8px;">
                ${family.variants[0].split(' ')[0]} ✓
            </div>
            <div style="color: #9aa5b1; font-size: 12px; margin-bottom: 8px;">${baseInfo.purpose}</div>
            <div style="color: #aabbcc; font-size: 11px; line-height: 1.6;">
                ${family.variants.map(v => {
                    const regName = v.split(' ')[0].substring(1);
                    const inUse = usedRegs.has(regName);
                    return `<div style="color: ${inUse ? '#4ec9b0' : '#6a7b8c'}; font-weight: ${inUse ? 'bold' : 'normal'};">${inUse ? '→ ' : '  '}${v}</div>`;
                }).join('')}
            </div>
        </div>`;
    });

    html += `</div>`;

    // Show/hide button for unused registers
    if (unusedFamilies.length > 0) {
        html += `
        <button onclick="toggleUnusedRegisters()"
                style="background: #533483; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 13px; margin-bottom: 15px;">
            <span id="toggleRegIcon">▶</span> Show All Registers (${unusedFamilies.length} unused)
        </button>
        <div id="unusedRegisters" style="display: none;">
            <div style="color: #9aa5b1; font-size: 12px; margin-bottom: 10px;">Unused registers:</div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px;">`;

        unusedFamilies.forEach(family => {
            const baseInfo = REGISTERS[family.base] || { purpose: 'General purpose' };

            html += `
            <div style="background: #2a3040; border: 1px solid #3a4050; border-radius: 8px; padding: 12px; opacity: 0.6;">
                <div style="color: #888; font-weight: bold; font-size: 16px; margin-bottom: 8px;">
                    ${family.variants[0].split(' ')[0]}
                </div>
                <div style="color: #777; font-size: 12px; margin-bottom: 8px;">${baseInfo.purpose}</div>
                <div style="color: #666; font-size: 11px; line-height: 1.6;">
                    ${family.variants.map(v => `<div>${v}</div>`).join('')}
                </div>
            </div>`;
        });

        html += `</div></div>`;
    }

    html += `</div>`;

    // Argument Registers with Type Inference
    if (analysis.argumentRegisters.size > 0) {
        html += `
        <div class="analysis-section">
            <div class="section-title"><i class="fas fa-bullseye"></i> Function Arguments & Inferred Types</div>
            <p style="color: #aabbcc; margin-bottom: 10px;">These registers are used for passing arguments:</p>`;

        [...analysis.argumentRegisters].sort((a, b) => {
            const aNum = REGISTERS[a].argNum || 999;
            const bNum = REGISTERS[b].argNum || 999;
            return aNum - bNum;
        }).forEach(reg => {
            const info = REGISTERS[reg];
            const typeInfo = analysis.parameterTypes[reg];

            let typeDisplay = '';
            let confidenceColor = '#888';
            let confidenceIcon = '?';

            if (typeInfo) {
                const conf = typeInfo.confidence;
                confidenceColor = conf === 'high' ? '#4CAF50' : conf === 'medium' ? '#FFC107' : '#888';
                confidenceIcon = conf === 'high' ? '✓' : conf === 'medium' ? '~' : '?';

                const types = typeInfo.types.slice(0, 3); // Show max 3 types
                typeDisplay = types.join(', ');
                if (typeInfo.types.length > 3) {
                    typeDisplay += ', ...';
                }
            } else {
                typeDisplay = 'type unknown';
            }

            html += `
            <div class="register-item used" style="margin-bottom: 15px; padding: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <div class="register-name" style="font-size: 16px;">%${reg}</div>
                    <div class="register-type" style="background: rgba(233,69,96,0.2); padding: 4px 8px; border-radius: 4px;">Arg ${info.argNum}</div>
                </div>
                <div style="color: #aabbcc; font-size: 12px; margin-bottom: 6px;">${info.size}-bit register</div>
                <div style="background: rgba(0,0,0,0.3); padding: 8px; border-radius: 4px; border-left: 3px solid ${confidenceColor};">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                        <span style="color: ${confidenceColor}; font-weight: bold; font-size: 14px;">${confidenceIcon}</span>
                        <span style="color: ${confidenceColor}; font-size: 11px; text-transform: uppercase; font-weight: bold;">${typeInfo ? typeInfo.confidence : 'low'} confidence</span>
                    </div>
                    <div style="color: #ddd; font-size: 13px; font-family: 'Consolas', monospace;">
                        <strong>Likely type(s):</strong> ${typeDisplay}
                    </div>
                </div>`;

            // Show detailed patterns if available
            if (typeInfo && typeInfo.patterns.length > 0) {
                html += `
                <details style="margin-top: 8px;">
                    <summary style="color: #888; font-size: 11px; cursor: pointer; user-select: none;">Show usage patterns (${typeInfo.patterns.length})</summary>
                    <div style="margin-top: 6px; padding: 8px; background: rgba(0,0,0,0.2); border-radius: 4px; font-size: 11px;">`;

                typeInfo.patterns.slice(0, 5).forEach(pattern => {
                    const patternColor = pattern.confidence === 'high' ? '#4CAF50' : pattern.confidence === 'medium' ? '#FFC107' : '#888';
                    html += `
                        <div style="margin-bottom: 4px; padding: 4px; border-left: 2px solid ${patternColor}; padding-left: 8px;">
                            <span style="color: ${patternColor};">•</span> ${pattern.note}
                        </div>`;
                });

                if (typeInfo.patterns.length > 5) {
                    html += `<div style="color: #888; font-size: 10px; margin-top: 4px;">... and ${typeInfo.patterns.length - 5} more</div>`;
                }

                html += `
                    </div>
                </details>`;
            }

            html += `</div>`;
        });

        html += `</div>`;
    }

    // Return Value - Enhanced
    if (analysis.returnInfo.usesReturnRegister) {
        html += `
        <div class="analysis-section">
            <div class="section-title"><i class="fas fa-reply"></i> Return Value Analysis</div>`;

        if (analysis.returnInfo.returnsValue) {
            const confidence = analysis.returnInfo.confidence;
            const confidenceColor = confidence === 'high' ? '#4CAF50' : confidence === 'medium' ? '#FFC107' : '#FF9800';
            const confidenceIcon = confidence === 'high' ? '✓' : confidence === 'medium' ? '~' : '?';

            html += `
            <div style="margin-bottom: 10px;">
                <span style="color: ${confidenceColor}; font-weight: bold;">${confidenceIcon} Confidence: ${confidence.toUpperCase()}</span>
            </div>
            <p style="color: #aabbcc;">
                <span class="badge" style="background: #4CAF50;">Returns Value</span>
                Function likely returns a value in <span class="highlight">%${analysis.returnInfo.lastModificationBeforeRet ? analysis.returnInfo.lastModificationBeforeRet.register : 'rax/eax'}</span>
            </p>`;

            if (analysis.returnInfo.returnSize) {
                html += `<p style="color: #aabbcc;">Return size: <span class="highlight">${analysis.returnInfo.returnSize}</span></p>`;
            }

            // Display inferred return type
            if (analysis.returnInfo.returnType) {
                const retType = analysis.returnInfo.returnType;
                const typeConfColor = retType.confidence === 'high' ? '#4CAF50' : retType.confidence === 'medium' ? '#FFC107' : '#888';
                const typeConfIcon = retType.confidence === 'high' ? '✓' : retType.confidence === 'medium' ? '~' : '?';

                const types = retType.types.slice(0, 3);
                let typeDisplay = types.join(', ');
                if (retType.types.length > 3) {
                    typeDisplay += ', ...';
                }

                html += `
                <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 4px; margin-top: 10px; border-left: 3px solid ${typeConfColor};">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                        <span style="color: ${typeConfColor}; font-weight: bold; font-size: 14px;">${typeConfIcon}</span>
                        <span style="color: ${typeConfColor}; font-size: 11px; text-transform: uppercase; font-weight: bold;">${retType.confidence} confidence</span>
                    </div>
                    <div style="color: #ddd; font-size: 14px; font-family: 'Consolas', monospace;">
                        <strong>Likely return type(s):</strong> <span style="color: #4ec9b0;">${typeDisplay}</span>
                    </div>
                </div>`;
            }

            if (analysis.returnInfo.lastModificationBeforeRet) {
                const mod = analysis.returnInfo.lastModificationBeforeRet;

                // Generate visual for return value flow
                let returnVisual = '';
                if (mod.pattern === 'explicit_write') {
                    returnVisual = `
                    <div style="background: rgba(76,175,80,0.15); padding: 15px; margin-top: 10px; border-radius: 5px;">
                        <div style="color: #88ccaa; font-size: 0.9em; margin-bottom: 10px;">📊 Return Value Flow:</div>
                        <div style="display: flex; align-items: center; justify-content: center; font-family: monospace; color: #aabbcc;">
                            <div style="padding: 8px 15px; background: rgba(100,150,200,0.2); border: 2px solid #6495ed; border-radius: 5px;">
                                Computation
                            </div>
                            <div style="margin: 0 15px; color: #4CAF50; font-size: 1.5em;">→</div>
                            <div style="padding: 8px 15px; background: rgba(76,175,80,0.3); border: 2px solid #4CAF50; border-radius: 5px; font-weight: bold;">
                                %${mod.register}
                            </div>
                            <div style="margin: 0 15px; color: #4CAF50; font-size: 1.5em;">→</div>
                            <div style="padding: 8px 15px; background: rgba(76,175,80,0.4); border: 2px solid #4CAF50; border-radius: 5px; font-weight: bold;">
                                RETURN
                            </div>
                        </div>
                    </div>`;
                } else if (mod.pattern === 'xor_self') {
                    returnVisual = `
                    <div style="background: rgba(255,193,7,0.15); padding: 15px; margin-top: 10px; border-radius: 5px;">
                        <div style="color: #ffcc44; font-size: 0.9em; margin-bottom: 10px;">📊 Zero Return Pattern:</div>
                        <div style="display: flex; align-items: center; justify-content: center; font-family: monospace; color: #aabbcc;">
                            <div style="padding: 8px 15px; background: rgba(255,193,7,0.2); border: 2px solid #FFC107; border-radius: 5px;">
                                %${mod.register}
                            </div>
                            <div style="margin: 0 10px; color: #FFC107; font-size: 1.2em;">⊕</div>
                            <div style="padding: 8px 15px; background: rgba(255,193,7,0.2); border: 2px solid #FFC107; border-radius: 5px;">
                                %${mod.register}
                            </div>
                            <div style="margin: 0 15px; color: #FFC107; font-size: 1.5em;">=</div>
                            <div style="padding: 8px 15px; background: #FFC107; color: #000; border: 2px solid #FFC107; border-radius: 5px; font-weight: bold;">
                                0x00000000
                            </div>
                            <div style="margin: 0 15px; color: #FFC107; font-size: 1.5em;">→</div>
                            <div style="padding: 8px 15px; background: rgba(255,193,7,0.4); border: 2px solid #FFC107; border-radius: 5px; font-weight: bold;">
                                RETURN 0
                            </div>
                        </div>
                    </div>`;
                } else if (mod.pattern === 'function_call') {
                    returnVisual = `
                    <div style="background: rgba(33,150,243,0.15); padding: 15px; margin-top: 10px; border-radius: 5px;">
                        <div style="color: #66bbff; font-size: 0.9em; margin-bottom: 10px;">📊 Nested Call Return:</div>
                        <div style="display: flex; align-items: center; justify-content: center; font-family: monospace; color: #aabbcc;">
                            <div style="padding: 8px 15px; background: rgba(33,150,243,0.2); border: 2px solid #2196F3; border-radius: 5px;">
                                call func
                            </div>
                            <div style="margin: 0 15px; color: #2196F3; font-size: 1.5em;">→</div>
                            <div style="padding: 8px 15px; background: rgba(33,150,243,0.3); border: 2px solid #2196F3; border-radius: 5px; font-weight: bold;">
                                %rax
                            </div>
                            <div style="margin: 0 15px; color: #2196F3; font-size: 1.5em;">→</div>
                            <div style="padding: 8px 15px; background: rgba(33,150,243,0.4); border: 2px solid #2196F3; border-radius: 5px; font-weight: bold;">
                                PROPAGATE
                            </div>
                        </div>
                    </div>`;
                }

                html += `
                <div style="background: rgba(76,175,80,0.1); padding: 10px; border-left: 3px solid #4CAF50; margin-top: 10px;">
                    <div style="color: #88ccaa; font-weight: bold;">Last modification before return:</div>
                    <div style="color: #aabbcc; margin-top: 5px;">
                        Line ${mod.line}: <code style="color: #e8b339;">${mod.fullInstruction || mod.instruction}</code>
                    </div>
                    ${mod.note ? `<div style="color: #888; font-size: 0.9em; margin-top: 5px;">💡 ${mod.note}</div>` : ''}
                    ${mod.pattern === 'xor_self' ? '<div style="color: #FFC107; margin-top: 5px;">⚠️ XOR self pattern may indicate return 0 or void function</div>' : ''}
                    ${returnVisual}
                </div>`;
            }
        } else {
            html += `
            <p style="color: #aabbcc;">
                <span class="badge" style="background: #666;">No Return Value</span>
                Function appears to be void or return value not detected
            </p>
            <p style="color: #888; font-size: 0.9em;">
                Note: %rax/%eax may be used as temporary storage but not as return value
            </p>`;

            // Display void type for no-return functions
            if (analysis.returnInfo.returnType && analysis.returnInfo.returnType.types[0] === 'void') {
                html += `
                <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 4px; margin-top: 10px; border-left: 3px solid #4CAF50;">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                        <span style="color: #4CAF50; font-weight: bold; font-size: 14px;">✓</span>
                        <span style="color: #4CAF50; font-size: 11px; text-transform: uppercase; font-weight: bold;">HIGH confidence</span>
                    </div>
                    <div style="color: #ddd; font-size: 14px; font-family: 'Consolas', monospace;">
                        <strong>Likely return type:</strong> <span style="color: #4ec9b0;">void</span>
                    </div>
                </div>`;
            }
        }

        html += `</div>`;
    }

    // Return Conditions Analysis - NEW
    if (analysis.returnConditions && analysis.returnConditions.returnPaths.length > 0) {
        const rc = analysis.returnConditions;

        html += `
        <div class="analysis-section">
            <div class="section-title"><i class="fas fa-search"></i> Return Conditions Analysis</div>`;

        // Show multiple returns info
        if (rc.hasMultipleReturns) {
            html += `
            <div style="background: rgba(33,150,243,0.15); padding: 10px; border-left: 3px solid #2196F3; margin-bottom: 15px;">
                <div style="color: #64B5F6; font-weight: bold;">ℹ️ Multiple Return Paths Detected</div>
                <div style="color: #aabbcc; margin-top: 5px;">This function has ${rc.returnPaths.length} different return point(s)</div>
            </div>`;
        }

        // Zero return conditions
        if (rc.zeroReturnConditions.length > 0) {
            html += `
            <div style="background: rgba(255,193,7,0.1); padding: 15px; border-radius: 5px; margin-bottom: 15px; border-left: 4px solid #FFC107;">
                <h4 style="color: #FFC107; margin-top: 0; display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 1.2em;">0️⃣</span> Returns 0 when:
                </h4>`;

            rc.zeroReturnConditions.forEach((condition, idx) => {
                html += `
                <div style="background: rgba(0,0,0,0.3); padding: 12px; margin-top: ${idx > 0 ? '10px' : '0'}; border-radius: 4px;">
                    <div style="color: #FFC107; font-weight: bold; margin-bottom: 8px;">Path #${idx + 1}: Line ${condition.line}</div>

                    ${condition.precedingTests.length > 0 ? `
                    <div style="margin-bottom: 10px;">
                        <div style="color: #88ccaa; font-size: 0.9em; margin-bottom: 5px;">Preceding Conditions:</div>
                        ${condition.precedingTests.map(test => `
                            <div style="background: rgba(100,150,200,0.15); padding: 8px; margin-top: 5px; border-left: 2px solid #6495ed; font-family: monospace; font-size: 0.9em;">
                                <div style="color: #aabbcc;">Line ${test.line}: <code style="color: #e8b339;">${test.instruction}</code></div>
                                ${test.note ? `<div style="color: #888; font-size: 0.85em; margin-top: 3px;">💡 ${test.note}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>` : ''}

                    ${condition.isXorPattern ? `
                    <div style="color: #FFC107; margin-top: 8px;">
                        ⚡ Explicit zero pattern detected: <code style="background: rgba(255,193,7,0.2); padding: 2px 6px;">xor %eax,%eax</code>
                    </div>` : ''}

                    ${condition.conditionalJumps.length > 0 ? `
                    <div style="margin-top: 10px;">
                        <div style="color: #88ccaa; font-size: 0.9em; margin-bottom: 5px;">Conditional Jumps Leading Here:</div>
                        ${condition.conditionalJumps.map(jump => `
                            <div style="background: rgba(139,92,246,0.15); padding: 6px; margin-top: 4px; border-left: 2px solid #8B5CF6; font-family: monospace; font-size: 0.85em; color: #aabbcc;">
                                Line ${jump.line}: <code style="color: #c586c0;">${jump.instruction}</code>
                            </div>
                        `).join('')}
                    </div>` : ''}
                </div>`;
            });

            html += `</div>`;
        }

        // Non-zero return conditions
        if (rc.nonZeroReturnConditions.length > 0) {
            html += `
            <div style="background: rgba(76,175,80,0.1); padding: 15px; border-radius: 5px; margin-bottom: 15px; border-left: 4px solid #4CAF50;">
                <h4 style="color: #4CAF50; margin-top: 0; display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 1.2em;">✅</span> Returns Computed Value when:
                </h4>`;

            rc.nonZeroReturnConditions.forEach((condition, idx) => {
                html += `
                <div style="background: rgba(0,0,0,0.3); padding: 12px; margin-top: ${idx > 0 ? '10px' : '0'}; border-radius: 4px;">
                    <div style="color: #4CAF50; font-weight: bold; margin-bottom: 8px;">Path #${idx + 1}: Line ${condition.line}</div>

                    ${condition.returnValue ? `
                    <div style="color: #aabbcc; margin-bottom: 8px;">
                        Return value: <code style="background: rgba(76,175,80,0.2); padding: 2px 6px; color: #4ec9b0;">${condition.returnValue}</code>
                    </div>` : ''}

                    ${condition.precedingTests.length > 0 ? `
                    <div style="margin-bottom: 10px;">
                        <div style="color: #88ccaa; font-size: 0.9em; margin-bottom: 5px;">Preceding Conditions:</div>
                        ${condition.precedingTests.map(test => `
                            <div style="background: rgba(100,150,200,0.15); padding: 8px; margin-top: 5px; border-left: 2px solid #6495ed; font-family: monospace; font-size: 0.9em;">
                                <div style="color: #aabbcc;">Line ${test.line}: <code style="color: #e8b339;">${test.instruction}</code></div>
                                ${test.note ? `<div style="color: #888; font-size: 0.85em; margin-top: 3px;">💡 ${test.note}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>` : ''}

                    ${condition.conditionalJumps.length > 0 ? `
                    <div style="margin-top: 10px;">
                        <div style="color: #88ccaa; font-size: 0.9em; margin-bottom: 5px;">Conditional Jumps:</div>
                        ${condition.conditionalJumps.map(jump => `
                            <div style="background: rgba(139,92,246,0.15); padding: 6px; margin-top: 4px; border-left: 2px solid #8B5CF6; font-family: monospace; font-size: 0.85em; color: #aabbcc;">
                                Line ${jump.line}: <code style="color: #c586c0;">${jump.instruction}</code>
                            </div>
                        `).join('')}
                    </div>` : ''}
                </div>`;
            });

            html += `</div>`;
        }

        // Early returns
        if (rc.earlyReturns.length > 0) {
            html += `
            <div style="background: rgba(255,152,0,0.1); padding: 15px; border-radius: 5px; border-left: 4px solid #FF9800;">
                <h4 style="color: #FF9800; margin-top: 0; display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 1.2em;">⏪</span> Early Return Paths
                </h4>
                <div style="color: #aabbcc; margin-bottom: 10px;">
                    Function has ${rc.earlyReturns.length} early return(s) before the main return point
                </div>`;

            rc.earlyReturns.forEach((earlyRet, idx) => {
                html += `
                <div style="background: rgba(0,0,0,0.3); padding: 10px; margin-top: ${idx > 0 ? '8px' : '0'}; border-radius: 4px;">
                    <div style="color: #FF9800; font-family: monospace;">
                        Line ${earlyRet.line}: <code style="color: #e8b339;">${earlyRet.instruction}</code>
                    </div>
                    ${earlyRet.note ? `<div style="color: #888; font-size: 0.9em; margin-top: 5px;">💡 ${earlyRet.note}</div>` : ''}
                </div>`;
            });

            html += `</div>`;
        }

        // Summary insight
        html += `
        <div style="background: rgba(33,150,243,0.1); padding: 12px; border-radius: 4px; margin-top: 15px; border-left: 3px solid #2196F3;">
            <div style="color: #64B5F6; font-weight: bold; margin-bottom: 5px;">📊 Return Analysis Summary</div>
            <div style="color: #aabbcc; font-size: 0.9em;">
                • Total return paths: ${rc.returnPaths.length}<br>
                • Zero-return paths: ${rc.zeroReturnConditions.length}<br>
                • Computed-value paths: ${rc.nonZeroReturnConditions.length}<br>
                • Early returns: ${rc.earlyReturns.length}
            </div>
        </div>`;

        html += `</div>`;
    }

    // Calling Convention Analysis
    if (analysis.callingConvention && (analysis.callingConvention.calleeSavedRegisters.length > 0 || analysis.callingConvention.callerSavedRegisters.length > 0)) {
        const cc = analysis.callingConvention;

        html += `
        <div class="analysis-section">
            <div class="section-title"><i class="fas fa-phone-alt"></i> Calling Convention Analysis</div>
            <div style="background: rgba(33,150,243,0.1); padding: 12px; border-radius: 4px; margin-bottom: 15px; border-left: 3px solid #2196F3;">
                <div style="color: #64B5F6; font-weight: bold; margin-bottom: 5px;">System V AMD64 ABI (x86-64)</div>
                <div style="color: #aabbcc; font-size: 0.9em;">
                    • <strong>Caller-saved</strong> (volatile): Can be freely modified by called functions<br>
                    • <strong>Callee-saved</strong> (non-volatile): Must be preserved by called functions
                </div>
            </div>`;

        // Callee-saved registers
        if (cc.calleeSavedRegisters.length > 0) {
            html += `
            <div style="background: rgba(255,193,7,0.1); padding: 15px; border-radius: 5px; margin-bottom: 15px; border-left: 4px solid #FFC107;">
                <h4 style="color: #FFC107; margin-top: 0; display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 1.2em;">🔒</span> Callee-Saved Registers (Non-Volatile)
                </h4>
                <div style="color: #aabbcc; margin-bottom: 10px; font-size: 0.9em;">
                    These registers must be saved and restored by this function if used
                </div>`;

            cc.calleeSavedRegisters.forEach((reg, idx) => {
                const statusColor = reg.properlyPreserved ? '#4CAF50' : '#FF5722';
                const statusIcon = reg.properlyPreserved ? '✓' : '⚠';
                const statusText = reg.properlyPreserved ? 'Properly Preserved' : 'Not Preserved';

                html += `
                <div style="background: rgba(0,0,0,0.3); padding: 12px; margin-top: ${idx > 0 ? '10px' : '0'}; border-radius: 4px; border-left: 3px solid ${statusColor};">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <span style="color: #4ec9b0; font-family: monospace; font-weight: bold;">%${reg.register}</span>
                            <span style="color: #888; margin-left: 10px; font-size: 0.9em;">${reg.purpose}</span>
                        </div>
                        <div style="color: ${statusColor}; font-weight: bold;">
                            ${statusIcon} ${statusText}
                        </div>
                    </div>
                    ${reg.saved || reg.restored ? `
                    <div style="margin-top: 8px; font-size: 0.9em;">
                        ${reg.saved ? '<div style="color: #88ccaa;">✓ Saved to stack</div>' : '<div style="color: #ff8866;">✗ Not saved</div>'}
                        ${reg.restored ? '<div style="color: #88ccaa;">✓ Restored from stack</div>' : '<div style="color: #ff8866;">✗ Not restored</div>'}
                    </div>` : ''}
                </div>`;
            });

            html += `</div>`;
        }

        // Caller-saved registers
        if (cc.callerSavedRegisters.length > 0) {
            html += `
            <div style="background: rgba(76,175,80,0.1); padding: 15px; border-radius: 5px; margin-bottom: 15px; border-left: 4px solid #4CAF50;">
                <h4 style="color: #4CAF50; margin-top: 0; display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 1.2em;">🔓</span> Caller-Saved Registers (Volatile)
                </h4>
                <div style="color: #aabbcc; margin-bottom: 10px; font-size: 0.9em;">
                    These registers can be freely modified (caller must save if needed)
                </div>`;

            cc.callerSavedRegisters.forEach((reg, idx) => {
                html += `
                <div style="background: rgba(0,0,0,0.3); padding: 10px; margin-top: ${idx > 0 ? '8px' : '0'}; border-radius: 4px;">
                    <span style="color: #4ec9b0; font-family: monospace; font-weight: bold;">%${reg.register}</span>
                    <span style="color: #888; margin-left: 10px; font-size: 0.9em;">${reg.purpose}</span>
                </div>`;
            });

            html += `</div>`;
        }

        // Register preservation details
        if (cc.preservedRegisters.length > 0) {
            html += `
            <div style="background: rgba(139,92,246,0.1); padding: 15px; border-radius: 5px; margin-bottom: 15px; border-left: 4px solid #8B5CF6;">
                <h4 style="color: #a78bfa; margin-top: 0; display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 1.2em;">💾</span> Register Preservation Operations
                </h4>`;

            cc.preservedRegisters.forEach((op, idx) => {
                const actionColor = op.action === 'saved' ? '#4CAF50' : '#2196F3';
                const actionIcon = op.action === 'saved' ? '⬇' : '⬆';

                html += `
                <div style="background: rgba(0,0,0,0.3); padding: 8px; margin-top: ${idx > 0 ? '6px' : '0'}; border-radius: 4px; font-family: monospace; font-size: 0.9em;">
                    <span style="color: ${actionColor}; font-weight: bold;">${actionIcon} ${op.action.toUpperCase()}</span>
                    <span style="color: #aabbcc; margin-left: 10px;">Line ${op.line}: <code style="color: #e8b339;">${op.instruction}</code></span>
                </div>`;
            });

            html += `</div>`;
        }

        // Violations/Warnings
        if (cc.violations.length > 0) {
            html += `
            <div style="background: rgba(255,87,34,0.1); padding: 15px; border-radius: 5px; border-left: 4px solid #FF5722;">
                <h4 style="color: #FF5722; margin-top: 0; display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 1.2em;">⚠️</span> Potential Calling Convention Issues
                </h4>`;

            cc.violations.forEach((violation, idx) => {
                html += `
                <div style="background: rgba(0,0,0,0.3); padding: 10px; margin-top: ${idx > 0 ? '8px' : '0'}; border-radius: 4px;">
                    <div style="color: #FF5722; font-weight: bold;">%${violation.register}</div>
                    <div style="color: #aabbcc; margin-top: 5px; font-size: 0.9em;">${violation.message}</div>
                </div>`;
            });

            html += `</div>`;
        }

        // Stack Alignment
        if (cc.stackAlignment && cc.stackAlignment.detected) {
            const sa = cc.stackAlignment;

            html += `
            <div style="background: rgba(156,39,176,0.1); padding: 15px; border-radius: 5px; margin-bottom: 15px; border-left: 4px solid #9C27B0;">
                <h4 style="color: #BA68C8; margin-top: 0; display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 1.2em;">📐</span> Stack Alignment (16-byte requirement)
                </h4>
                <div style="background: rgba(33,150,243,0.15); padding: 10px; border-radius: 4px; margin-bottom: 10px;">
                    <div style="color: #64B5F6; font-weight: bold; margin-bottom: 5px;">x86-64 ABI Requirement:</div>
                    <div style="color: #aabbcc; font-size: 0.9em;">
                        • Stack must be 16-byte aligned before <code style="background: rgba(0,0,0,0.3); padding: 2px 4px;">call</code> instructions<br>
                        • At function entry: return address (8 bytes) → stack misaligned by 8 bytes<br>
                        • Stack grows downward (higher addresses → lower addresses)
                    </div>
                </div>`;

            sa.alignmentOps.forEach((op, idx) => {
                const color = op.alignedAfter ? '#4CAF50' : '#FF9800';
                const icon = op.alignedAfter ? '✓' : '~';

                html += `
                <div style="background: rgba(0,0,0,0.3); padding: 12px; margin-top: ${idx > 0 ? '10px' : '0'}; border-radius: 4px; border-left: 3px solid ${color};">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <div style="color: #BA68C8; font-family: monospace; font-weight: bold;">
                            Line ${op.line}: <code style="color: #e8b339;">${op.instruction}</code>
                        </div>
                        <div style="color: ${color}; font-weight: bold;">
                            ${icon} ${op.alignedAfter ? 'Aligned' : 'Not Aligned'}
                        </div>
                    </div>
                    <div style="font-size: 0.9em; color: #aabbcc;">
                        <div style="margin-bottom: 4px;">
                            <strong>Purpose:</strong> ${op.purpose}
                        </div>
                        <div style="margin-bottom: 4px;">
                            <strong>Bytes:</strong> ${op.bytes} bytes ${op.bytes === 8 ? '(typical alignment padding)' : ''}
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px; margin-top: 6px; padding: 8px; background: rgba(0,0,0,0.2); border-radius: 4px;">
                            <div style="flex: 1; text-align: center;">
                                <div style="color: #888; font-size: 0.85em;">Before</div>
                                <div style="font-family: monospace; font-weight: bold; color: ${op.offsetBefore % 16 === 0 ? '#4CAF50' : '#FF9800'};">
                                    ${op.offsetBefore} bytes
                                </div>
                                <div style="font-size: 0.8em; color: ${op.offsetBefore % 16 === 0 ? '#4CAF50' : '#FF5722'};">
                                    ${op.offsetBefore % 16 === 0 ? '✓ Aligned' : '✗ Misaligned by ' + (op.offsetBefore % 16) + ' bytes'}
                                </div>
                            </div>
                            <div style="color: #BA68C8; font-size: 1.5em;">→</div>
                            <div style="flex: 1; text-align: center;">
                                <div style="color: #888; font-size: 0.85em;">After</div>
                                <div style="font-family: monospace; font-weight: bold; color: ${op.alignedAfter ? '#4CAF50' : '#FF9800'};">
                                    ${op.offsetAfter} bytes
                                </div>
                                <div style="font-size: 0.8em; color: ${op.alignedAfter ? '#4CAF50' : '#FF5722'};">
                                    ${op.alignedAfter ? '✓ Aligned' : '✗ Misaligned by ' + (op.offsetAfter % 16) + ' bytes'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
            });

            // Alignment status summary
            const aligned = sa.alignedBeforeCalls;
            html += `
            <div style="background: rgba(${aligned ? '76,175,80' : '255,87,34'},0.15); padding: 10px; border-radius: 4px; margin-top: 10px; border-left: 3px solid ${aligned ? '#4CAF50' : '#FF5722'};">
                <div style="color: ${aligned ? '#4CAF50' : '#FF5722'}; font-weight: bold;">
                    ${aligned ? '✓' : '⚠'} ${aligned ? 'All calls are properly aligned' : 'Some calls may not be properly aligned'}
                </div>
            </div>`;

            html += `</div>`;
        }

        html += `</div>`;
    }

    // Function Calls
    if (analysis.functionCalls && analysis.functionCalls.calls.length > 0) {
        const fc = analysis.functionCalls;

        html += `
        <div class="analysis-section">
            <div class="section-title"><i class="fas fa-phone"></i> Function Calls</div>
            <div style="background: rgba(33,150,243,0.1); padding: 12px; border-radius: 4px; margin-bottom: 15px; border-left: 3px solid #2196F3;">
                <div style="color: #64B5F6; font-weight: bold; margin-bottom: 5px;">
                    ${fc.totalCalls} call${fc.totalCalls !== 1 ? 's' : ''} to ${fc.uniqueFunctions.size} unique function${fc.uniqueFunctions.size !== 1 ? 's' : ''}
                </div>
            </div>`;

        fc.calls.forEach((call, idx) => {
            const hasDemangledName = call.demangledName !== null;
            const borderColor = hasDemangledName ? '#4CAF50' : '#2196F3';

            html += `
            <div style="background: rgba(0,0,0,0.3); padding: 15px; margin-top: ${idx > 0 ? '12px' : '0'}; border-radius: 4px; border-left: 4px solid ${borderColor};">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                    <div style="flex: 1;">
                        <div style="color: #4ec9b0; font-family: monospace; font-weight: bold; font-size: 1.1em; margin-bottom: 8px;">
                            ${call.displayName}
                        </div>
                        ${hasDemangledName ? `
                        <div style="color: #888; font-size: 0.9em; font-family: monospace; margin-bottom: 8px;">
                            Mangled: ${call.mangledName}
                        </div>` : ''}
                    </div>
                    <div style="background: rgba(33,150,243,0.2); padding: 6px 12px; border-radius: 4px;">
                        <span style="color: #64B5F6; font-size: 0.85em; font-weight: bold;">Line ${call.line}</span>
                    </div>
                </div>
                <div style="background: rgba(0,0,0,0.2); padding: 10px; border-radius: 4px; font-family: monospace; font-size: 0.9em;">
                    <span style="color: #888;">Instruction:</span>
                    <span style="color: #e8b339; margin-left: 8px;">${call.instruction}</span>
                </div>
            </div>`;
        });

        html += `</div>`;
    }

    // Directives
    if (analysis.directives.length > 0) {
        html += `
        <div class="analysis-section">
            <div class="section-title"><i class="fas fa-clipboard-list"></i> Assembler Directives</div>
            <table>
                <thead>
                    <tr>
                        <th>Line</th>
                        <th>Directive</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>`;

        analysis.directives.forEach(dir => {
            html += `
            <tr>
                <td>${dir.line}</td>
                <td><code class="directive">${dir.content}</code></td>
                <td>${dir.description}</td>
            </tr>`;
        });

        html += `</tbody></table></div>`;
    }

    // Instructions breakdown (moved here after directives)
    html += `
    <div class="analysis-section">
        <div class="section-title"><i class="fas fa-tools"></i> Instructions Breakdown</div>`;

    if (analysis.addressedInstructions > 0) {
        html += `<p style="color: #aabbcc; margin-bottom: 10px;">✓ ${analysis.addressedInstructions} instructions with hex addresses (disassembly format detected)</p>`;
    }

    html += `<table>
            <thead>
                <tr>
                    <th>Line</th>
                    ${analysis.addressedInstructions > 0 ? '<th>Address</th>' : ''}
                    <th>Instruction</th>
                    <th>Category</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>`;

    analysis.instructions.forEach(inst => {
        const badge = `<span class="badge ${inst.category}">${inst.category}</span>`;
        const visual = generateRegisterVisual(inst.instruction, inst.operands, inst.registers);

        html += `
        <tr>
            <td>${inst.line}</td>
            ${analysis.addressedInstructions > 0 ? `<td>${inst.hasAddress ? '0x' + inst.address : '-'}</td>` : ''}
            <td>
                <code class="highlight">${inst.instruction}</code> ${inst.operands.join(', ')}
                ${inst.comment ? `<span class="comment" style="margin-left: 10px;"># ${inst.comment}</span>` : ''}
            </td>
            <td>${badge}</td>
            <td>
                ${inst.description}
                ${visual}
            </td>
        </tr>`;
    });

    html += `</tbody></table></div>`;

    // Register State Trace
    if (analysis.registerStates && analysis.registerStates.length > 0) {
        html += `
        <div class="analysis-section">
            <div class="section-title"><i class="fas fa-chart-line"></i> Register State Trace</div>
            <p style="color: #aabbcc; margin-bottom: 15px;">
                Track how register values change symbolically through each instruction.
                Shows what each register contains in terms of expressions.
            </p>`;

        // Show initial state
        const initialState = analysis.registerStates[0];
        if (initialState && initialState.before) {
            html += `
            <div style="background: #1a2332; border: 2px solid #4ec9b0; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                <div style="color: #4ec9b0; font-weight: bold; margin-bottom: 10px;">Initial State (Function Entry):</div>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 8px;">`;

            const argRegs = ['rdi', 'rsi', 'rdx', 'rcx', 'r8', 'r9', 'rax'];
            // Only show registers that are actually used in the code
            argRegs.forEach(reg => {
                if (initialState.before[reg] && analysis.registers.has(reg)) {
                    const state = initialState.before[reg];
                    const color = state.type === 'parameter' ? '#4ec9b0' : '#888';
                    html += `
                    <div style="color: ${color};">
                        <span class="highlight">%${reg}</span> = ${state.value}
                    </div>`;
                }
            });

            html += `</div></div>`;
        }

        html += `<div style="margin-top: 20px;">`;

        // Show each instruction's before/after
        analysis.registerStates.forEach((regState, idx) => {
            if (regState.changed && regState.changed.length > 0) {
                html += `
                <div style="background: #1e2d3d; border-left: 3px solid #6495ed; padding: 15px; margin-bottom: 15px; border-radius: 4px;">
                    <div style="color: #88bbff; font-weight: bold; margin-bottom: 10px;">
                        Line ${regState.line}: <code style="background: #2a3f5f; padding: 4px 8px; border-radius: 4px;">${regState.instruction}</code>
                    </div>

                    <div style="margin-left: 20px;">
                        <div style="color: #9aa5b1; font-size: 12px; margin-bottom: 8px;">Before:</div>
                        <div style="margin-left: 10px; margin-bottom: 12px;">`;

                regState.changed.forEach(reg => {
                    const beforeState = regState.before[reg];
                    if (beforeState) {
                        html += `
                            <div style="color: #aabbcc; font-family: 'Courier New', monospace;">
                                <span class="highlight">%${reg}</span> = ${beforeState.value}
                            </div>`;
                    }
                });

                html += `
                        </div>
                        <div style="color: #9aa5b1; font-size: 12px; margin-bottom: 8px;">After:</div>
                        <div style="margin-left: 10px; margin-bottom: 8px;">`;

                regState.changed.forEach(reg => {
                    const afterState = regState.after[reg];
                    if (afterState) {
                        let typeColor = '#4ec9b0';
                        if (afterState.type === 'constant') typeColor = '#d19a66';
                        else if (afterState.type === 'expression') typeColor = '#88bbff';
                        else if (afterState.type === 'memory_read') typeColor = '#c678dd';
                        else if (afterState.type === 'address') typeColor = '#e5c07b';

                        html += `
                            <div style="color: ${typeColor}; font-family: 'Courier New', monospace; font-weight: bold;">
                                <span class="highlight">%${reg}</span> = ${afterState.value}
                            </div>`;
                    }
                });

                html += `
                        </div>
                        <div style="color: #e94560; font-size: 12px; margin-top: 8px;">
                            Changed: ${regState.changed.map(r => `<span class="highlight">%${r}</span>`).join(', ')}
                        </div>
                    </div>
                </div>`;
            }
        });

        html += `</div></div>`;
    }

    // Comments (standalone comment lines)
    if (analysis.comments && analysis.comments.length > 0) {
        html += `
        <div class="analysis-section">
            <div class="section-title"><i class="fas fa-comment"></i> Documentation Comments (${analysis.comments.length})</div>
            <p style="color: #aabbcc; margin-bottom: 10px;">Standalone comment lines found in the code:</p>
            <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 6px; max-height: 400px; overflow-y: auto;">`;

        analysis.comments.forEach(comment => {
            html += `
            <div style="padding: 8px; margin-bottom: 6px; border-left: 3px solid #6a7a8a; background: rgba(0,0,0,0.2); border-radius: 3px;">
                <span style="color: #888; font-size: 11px; margin-right: 10px;">Line ${comment.line}:</span>
                <span class="comment" style="color: #6a7a8a; font-style: italic;">${comment.text}</span>
            </div>`;
        });

        html += `</div></div>`;
    }

    // Stack Operations
    if (analysis.stackOps.length > 0) {
        html += `
        <div class="analysis-section">
            <div class="section-title"><i class="fas fa-layer-group"></i> Stack Operations</div>
            <div class="stack-viz">`;

        analysis.stackOps.forEach(op => {
            html += `
            <div class="stack-item">
                <strong>Line ${op.line}:</strong> ${op.instruction} ${op.operands.join(', ')}
                <br><small>${op.description}</small>
            </div>`;
        });

        html += `</div>`;

        if (Math.abs(analysis.stackDelta) > 0) {
            html += `<div class="warning">⚠️ Net stack change: ${analysis.stackDelta} bytes. Stack should be balanced!</div>`;
        }

        html += `</div>`;
    }

    // Memory Operations
    if (analysis.memoryOps.length > 0) {
        html += `
        <div class="analysis-section">
            <div class="section-title"><i class="fas fa-memory"></i> Memory Operations</div>
            <div class="instruction-list">`;

        analysis.memoryOps.forEach(op => {
            html += `
            <div class="instruction-item">
                <div class="instruction-name">Line ${op.line}: ${op.instruction} ${op.operands.join(', ')}</div>
                <div class="instruction-desc">${op.description}</div>
            </div>`;
        });

        html += `</div></div>`;
    }

    // Array Access Detection
    if (analysis.arrayAccesses && analysis.arrayAccesses.length > 0) {
        html += `
        <div class="analysis-section">
            <div class="section-title"><i class="fas fa-table"></i> Array Access Patterns Detected</div>
            <p style="color: #aabbcc; margin-bottom: 15px;">Found ${analysis.arrayAccesses.length} array access pattern(s) in the code:</p>`;

        analysis.arrayAccesses.forEach((array, idx) => {
            const confColor = array.confidence === 'high' ? '#4CAF50' : array.confidence === 'medium' ? '#FFC107' : '#888';
            const confIcon = array.confidence === 'high' ? '✓' : array.confidence === 'medium' ? '~' : '?';

            html += `
            <div style="background: rgba(0,0,0,0.3); padding: 15px; margin-bottom: 15px; border-radius: 6px; border-left: 4px solid ${confColor};">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <div style="color: #e5c07b; font-weight: bold; font-size: 16px;">Array #${idx + 1}</div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="color: ${confColor}; font-weight: bold;">${confIcon}</span>
                        <span style="color: ${confColor}; font-size: 11px; text-transform: uppercase;">${array.confidence} confidence</span>
                    </div>
                </div>

                <div style="background: rgba(0,0,0,0.4); padding: 12px; border-radius: 4px; margin-bottom: 10px;">
                    <div style="color: #4ec9b0; font-size: 13px; margin-bottom: 6px;"><strong>C Declaration:</strong></div>
                    <code style="color: #ddd; font-family: 'Consolas', monospace; font-size: 14px;">${array.cEquivalent}</code>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; margin-bottom: 10px;">
                    <div style="background: rgba(0,0,0,0.2); padding: 8px; border-radius: 4px;">
                        <div style="color: #888; font-size: 11px;">Base Register</div>
                        <div style="color: #e5c07b; font-weight: bold;">${array.baseRegister}</div>
                    </div>
                    <div style="background: rgba(0,0,0,0.2); padding: 8px; border-radius: 4px;">
                        <div style="color: #888; font-size: 11px;">Index Register</div>
                        <div style="color: #e5c07b; font-weight: bold;">${array.indexRegister}</div>
                    </div>
                    <div style="background: rgba(0,0,0,0.2); padding: 8px; border-radius: 4px;">
                        <div style="color: #888; font-size: 11px;">Traversal Direction</div>
                        <div style="color: ${array.traversalDirection === 'forward' ? '#4CAF50' : array.traversalDirection === 'backward' ? '#FF9800' : '#888'}; font-weight: bold;">
                            ${array.traversalDirection === 'forward' ? '→ Forward' : array.traversalDirection === 'backward' ? '← Backward' : array.traversalDirection === 'bidirectional' ? '↔ Bidirectional' : '? Unknown'}
                        </div>
                    </div>
                    <div style="background: rgba(0,0,0,0.2); padding: 8px; border-radius: 4px;">
                        <div style="color: #888; font-size: 11px;">Element Type</div>
                        <div style="color: #4ec9b0; font-weight: bold;">${array.elementType.split('/')[0]}</div>
                    </div>
                    <div style="background: rgba(0,0,0,0.2); padding: 8px; border-radius: 4px;">
                        <div style="color: #888; font-size: 11px;">Element Size</div>
                        <div style="color: #FFC107; font-weight: bold;">${array.elementSize} byte${array.elementSize > 1 ? 's' : ''}</div>
                    </div>
                    <div style="background: rgba(0,0,0,0.2); padding: 8px; border-radius: 4px;">
                        <div style="color: #888; font-size: 11px;">Scale Factor</div>
                        <div style="color: #FFC107; font-weight: bold;">×${array.scale}</div>
                    </div>
                    <div style="background: rgba(0,0,0,0.2); padding: 8px; border-radius: 4px;">
                        <div style="color: #888; font-size: 11px;">Location</div>
                        <div style="color: #aabbcc; font-weight: bold;">${array.location}</div>
                    </div>
                </div>

                <details style="margin-top: 10px;">
                    <summary style="color: #888; font-size: 12px; cursor: pointer; user-select: none;">Show all accesses (${array.accesses.length})</summary>
                    <div style="margin-top: 10px; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 4px;">`;

            array.accesses.forEach((access, accessIdx) => {
                const accessColor = access.accessType === 'read' ? '#6495ed' : '#ff9800';
                const accessIcon = access.accessType === 'read' ? '📥' : '📤';
                html += `
                        <div style="padding: 6px; margin-bottom: 6px; background: rgba(0,0,0,0.3); border-left: 3px solid ${accessColor}; border-radius: 3px;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="color: #888; font-size: 11px;">Line ${access.line}</span>
                                <span style="font-size: 11px;">${accessIcon} ${access.accessType}</span>
                            </div>
                            <code style="color: #ddd; font-size: 12px; font-family: 'Consolas', monospace;">${access.fullInstruction}</code>
                            <div style="color: #888; font-size: 10px; margin-top: 4px;">Operation: ${access.operation}</div>
                        </div>`;
            });

            html += `
                    </div>
                </details>

                <div style="background: rgba(76,175,80,0.1); padding: 10px; margin-top: 10px; border-radius: 4px; border-left: 2px solid #4CAF50;">
                    <div style="color: #88ccaa; font-size: 12px; margin-bottom: 4px;">💡 Pattern Analysis:</div>
                    <div style="color: #aabbcc; font-size: 12px;">
                        This pattern suggests <strong>${array.suggestedName}</strong> is accessed ${array.accesses.length} time(s) using scaled indexing (${array.baseRegister} + ${array.indexRegister} × ${array.scale}).
                        ${array.offset !== 0 ? ` Base offset: ${array.offset > 0 ? '+' : ''}${array.offset}.` : ''}
                        ${array.location === 'parameter' ? ' This array is likely passed as a function parameter.' : ''}
                        ${array.location === 'stack (local variable)' ? ' This array is likely a local variable on the stack.' : ''}
                        ${array.traversalDirection === 'forward' ? ' <strong>Array is traversed forward</strong> (index 0 → N).' : ''}
                        ${array.traversalDirection === 'backward' ? ' <strong>Array is traversed backward</strong> (index N → 0).' : ''}
                        ${array.traversalDirection === 'bidirectional' ? ' Array is traversed in both directions.' : ''}
                    </div>
                </div>
            </div>`;
        });

        html += `</div>`;
    }

    // Control Flow
    if (analysis.controlFlow.length > 0) {
        html += `
        <div class="analysis-section">
            <div class="section-title"><i class="fas fa-code-branch"></i> Control Flow</div>
            <div class="instruction-list">`;

        analysis.controlFlow.forEach(op => {
            html += `
            <div class="instruction-item">
                <div class="instruction-name">Line ${op.line}: ${op.instruction} ${op.operands.join(', ')}</div>
                <div class="instruction-desc">${op.description}</div>
            </div>`;
        });

        html += `</div></div>`;
    }

    // Loop Detection
    if (analysis.loops.length > 0) {
        html += `
        <div class="analysis-section">
            <div class="section-title"><i class="fas fa-sync"></i> Loops Detected (${analysis.loops.length})</div>
            <p style="color: #aabbcc; margin-bottom: 10px;">Backward jumps indicate loop structures:</p>
            <div class="instruction-list">`;

        analysis.loops.forEach(loop => {
            const loopType = loop.condition === 'unconditional' ? '(unconditional)' : '(conditional)';
            const icon = loop.condition === 'unconditional' ? '↻' : '⤴';
            html += `
            <div class="instruction-item">
                <div class="instruction-name">
                    ${icon} Line ${loop.from} → Line ${loop.to} ${loopType}
                </div>
                <div class="instruction-desc">
                    <code>${loop.instruction} ${loop.target}</code> jumps backwards from line ${loop.from} to line ${loop.to}
                    ${loop.condition === 'conditional' ? ' - Loop continues while condition is met' : ' - Infinite loop or explicit break required'}
                </div>
            </div>`;
        });

        html += `</div>`;

        // Show jump target resolution
        if (analysis.jumpTargets.size > 0) {
            html += `
            <div style="margin-top: 15px; padding: 12px; background: #2a3040; border-radius: 6px;">
                <strong style="color: #dcdcaa;">Jump Target Details:</strong><br>`;

            Array.from(analysis.jumpTargets.values()).forEach(jt => {
                html += `<div style="margin-top: 8px; color: #aabbcc;">
                    Line ${jt.line}: <code style="color: #4ec9b0;">${jt.instruction}</code> →
                    <span style="color: #e94560;">${jt.target}</span>
                    ${jt.offset ? ` <span style="color: #9aa5b1;">(offset: ${jt.offset})</span>` : ''}
                </div>`;
            });

            html += `</div>`;
        }

        html += `</div>`;
    }

    panel.innerHTML = html;

    // Add IDs to sections for navigation
    addSectionIds();

    // Update navigation panel
    updateNavigationPanel();
}

function addSectionIds() {
    // Add unique IDs to each analysis section based on its title
    const sections = document.querySelectorAll('.analysis-section');
    sections.forEach((section, index) => {
        const titleElement = section.querySelector('.section-title');
        if (titleElement) {
            // Extract text without emoji and create ID
            const titleText = titleElement.textContent.trim();
            const id = 'section-' + titleText.replace(/[^\w\s]/g, '').replace(/\s+/g, '-').toLowerCase();
            section.id = id;
        }
    });
}

function updateNavigationPanel() {
    const navPanel = document.getElementById('navPanel');
    const navContent = document.getElementById('navPanelContent');
    const sections = document.querySelectorAll('.analysis-section .section-title');

    if (sections.length === 0) {
        // No analysis yet, hide navigation
        navPanel.classList.remove('visible');
        document.body.classList.remove('nav-active');
        return;
    }

    // Build navigation items
    let navHtml = '';
    sections.forEach((section, index) => {
        // Extract icon and text from section title
        const iconElement = section.querySelector('i');
        const icon = iconElement ? iconElement.outerHTML : '<i class="fas fa-circle"></i>';

        // Get text without the icon
        const titleText = section.textContent.trim();

        // Get the parent section ID
        const parentSection = section.closest('.analysis-section');
        const sectionId = parentSection ? parentSection.id : '';

        navHtml += `
            <div class="nav-item" data-section="${sectionId}" onclick="scrollToSection('${sectionId}')">
                <span class="nav-item-icon">${icon}</span>
                <span class="nav-item-text">${titleText}</span>
            </div>
        `;
    });

    navContent.innerHTML = navHtml;
    navPanel.classList.add('visible');
    document.body.classList.add('nav-active');

    // Setup scroll tracking for active section highlighting
    setupScrollTracking();
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function setupScrollTracking() {
    const analysisPanel = document.getElementById('analysisPanel');

    // Throttle scroll events for performance
    let scrollTimeout;
    analysisPanel.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }

        scrollTimeout = setTimeout(() => {
            updateActiveNavItem();
        }, 100);
    });
}

function updateActiveNavItem() {
    const sections = document.querySelectorAll('.analysis-section');
    const navItems = document.querySelectorAll('.nav-item');
    const analysisPanel = document.getElementById('analysisPanel');

    let currentSection = null;
    const scrollTop = analysisPanel.scrollTop;
    const offset = 100; // Offset for better UX

    // Find which section is currently in view
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const panelRect = analysisPanel.getBoundingClientRect();

        if (rect.top <= panelRect.top + offset && rect.bottom > panelRect.top) {
            currentSection = section.id;
        }
    });

    // Update active state
    navItems.forEach(item => {
        const itemSection = item.getAttribute('data-section');
        if (itemSection === currentSection) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function clearInput() {
    document.getElementById('assemblyInput').value = '';
    document.getElementById('analysisPanel').innerHTML = `
        <div class="panel-header">Analysis Results</div>
        <div style="padding: 40px; text-align: center; color: #5a6070;">
            Enter assembly code and click "Analyze Code" to see detailed analysis
        </div>`;

    // Hide navigation panel
    const navPanel = document.getElementById('navPanel');
    if (navPanel) {
        navPanel.classList.remove('visible');
        document.body.classList.remove('nav-active');
    }
}

function loadExample() {
    const examples = [
        {
            name: 'Function with local labels (.L3)',
            code: `# Function with local labels
f1:
       subq    $8, %rsp
       call    callfunc
       movl    %eax, %edx
       leal    1(%rax,%rax,2), %eax
       testb   $1, %dl
       jne     .L3
       movl    %edx, %eax
       shrl    $31, %eax
       addl    %edx, %eax
       sarl    %eax
.L3:
       addq    $8, %rsp
       ret`
        },
        {
            name: 'Disassembly with hex addresses',
            code: `.globl  f
.align  16, 0x90
.type   f,@function
f:
   0:  movl    $1, %r8d
   6:  jmp     b <f+0xb>
   8:  incl    %r8d
   b:  movl    %r8d, %ecx
  40:  pushq   %rax
  41:  movl    $.L.str, %edi
  46:  xorl    %eax, %eax
  48:  callq   printf
  4d:  movl    $1, %eax
  52:  popq    %rcx
  53:  retq

.type   .L.str,@object
.L.str:
.asciz  "%d %d\\n"`
        },
        {
            name: 'Simple add function',
            code: `# Example: Simple function
.globl add_ten
add_ten:
    pushq %rbp           # Save old base pointer
    movq %rsp, %rbp      # Set up new base pointer
    movl %edi, -4(%rbp)  # Store first argument
    movl -4(%rbp), %eax  # Load argument into return register
    addl $10, %eax       # Add 10
    popq %rbp            # Restore base pointer
    ret                  # Return (value in %eax)`
        }
    ];

    // Rotate through examples
    const currentCode = document.getElementById('assemblyInput').value;
    let nextExample = examples[0];

    for (let i = 0; i < examples.length; i++) {
        if (currentCode.includes(examples[i].code.substring(0, 20))) {
            nextExample = examples[(i + 1) % examples.length];
            break;
        }
    }

    document.getElementById('assemblyInput').value = nextExample.code;
    log(`Loaded example: ${nextExample.name}. Analyzing...`, 'info');
    analyzeAssembly();
}

// Node.js support
if (typeof module !== 'undefined' && module.exports) {
    // Extract the core analysis logic for Node.js
    module.exports = {
        analyzeAssembly: function(code) {
            const lines = code.split('\n');
            const analysis = {
                instructions: [],
                registersUsed: [],
                stackDelta: 0,
                controlFlow: [],
                stackOps: [],
                memoryOperations: [],
                labels: [],
                directives: [],
                loops: [],
                registerFamilies: [],
                estimatedSize: 0
            };

            lines.forEach((line, idx) => {
                const trimmed = line.trim();
                if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith(';')) {
                    return;
                }

                // Label detection
                if (trimmed.includes(':') && !trimmed.startsWith('.') && !trimmed.match(/^\s*[0-9a-f]+:/)) {
                    const labelName = trimmed.split(':')[0].trim();
                    if (!analysis.labels.includes(labelName)) {
                        analysis.labels.push(labelName);
                    }
                    const afterColon = trimmed.split(':')[1];
                    if (!afterColon || afterColon.trim() === '') {
                        return;
                    }
                }

                // Directive detection
                if (trimmed.startsWith('.') && !trimmed.includes(':')) {
                    const directive = trimmed.split(/\s+/)[0];
                    if (!analysis.directives.includes(directive)) {
                        analysis.directives.push(directive);
                    }
                    return;
                }

                // Parse instruction
                let instructionPart = trimmed;
                if (trimmed.match(/^\s*[0-9a-f]+:\s+/)) {
                    instructionPart = trimmed.replace(/^\s*[0-9a-f]+:\s+/, '');
                }
                if (instructionPart.includes(':') && !instructionPart.startsWith('.')) {
                    const parts = instructionPart.split(':');
                    if (parts.length > 1) {
                        instructionPart = parts[1].trim();
                    }
                }

                const parsed = parseInstruction(instructionPart);
                if (parsed && parsed.instruction && INSTRUCTIONS[parsed.instruction]) {
                    const dynamicDesc = generateDynamicDescription(parsed, INSTRUCTIONS[parsed.instruction]);
                    analysis.instructions.push({
                        ...parsed,
                        description: dynamicDesc,
                        line: idx + 1
                    });

                    parsed.registers.forEach(reg => {
                        if (!analysis.registersUsed.includes(reg)) {
                            analysis.registersUsed.push(reg);
                        }
                    });

                    if (parsed.category === 'control') {
                        analysis.controlFlow.push({ line: idx + 1, ...parsed });
                        // Loop detection
                        if (parsed.operands && parsed.operands.length > 0) {
                            const target = parsed.operands[0];
                            const match = target.match(/^([0-9a-f]+|\.?\w+)/);
                            if (match) {
                                let targetLine = -1;
                                if (match[1].match(/^[0-9a-f]+$/)) {
                                    const targetAddr = parseInt(match[1], 16);
                                    lines.forEach((l, i) => {
                                        const addrMatch = l.match(/^\s*([0-9a-f]+):/);
                                        if (addrMatch && parseInt(addrMatch[1], 16) === targetAddr) {
                                            targetLine = i + 1;
                                        }
                                    });
                                } else {
                                    lines.forEach((l, i) => {
                                        if (l.trim().startsWith(match[1] + ':')) {
                                            targetLine = i + 1;
                                        }
                                    });
                                }
                                if (targetLine > 0 && targetLine < idx + 1) {
                                    analysis.loops.push({
                                        fromLine: idx + 1,
                                        toLine: targetLine,
                                        instruction: parsed.instruction,
                                        type: parsed.instruction === 'jmp' ? 'unconditional' : 'conditional'
                                    });
                                }
                            }
                        }
                    }

                    if (parsed.category === 'memory' && (parsed.instruction.includes('push') || parsed.instruction.includes('pop'))) {
                        analysis.stackOps.push({ line: idx + 1, ...parsed });
                        if (INSTRUCTIONS[parsed.instruction] && INSTRUCTIONS[parsed.instruction].stackDelta) {
                            analysis.stackDelta += INSTRUCTIONS[parsed.instruction].stackDelta;
                        }
                    }

                    if (parsed.hasMemoryOperand) {
                        analysis.memoryOperations.push({ line: idx + 1, ...parsed });
                    }

                    analysis.estimatedSize += estimateInstructionSize(parsed);
                }
            });

            // Group registers by family
            const families = {};
            analysis.registersUsed.forEach(reg => {
                const base = getRegisterBase(reg);
                if (!families[base]) {
                    families[base] = [];
                }
                families[base].push(reg);
            });
            analysis.registerFamilies = Object.keys(families).map(family => ({
                family: family,
                used: families[family]
            }));

            return analysis;
        },
        INSTRUCTIONS,
        REGISTERS
    };
}

// ============================================================================
// UI Enhancement Functions
// ============================================================================

function copyResults() {
    const panel = document.getElementById('analysisPanel');
    const text = panel.innerText;

    navigator.clipboard.writeText(text).then(() => {
        // Show success notification
        showToast('✅ Results copied to clipboard!', 'success');
    }).catch(err => {
        showToast('❌ Failed to copy results', 'error');
    });
}

function showToast(message, type) {
    // Create toast element
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#4ec9b0' : '#e94560'};
        color: white;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Remove after 2 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
}

// Add CSS animation
if (!document.getElementById('toast-styles')) {
    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

function loadSelectedExample() {
    const selector = document.getElementById('exampleSelector');
    const value = selector.value;

    if (!value) return;

    const examples = {
        f1: `f1:
    imulq $2, %rsi
    leaq (%rdi,%rsi), %rax
    movw (%rax), %ax
    movzwl %ax, %eax
    retq`,

        stack: `test_frame:
    pushq %rbp
    movq %rsp, %rbp
    movl %edi, -4(%rbp)
    movl -4(%rbp), %eax
    addl $10, %eax
    popq %rbp
    ret`,

        arithmetic: `arithmetic:
    addl $5, %eax
    subl %ebx, %eax
    imull $3, %ecx
    incl %edx
    decl %esi
    negl %edi
    ret`,

        array: `array_access:
    leaq (%rdi,%rsi,4), %rax
    movl (%rax), %ebx
    leaq 8(%rax), %rcx
    movq (%rcx), %rdx
    ret`,

        loop: `loop_test:
    movl $10, %ecx
.loop:
    decl %ecx
    jnz .loop
    ret`,

        xor: `zero_test:
    xorl %eax, %eax
    xorq %rbx, %rbx
    ret`
    };

    const code = examples[value];
    if (code) {
        document.getElementById('assemblyInput').value = code;
        // Reset selector
        selector.value = '';
        // Auto-analyze
        analyzeAssembly();
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl+Enter or Cmd+Enter to analyze
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        analyzeAssembly();
        showToast('🔍 Analyzing...', 'success');
    }

    // Ctrl+L or Cmd+L to clear input
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        clearInput();
        showToast('🗑️ Input cleared', 'success');
    }

    // Ctrl+K or Cmd+K to copy results
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        copyResults();
    }
});

// Make sections collapsible
function makeCollapsible() {
    const sections = document.querySelectorAll('.section-title');
    sections.forEach(title => {
        title.style.cursor = 'pointer';
        title.style.userSelect = 'none';
        title.onclick = function() {
            const section = this.parentElement;
            const content = Array.from(section.children).filter(el => el !== this);

            content.forEach(el => {
                if (el.style.display === 'none') {
                    el.style.display = '';
                    this.textContent = this.textContent.replace('▶', '▼');
                } else {
                    el.style.display = 'none';
                    if (!this.textContent.includes('▶')) {
                        this.textContent = '▶ ' + this.textContent;
                    }
                }
            });
        };
    });
}

// Toggle unused registers display
function toggleUnusedRegisters() {
    const unusedDiv = document.getElementById('unusedRegisters');
    const icon = document.getElementById('toggleRegIcon');
    const button = event.target.closest('button');

    if (unusedDiv.style.display === 'none') {
        unusedDiv.style.display = 'block';
        icon.textContent = '▼';
        button.innerHTML = '<span id="toggleRegIcon">▼</span> Hide Unused Registers';
    } else {
        unusedDiv.style.display = 'none';
        icon.textContent = '▶';
        const count = unusedDiv.querySelectorAll('[style*="background: #2a3040"]').length;
        button.innerHTML = `<span id="toggleRegIcon">▶</span> Show All Registers (${count} unused)`;
    }
}