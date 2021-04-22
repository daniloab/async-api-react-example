import { ChildProcess, spawn } from "child_process";
// eslint-disable-next-line
import path from "path";

// eslint-disable-next-line
const cwd = process.cwd();

export function onExit(childProcess: ChildProcess): Promise<void> {
  return new Promise((resolve, reject) => {
    childProcess.once("exit", (code: number) => {
      if (code === 0) {
        resolve(undefined);
      } else {
        reject(new Error(`Exit with error code: ${code}`));
      }
    });
    childProcess.once("error", (err: Error) => {
      reject(err);
    });
  });
}

// eslint-disable-next-line
const runProcess = async (
  command: string,
  args: string[],
  cwdCommand: string
) => {
  const childProcess = spawn(command, args, {
    stdio: [process.stdin, process.stdout, process.stderr],
    cwd: cwdCommand,
  });

  await onExit(childProcess);
};

const generateAsyncApi = async () => {
  const command = "yarn";

  const eventPackage = "./";

  const asyncApiConfig = "./src/asyncApi/asyncApiHeaderConfig.js";

  const eventPath = path.join(cwd, eventPackage);
  const asyncApiConfigPath = path.join(eventPath, asyncApiConfig);

  const userSignUpPath = path.join(cwd, "./src/modules/userSignUp");
  const userSignUpPathRegex = `${userSignUpPath}/**/*.yml`;

  const userSignInPath = path.join(cwd, "./src/modules/userSignIn");
  const userSignPathRegex = `${userSignInPath}/**/*.yml`;

  const args = [
    "swagger-jsdoc",
    "-d",
    asyncApiConfigPath,
    userSignUpPathRegex,
    userSignPathRegex,
    "-o",
  ];

  const argsYml = [...args, "./src/asyncApi/asyncapi.yml"];
  const argsJson = [...args, "./src/asyncApi/asyncapi.json"];

  await runProcess(command, argsYml, eventPath);
  await runProcess(command, argsJson, eventPath);
};

(async () => {
  try {
    await generateAsyncApi();
  } catch (err) {
    // eslint-disable-next-line
    console.log("err: ", err);
  }

  process.exit(0);
})();
