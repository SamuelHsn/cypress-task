import tl = require("azure-pipelines-task-lib/task");
import { installCypress } from "./installCypress/installCypress";

async function run() {
  try {
    installCypress();
  } catch (err) {
    tl.setResult(tl.TaskResult.Failed, (err as { message: string }).message);
  }
}

run();
