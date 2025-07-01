export async function readRemoteJSON(path: string): Promise<any> {
  const cat = await runRemoteCommand(`cat ${path} || echo '{}'`);
  try {
    return JSON.parse(cat);
  } catch {
    return {};
  }
}

export async function writeRemoteJSON(path: string, data: any): Promise<string> {
  const content = JSON.stringify(data).replace(/"/g, '\\"');
  const echo = `echo "${content}" > ${path}`;
  return await runRemoteCommand(echo);
}

export async function patchMGCopyAnswer(key: string, value: string | boolean) {
  const plistPath = '/var/jb/ghosttrigger/MGCopyAnswerOverrides.plist';
  const command = `plutil -replace ${key} -${typeof value} "${value}" ${plistPath}`;
  return await runRemoteCommand(command);
}

export async function clearMGCopyAnswerPatch(key: string) {
  const plistPath = '/var/jb/ghosttrigger/MGCopyAnswerOverrides.plist';
  const command = `plutil -remove ${key} ${plistPath}`;
  return await runRemoteCommand(command);
}


export async function runRemoteCommand(cmd: string): Promise<string> {
  const sshHost = process.env.SSH_HOST;      // e.g. '192.168.1.137'
  const sshUser = process.env.SSH_USER;      // e.g. 'root'
  const sshPassword = process.env.SSH_PASS;  // or use SSH key

  return new Promise((resolve, reject) => {
    const { exec } = require('child_process');
    const ssh = `sshpass -p '${sshPassword}' ssh -o StrictHostKeyChecking=no ${sshUser}@${sshHost} '${cmd}'`;

    exec(ssh, (error: any, stdout: string, stderr: string) => {
      if (error) return reject(stderr);
      resolve(stdout.trim());
    });
  });
}
