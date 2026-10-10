import * as migration_20261004_095143_initial from './20261004_095143_initial';
import * as migration_20261004_120524_add_media_articles from './20261004_120524_add_media_articles';
import * as migration_20261004_130000_add_pages_globals from './20261004_130000_add_pages_globals';
import * as migration_20261004_131500_fix_globals_timestamps from './20261004_131500_fix_globals_timestamps';
import * as migration_20261010_190500_media_image_sizes_webp from './20261010_190500_media_image_sizes_webp';

export const migrations = [
  {
    up: migration_20261004_095143_initial.up,
    down: migration_20261004_095143_initial.down,
    name: '20261004_095143_initial',
  },
  {
    up: migration_20261004_120524_add_media_articles.up,
    down: migration_20261004_120524_add_media_articles.down,
    name: '20261004_120524_add_media_articles'
  },
  {
    up: migration_20261004_130000_add_pages_globals.up,
    down: migration_20261004_130000_add_pages_globals.down,
    name: '20261004_130000_add_pages_globals'
  },
  {
    up: migration_20261004_131500_fix_globals_timestamps.up,
    down: migration_20261004_131500_fix_globals_timestamps.down,
    name: '20261004_131500_fix_globals_timestamps'
  },
  {
    up: migration_20261010_190500_media_image_sizes_webp.up,
    down: migration_20261010_190500_media_image_sizes_webp.down,
    name: '20261010_190500_media_image_sizes_webp'
  },
];
