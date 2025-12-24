import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import simpleImportSort from "eslint-plugin-simple-import-sort";

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
              "^@/components/ui",
              "^@/components/common",
              "^@/lib",
              "^@/hooks",
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
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "components/ui/**", // shadcn/ui
  ]),
]);

export default eslintConfig;
