// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import storybook from "eslint-plugin-storybook";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: { "simple-import-sort": simpleImportSort },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // 1. React, Next, 외부 라이브러리
            ["^react", "^next", "^@?\\w"],
            // 2. 내부 절대경로
            [
              "^@/app",
              "^@/database",
              "^@/services",
              "^@/lib",
              "^@/hooks",
              "^@/components/ui",
              "^@/components/common",
              "^@/",
            ],
            // 3. 상대경로
            ["^\\."],
            // 4. 스타일 파일
            ["^.+\\.css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  }, // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "components/ui-legacy/**", // shadcn/ui
  ]),
  ...storybook.configs["flat/recommended"],
]);

export default eslintConfig;
