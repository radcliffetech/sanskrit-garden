import { commandBus } from "~/core/lib/review/commands/registry";

const [, , command, ...rest] = process.argv;

async function run() {
  if (!command) {
    console.log("Usage:");
    for (const a of commandBus) {
      const params = a.meta.params?.map((p) => `<${p.name}>`).join(" ") ?? "";
      console.log(`  pnpm tsx scripts/review/review-cli.ts ${a.id} ${params}`);
    }
    return;
  }

  const action = commandBus.find((a) => a.id === command);
  if (!action) {
    console.log(`❌ Unknown command: ${command}`);
    return;
  }

  const args: Record<string, string> = {};
  action.meta.params?.forEach((param, i) => {
    args[param.name] = rest[i];
  });

  await action.action?.(args);
}

run().catch((err) => {
  console.error("❌ Error:", err);
});
