import { createI18n } from "vue-i18n";

import { getByKey } from "@/utils/auth";

import { Language } from "@/enum";

import ja from "./lang/ja-JP";
import zh from "./lang/zh-CN";
import en from "./lang/en-Us";

export default createI18n({
  legacy: false,
  locale: getByKey("lang") || Language.Ja,
  messages: { "ja-JP": ja, "zh-CN": zh, "en-Us": en },
});
