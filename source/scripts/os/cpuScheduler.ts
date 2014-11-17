module CTOS
{
    export class CPUScheduler
    {
        constructor(private m_WaitingExe: boolean = false,
            private m_Quantum: number = 6,
            private m_CPUCyles: number = 0,
			private m_SchedulerType: number = 0)
        { }

        // Sets waiting to true and mode bit to user mode.
        // Will signal to the CPUScheduler that it can context switch
        public SetWaiting(): void
        {
            Globals.m_Mode = 1; // User mode
            this.m_WaitingExe = true;
        }
		
		// Sets the scheduling algo we use
		// 0 for Round Robin
		// 1 for FirstComeFirstServe
		// 2 for Priority
		public SetType(t: number):void
		{
			this.m_SchedulerType = t;
		}
		
		public GetType():number
		{
			return this.m_SchedulerType;
		}

        public IsWaiting(): boolean
        {
            return this.m_WaitingExe;
        }

        public SetQuantum(quantum: number): void
        {
            this.m_Quantum = quantum;
        }

        // Call back from the CPU when it cycles
        public OnCPUCycle()
        {
            ++this.m_CPUCyles;
        }

        // Checks if the CPUScheduler needs to context switch
        public Cycle(): void
        {
			if(this.m_SchedulerType == 0)
			{
				// Round Robin = if the cycles go over our Quantum, kick process off the swings
				// Quantum -1 because CPU cycle is garunteed to occur when the scheduler is done. If a switch is needed,
				// it is queued as an interupt. That would mean that the switch would occur at cycle 7, instead of 6, if q = 6
				if (this.m_CPUCyles >= this.m_Quantum-1)
				{
					this.ContextSwitch();
				}
			}
			else if(this.m_SchedulerType == 1)
			{
				// First Come First Serve
				// Does anything even need to be done here?
			}
			else
			{
				// NonPreemptive Priority - smallest integer = greatest p
				// Let the executing process finish before doing a context switch
				// May want to implement something to help starvation (age the low priority processes)
				
				// Wait... do we need anything here either? LOL
			}
        }

        // Scheduling needs to force the CPU to stop running program
        // and switch to next program if available
        private ContextSwitch(): void
        {
            // Only switch if the CPU is executing and there are processes waiting in the ReadyQueue
            if (this.m_WaitingExe && Globals.m_CPU.m_IsExecuting)
            {
                Globals.m_KernelInterruptQueue.enqueue(new Interrupt(Globals.INTERRUPT_CPU_CNTXSWTCH, false));
            }
            else
            {
                this.m_CPUCyles = 0;
            }
        }

        // Callback from the Kernel if a context switch was necessary
        // Resets CPU cycles to 0.
        public OnContextSwitchInterrupt()
        {
            this.m_CPUCyles = 0;
        }

        // Forcibly stops the currently running process on the CPU. Called from shellKill cmd
        // Executes context switch without any check
        public ForceKillRunningProcess(): void
        {
            Globals.m_KernelInterruptQueue.enqueue(new Interrupt(Globals.INTERRUPT_CPU_CNTXSWTCH, true));
        }

        // When a process is done executing, this is the callback from the CPU
        public OnCPUDoneExecuting(): void
        {
            // If there is more in the ready queue that have been loaded
            if (this.m_WaitingExe)
            {
                var sizeOfReadyQueue: number = Globals.m_KernelReadyQueue.getSize();
                if (sizeOfReadyQueue > 0) // We have more, continue to execute
                {
                    if (sizeOfReadyQueue == 1) // Last process in the queue at the moment
                    {
                        this.m_WaitingExe = false;
                    }
                    Globals.m_KernelInterruptQueue.enqueue(new Interrupt(Globals.INTERRUPT_REQUEST_CPU_RUN_PROGRAM, null));
                }
                else // There's no more in the ready queue, set back to kernel mode.
                {
                    this.m_WaitingExe = false;
                    Globals.m_Mode = 0; // Kernel Mode
                }
            }
            else // Just in case, we need to make sure we're in kernel mode still
            {
                Globals.m_Mode = 0; // Kernel Mode
            }
        }
		
		public static PrioritySort(a,b)
		{
			if(a.m_Priority < b.m_Priority)
			{
				return -1;
			}
			else if(a.m_Priority > b.m_Priority)
			{
				return 1;
			}
			else
			{
				return 0;
			}
		}
    }
} 