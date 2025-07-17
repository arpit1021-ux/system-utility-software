export interface System {
  id: string;
  hostname: string;
  ip: string;
  os: string;
  osVersion: string;
  diskEncrypted: boolean;
  osUpdated: boolean;
  antivirusActive: boolean;
  inactivitySleep: number;
  lastCheckin: string;
  model: string;
  processor: string;
  memory: number;
  serialNumber: string;
  user: string;
}