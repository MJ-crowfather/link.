const wordList = [
  "APPLE", "BEACH", "BRAIN", "BREAD", "BRUSH", "CHAIR", "CHEST", "CHORD",
  "CLICK", "CLOCK", "CLOUD", "DANCE", "DIARY", "DRINK", "EARTH", "FLUTE",
  "FRUIT", "GHOST", "GRAPE", "GREEN", "HAPPY", "HEART", "HOUSE", "JUICE",
  "LIGHT", "MONEY", "MUSIC", "PARTY", "PIZZA", "PLANT", "RADIO", "RIVER",
  "SALAD", "SHEEP", "SHOES", "SMILE", "SNACK", "SNAKE", "SOUND", "STORM",
  "TABLE", "TOAST", "TIGER", "TRAIN", "WATER", "WHALE", "WHITE", "WOMAN",
  "WORLD", "WRITE", "YACHT", "ZEBRA", "STONE", "PHONE", "PAPER", "DREAM",
  "WATCH", "SPACE", "QUEEN", "NORTH", "MOUTH", "MAGIC", "LASER", "KNIFE",
  "JEWEL", "INDEX", "HOTEL", "GRASS", "GLASS", "FORCE", "FIELD", "EXTRA",
  "DRIVE", "DOUBT", "CROSS", "COVER", "CREAM", "BOARD", "BLOCK", "BIRTH",
  "ANGEL", "ALARM", "ACTOR", "ABOVE", "ADULT", "AGENT", "ANGER",
  "AWARD", "BASIS", "BELOW", "BENCH", "BLACK", "BLAME", "BLIND",
  "BLOOD", "BONUS", "BRAND", "BRIEF", "BROAD", "BROWN", "BUILD", "BUNCH",
  "CABLE", "CAMEL", "CARRY", "CATCH", "CAUSE", "CHAIN", "CHART", "CHIEF",
  "CHILD", "CIVIL", "CLAIM", "CLASS", "CLEAN", "CLEAR", "CLIMB", "CLOSE",
  "COACH", "COAST", "COURT", "CRAFT", "CRASH", "CRIME", "CYCLE", "DAILY",
  "DEATH", "DEPTH", "DRAMA", "ENTRY", "EQUAL", "ERROR", "EVENT", "FAITH",
  "FAULT", "FIBER", "FIGHT", "FINAL", "FLOOR", "FOCUS", "FRAME", "FRONT",
  "FUNNY", "GIANT", "GRANT", "GROUP", "GUARD", "GUIDE", "HEAVY", "HORSE",
  "HUMAN", "IMAGE", "INPUT", "ISSUE", "JUDGE", "JUMBO", "LARGE", "LAUGH",
  "LAYER", "LEGAL", "LEVEL", "LIMIT", "LOCAL", "LOGIC", "LOOSE", "LUCKY",
  "LUNCH", "MAJOR", "MARCH", "MATCH", "METAL", "MODEL", "MONTH", "MOTOR"
];

export const getDayOfYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now as any) - (start as any);
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

export const getDailyWord = () => {
    const dayOfYear = getDayOfYear();
    const index = dayOfYear % wordList.length;
    return wordList[index];
}
