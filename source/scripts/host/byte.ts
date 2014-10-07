/* ---------
    Byte

    Representation of a byte of data for programs.
    Instead of calling parseInt whenever you call getDecimal or getHex, its easier -
    to just store the numbers once they are set. Takes more memory for members, but less computations.
    --------*/

module CTOS
{
    export class Byte
    {
        private m_HexData: string = "00";
        private m_DecimalNumber: number = 0;

        constructor(hex: string)
        {
            this.m_HexData = hex;
            this.m_DecimalNumber = parseInt(this.m_HexData, 16);
        }

        public GetDecimal(): number
        {
            return this.m_DecimalNumber;
        }

        public GetHex(): string
        {
            return this.m_HexData;
        }

    }
}