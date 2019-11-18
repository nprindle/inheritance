// Contains different possible utility functions that determine which outcomes the enemy AI prefers
class AiUtilityFunctions {

    private static worstValue = Number.NEGATIVE_INFINITY;
    private static bestValue = Number.POSITIVE_INFINITY;

    /* aggression is the relative importance of damaging the player over healing the bot.
     * a bot with aggression 0 will not care about damaging the player
     * a bot with aggression greater than 1 will prefer damaging the player over healing itself
     */
    static genericUtility(bot: Enemy, human: Player, aggression: number): number {
        if (AiUtilityFunctions.dead(bot)) {
          return this.worstValue; // 3rd law of robotics
        }
        if (AiUtilityFunctions.dead(human)) {
          return this.bestValue;
        }

        let botStatusPoints = AiUtilityFunctions.statusUtilityPoints(bot);
        let humanStatusPoints = AiUtilityFunctions.statusUtilityPoints(human);
        let statusPoints = botStatusPoints - (humanStatusPoints * aggression);

        let healthDifferencePoints = (bot.health - human.health * aggression);

        return statusPoints + healthDifferencePoints;
    }

    static aggressiveUtility(bot: Enemy, human: Player) {
        return AiUtilityFunctions.genericUtility(bot, human, 10);
    }

    static cautiousUtility(bot: Enemy, human: Player) {
        return AiUtilityFunctions.genericUtility(bot, human, 1);
    }

    static defensiveUtility(bot: Enemy, human: Player) {
        return AiUtilityFunctions.genericUtility(bot, human, 0.25);
    }

    // tries to damage itself at much as possible. May or may not also damage the player
    static suicidalUtility(bot: Enemy, human: Player): number {
        return -1 * (bot.health + AiUtilityFunctions.statusUtilityPoints(bot));
    }

    // ranks all outcomes as equally prefereable, so the result is chosen at random
    static blindUtility(bot: Enemy, human: Player): number {
        return this.bestValue;
    }

    static friendlyUtility(bot: Enemy, human: Player): number {

        // avoid letting anyone die
        if (bot.health == 0 || human.health == 0) {
            return AiUtilityFunctions.worstValue;
        }

        let botStatusPoints = AiUtilityFunctions.statusUtilityPoints(bot);
        let humanStatusPoints = AiUtilityFunctions.statusUtilityPoints(human);
        let statusPoints = botStatusPoints + humanStatusPoints;

        let healthPoints = (bot.health + human.health);

        return statusPoints + healthPoints;
    }

    private static dead(combatant: Combatant): boolean  {
        return combatant.health == 0;
    }

    private static statusUtilityPoints(combatant: Combatant): number {
         return combatant.statuses.reduce((sum, current) => (sum + current.getUtility()), 0);
    }
}