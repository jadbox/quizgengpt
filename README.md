# quizgengpt

This project generates quiz practice questions based on an excel file template.

Requires ChatGPT API Key:
- create `.env` file with:
```bash
OPENAI_API_KEY=your_api_key
```
- Requires JavaScript runtime Bun v1.1.20 or higher installed (https://bun.sh)

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

Instructions:
- Add Master_PACKRAT_2024.xlsx to the root directory
- Run the program
- Output will be in the `output` directory