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
  "ANGEL", "ALARM", "ACTOR", "ABOVE", "ADULT", "AGENT", "ANGER", "AWARD",
  "BASIS", "BELOW", "BENCH", "BLACK", "BLAME", "BLIND", "BLOOD", "BONUS",
  "BRAND", "BRIEF", "BROAD", "BROWN", "BUILD", "BUNCH", "CABLE", "CAMEL",
  "CARRY", "CATCH", "CAUSE", "CHAIN", "CHART", "CHIEF", "CHILD", "CIVIL",
  "CLAIM", "CLASS", "CLEAN", "CLEAR", "CLIMB", "CLOSE", "COACH", "COAST",
  "COURT", "CRAFT", "CRASH", "CRIME", "CYCLE", "DAILY", "DEATH", "DEPTH",
  "DRAMA", "ENTRY", "EQUAL", "ERROR", "EVENT", "FAITH", "FAULT", "FIBER",
  "FIGHT", "FINAL", "FLOOR", "FOCUS", "FRAME", "FRONT", "FUNNY", "GIANT",
  "GRANT", "GROUP", "GUARD", "GUIDE", "HEAVY", "HORSE", "HUMAN", "IMAGE",
  "INPUT", "ISSUE", "JUDGE", "JUMBO", "LARGE", "LAUGH", "LAYER", "LEGAL",
  "LEVEL", "LIMIT", "LOCAL", "LOGIC", "LOOSE", "LUCKY", "LUNCH", "MAJOR",
  "MARCH", "MATCH", "METAL", "MODEL", "MONTH", "MOTOR", "NIGHT", "NOISE",
  "NORTH", "NOVEL", "NURSE", "OFFER", "ORDER", "OTHER", "OWNER", "PANEL",
  "PARENT", "PATCH", "PEACE", "PETER", "PHASE", "PHOTO", "PIECE", "PILOT",
  "PITCH", "PLACE", "PLAIN", "PLANE", "POINT", "POUND", "POWER", "PRESS",
  "PRICE", "PRIDE", "PRIME", "PRINT", "PRIOR", "PROOF", "PROUD", "PUPIL",
  "QUICK", "QUIET", "QUITE", "RANGE", "RATIO", "REACH", "REACT", "REPLY",
  "RIGHT", "ROUTE", "ROUND", "ROYAL", "RURAL", "SCALE", "SENSE", "SERVE",
  "SHADE", "SHAKE", "SHALL", "SHAPE", "SHARE", "SHARP", "SHEET", "SHIFT",
  "SHINE", "SHIRT", "SHOCK", "SHOOT", "SHORT", "SHOUT", "SIGHT", "SINCE",
  "SKILL", "SLEEP", "SLIDE", "SMALL", "SMART", "SMOKE", "SOLID", "SOLVE",
  "SORRY", "SOUTH", "SPARE", "SPEAK", "SPEED", "SPEND", "SPORT", "STAFF",
  "STAGE", "START", "STATE", "STEAM", "STEEL", "STICK", "STILL", "STOCK",
  "STORE", "STUDY", "STUFF", "STYLE", "SUGAR", "SUPER", "SWEET", "THING",
  "THINK", "THIRD", "THREE", "THROW", "TIGHT", "TIMES", "TIRED", "TITLE",
  "TOTAL", "TOUCH", "TOWER", "TRACK", "TRADE", "TREAT", "TREND", "TRIAL",
  "TRUCK", "TRULY", "TRUST", "TRUTH", "TWICE", "UNCLE", "UNDER", "UNION",
  "UNTIL", "UPPER", "URBAN", "USAGE", "USUAL", "VALID", "VALUE", "VIDEO",
  "VIRUS", "VISIT", "VITAL", "VOICE", "WASTE", "WATCH", "WEIGH", "WHEEL",
  "WHERE", "WHICH", "WHILE", "WHOLE", "WHOSE", "WOMAN", "WORRY", "WORSE",
  "WORTH", "WOULD", "WRONG", "YOUNG", "YOUTH"
];

export const getDayOfYear = () => {
  const now = new Date();
  const startOfYear = new Date(Date.UTC(now.getUTCFullYear(), 0, 0));
  const diff = now.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

export const getDailyWord = () => {
  const dayOfYear = getDayOfYear();
  const index = dayOfYear % wordList.length;
  return wordList[index];
};
