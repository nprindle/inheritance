// Contains different possible utility functions that determine which outcomes the enemy AI prefers
class AiUtilityFunctions {

    /* aggression is the relative importance of damaging the player over healing the bot.
     * a bot with aggression 0 will not care about damaging the player
     * a bot with aggression greater than 1 will prefer damaging the player over healing itself
     */
    static healthDifferenceUtility(bot: Enemy, human: Player, aggression: number): number {
        if (AiUtilityFunctions.dead(bot)) {
          return Number.MIN_VALUE; // 3rd law of robotics
        }
        if (AiUtilityFunctions.dead(human)) {
          return Number.MAX_VALUE;
        }

        return bot.health - (human.health * aggression);
    }

    static aggressiveUtility(bot: Enemy, human: Player) {
        return AiUtilityFunctions.healthDifferenceUtility(bot, human, 10);
    }

    static cautiousUtility(bot: Enemy, human: Player) {
        return AiUtilityFunctions.healthDifferenceUtility(bot, human, 1);
    }

    static defensiveUtility(bot: Enemy, human: Player) {
        return AiUtilityFunctions.healthDifferenceUtility(bot, human, 0.25);
    }

    // tries to damage itself at much as possible. May or may not also damage the player
    static suicidalUtility(bot: Enemy, human: Player): number {
        return -1 * bot.health;
    }

    // ranks all outcomes as equally prefereable, so the result is chosen at random
    static blindUtility(bot: Enemy, human: Player): number {
        return Number.MAX_VALUE;
    }

    private static dead(combatant: Combatant): boolean  {
        return combatant.health == 0;
    }
}