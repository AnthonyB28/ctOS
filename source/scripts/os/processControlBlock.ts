/* ------------
    Process Control Block
   
    Part of the OS kernel to manage a process.
    
    ------------ */  

module CTOS
{
    export class ProcessControlBlock
    {
        // 0 = new ; 1 = running ; 2 = waiting ; 3 = ready; 4 = terminated
        public m_State: number = 0; // May not be needed until P3?

        public m_PID: number = 0;
        public m_Counter: number = 0;
        public m_Accumulator: number = 0;
        public m_X: number = 0;
        public m_Y: number = 0;
        public m_Z: number = 0;

        public m_MemBase: number = 0;
        public m_MemLimit: number = 0;
    }
}