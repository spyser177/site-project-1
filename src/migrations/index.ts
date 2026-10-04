import * as migration_20261004_095143_initial from './20261004_095143_initial';

export const migrations = [
  {
    up: migration_20261004_095143_initial.up,
    down: migration_20261004_095143_initial.down,
    name: '20261004_095143_initial'
  },
];
