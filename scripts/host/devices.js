/* ------------  
   Devices.js

   Requires global.js.
   
   Routines for the hardware simulation, NOT for our client OS itself. In this manner, it's A LITTLE BIT like a hypervisor,
   in that the Document environment inside a browser is the "bare metal" (so to speak) for which we write code
   that hosts our client OS. But that analogy only goes so far, and the lines are blurred, because we are using
   JavaScript in both the host and client environments.
   
   This (and simulation scripts) is the only place that we should see "web" code, like 
   DOM manipulation and JavaScript event handling, and so on.  (Index.html is the only place for markup.)
   
   This code references page numbers in the text book: 
   Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
   ------------ */

var _hardwareClockID = -1;

//
// Hardware/Host Clock Pulse
//
function hostClockPulse()
{
   // Increment the hardware (host) clock.
   _OSclock++;
   // Call the kernel clock pulse event handler.
   krnOnCPUClockPulse();
}


//
// Keyboard Interrupt, a HARDWARE Interrupt Request. (See pages 560-561 in text book.)
//
function hostEnableKeyboardInterrupt()
{
    // Listen for key press (keydown, actually) events in the Document
    // and call the simulation processor, which will in turn call the 
    // OS interrupt handler.
    document.addEventListener("keydown", hostOnKeypress, false);
}

function hostDisableKeyboardInterrupt()
{
    document.removeEventListener("keydown", hostOnKeypress, false);
}

function hostOnKeypress(event)
{
    // The canvas element CAN receive focus if you give it a tab index, which we have.
    // Check that we are processing keystrokes only from the canvas's id (as set in index.html).
    if (event.target.id == "display")
    {
        event.preventDefault();
        // Note the pressed key code in the params (Mozilla-specific).
        var params = new Array(event.which, event.shiftKey);
        // Enqueue this interrupt on the kernel interrupt queue so that it gets to the Interrupt handler.
        _KernelInterruptQueue.enqueue( new Interrupt(KEYBOARD_IRQ, params) );
    }
}
