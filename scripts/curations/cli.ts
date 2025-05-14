import { commandBus } from "~/core/lib/curations/commandBus";

const [, , namespace, command, ...rest] = process.argv;

async function run() {
  if (namespace !== "nouns") {
    console.log("❌ Please specify a valid namespace: nouns");
    return;
  }

  if (!command) {
    console.log("🛠 Available Commands:\n");

    const groups = commandBus.reduce((acc, cmd) => {
      const group = cmd.meta.group || "General";
      acc[group] = acc[group] || [];
      acc[group].push(cmd);
      return acc;
    }, {} as Record<string, typeof commandBus>);

    for (const group of Object.keys(groups).sort()) {
      console.log(`🔹 ${group}`);
      for (const cmd of groups[group].sort((a, b) =>
        a.id.localeCompare(b.id)
      )) {
        const paramList =
          cmd.meta.params?.map((p) => `<${p.name}>`).join(" ") ?? "";
        console.log(
          `  ${cmd.id.padEnd(30)} ${paramList.padEnd(30)} ${
            cmd.meta.description
          }`
        );
      }
      console.log();
    }

    return;
  }

  const fullCommand = command.includes(":")
    ? command
    : `${namespace}:${command}`;
  const action = commandBus.find((a) => a.id === fullCommand);
  if (!action) {
    console.log(`❌ Unknown command: ${command}`);
    return;
  }

  const args: Record<string, string> = {};
  let valid = true;
  action.meta.params?.forEach((param, i) => {
    const value = rest[i];
    args[param.name] = value;
    if (param.required && (value === undefined || value.trim() === "")) {
      console.log(`❌ Missing required param: ${param.name}`);
      valid = false;
    }
  });
  if (!valid) return;

  try {
    await action.action?.(args);
  } catch (err) {
    console.error(
      `❌ Failed to run '${command}':`,
      err instanceof Error ? err.message : err
    );
  }
}

run().catch((err) => {
  console.error("❌ Error:", err);
});
