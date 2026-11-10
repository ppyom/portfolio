#!/usr/bin/env bash
# Edit/Write 후 수정된 파일에 ESLint --fix → Prettier 순서로 실행한다.
# (simple-import-sort가 정렬한 뒤 Prettier가 공백을 정리하도록 이 순서를 지킨다)
# ESLint 에러가 남으면 exit 2로 Claude에게 에러를 돌려줘 바로 고치게 한다.

FILE=$(node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{try{const j=JSON.parse(d);process.stdout.write(j.tool_input?.file_path??"")}catch{}})')

[ -z "$FILE" ] && exit 0
[ -f "$FILE" ] || exit 0

case "$FILE" in
  */node_modules/*|*/database/migrations/*|*/.next/*) exit 0 ;;
esac

case "$FILE" in
  *.ts|*.tsx|*.js|*.mjs)
    OUT=$(npx eslint --fix "$FILE" 2>&1)
    STATUS=$?
    npx prettier --write "$FILE" >/dev/null 2>&1
    if [ $STATUS -ne 0 ]; then
      echo "ESLint 에러 ($FILE):" >&2
      echo "$OUT" >&2
      exit 2
    fi
    ;;
  *.css|*.json|*.md|*.mdx)
    npx prettier --write "$FILE" >/dev/null 2>&1
    ;;
esac

exit 0
