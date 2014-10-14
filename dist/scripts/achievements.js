var CTOS;
(function (CTOS) {
    // Collection of achievements to gamify ctOS
    // List achievements in constructor TODO: make this neater? Maybe a file?
    var AchievementSystem = (function () {
        function AchievementSystem() {
            // Properties
            this.m_Score = 0;
            this.m_Unlocked = [];
            this.m_Achievements = [];
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
        }
        AchievementSystem.prototype.Unlock = function (achievementID) {
            // If an achievement has already been unlocked, ignore
            if (this.m_Achievements[achievementID].m_Locked) {
                // Make the achievement unlocked, keep track of unlocked achievements for later features
                this.m_Unlocked[achievementID] = true;
                this.m_Achievements[achievementID].m_Locked = false;

                // Increment the score display with achievement value
                this.IncrementScore(this.m_Achievements[achievementID].m_Score);

                // Add the achievement to our achievement display
                CTOS.Control.AchievementAddDisplay(achievementID, this.m_Achievements[achievementID]);

                // Notify the user of the achievement with an alert that disappears after 5 seconds
                CTOS.Control.AchievementNotify(achievementID);
            }
        };

        AchievementSystem.prototype.IncrementScore = function (score) {
            this.m_Score += score;
            CTOS.Control.AchievementIncrementScore(this.m_Score);
        };
        return AchievementSystem;
    })();
    CTOS.AchievementSystem = AchievementSystem;

    var Achievement = (function () {
        function Achievement(score, description) {
            // Properties
            this.m_Score = 0;
            this.m_Description = "";
            this.m_Locked = true;
            this.m_Score = score;
            this.m_Description = description;
        }
        return Achievement;
    })();
    CTOS.Achievement = Achievement;
})(CTOS || (CTOS = {}));
//# sourceMappingURL=achievements.js.map
