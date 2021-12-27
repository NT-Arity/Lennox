module.exports = function (reel1, reel2, reel3) {
    if (reel1 === reel2 && reel1 == reel3 && reel2 === reel3) {
        if (reel1 === "❌" || reel2 === "❌" || reel3 === "❌") return "Lost";

        return "Win";
    } else {
        return "Lost";
    }
}