module CTOS
{
    export class CPUScheduler
    {
        constructor(private m_WaitingExe: boolean = false,
            private m_Quantum: number = 6,
            private m_CPUCyles: number = 0)
        { }

        public SetWaiting(): void
        {
            this.m_WaitingExe = true;
        }

        public IsWaiting(): boolean
        {
            return this.m_WaitingExe;
        }

        public SetQuantum(quantum: number): void
        {
            this.m_Quantum = quantum;
        }

        public OnCPUCycle()
        {
            ++this.m_CPUCyles;
        }

        // Checks if the CPUScheduler needs to context switch
        public Cycle(): void
        {
            // Round Robin = if the cycles go over our Quantum, kick process off the swings
            if (this.m_CPUCyles >= this.m_Quantum)
            {
                this.ContextSwitch();
            }
        }

        // Scheduling needs to force the CPU to stop running program
        // and switch to next program if available
        public ContextSwitch(): void
        {
            // Only switch if the CPU is executing and there are processes waiting in the ReadyQueue
            if (this.m_WaitingExe && Globals.m_CPU.m_IsExecuting)
            {
                Globals.m_CPU.ContextSwitch(false); // Don't terminate the running process, just switch
            }

            this.m_CPUCyles = 0;
        }

        // Forcibly stops the currently running process on the CPU. 
        // Executes context switch without any check
        public ForceKillRunningProcess(): void
        {
            Globals.m_CPU.ContextSwitch(true);
        }

        public DoneExecuting(): void
        {
            if (this.m_WaitingExe)
            {
                var sizeOfReadyQueue: number = Globals.m_KernelReadyQueue.getSize();
                if (sizeOfReadyQueue > 0)
                {
                    if (sizeOfReadyQueue == 1) // Last process in the queue at the moment
                    {
                        this.m_WaitingExe = false;
                    }
                    Globals.m_KernelInterruptQueue.enqueue(new Interrupt(Globals.INTERRUPT_REQUEST_CPU_RUN_PROGRAM, null));
                }
                else
                {
                    this.m_WaitingExe = false;
                }
            }
        }
    }
} 