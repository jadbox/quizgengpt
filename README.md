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

### Instructions:
- Add Master_PACKRAT_2024.xlsx to the root directory
- Run the program and follow the prompts
- Output will be in the `output/` directory under the name [section].txt

### Example usage:
![Img](./img/Screenshot%202024-07-14%20155428.png)
![Img2](./img/Screenshot%202024-07-14%20155522.png)
