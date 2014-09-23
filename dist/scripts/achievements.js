var CTOS;
(function (CTOS) {
    // Collection of achievements to gamify ctOS
    // List achievements in constructor TODO: make this neater? Maybe a file?
    var AchievementSystem = (function () {
        function AchievementSystem() {
            // Properties
            this.m_Score = 0;
            this.m_Unlocked = [];
            this.m_AchievementDiv = null;
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
            this.m_AchievementDiv = document.getElementById("cbp-spmenu-s1");
        }
        AchievementSystem.prototype.Unlock = function (achievementID) {
            // If an achievement has already been unlocked, ignore
            if (this.m_Achievements[achievementID].m_Locked) {
                // Make the achievement unlocked, keep track of unlocked achievements for later features
                this.m_Unlocked[achievementID] = true;
                this.m_Achievements[achievementID].m_Locked = false;

                // Increment the score display with achievement value
                var score = this.m_Achievements[achievementID].m_Score;
                this.IncrementScore(score);

                // Add the achievement to our achievement display
                var achievementElement = document.createElement("achievement" + achievementID.toString());
                achievementElement.innerHTML = "</br> " + this.m_Achievements[achievementID].m_Description + " " + score.toString();
                this.m_AchievementDiv.appendChild(achievementElement);

                // Notify the user of the achievement with an alert that disappears after 5 seconds
                var notificationDiv = document.getElementById("achievementNotifDiv");
                var notificationElement = document.createElement("achievement" + achievementID.toString() + "Alert");
                notificationElement.className = "flash";
                notificationElement.innerHTML = "</br> </br><div class=\"alert alert-info\" role=\"alert\">Achievement unlocked!</div>";
                notificationDiv.appendChild(notificationElement);
            }
        };

        AchievementSystem.prototype.IncrementScore = function (score) {
            this.m_Score += score;
            var scoreElement = document.getElementById("achievementScore");
            scoreElement.innerText = "Achievements : " + this.m_Score.toString();
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
