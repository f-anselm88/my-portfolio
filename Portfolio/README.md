# CodeAlpha -- Python Programming Internship
### Repository: CodeAlpha_PythonTasks

Completed Tasks: All 4 of 4 (exceeds the 2 to 3 minimum requirement)

---

## Project Structure

```
CodeAlpha_PythonTasks/
├── task1_hangman.py        # Task 1 -- Hangman Game
├── task2_stock_tracker.py  # Task 2 -- Stock Portfolio Tracker
├── task3_automation.py     # Task 3 -- Task Automation (Email Extractor)
├── task4_chatbot.py        # Task 4 -- Rule-Based Chatbot
└── README.md
```

---

## Task 1 -- Hangman Game

Goal: Console-based word guessing game where the player guesses one letter at a time.

Key Concepts: random, while loop, if-else, strings, lists, sets

How to Run:
```bash
python task1_hangman.py
```

Features:
- 5 predefined words selected randomly each round
- ASCII hangman art that updates with each wrong guess
- 6 incorrect guesses allowed before game over
- Replay support without restarting the script

---

## Task 2 -- Stock Portfolio Tracker

Goal: Calculate total investment value from user-defined stock holdings.

Key Concepts: dictionary, input/output, basic arithmetic, file handling

How to Run:
```bash
python task2_stock_tracker.py
```

Features:
- 8 supported tickers: AAPL, TSLA, GOOGL, AMZN, MSFT, META, NVDA, NFLX
- Per-holding and total portfolio value calculation
- Optional export to .txt or .csv with a timestamp in the filename

---

## Task 3 -- Task Automation (Email Extractor)

Goal: Extract all email addresses from a .txt file and save unique results to a new file.

Key Concepts: os, re, file handling

How to Run:
```bash
# Auto-generates a sample input file and processes it
python task3_automation.py

# Or pass your own text file
python task3_automation.py my_document.txt
```

Features:
- Regex-powered email extraction
- Automatic deduplication and alphabetical sorting
- Saves output to extracted_emails.txt
- Accepts a command-line argument for custom source files

---

## Task 4 -- Rule-Based Chatbot

Goal: A conversational chatbot driven by predefined keyword-to-response rules.

Key Concepts: if-elif, functions, loops, input/output

How to Run:
```bash
python task4_chatbot.py
```

Features:
- 9 rule categories: greetings, wellbeing, identity, capabilities, jokes, time, gratitude, farewells, and defaults
- Randomized responses per category so conversations feel less repetitive
- Graceful session exit on farewell keywords or keyboard interrupt

---

## Requirements

- Python 3.8 or higher
- No third-party libraries required (standard library only)

---

## Author

[Your Name]
LinkedIn: [your-linkedin-url]
GitHub:   [your-github-username]
