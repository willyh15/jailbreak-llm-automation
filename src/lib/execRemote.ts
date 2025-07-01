import { getSSHConfig } from './session';

export async function readRemoteJSON(path: string): Promise<any> {
  const cat = await runRemoteCommand(`cat ${path} || echo '{}'`);
  try {
    return JSON.parse(cat);
  } catch {
    return {};
  }
}

export async function appendToSpoofLog(line: string) {
  const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
  const fullLine = `[${timestamp}] ${line.replace(/"/g, '\\"')}`;
  const cmd = `echo "${fullLine}" >> /var/jb/ghosttrigger/spoof.log`;
  return await runRemoteCommand(cmd);
}

export async function buildSnapshot(): Promise<string> {
  const now = new Date().toISOString().split('T')[0];
  const zipPath = `/var/jb/ghosttrigger/snapshot-${now}.zip`;

  const cmd = `
    cd /var/jb/ghosttrigger && \
    echo "Device Info:" > system-info.txt && \
    uname -a >> system-info.txt && \
    sw_vers >> system-info.txt 2>/dev/null || echo "No sw_vers" >> system-info.txt && \
    zip -r ${zipPath} spoof.json spoof.log MGCopyAnswerOverrides.plist system-info.txt
  `;

  await runRemoteCommand(cmd);
  return zipPath;
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
  const { host, user, pass } = getSSHConfig();

  if (!host || !user || !pass) {
    throw new Error('SSH credentials not configured.');
  }

  return new Promise((resolve, reject) => {
    const { exec } = require('child_process');
    const ssh = `sshpass -p '${pass}' ssh -o StrictHostKeyChecking=no ${user}@${host} '${cmd}'`;

    exec(ssh, (error: any, stdout: string, stderr: string) => {
      if (error) return reject(stderr);
      resolve(stdout.trim());
    });
  });
}
