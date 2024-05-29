import { range } from "@/utils";
import { type ButtonColorInfo, type ButtonTypeInfo } from "@/types";
import { COLORS } from "./styles";

const SKIN_TONES = [
  "#FFE2D6",
  "#FFCBA3",
  "#FFC6B7",
  "#FFB89D",
  "#F2A07D",
  "#E59D65",
  "#E18E70",
  "#C6775C",
  "#B76E45",
  "#A46648",
  "#985C30",
  "#97513F",
  "#8C4A25",
  "#7D4A3F",
  "#6E3D3A",
].map((color, i) => ({
  color,
  state: "SkinTone",
  value: i + 1,
}));

const BODY_TYPES: ButtonTypeInfo[] = range(6).map((_, i) => ({
  state: "Body",
  statesToOverride: {
    BackgroundColor: 0,
    Body: i + 1,
    ENG_ONLY_Animation: 0,
    ENG_ONLY_Zoom: 1,
    Expression: 0,
    FacialHair: 0,
    Glasses: 0,
    "Nose Piercing": 0,
    Piercings: 0,
    Wrinkles: 0,
  },
  value: i + 1,
}));

const EYE_COLORS = [
  "#3D3D3D",
  "#A44407",
  "#947300",
  "#549002",
  "#0B8890",
  "#007FCF",
  "#7386A1",
  "#945EF0",
  "#CE26D3",
  "#FB4CB7",
  "#F03535",
  "#F28300",
  "#F0AD00",
].map((color, i) => ({
  color,
  state: "EyeColor",
  value: i + 1,
}));

const EXPRESSION_TYPES: ButtonTypeInfo[] = range(57).map((_, i) => ({
  state: "Expression",
  statesToOverride: {
    BackgroundColor: 0,
    Body: 0,
    ENG_ONLY_Animation: 0,
    ENG_ONLY_Zoom: 0,
    Expression: i + 1,
  },
  value: i + 1,
}));

const HAIR_COLORS = [
  "#3D3D3D",
  "#553629",
  "#662C2C",
  "#753A23",
  "#A34242",
  "#947872",
  "#BB6A20",
  "#CA6049",
  "#F5AF62",
  "#FFDEBB",
  "#E4DDD6",
  "#ECF0F1",
  "#FF97CF",
  "#9961FF",
  "#3F83D7",
  "#249472",
].map((color, i) => ({
  color,
  state: "MainHairColor",
  value: i + 1,
}));

const HAIR_TYPES: ButtonTypeInfo[] = range(72).map((_, i) => ({
  state: "MainHair",
  statesToOverride: {
    BackgroundColor: 0,
    Body: 0,
    ENG_ONLY_Animation: 0,
    ENG_ONLY_Zoom: 0,
    Expression: 0,
    FacialHair: 0,
    Glasses: 0,
    Headwear: 0,
    MainHair: i + 1,
    "Nose Piercing": 0,
    Piercings: 0,
    Wrinkles: 0,
  },
  value: i + 1,
}));

const GLASS_COLORS = [
  "#1453A3",
  "#9069CD",
  "#5F8428",
  "#EA7E00",
  "#FF4B4B",
  "#FF9BD8",
  "#EAD5C6",
  "#434343",
].map((color, i) => ({
  color,
  state: "GlassesColor",
  value: i + 1,
}));

const GLASS_TYPES = Array.from({ length: 7 }).map((_, i) => ({
  state: "Glasses",
  statesToOverride: {
    BackgroundColor: 0,
    Body: 0,
    ENG_ONLY_Animation: 0,
    ENG_ONLY_Zoom: 0,
    Glasses: i,
  },
  value: i,
}));

const WRINKLE_TYPES = Array.from({ length: 3 }).map((_, i) => ({
  state: "Wrinkles",
  statesToOverride: {
    BackgroundColor: 0,
    Body: 0,
    ENG_ONLY_Animation: 0,
    ENG_ONLY_Zoom: 0,
    Expression: 0,
    FacialHair: 0,
    Glasses: 0,
    Headwear: 0,
    "Nose Piercing": 0,
    Piercings: 0,
    Wrinkles: i,
  },
  value: i,
}));

const PIERCING_TYPES = Array.from({ length: 3 }).map((_, i) => ({
  state: "Piercings",
  statesToOverride: {
    BackgroundColor: 0,
    Body: 0,
    ENG_ONLY_Animation: 0,
    ENG_ONLY_Zoom: 0,
    Expression: 0,
    FacialHair: 0,
    Glasses: 0,
    Headwear: 0,
    "Nose Piercing": 0,
    Piercings: i,
    Wrinkles: 0,
  },
  value: i,
}));

const NOSE_PIERCING_TYPES = Array.from({ length: 4 }).map((_, i) => ({
  state: "Nose Piercing",
  statesToOverride: {
    BackgroundColor: 0,
    Body: 0,
    ENG_ONLY_Animation: 0,
    ENG_ONLY_Zoom: 0,
    Expression: 0,
    FacialHair: 0,
    Glasses: 0,
    Headwear: 0,
    "Nose Piercing": i,
    Piercings: 0,
    Wrinkles: 0,
  },
  value: i,
}));

