// import { System } from '../types/system';

// import {supabase} from '../lib/supabase'

// const response = await supabase.from('systems').select('*')

// console.log(response)

// export const mockSystemData=response.data




// export const mockSystemData: System[] = [
//   {
//     id: '1',
//     hostname: 'macbook-pro-01',
//     ip: '192.168.1.101',
//     os: 'macOS',
//     osVersion: '14.0',
//     diskEncrypted: true,
//     osUpdated: true,
//     antivirusActive: true,
//     inactivitySleep: 5,
//     lastCheckin: '5 minutes ago',
//     model: 'MacBook Pro (16-inch, 2023)',
//     processor: 'Apple M2 Pro',
//     memory: 32,
//     serialNumber: 'C02ZA1ZGPGJ1',
//     user: 'john.doe'
//   },
//   {
//     id: '2',
//     hostname: 'windows-laptop-05',
//     ip: '192.168.1.105',
//     os: 'Windows',
//     osVersion: '11 Pro',
//     diskEncrypted: false,
//     osUpdated: true,
//     antivirusActive: true,
//     inactivitySleep: 15,
//     lastCheckin: '12 minutes ago',
//     model: 'Dell XPS 15',
//     processor: 'Intel Core i7-12700H',
//     memory: 16,
//     serialNumber: 'DXPS159372',
//     user: 'jane.smith'
//   },
//   {
//     id: '3',
//     hostname: 'macbook-air-08',
//     ip: '192.168.1.108',
//     os: 'macOS',
//     osVersion: '13.4',
//     diskEncrypted: true,
//     osUpdated: false,
//     antivirusActive: true,
//     inactivitySleep: 10,
//     lastCheckin: '23 minutes ago',
//     model: 'MacBook Air (13-inch, 2022)',
//     processor: 'Apple M2',
//     memory: 16,
//     serialNumber: 'C02T912ZQ6T2',
//     user: 'alex.johnson'
//   },
//   {
//     id: '4',
//     hostname: 'ubuntu-desktop-03',
//     ip: '192.168.1.103',
//     os: 'Linux',
//     osVersion: 'Ubuntu 22.04 LTS',
//     diskEncrypted: true,
//     osUpdated: true,
//     antivirusActive: false,
//     inactivitySleep: 20,
//     lastCheckin: '35 minutes ago',
//     model: 'Custom Build',
//     processor: 'AMD Ryzen 9 5900X',
//     memory: 64,
//     serialNumber: 'UBT22042256',
//     user: 'michael.brown'
//   },
//   {
//     id: '5',
//     hostname: 'windows-desktop-07',
//     ip: '192.168.1.107',
//     os: 'Windows',
//     osVersion: '10 Enterprise',
//     diskEncrypted: false,
//     osUpdated: false,
//     antivirusActive: true,
//     inactivitySleep: 30,
//     lastCheckin: '1 hour ago',
//     model: 'HP EliteDesk 800 G5',
//     processor: 'Intel Core i5-9500',
//     memory: 8,
//     serialNumber: 'HPD80056721',
//     user: 'sarah.wilson'
//   },
//   {
//     id: '6',
//     hostname: 'macbook-pro-11',
//     ip: '192.168.1.111',
//     os: 'macOS',
//     osVersion: '14.0',
//     diskEncrypted: true,
//     osUpdated: true,
//     antivirusActive: true,
//     inactivitySleep: 5,
//     lastCheckin: '10 minutes ago',
//     model: 'MacBook Pro (14-inch, 2023)',
//     processor: 'Apple M2 Max',
//     memory: 64,
//     serialNumber: 'C02ZT5ZTPGJ8',
//     user: 'david.lee'
//   },
//   {
//     id: '7',
//     hostname: 'windows-laptop-14',
//     ip: '192.168.1.114',
//     os: 'Windows',
//     osVersion: '11 Enterprise',
//     diskEncrypted: true,
//     osUpdated: true,
//     antivirusActive: true,
//     inactivitySleep: 10,
//     lastCheckin: '25 minutes ago',
//     model: 'Lenovo ThinkPad X1 Carbon',
//     processor: 'Intel Core i7-1270P',
//     memory: 32,
//     serialNumber: 'LTP1X142857',
//     user: 'emily.chen'
//   }
// ];