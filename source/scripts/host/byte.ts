/* ---------
    Byte

    Representation of a byte of data for programs.
    --------*/

module CTOS
{
    export class Byte
    {
        private m_HexData: string = "";

        constructor(hex: string)
        {
            this.m_HexData = hex;
        }

        public GetDecimal(): number
        {
            return parseInt(this.m_HexData, 10);
        }

        public GetHex(): number
        {
            return parseInt(this.m_HexData, 16);
        }

        public GetRawHex(): string
        {
            return this.m_HexData;
        }

    }
}