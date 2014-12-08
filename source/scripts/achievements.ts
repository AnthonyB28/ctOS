module CTOS
{
    // Collection of achievements to gamify ctOS
    // List achievements in constructor TODO: make this neater? Maybe a file?
    export class AchievementSystem
    {
        // Properties
        private m_Score: number = 0;
        private m_Unlocked: Array<boolean> = [];
        private m_Achievements: Array<Achievement> = [];

        constructor()
        {
            this.m_Achievements[0] = new Achievement(5, "Started ctOS!");
            this.m_Achievements[1] = new Achievement(25, "Craig Is The Best");
            this.m_Achievements[2] = new Achievement(5, "Abstergo");
            this.m_Achievements[3] = new Achievement(5, "The Order");
            this.m_Achievements[4] = new Achievement(25, "BSOD ALL OVER");
            this.m_Achievements[5] = new Achievement(5, "Activate The Nemesis");
            this.m_Achievements[6] = new Achievement(10, "Apology Accepted");
            this.m_Achievements[6] = new Achievement(5, "Overflow!");
            this.m_Achievements[7] = new Achievement(5, "Auditore Lives");
            this.m_Achievements[8] = new Achievement(5, "WashDogs");
            this.m_Achievements[9] = new Achievement(30, "Secret Message");
            this.m_Achievements[10] = new Achievement(5, "On An Island");
            this.m_Achievements[11] = new Achievement(10, "Hex Sucess");
            this.m_Achievements[12] = new Achievement(10, "Social Butterfly");
            this.m_Achievements[13] = new Achievement(10, "Step Mode Master");
            this.m_Achievements[14] = new Achievement(20, "OUT OF BOUNDS!");
            this.m_Achievements[15] = new Achievement(5, "Invalid Op Fool");
            this.m_Achievements[16] = new Achievement(25, "My First Program");
            this.m_Achievements[17] = new Achievement(5, "CopyPasta");
            this.m_Achievements[18] = new Achievement(15, "Straightened Priorities");
            this.m_Achievements[19] = new Achievement(15, "Get off my swing");
            this.m_Achievements[20] = new Achievement(5, "Swap me");
            this.m_Achievements[21] = new Achievement(5, "Only shoot once");
            this.m_Achievements[22] = new Achievement(10, "Swap me");
            this.m_Achievements[23] = new Achievement(5, "Spring Cleaning");
            this.m_Achievements[24] = new Achievement(25, "Need Another TB Pls");
            this.m_Achievements[25] = new Achievement(25, "Don't buy a SSD");
        }

        public Unlock(achievementID : number): void
        {
            // If an achievement has already been unlocked, ignore
            if (this.m_Achievements[achievementID].m_Locked)
            {
                // Make the achievement unlocked, keep track of unlocked achievements for later features
                this.m_Unlocked[achievementID] = true;
                this.m_Achievements[achievementID].m_Locked = false;

                // Increment the score display with achievement value
                this.IncrementScore(this.m_Achievements[achievementID].m_Score);

                // Add the achievement to our achievement display
                Control.AchievementAddDisplay(achievementID, this.m_Achievements[achievementID]);

                // Notify the user of the achievement with an alert that disappears after 5 seconds
                Control.AchievementNotify(achievementID);
            }
        }

        private IncrementScore(score: number): void
        {
            this.m_Score += score;
            Control.AchievementIncrementScore(this.m_Score);
        }
    }

    export class Achievement
    {
        // Properties
        public m_Score: number = 0;
        public m_Description: string = "";
        public m_Locked: boolean = true;

        constructor(score: number, description: string)
        {
            this.m_Score = score;
            this.m_Description = description;
        }
    }
}