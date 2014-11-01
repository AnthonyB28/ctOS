module CTOS
{
    export class CPUScheduler
    {
        constructor(private m_WaitingExe: boolean = false,
                    private m_Quantum: number = 6)
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

        public Cycle(): void
        {

        }

        // Scheduling needs to force the CPU to stop running program
        // and switch to next program if available
        public ContextSwitch(): void
        {
            if (this.m_WaitingExe && Globals.m_CPU.m_IsExecuting)
            {
                Globals.m_CPU.ContextSwitch(false); // Don't terminate the running process, just switch
            }
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