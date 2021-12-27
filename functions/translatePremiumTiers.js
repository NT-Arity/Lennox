module.exports = function (premiumTier) {
    if (premiumTier === "TIER_1") {
        return "Tier 1";
    } else if (premiumTier === "TIER_2") {
        return "Tier 2";
    } else if (premiumTier === "TIER_3") {
        return "Tier 3";
    } else {
        return "Tier 0 (None)";
    }
}