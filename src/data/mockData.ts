export type Word = {
  id: string;
  topicId: string;
  english: string;
  vietnamese: string;
  emoji: string;
};

export type Conversation = {
  id: string;
  title: string;
  vietnameseTitle: string;
  image: string;
  dialogue: {
    speaker: string;
    text: string;
    vietnamese: string;
    audio?: string;
  }[];
};

export type Topic = {
  id: string;
  name: string;
  vietnameseName: string;
  icon: string;
  color: string;
  words: Word[];
};

// Helper to generate more words (simulated for now, in real app this would be a large JSON)
const generateWords = (topicId: string, baseWords: Partial<Word>[]): Word[] => {
  return baseWords.map((w, i) => ({
    id: `${topicId}-${i}`,
    topicId,
    english: w.english || 'Word',
    vietnamese: w.vietnamese || 'Từ',
    emoji: w.emoji || '✨',
  }));
};

export const TOPICS: Topic[] = [
  {
    id: 'animals',
    name: 'Animals',
    vietnameseName: 'Động vật',
    icon: '🐶',
    color: 'bg-emerald-400',
    words: [
      // Set 1
      { id: 'dog', topicId: 'animals', english: 'Dog', vietnamese: 'Con chó', emoji: '🐶' },
      { id: 'cat', topicId: 'animals', english: 'Cat', vietnamese: 'Con mèo', emoji: '🐱' },
      { id: 'mouse', topicId: 'animals', english: 'Mouse', vietnamese: 'Con chuột', emoji: '🐭' },
      { id: 'elephant', topicId: 'animals', english: 'Elephant', vietnamese: 'Con voi', emoji: '🐘' },
      { id: 'lion', topicId: 'animals', english: 'Lion', vietnamese: 'Sư tử', emoji: '🦁' },
      { id: 'monkey', topicId: 'animals', english: 'Monkey', vietnamese: 'Con khỉ', emoji: '🐵' },
      { id: 'tiger', topicId: 'animals', english: 'Tiger', vietnamese: 'Con hổ', emoji: '🐯' },
      { id: 'rabbit', topicId: 'animals', english: 'Rabbit', vietnamese: 'Con thỏ', emoji: '🐰' },
      { id: 'panda', topicId: 'animals', english: 'Panda', vietnamese: 'Gấu trúc', emoji: '🐼' },
      { id: 'bear', topicId: 'animals', english: 'Bear', vietnamese: 'Con gấu', emoji: '🐻' },
      // Set 2
      { id: 'fox', topicId: 'animals', english: 'Fox', vietnamese: 'Con cáo', emoji: '🦊' },
      { id: 'wolf', topicId: 'animals', english: 'Wolf', vietnamese: 'Con sói', emoji: '🐺' },
      { id: 'frog', topicId: 'animals', english: 'Frog', vietnamese: 'Con ếch', emoji: '🐸' },
      { id: 'cow', topicId: 'animals', english: 'Cow', vietnamese: 'Con bò', emoji: '🐮' },
      { id: 'pig', topicId: 'animals', english: 'Pig', vietnamese: 'Con lợn', emoji: '🐷' },
      { id: 'sheep', topicId: 'animals', english: 'Sheep', vietnamese: 'Con cừu', emoji: '🐑' },
      { id: 'chicken', topicId: 'animals', english: 'Chicken', vietnamese: 'Con gà', emoji: '🐔' },
      { id: 'duck', topicId: 'animals', english: 'Duck', vietnamese: 'Con vịt', emoji: '🦆' },
      { id: 'horse', topicId: 'animals', english: 'Horse', vietnamese: 'Con ngựa', emoji: '🐴' },
      { id: 'zebra', topicId: 'animals', english: 'Zebra', vietnamese: 'Ngựa vằn', emoji: '🦓' },
      // Set 3
      { id: 'giraffe', topicId: 'animals', english: 'Giraffe', vietnamese: 'Hươu cao cổ', emoji: '🦒' },
      { id: 'hippo', topicId: 'animals', english: 'Hippo', vietnamese: 'Hà mã', emoji: '🦛' },
      { id: 'kangaroo', topicId: 'animals', english: 'Kangaroo', vietnamese: 'Chuột túi', emoji: '🦘' },
      { id: 'koala', topicId: 'animals', english: 'Koala', vietnamese: 'Gấu túi', emoji: '🐨' },
      { id: 'penguin', topicId: 'animals', english: 'Penguin', vietnamese: 'Chim cánh cụt', emoji: '🐧' },
      { id: 'shark', topicId: 'animals', english: 'Shark', vietnamese: 'Cá mập', emoji: '🦈' },
      { id: 'whale', topicId: 'animals', english: 'Whale', vietnamese: 'Cá voi', emoji: '🐳' },
      { id: 'dolphin', topicId: 'animals', english: 'Dolphin', vietnamese: 'Cá heo', emoji: '🐬' },
      { id: 'octopus', topicId: 'animals', english: 'Octopus', vietnamese: 'Bạch tuộc', emoji: '🐙' },
      { id: 'turtle', topicId: 'animals', english: 'Turtle', vietnamese: 'Con rùa', emoji: '🐢' },
      // Set 4
      { id: 'bee', topicId: 'animals', english: 'Bee', vietnamese: 'Con ong', emoji: '🐝' },
      { id: 'butterfly', topicId: 'animals', english: 'Butterfly', vietnamese: 'Con bướm', emoji: '🦋' },
      { id: 'ant', topicId: 'animals', english: 'Ant', vietnamese: 'Con kiến', emoji: '🐜' },
      { id: 'spider', topicId: 'animals', english: 'Spider', vietnamese: 'Con nhện', emoji: '🕷️' },
      { id: 'snake', topicId: 'animals', english: 'Snake', vietnamese: 'Con rắn', emoji: '🐍' },
      { id: 'lizard', topicId: 'animals', english: 'Lizard', vietnamese: 'Thằn lằn', emoji: '🦎' },
      { id: 'crocodile', topicId: 'animals', english: 'Crocodile', vietnamese: 'Cá sấu', emoji: '🐊' },
      { id: 'bat', topicId: 'animals', english: 'Bat', vietnamese: 'Con dơi', emoji: '🦇' },
      { id: 'owl', topicId: 'animals', english: 'Owl', vietnamese: 'Con cú', emoji: '🦉' },
      { id: 'eagle', topicId: 'animals', english: 'Eagle', vietnamese: 'Đại bàng', emoji: '🦅' },
      // Set 5
      { id: 'parrot', topicId: 'animals', english: 'Parrot', vietnamese: 'Con vẹt', emoji: '🦜' },
      { id: 'flamingo', topicId: 'animals', english: 'Flamingo', vietnamese: 'Hồng hạc', emoji: '🦩' },
      { id: 'peacock', topicId: 'animals', english: 'Peacock', vietnamese: 'Con công', emoji: '🦚' },
      { id: 'swan', topicId: 'animals', english: 'Swan', vietnamese: 'Thiên nga', emoji: '🦢' },
      { id: 'goose', topicId: 'animals', english: 'Goose', vietnamese: 'Con ngỗng', emoji: '🪿' },
      { id: 'turkey', topicId: 'animals', english: 'Turkey', vietnamese: 'Gà tây', emoji: '🦃' },
      { id: 'rooster', topicId: 'animals', english: 'Rooster', vietnamese: 'Gà trống', emoji: '🐓' },
      { id: 'hen', topicId: 'animals', english: 'Hen', vietnamese: 'Gà mái', emoji: '🐔' },
      { id: 'chick', topicId: 'animals', english: 'Chick', vietnamese: 'Gà con', emoji: '🐥' },
      { id: 'camel', topicId: 'animals', english: 'Camel', vietnamese: 'Lạc đà', emoji: '🐫' },
      // Set 6
      { id: 'donkey', topicId: 'animals', english: 'Donkey', vietnamese: 'Con lừa', emoji: '🫏' },
      { id: 'goat', topicId: 'animals', english: 'Goat', vietnamese: 'Con dê', emoji: '🐐' },
      { id: 'deer', topicId: 'animals', english: 'Deer', vietnamese: 'Con hươu', emoji: '🦌' },
      { id: 'moose', topicId: 'animals', english: 'Moose', vietnamese: 'Nai sừng tấm', emoji: '🫎' },
      { id: 'squirrel', topicId: 'animals', english: 'Squirrel', vietnamese: 'Con sóc', emoji: '🐿️' },
      { id: 'raccoon', topicId: 'animals', english: 'Raccoon', vietnamese: 'Gấu mèo', emoji: '🦝' },
      { id: 'skunk', topicId: 'animals', english: 'Skunk', vietnamese: 'Chồn hôi', emoji: '🦨' },
      { id: 'beaver', topicId: 'animals', english: 'Beaver', vietnamese: 'Hải ly', emoji: '🦫' },
      { id: 'otter', topicId: 'animals', english: 'Otter', vietnamese: 'Rái cá', emoji: '🦦' },
      { id: 'crab', topicId: 'animals', english: 'Crab', vietnamese: 'Con cua', emoji: '🦀' },
      // Set 7
      { id: 'lobster', topicId: 'animals', english: 'Lobster', vietnamese: 'Tôm hùm', emoji: '🦞' },
      { id: 'shrimp', topicId: 'animals', english: 'Shrimp', vietnamese: 'Con tôm', emoji: '🦐' },
      { id: 'seahorse', topicId: 'animals', english: 'Seahorse', vietnamese: 'Cá ngựa', emoji: '🫵' },
      { id: 'starfish', topicId: 'animals', english: 'Starfish', vietnamese: 'Sao biển', emoji: '⭐' },
      { id: 'jellyfish', topicId: 'animals', english: 'Jellyfish', vietnamese: 'Con sứa', emoji: '🪼' },
      { id: 'seal', topicId: 'animals', english: 'Hải cẩu', vietnamese: 'Hải cẩu', emoji: '🦭' },
      { id: 'walrus', topicId: 'animals', english: 'Walrus', vietnamese: 'Moóc', emoji: '🦭' },
      { id: 'polar-bear', topicId: 'animals', english: 'Polar Bear', vietnamese: 'Gấu bắc cực', emoji: '🐻‍❄️' },
      { id: 'cheetah', topicId: 'animals', english: 'Cheetah', vietnamese: 'Báo săn', emoji: '🐆' },
      { id: 'leopard', topicId: 'animals', english: 'Leopard', vietnamese: 'Con báo', emoji: '🐆' },
      // Set 8
      { id: 'jaguar', topicId: 'animals', english: 'Jaguar', vietnamese: 'Báo đốm', emoji: '🐆' },
      { id: 'panther', topicId: 'animals', english: 'Panther', vietnamese: 'Báo đen', emoji: '🐆' },
      { id: 'hyena', topicId: 'animals', english: 'Hyena', vietnamese: 'Linh cẩu', emoji: '🐆' },
      { id: 'gorilla', topicId: 'animals', english: 'Gorilla', vietnamese: 'Khỉ đột', emoji: '🦍' },
      { id: 'chimpanzee', topicId: 'animals', english: 'Chimpanzee', vietnamese: 'Tinh tinh', emoji: '🦧' },
      { id: 'orangutan', topicId: 'animals', english: 'Orangutan', vietnamese: 'Đười ươi', emoji: '🦧' },
      { id: 'baboon', topicId: 'animals', english: 'Baboon', vietnamese: 'Khỉ đầu chó', emoji: '🐒' },
      { id: 'lemur', topicId: 'animals', english: 'Lemur', vietnamese: 'Vượn cáo', emoji: '🐒' },
      { id: 'rhino', topicId: 'animals', english: 'Rhino', vietnamese: 'Tê giác', emoji: '🦏' },
      { id: 'buffalo', topicId: 'animals', english: 'Buffalo', vietnamese: 'Con trâu', emoji: '🐃' },
      // Set 9
      { id: 'bull', topicId: 'animals', english: 'Bull', vietnamese: 'Bò tót', emoji: '🐂' },
      { id: 'ox', topicId: 'animals', english: 'Ox', vietnamese: 'Con bò', emoji: '🐂' },
      { id: 'ram', topicId: 'animals', english: 'Ram', vietnamese: 'Cừu đực', emoji: '🐏' },
      { id: 'ewe', topicId: 'animals', english: 'Ewe', vietnamese: 'Cừu cái', emoji: '🐑' },
      { id: 'lamb', topicId: 'animals', english: 'Lamb', vietnamese: 'Cừu non', emoji: '🐑' },
      { id: 'calf', topicId: 'animals', english: 'Calf', vietnamese: 'Bê', emoji: '🐮' },
      { id: 'foal', topicId: 'animals', english: 'Foal', vietnamese: 'Ngựa con', emoji: '🐴' },
      { id: 'puppy', topicId: 'animals', english: 'Puppy', vietnamese: 'Chó con', emoji: '🐶' },
      { id: 'kitten', topicId: 'animals', english: 'Kitten', vietnamese: 'Mèo con', emoji: '🐱' },
      { id: 'hamster', topicId: 'animals', english: 'Hamster', vietnamese: 'Chuột hamster', emoji: '🐹' },
      // Set 10
      { id: 'guinea-pig', topicId: 'animals', english: 'Guinea Pig', vietnamese: 'Chuột lang', emoji: '🐹' },
      { id: 'goldfish', topicId: 'animals', english: 'Goldfish', vietnamese: 'Cá vàng', emoji: '🐠' },
      { id: 'canary', topicId: 'animals', english: 'Canary', vietnamese: 'Chim yến hót', emoji: '🐦' },
      { id: 'pigeon', topicId: 'animals', english: 'Pigeon', vietnamese: 'Bồ câu', emoji: '🐦' },
      { id: 'crow', topicId: 'animals', english: 'Crow', vietnamese: 'Con quạ', emoji: '🐦' },
      { id: 'sparrow', topicId: 'animals', english: 'Sparrow', vietnamese: 'Chim sẻ', emoji: '🐦' },
      { id: 'woodpecker', topicId: 'animals', english: 'Woodpecker', vietnamese: 'Chim gõ kiến', emoji: '🐦' },
      { id: 'hummingbird', topicId: 'animals', english: 'Hummingbird', vietnamese: 'Chim ruồi', emoji: '🐦' },
      { id: 'snail', topicId: 'animals', english: 'Snail', vietnamese: 'Con ốc sên', emoji: '🐌' },
      { id: 'worm', topicId: 'animals', english: 'Worm', vietnamese: 'Con sâu', emoji: '🪱' },
    ],
  },
  {
    id: 'fruits',
    name: 'Fruits',
    vietnameseName: 'Trái cây',
    icon: '🍎',
    color: 'bg-rose-400',
    words: [
      // Set 1
      { id: 'apple', topicId: 'fruits', english: 'Apple', vietnamese: 'Quả táo', emoji: '🍎' },
      { id: 'banana', topicId: 'fruits', english: 'Banana', vietnamese: 'Quả chuối', emoji: '🍌' },
      { id: 'orange', topicId: 'fruits', english: 'Orange', vietnamese: 'Quả cam', emoji: '🍊' },
      { id: 'grape', topicId: 'fruits', english: 'Grape', vietnamese: 'Quả nho', emoji: '🍇' },
      { id: 'watermelon', topicId: 'fruits', english: 'Watermelon', vietnamese: 'Dưa hấu', emoji: '🍉' },
      { id: 'strawberry', topicId: 'fruits', english: 'Strawberry', vietnamese: 'Dâu tây', emoji: '🍓' },
      { id: 'mango', topicId: 'fruits', english: 'Mango', vietnamese: 'Quả xoài', emoji: '🥭' },
      { id: 'pineapple', topicId: 'fruits', english: 'Pineapple', vietnamese: 'Quả dứa', emoji: '🍍' },
      { id: 'pear', topicId: 'fruits', english: 'Pear', vietnamese: 'Quả lê', emoji: '🍐' },
      { id: 'peach', topicId: 'fruits', english: 'Peach', vietnamese: 'Quả đào', emoji: '🍑' },
      // Set 2
      { id: 'cherry', topicId: 'fruits', english: 'Cherry', vietnamese: 'Quả anh đào', emoji: '🍒' },
      { id: 'lemon', topicId: 'fruits', english: 'Lemon', vietnamese: 'Quả chanh', emoji: '🍋' },
      { id: 'lime', topicId: 'fruits', english: 'Lime', vietnamese: 'Quả chanh xanh', emoji: '🍋' },
      { id: 'coconut', topicId: 'fruits', english: 'Coconut', vietnamese: 'Quả dừa', emoji: '🥥' },
      { id: 'papaya', topicId: 'fruits', english: 'Papaya', vietnamese: 'Quả đu đủ', emoji: '🥭' },
      { id: 'kiwi', topicId: 'fruits', english: 'Kiwi', vietnamese: 'Quả kiwi', emoji: '🥝' },
      { id: 'avocado', topicId: 'fruits', english: 'Avocado', vietnamese: 'Quả bơ', emoji: '🥑' },
      { id: 'pomegranate', topicId: 'fruits', english: 'Pomegranate', vietnamese: 'Quả lựu', emoji: '🍎' },
      { id: 'blueberry', topicId: 'fruits', english: 'Blueberry', vietnamese: 'Việt quất', emoji: '🫐' },
      { id: 'raspberry', topicId: 'fruits', english: 'Raspberry', vietnamese: 'Quả mâm xôi', emoji: '🍓' },
      // Set 3
      { id: 'blackberry', topicId: 'fruits', english: 'Blackberry', vietnamese: 'Dâu tằm', emoji: '🫐' },
      { id: 'melon', topicId: 'fruits', english: 'Melon', vietnamese: 'Dưa lưới', emoji: '🍈' },
      { id: 'cantaloupe', topicId: 'fruits', english: 'Cantaloupe', vietnamese: 'Dưa vàng', emoji: '🍈' },
      { id: 'fig', topicId: 'fruits', english: 'Fig', vietnamese: 'Quả sung', emoji: '🍎' },
      { id: 'date', topicId: 'fruits', english: 'Date', vietnamese: 'Quả chà là', emoji: '🥥' },
      { id: 'apricot', topicId: 'fruits', english: 'Apricot', vietnamese: 'Quả mơ', emoji: '🍑' },
      { id: 'plum', topicId: 'fruits', english: 'Plum', vietnamese: 'Quả mận', emoji: '🍑' },
      { id: 'guava', topicId: 'fruits', english: 'Guava', vietnamese: 'Quả ổi', emoji: '🍏' },
      { id: 'lychee', topicId: 'fruits', english: 'Lychee', vietnamese: 'Quả vải', emoji: '🍒' },
      { id: 'durian', topicId: 'fruits', english: 'Durian', vietnamese: 'Sầu riêng', emoji: '🍈' },
      // Set 4
      { id: 'mangosteen', topicId: 'fruits', english: 'Mangosteen', vietnamese: 'Măng cụt', emoji: '🟣' },
      { id: 'jackfruit', topicId: 'fruits', english: 'Jackfruit', vietnamese: 'Quả mít', emoji: '🍈' },
      { id: 'dragonfruit', topicId: 'fruits', english: 'Dragonfruit', vietnamese: 'Thanh long', emoji: '🌵' },
      { id: 'starfruit', topicId: 'fruits', english: 'Starfruit', vietnamese: 'Quả khế', emoji: '⭐' },
      { id: 'passionfruit', topicId: 'fruits', english: 'Passionfruit', vietnamese: 'Chanh dây', emoji: '🟣' },
      { id: 'tangerine', topicId: 'fruits', english: 'Tangerine', vietnamese: 'Quả quýt', emoji: '🍊' },
      { id: 'grapefruit', topicId: 'fruits', english: 'Grapefruit', vietnamese: 'Quả bưởi', emoji: '🍊' },
      { id: 'pomelo', topicId: 'fruits', english: 'Pomelo', vietnamese: 'Quả bưởi', emoji: '🍊' },
      { id: 'persimmon', topicId: 'fruits', english: 'Persimmon', vietnamese: 'Quả hồng', emoji: '🍊' },
      { id: 'longan', topicId: 'fruits', english: 'Longan', vietnamese: 'Quả nhãn', emoji: '🟤' },
      // Set 5-10: Simulated for brevity but following the pattern
      ...Array.from({ length: 60 }).map((_, i) => ({
        id: `fruit-extra-${i}`,
        topicId: 'fruits',
        english: `Fruit ${i + 41}`,
        vietnamese: `Trái cây ${i + 41}`,
        emoji: '🍎',
      })),
    ],
  },
  {
    id: 'colors',
    name: 'Colors',
    vietnameseName: 'Màu sắc',
    icon: '🎨',
    color: 'bg-sky-400',
    words: [
      // Set 1
      { id: 'red', topicId: 'colors', english: 'Red', vietnamese: 'Màu đỏ', emoji: '🔴' },
      { id: 'blue', topicId: 'colors', english: 'Blue', vietnamese: 'Màu xanh dương', emoji: '🔵' },
      { id: 'yellow', topicId: 'colors', english: 'Yellow', vietnamese: 'Màu vàng', emoji: '🟡' },
      { id: 'green', topicId: 'colors', english: 'Green', vietnamese: 'Màu xanh lá', emoji: '🟢' },
      { id: 'pink', topicId: 'colors', english: 'Pink', vietnamese: 'Màu hồng', emoji: '🌸' },
      { id: 'purple', topicId: 'colors', english: 'Purple', vietnamese: 'Màu tím', emoji: '🟣' },
      { id: 'orange-color', topicId: 'colors', english: 'Orange', vietnamese: 'Màu cam', emoji: '🟠' },
      { id: 'black', topicId: 'colors', english: 'Black', vietnamese: 'Màu đen', emoji: '⚫' },
      { id: 'white', topicId: 'colors', english: 'White', vietnamese: 'Màu trắng', emoji: '⚪' },
      { id: 'brown', topicId: 'colors', english: 'Brown', vietnamese: 'Màu nâu', emoji: '🟤' },
      // Set 2
      { id: 'gray', topicId: 'colors', english: 'Gray', vietnamese: 'Màu xám', emoji: '🔘' },
      { id: 'silver', topicId: 'colors', english: 'Silver', vietnamese: 'Màu bạc', emoji: '🥈' },
      { id: 'gold', topicId: 'colors', english: 'Gold', vietnamese: 'Màu vàng kim', emoji: '🥇' },
      { id: 'navy', topicId: 'colors', english: 'Navy', vietnamese: 'Xanh hải quân', emoji: '🔵' },
      { id: 'teal', topicId: 'colors', english: 'Teal', vietnamese: 'Xanh mòng két', emoji: '🟢' },
      { id: 'cyan', topicId: 'colors', english: 'Cyan', vietnamese: 'Xanh lơ', emoji: '🔵' },
      { id: 'magenta', topicId: 'colors', english: 'Magenta', vietnamese: 'Màu đỏ cánh sen', emoji: '🟣' },
      { id: 'lime', topicId: 'colors', english: 'Lime', vietnamese: 'Màu chanh', emoji: '🟢' },
      { id: 'indigo', topicId: 'colors', english: 'Indigo', vietnamese: 'Màu chàm', emoji: '🟣' },
      { id: 'violet', topicId: 'colors', english: 'Violet', vietnamese: 'Màu tím violet', emoji: '🟣' },
      // Set 3-10: Simulated
      ...Array.from({ length: 80 }).map((_, i) => ({
        id: `color-extra-${i}`,
        topicId: 'colors',
        english: `Color ${i + 21}`,
        vietnamese: `Màu sắc ${i + 21}`,
        emoji: '🎨',
      })),
    ],
  },
  {
    id: 'family',
    name: 'Family',
    vietnameseName: 'Gia đình',
    icon: '👨‍👩‍👧‍👦',
    color: 'bg-amber-400',
    words: [
      // Set 1
      { id: 'father', topicId: 'family', english: 'Father', vietnamese: 'Bố', emoji: '👨' },
      { id: 'mother', topicId: 'family', english: 'Mother', vietnamese: 'Mẹ', emoji: '👩' },
      { id: 'brother', topicId: 'family', english: 'Brother', vietnamese: 'Anh/Em trai', emoji: '👦' },
      { id: 'sister', topicId: 'family', english: 'Sister', vietnamese: 'Chị/Em gái', emoji: '👧' },
      { id: 'grandfather', topicId: 'family', english: 'Grandfather', vietnamese: 'Ông', emoji: '👴' },
      { id: 'grandmother', topicId: 'family', english: 'Grandmother', vietnamese: 'Bà', emoji: '👵' },
      { id: 'baby', topicId: 'family', english: 'Baby', vietnamese: 'Em bé', emoji: '👶' },
      { id: 'uncle', topicId: 'family', english: 'Uncle', vietnamese: 'Chú/Bác trai', emoji: '👨‍💼' },
      { id: 'aunt', topicId: 'family', english: 'Aunt', vietnamese: 'Cô/Bác gái', emoji: '👩‍💼' },
      { id: 'cousin', topicId: 'family', english: 'Cousin', vietnamese: 'Anh chị em họ', emoji: '🧑‍🤝‍🧑' },
      // Set 2
      { id: 'son', topicId: 'family', english: 'Son', vietnamese: 'Con trai', emoji: '👦' },
      { id: 'daughter', topicId: 'family', english: 'Daughter', vietnamese: 'Con gái', emoji: '👧' },
      { id: 'nephew', topicId: 'family', english: 'Nephew', vietnamese: 'Cháu trai', emoji: '👦' },
      { id: 'niece', topicId: 'family', english: 'Niece', vietnamese: 'Cháu gái', emoji: '👧' },
      { id: 'husband', topicId: 'family', english: 'Husband', vietnamese: 'Chồng', emoji: '👨' },
      { id: 'wife', topicId: 'family', english: 'Wife', vietnamese: 'Vợ', emoji: '👩' },
      { id: 'parent', topicId: 'family', english: 'Parent', vietnamese: 'Phụ huynh', emoji: '👪' },
      { id: 'sibling', topicId: 'family', english: 'Sibling', vietnamese: 'Anh chị em', emoji: '🧑‍🤝‍🧑' },
      { id: 'relative', topicId: 'family', english: 'Relative', vietnamese: 'Họ hàng', emoji: '🧑‍🤝‍🧑' },
      { id: 'grandchild', topicId: 'family', english: 'Grandchild', vietnamese: 'Cháu', emoji: '👶' },
      // Set 3-10: Simulated
      ...Array.from({ length: 80 }).map((_, i) => ({
        id: `family-extra-${i}`,
        topicId: 'family',
        english: `Relative ${i + 21}`,
        vietnamese: `Họ hàng ${i + 21}`,
        emoji: '👨‍👩‍👧‍👦',
      })),
    ],
  },
  {
    id: 'household',
    name: 'Household',
    vietnameseName: 'Vật dụng gia đình',
    icon: '🏠',
    color: 'bg-orange-400',
    words: [
      // Set 1
      { id: 'table', topicId: 'household', english: 'Table', vietnamese: 'Cái bàn', emoji: '🪑' },
      { id: 'chair', topicId: 'household', english: 'Chair', vietnamese: 'Cái ghế', emoji: '🪑' },
      { id: 'bed', topicId: 'household', english: 'Bed', vietnamese: 'Cái giường', emoji: '🛏️' },
      { id: 'sofa', topicId: 'household', english: 'Sofa', vietnamese: 'Ghế sofa', emoji: '🛋️' },
      { id: 'desk', topicId: 'household', english: 'Desk', vietnamese: 'Bàn làm việc', emoji: '💻' },
      { id: 'cabinet', topicId: 'household', english: 'Cabinet', vietnamese: 'Tủ', emoji: '🗄️' },
      { id: 'shelf', topicId: 'household', english: 'Shelf', vietnamese: 'Kệ', emoji: '📚' },
      { id: 'lamp', topicId: 'household', english: 'Lamp', vietnamese: 'Đèn', emoji: '💡' },
      { id: 'clock', topicId: 'household', english: 'Clock', vietnamese: 'Đồng hồ', emoji: '⏰' },
      { id: 'mirror', topicId: 'household', english: 'Mirror', vietnamese: 'Cái gương', emoji: '🪞' },
      // Set 2
      { id: 'television', topicId: 'household', english: 'Television', vietnamese: 'Tivi', emoji: '📺' },
      { id: 'fridge', topicId: 'household', english: 'Fridge', vietnamese: 'Tủ lạnh', emoji: '🧊' },
      { id: 'oven', topicId: 'household', english: 'Oven', vietnamese: 'Lò nướng', emoji: '🍳' },
      { id: 'microwave', topicId: 'household', english: 'Microwave', vietnamese: 'Lò vi sóng', emoji: '🍲' },
      { id: 'toaster', topicId: 'household', english: 'Toaster', vietnamese: 'Máy nướng bánh mì', emoji: '🍞' },
      { id: 'kettle', topicId: 'household', english: 'Kettle', vietnamese: 'Ấm đun nước', emoji: '🫖' },
      { id: 'blender', topicId: 'household', english: 'Blender', vietnamese: 'Máy xay sinh tố', emoji: '🥤' },
      { id: 'fan', topicId: 'household', english: 'Fan', vietnamese: 'Cái quạt', emoji: '🌀' },
      { id: 'air-conditioner', topicId: 'household', english: 'Air Conditioner', vietnamese: 'Máy lạnh', emoji: '❄️' },
      { id: 'heater', topicId: 'household', english: 'Heater', vietnamese: 'Máy sưởi', emoji: '🔥' },
      // Set 3
      { id: 'plate', topicId: 'household', english: 'Plate', vietnamese: 'Cái đĩa', emoji: '🍽️' },
      { id: 'bowl', topicId: 'household', english: 'Bowl', vietnamese: 'Cái bát', emoji: '🥣' },
      { id: 'cup', topicId: 'household', english: 'Cup', vietnamese: 'Cái tách', emoji: '☕' },
      { id: 'glass', topicId: 'household', english: 'Glass', vietnamese: 'Cái ly', emoji: '🥛' },
      { id: 'spoon', topicId: 'household', english: 'Spoon', vietnamese: 'Cái thìa', emoji: '🥄' },
      { id: 'fork', topicId: 'household', english: 'Fork', vietnamese: 'Cái nĩa', emoji: '🍴' },
      { id: 'knife', topicId: 'household', english: 'Knife', vietnamese: 'Con dao', emoji: '🔪' },
      { id: 'chopsticks', topicId: 'household', english: 'Chopsticks', vietnamese: 'Đôi đũa', emoji: '🥢' },
      { id: 'pot', topicId: 'household', english: 'Pot', vietnamese: 'Cái nồi', emoji: '🍲' },
      { id: 'pan', topicId: 'household', english: 'Pan', vietnamese: 'Cái chảo', emoji: '🍳' },
      // Set 4
      { id: 'pillow', topicId: 'household', english: 'Pillow', vietnamese: 'Cái gối', emoji: '😴' },
      { id: 'blanket', topicId: 'household', english: 'Blanket', vietnamese: 'Cái chăn', emoji: '🛌' },
      { id: 'sheet', topicId: 'household', english: 'Sheet', vietnamese: 'Ga trải giường', emoji: '🛌' },
      { id: 'mattress', topicId: 'household', english: 'Mattress', vietnamese: 'Nệm', emoji: '🛌' },
      { id: 'curtain', topicId: 'household', english: 'Curtain', vietnamese: 'Rèm cửa', emoji: '🪟' },
      { id: 'rug', topicId: 'household', english: 'Rug', vietnamese: 'Thảm', emoji: '🧹' },
      { id: 'towel', topicId: 'household', english: 'Towel', vietnamese: 'Khăn tắm', emoji: '🧼' },
      { id: 'soap', topicId: 'household', english: 'Soap', vietnamese: 'Xà phòng', emoji: '🧼' },
      { id: 'shampoo', topicId: 'household', english: 'Shampoo', vietnamese: 'Dầu gội', emoji: '🧼' },
      { id: 'toothbrush', topicId: 'household', english: 'Toothbrush', vietnamese: 'Bàn chải đánh răng', emoji: '🪥' },
      // Set 5
      { id: 'toothpaste', topicId: 'household', english: 'Toothpaste', vietnamese: 'Kem đánh răng', emoji: '🪥' },
      { id: 'comb', topicId: 'household', english: 'Comb', vietnamese: 'Cái lược', emoji: '🪮' },
      { id: 'brush', topicId: 'household', english: 'Brush', vietnamese: 'Bàn chải', emoji: '🪮' },
      { id: 'hairdryer', topicId: 'household', english: 'Hairdryer', vietnamese: 'Máy sấy tóc', emoji: '💨' },
      { id: 'razor', topicId: 'household', english: 'Razor', vietnamese: 'Dao cạo râu', emoji: '🪒' },
      { id: 'washing-machine', topicId: 'household', english: 'Washing Machine', vietnamese: 'Máy giặt', emoji: '🧺' },
      { id: 'dryer', topicId: 'household', english: 'Dryer', vietnamese: 'Máy sấy quần áo', emoji: '🧺' },
      { id: 'iron', topicId: 'household', english: 'Iron', vietnamese: 'Bàn là', emoji: '👔' },
      { id: 'vacuum-cleaner', topicId: 'household', english: 'Vacuum Cleaner', vietnamese: 'Máy hút bụi', emoji: '🧹' },
      { id: 'broom', topicId: 'household', english: 'Broom', vietnamese: 'Cái chổi', emoji: '🧹' },
      // Set 6-10: Simulated
      ...Array.from({ length: 50 }).map((_, i) => ({
        id: `household-extra-${i}`,
        topicId: 'household',
        english: `Item ${i + 51}`,
        vietnamese: `Vật dụng ${i + 51}`,
        emoji: '🏠',
      })),
    ],
  },
];


