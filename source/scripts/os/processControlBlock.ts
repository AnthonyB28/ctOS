/* ------------
    Process Control Block
   
    Part of the OS kernel to manage a process.

    GPID is the global PID that will increment on every new instance.
    Due to the fact it is static, it will not increase the size of -
    the class... theoretically.
    ------------ */  

module CTOS
{
    export class ProcessControlBlock
    {
        static m_GPID: number = -1; // Represents the latest PID loaded
        static STATE_NEW = 0;
        static STATE_RUNNING = 1;
        static STATE_WAITING = 2;
        static STATE_READY = 3;
        static STATE_TERMINATED = 4;

        public m_State: number = 0; // May not be needed until P3?

        public m_PID: number = ++ProcessControlBlock.m_GPID; // Increment for every instance
        public m_Counter: number = 0;
        public m_Accumulator: number = 0;
        public m_X: number = 0;
        public m_Y: number = 0;
        public m_Z: number = 0; // Treat like a boolean for sim purposes

        public m_MemBase: number = 0;
        public m_MemLimit: number = 0; // base + size (255)
    }
}