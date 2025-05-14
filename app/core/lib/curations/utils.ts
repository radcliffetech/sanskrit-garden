import readline from "readline";

export function promptUser(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    })
  );
}

export function confirmPrompt(msg: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(msg + " (y/N) ", (ans) => {
      rl.close();
      resolve(ans.trim().toLowerCase() === "y");
    })
  );
}
