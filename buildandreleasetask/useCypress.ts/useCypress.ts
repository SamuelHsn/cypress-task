import * as path from "path";

import * as taskLib from "azure-pipelines-task-lib/task";
import * as toolLib from "azure-pipelines-tool-lib/tool";

export async function installCypress() {
  try {
    const version: string = taskLib.getInput("version", true)!;
    const platform = taskLib.getInput("platform", true);

    const platformString =
      platform === "win32"
        ? "?platform=win32&arch=x64"
        : `?platform=${platform}`;
    const cypressUrl = `https://download.cypress.io/desktop/${version}${
      platform ? platformString : ""
    }`;

    const temp: string = await toolLib.downloadTool(cypressUrl);
    const extractRoot: string = await toolLib.extractZip(temp);

    taskLib.setVariable("CYPRESS_CACHE_FOLDER", path.join(extractRoot));
  } catch (err) {
    taskLib.setResult(
      taskLib.TaskResult.Failed,
      taskLib.loc("CypressInstallerFailed", (err as { message: string }).message)
    );
  }
}
