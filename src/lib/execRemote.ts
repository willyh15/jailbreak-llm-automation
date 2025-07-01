// You can call this from any API route to run real jailbreak commands remotely
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
