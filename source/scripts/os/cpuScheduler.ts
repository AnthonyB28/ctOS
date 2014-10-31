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

        public DoneExecuting(): void
        {
            if (this.m_WaitingExe)
            {
                if (Globals.m_KernelReadyQueue.getSize() > 0)
                {
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