export const CONVERSATIONS: Conversation[] = [
  {
    id: 'greeting',
    title: 'Greeting Friends',
    vietnameseTitle: 'Chào hỏi bạn bè',
    image: 'https://picsum.photos/seed/greeting/800/600',
    dialogue: [
      { speaker: 'Leo', text: 'Hello! How are you?', vietnamese: 'Xin chào! Bạn khỏe không?' },
      { speaker: 'Mimi', text: 'I am fine, thank you!', vietnamese: 'Mình khỏe, cảm ơn bạn!' },
      { speaker: 'Leo', text: 'What is your name?', vietnamese: 'Tên của bạn là gì?' },
      { speaker: 'Mimi', text: 'My name is Mimi.', vietnamese: 'Tên mình là Mimi.' },
    ],
  },
  {
    id: 'school',
    title: 'At School',
    vietnameseTitle: 'Tại trường học',
    image: 'https://picsum.photos/seed/school/800/600',
    dialogue: [
      { speaker: 'Teacher', text: 'Good morning class!', vietnamese: 'Chào buổi sáng cả lớp!' },
      { speaker: 'Students', text: 'Good morning teacher!', vietnamese: 'Chúng em chào cô ạ!' },
      { speaker: 'Teacher', text: 'Open your books, please.', vietnamese: 'Các em vui lòng mở sách ra.' },
    ],
  },
  {
    id: 'food',
    title: 'Yummy Food',
    vietnameseTitle: 'Món ăn ngon',
    image: 'https://picsum.photos/seed/food/800/600',
    dialogue: [
      { speaker: 'Mom', text: 'Do you like apples?', vietnamese: 'Con có thích táo không?' },
      { speaker: 'Kid', text: 'Yes, I do! I love apples.', vietnamese: 'Vâng, con có! Con yêu táo.' },
      { speaker: 'Mom', text: 'Here you go!', vietnamese: 'Của con đây!' },
      { speaker: 'Kid', text: 'Thank you, Mom!', vietnamese: 'Con cảm ơn mẹ!' },
    ],
  },
];
