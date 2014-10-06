/* ------------
    Instructions

    http://www.labouseur.com/commondocs/6502alan-instruction-set.pdf

    The instruction set for 6502 needed for P2.
     ------------ */

module CTOS
{
    export class Instructions
    {
        static Op_A9: number = 169;
        static Op_AD: number = 173;
        static Op_8D: number = 141;
        static Op_6D: number = 109;
        static Op_A2: number = 162;
        static Op_AE: number = 174;
        static Op_A0: number = 160;
        static Op_AC: number = 172;
        static Op_EA: number = 234;
        static Op_00: number = 0;
        static Op_EC: number = 236;
        static Op_D0: number = 208;
        static Op_EE: number = 238;
        static Op_FF: number = 255;
    }
} 