type SSHConfig = {
  host: string;
  user: string;
  pass: string;
};

let currentConfig: SSHConfig = {
  host: '',
  user: '',
  pass: ''
};

export function getSSHConfig(): SSHConfig {
  return currentConfig;
}

export function setSSHConfig(newConfig: SSHConfig) {
  currentConfig = newConfig;
}
