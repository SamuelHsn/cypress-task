import { expect, test, describe, vi, vitest } from "vitest";
import { installCypress } from "./useCypress";
import * as taskLib from "azure-pipelines-task-lib/task";
import * as toolLib from "azure-pipelines-tool-lib/tool";
//mock tasklib and toollib with vittest

vi.mock("azure-pipelines-task-lib/task", () => ({
  getInput: vi.fn(),
  setVariable: vi.fn(),
  setResult: vi.fn(),
  loc: vi.fn(),
  TaskResult: {
    Failed: "failed",
  },
}));
vi.mock("azure-pipelines-tool-lib/tool", () => ({
  downloadTool: vi.fn(),
  extractZip: vi.fn(),
}));

describe("Install Cypress", () => {
  test("should call dowloadTool with version", async () => {
    vi.spyOn(taskLib, "getInput").mockReturnValueOnce("version");
    // vi.spyOn(taskLib, "getInput").mockImplementation(vi.fn());
    // vi.spyOn(taskLib, "setVariable").mockImplementation(vi.fn());
    // vi.spyOn(toolLib, "downloadTool").mockImplementation(vi.fn());
    // vi.spyOn(toolLib, "extractZip").mockImplementation(vi.fn());
    const result = await installCypress();
    expect(toolLib.downloadTool).toHaveBeenCalledWith(
      "https://download.cypress.io/desktop/version"
    );
  });

  test('should call setVariable with "CYPRESS_CACHE_FOLDER" and extractRoot', async () => {
    vi.spyOn(taskLib, "getInput").mockReturnValueOnce("version");
    vi.spyOn(toolLib, "downloadTool").mockResolvedValue("temp");
    vi.spyOn(toolLib, "extractZip").mockResolvedValue("extractRoot");
    const result = await installCypress();
    expect(taskLib.setVariable).toHaveBeenCalledWith(
      "CYPRESS_CACHE_FOLDER",
      "extractRoot"
    );
    expect(toolLib.extractZip).toHaveBeenCalledWith("temp");
  });

  test("should catch error and call setResult with TaskResult.Failed", async () => {
    vi.spyOn(taskLib, "getInput").mockReturnValueOnce("version");
    vi.spyOn(toolLib, "downloadTool").mockRejectedValue("error");
    vi.spyOn(taskLib, "loc").mockReturnValueOnce("http error");
    const result = await installCypress();
    expect(taskLib.setResult).toHaveBeenCalledWith("failed", "http error");
  });
  test("should catch error and call loc with error message", async () => {
    vi.spyOn(taskLib, "getInput").mockReturnValueOnce("version");
    vi.spyOn(toolLib, "downloadTool").mockRejectedValue({ message: "error" });
    vi.spyOn(taskLib, "loc").mockReturnValueOnce("http error");
    const result = await installCypress();
    expect(taskLib.loc).toHaveBeenCalledWith("CypressInstallerFailed", "error");
  });
});
