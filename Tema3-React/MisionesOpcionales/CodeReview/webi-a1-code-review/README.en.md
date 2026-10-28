# A1 · Code review the replicant 🤖

🇪🇸 [Versión en castellano](README.md)

**Web Development I, the Client · U-tad · Unit 3 (React)** · 50 min · individually or in pairs · prepares mission M3

An AI has proposed a *pull request* with `Leaderboard.jsx`, a game leaderboard. It compiles, it renders
and at first sight it works. But whoever approves it as it is will suffer in the defence: it contains
**3 subtle bugs and 2 bad practices**.

This is the work you will do throughout your career: reviewing code you did not write (whether an AI or
a colleague wrote it) and deciding whether it goes to production. Here you do it for real, with a review
on GitHub.

## What you have to do

Open **your group's pull request** in the [Pull requests](https://github.com/rpmaya/webi-a1-code-review/pulls) tab and review it. For each defect
you find, leave a comment on the line where it is, with:

1. **Why it is a defect**, with the U3 concept that explains it (immutability, derived state, effect
   dependencies, keys…). "This is wrong" is not enough.
2. **The fix**, as a code suggestion (the ± *Add a suggestion* button in the comment).
3. **How you would demonstrate it in the browser**: which interaction or which console message gives
   the problem away. Hint: a `console.log` or a temporary element in the JSX.

### Acceptance criteria

- [ ] You have found the 3 bugs and the 2 bad practices.
- [ ] Each comment cites the unit concept that justifies it.
- [ ] Your fixes do not introduce new state where deriving was enough.
- [ ] You can reproduce at least 2 of the defects live (we will ask you to in the wrap-up).

## How to run the code

The defects show up when you use the component, not just when you read it.

- **In the browser, without installing anything:**
  [open the `revision-en` branch in StackBlitz](https://stackblitz.com/github/rpmaya/webi-a1-code-review/tree/revision-en).
- **On your computer:**

  ```bash
  git clone https://github.com/rpmaya/webi-a1-code-review.git
  cd webi-a1-code-review
  git switch revision-en
  npm install
  npm run dev
  ```

You can change the code as much as you like to observe it: your changes stay in your copy.

## How to review on GitHub

1. In the PR, open the **Files changed** tab.
2. Hover over the line with the defect and press the blue **+** (drag to select several lines).
3. Write the comment and press **Start a review** — ⚠️ **not** *Add single comment*, which publishes it
   straight away for the whole class to see.
4. Add the following comments with **Add review comment**. Until you submit the review, **only you can
   see them**.
5. When the teacher says so (not before): **Finish your review** → a summary of your review → option
   **Comment** → **Submit review**.

If you work in pairs, only one of you submits the review and mentions the other (`@username`) in the
summary.

## Rules

- **Do not open pull requests with the fixes**, or issues: the repository is public and you would spoil
  the activity for everyone else.
- **Review without AI.** In the wrap-up we will ask an AI for its review live and compare it with yours:
  what did each of you catch? What did the AI miss? What did you miss?
- An AI's review is a starting point, not a verdict. In the Arena you may use AI for everything, but you
  defend what you submit line by line.

---

*Discernment activity based on the AI Fluency Framework by Rick Dakan, Joseph Feller and Anthropic,
CC BY-NC-SA 4.0.*
