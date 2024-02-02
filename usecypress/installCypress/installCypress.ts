import * as path from "path";

import * as taskLib from "azure-pipelines-task-lib/task";
import * as toolLib from "azure-pipelines-tool-lib/tool";

export async function installCypress() {
  try {
    const version: string = taskLib.getInput("version", true)!;
    const platform = taskLib.getInput("platform", true);
    const tempDirectory = taskLib.getVariable("Agent.TempDirectory")!;
    const platformString =
      platform === "win32"
        ? "?platform=win32&arch=x64"
        : `?platform=${platform}`;
    const cypressUrl = `https://download.cypress.io/desktop/${version}${
      platform ? platformString : ""
    }`;

    const temp: string = await toolLib.downloadTool(cypressUrl);
    taskLib.debug(`Downloaded Cypress to ${temp}`);
    const extractRoot: string = await toolLib.extractZip(
      temp,
      path.join(tempDirectory, "cypress", version)
    );
    taskLib.debug(`Extracted Cypress to ${extractRoot}`);
    taskLib.setVariable(
      "CYPRESS_CACHE_FOLDER",
      path.join(tempDirectory, "cypress")
    );
    taskLib.debug(
      `Set CYPRESS_CACHE_FOLDER to ${path.join(tempDirectory, "cypress")}`
    );
  } catch (err) {
    taskLib.setResult(
      taskLib.TaskResult.Failed,
      taskLib.loc(
        "CypressInstallerFailed",
        (err as { message: string }).message
      )
    );
  }
}
