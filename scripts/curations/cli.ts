import { bus } from "~/core/domains";

const [, , namespace, command, ...rest] = process.argv;

async function run() {
  if (!namespace) {
    console.log(
      `❌ Please specify a namespace: ${Object.keys(bus).join(", ")}`
    );
    return;
  }

  if (!Object.keys(bus).includes(namespace)) {
    console.log(
      `❌ Please specify a valid namespace: ${Object.keys(bus).join(", ")}`
    );
    return;
  }

  const validatedNamespace = namespace as keyof typeof bus;

  if (!command) {
    const commands = bus[validatedNamespace];
    console.log(
      `Namespace: ${validatedNamespace} (${commands.length} commands)\n`,
      commands
    );
    console.log("🛠 Available Commands:\n");
    const groups = commands.reduce((acc, cmd) => {
      const group = cmd.meta.group || "General";
      acc[group] = acc[group] || [];
      acc[group].push(cmd);
      return acc;
    }, {} as Record<string, typeof commands>);

    for (const group of Object.keys(groups).sort()) {
      console.log(`🔹 ${group}`);
      for (const cmd of groups[group].sort((a, b) =>
        a.meta.label.localeCompare(b.meta.label)
      )) {
        const paramList =
          cmd.meta.params?.map((p) => `<${p.name}>`).join(" ") ?? "";
        const label = cmd.meta.label ?? cmd.id;
        const description = cmd.meta.description ?? "(no description provided)";
        console.log(
          `  ${label.padEnd(30)} ${paramList.padEnd(30)} ${description}`
        );
      }
      console.log();
    }

    return;
  }

  const fullCommand = command.includes(":")
    ? command
    : `${namespace}:${command}`;
  const action = bus[validatedNamespace].find((a) => a.id === fullCommand);
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