const FACIAL_HAIR_COLORS = [
  {
    color: "#434343",
    state: "FacialHairColor",
    value: 1,
  },
  {
    color: "#5D3B2D",
    state: "FacialHairColor",
    value: 2,
  },
  {
    color: "#592615",
    state: "FacialHairColor",
    value: 3,
  },
  {
    color: "#703030",
    state: "FacialHairColor",
    value: 4,
  },
  {
    color: "#785B56",
    state: "FacialHairColor",
    value: 6,
  },
  {
    color: "#A44D13",
    state: "FacialHairColor",
    value: 7,
  },
  {
    color: "#F09647",
    state: "FacialHairColor",
    value: 9,
  },
  {
    color: "#FFD1A4",
    state: "FacialHairColor",
    value: 10,
  },
  {
    color: "#D9D0C7",
    state: "FacialHairColor",
    value: 11,
  },
  {
    color: "#E4EAEB",
    state: "FacialHairColor",
    value: 12,
  },
  {
    color: "#7D46FF",
    state: "FacialHairColor",
    value: 14,
  },
  {
    color: "#2A66C8",
    state: "FacialHairColor",
    value: 15,
  },
  {
    color: "#167856",
    state: "FacialHairColor",
    value: 16,
  },
];
const FACIAL_HAIR_TYPES = Array.from({ length: 7 }).map((_, i) => ({
  state: "FacialHair",
  statesToOverride: {
    BackgroundColor: 0,
    Body: 0,
    ENG_ONLY_Animation: 0,
    ENG_ONLY_Zoom: 0,
    Expression: 0,
    FacialHair: i,
    Glasses: 0,
    Headwear: 0,
    "Nose Piercing": 0,
    Piercings: 0,
    Wrinkles: 0,
  },
  value: i,
}));

const HEADWEAR_COLORS = [
  "#9069CD",
  "#0084C2",
  "#58A700",
  "#FFC700",
  "#FF9600",
  "#BC0038",
  "#FFB7E3",
  "#ECF0F1",
  "#575757",
].map((color, i) => ({
  color,
  state: "HeadwearColor",
  value: i + 1,
}));

const HEADWEAR_TYPES = Array.from({ length: 12 }).map((_, i) => ({
  state: "Headwear",
  statesToOverride: {
    BackgroundColor: 0,
    Body: 0,
    ENG_ONLY_Animation: 0,
    ENG_ONLY_Zoom: 0,
    Expression: 0,
    FacialHair: 0,
    Glasses: 0,
    Headwear: i,
    "Nose Piercing": 0,
    Piercings: 0,
    Wrinkles: 0,
  },
  value: i,
}));

const CLOTHING_COLORS = [
  "#B782C2",
  "#44A1CD",
  "#78B13B",
  "#F3CB3F",
  "#F3A13F",
  "#C03C64",
  "#FBC8DE",
  "#ECF0F1",
  "#424242",
].map((color, i) => ({
  color,
  state: "ClothingColor",
  value: i + 1,
}));

export const DEFAULT_AVATAR: Record<string, number> = {
  BackgroundColor: 0,
  Body: 1,
  ClothingColor: 7,
  Expression: 54,
  EyeColor: 1,
  FacialHair: 0,
  FacialHairColor: 1,
  Glasses: 5,
  GlassesColor: 8,
  Headwear: 10,
  HeadwearColor: 7,
  MainHair: 58,
  MainHairColor: 1,
  "Nose Piercing": 0,
  Piercings: 0,
  SkinTone: 4,
  Wrinkles: 0,
};

export const DEFAULT_BACKGROUND_COLOR = COLORS.white;

export const TABS = [
  {
    name: "Body",
    state: "Body",
  },
  {
    name: "Expression",
    state: "Expression",
  },
  {
    name: "Hair",
    state: "MainHair",
  },
  {
    name: "Facial Hair",
    state: "FacialHair",
  },
  {
    name: "Headwear",
    state: "Headwear",
  },
  {
    name: "Glasses",
    state: "Glasses",
  },
  {
    name: "Wrinkles",
    state: "Wrinkles",
  },
  {
    name: "Piercings",
    state: "Piercings",
  },
  {
    name: "Nose Piercings",
    state: "Nose Piercings",
  },
];

export const TAB_CONTENTS: Record<
  string,
  {
    colors?: {
      title: string;
      options: ButtonColorInfo[];
    }[];
    types: {
      title: string;
      options: ButtonTypeInfo[];
    };
  }
> = {
  Body: {
    colors: [
      {
        title: "Skin tone",
        options: SKIN_TONES,
      },
      {
        title: "Clothing color",
        options: CLOTHING_COLORS,
      },
    ],
    types: {
      title: "Body type",
      options: BODY_TYPES,
    },
  },
  Expression: {
    colors: [
      {
        title: "Eye color",
        options: EYE_COLORS,
      },
    ],
    types: {
      title: "Expression",
      options: EXPRESSION_TYPES,
    },
  },
  MainHair: {
    colors: [
      {
        title: "Hair color",
        options: HAIR_COLORS,
      },
    ],
    types: {
      title: "Hair style",
      options: HAIR_TYPES,
    },
  },
  Glasses: {
    colors: [
      {
        title: "Glasses color",
        options: GLASS_COLORS,
      },
    ],
    types: {
      title: "Glasses style",
      options: GLASS_TYPES,
    },
  },
  Wrinkles: {
    types: {
      title: "Wrinkles",
      options: WRINKLE_TYPES,
    },
  },
  Piercings: {
    types: {
      title: "Piercings",
      options: PIERCING_TYPES,
    },
  },
  "Nose Piercings": {
    types: {
      title: "Nose Piercings",
      options: NOSE_PIERCING_TYPES,
    },
  },
  FacialHair: {
    colors: [
      {
        title: "Facial hair color",
        options: FACIAL_HAIR_COLORS,
      },
    ],
    types: {
      title: "Facial hair style",
      options: FACIAL_HAIR_TYPES,
    },
  },
  Headwear: {
    colors: [
      {
        title: "Headwear color",
        options: HEADWEAR_COLORS,
      },
    ],
    types: {
      title: "Headwear style",
      options: HEADWEAR_TYPES,
    },
  },
};
